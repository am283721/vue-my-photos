import { defineComponent, pushScopeId, popScopeId, openBlock, createBlock, createVNode, Transition, withModifiers, withDirectives, vShow, toDisplayString, createCommentVNode, withScopeId } from 'vue';

var script = defineComponent({
  name: "Lightbox",
  components: {},
  props: {
    // images = [{ name:'image1.jpg', alt:'Redwoods', filter:'nature' }, ...]
    images: {
      type: Array,
      required: true
    },
    // Used to display a subset of photos. If used, images array must contain a property
    // titled 'filter' which contains the desired filter string
    filter: {
      type: String,
      default: "all"
    },
    // Used if images are located in a separate folder (e.g. '/images/')
    directory: {
      type: String,
      default: ""
    },
    // Used to set the duration in miliseconds of key/mouse inactivity before caption
    // and arrows disappear
    timeoutDuration: {
      type: Number,
      default: 3000
    },
    // When true, lightbox will close when user clicks on the black backdrop
    closeOnBackdropClick: {
      type: Boolean,
      default: false
    },
    // Used to specify which image to display. When updated within the parent component, the lightbox will display the new image
    currentImageName: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      visible: false,
      // Lightbox not visible by default
      controlsVisible: true,
      // Lightbox controls (arrows, caption, close button)
      index: 0,
      // Index indicates which photo to display. Default to 1st photo
      timer: null,
      // Timer to show/hide lightbox controls
      slideTransitionName: "lightbox-slide-next" //Controls animation's transition direction (next or prev)

    };
  },

  mounted() {
    window.addEventListener("keydown", this.keyEventListener);
    window.addEventListener("mousemove", this.mouseEventListener); // window.addEventListener("touchmove", this.mouseEventListener);

    window.addEventListener("mouseup", this.mouseEventListener);
  },

  unmounted() {
    window.removeEventListener("keydown", this.keyEventListener);
    window.removeEventListener("mousemove", this.mouseEventListener); //  window.removeEventListener("touchmove", this.mouseEventListener);

    window.removeEventListener("mouseup", this.mouseEventListener);
  },

  watch: {
    currentImageName(newVal) {
      if (newVal) {
        this.show(newVal);
      }
    }

  },
  computed: {
    filteredImages() {
      if (this.filter === "all" || !this.filter.length) {
        return this.images;
      }

      return this.images.filter(img => img.filter === this.filter);
    }

  },
  methods: {
    // If closeOnBackdropClick is true, we need to close the lightbox when the user clicks on the
    // black part of the lightbox surrounding the image. Since the image is actually set as the background
    // we can't easily determine if the click event was on the image or the rest of the background. So instead
    // we get the dimensions of the original image, determine it's actual size within the lightbox and determine if
    // the click landed within the image (knowing that the image is centered horizontally and vertically in the lightbox
    lightboxClick(ev) {
      if (this.closeOnBackdropClick) {
        let target = ev.target;
        let lightboxWidth = target.clientWidth;
        let lightboxHeight = target.clientHeight;
        let img = new Image();
        img.src = this.directory + this.filteredImages[this.index].name;
        let actualImageWidth = img.width / img.height * lightboxHeight;
        let actualImageHeight = img.height / img.width * lightboxWidth; // If user clicked to the left or right of the image

        if (ev.clientX < (lightboxWidth - actualImageWidth) / 2 || ev.clientX > (lightboxWidth + actualImageWidth) / 2) {
          this.hide();
        } // If user clicked above or below the image
        else if (ev.clientY < (lightboxHeight - actualImageHeight) / 2 || ev.clientY > (lightboxHeight + actualImageHeight) / 2) {
            this.hide();
          }
      }
    },

    show(imageName) {
      // Find the index of the image passed to Lightbox
      let index = this.filteredImages.findIndex(img => img.name === imageName);

      if (index > -1) {
        this.visible = true;
        this.controlsVisible = true;
        this.index = index;
        this.restartCaptionTimer();
        this.preloadNextImage();
      }
    },

    hide() {
      this.visible = false;
      this.index = 0;
      this.$emit("onLightboxClose", "");
      clearTimeout(this.timer);
    },

    has_next() {
      return this.index + 1 < this.filteredImages.length;
    },

    has_prev() {
      return this.index > 0;
    },

    prev() {
      if (this.has_prev()) {
        this.slideTransitionName = "lightbox-slide-prev";
        this.index -= 1;
        this.$emit("onLightboxChange", this.getCurrentImage());
      }
    },

    next() {
      if (this.has_next()) {
        this.slideTransitionName = "lightbox-slide-next";
        this.index += 1;
        this.$emit("onLightboxChange", this.getCurrentImage());
        this.preloadNextImage();
      }
    },

    getCurrentImage() {
      return this.index >= 0 && this.index < this.filteredImages.length ? this.filteredImages[this.index] : {
        name: "",
        alt: "",
        filter: "",
        id: ""
      };
    },

    keyEventListener(e) {
      if (this.visible) {
        this.controlsVisible = true;
        this.restartCaptionTimer();

        switch (e.key) {
          case "ArrowRight":
            this.next();
            break;

          case "ArrowLeft":
            this.prev();
            break;

          case "ArrowDown":
          case "ArrowUp":
          case " ":
            e.preventDefault();
            break;

          case "Escape":
            this.hide();
            break;
        }
      }
    },

    // This event shows the arrows and caption on the lightbox when the mouse is moved or clicked.
    // Also used for touch events on touchscreen devices. The elements are set to disappear
    // after a given duration via a timer.
    mouseEventListener(e) {
      if (this.visible) {
        this.controlsVisible = true;
        this.restartCaptionTimer();
      }
    },

    preloadNextImage() {
      if (this.has_next()) {
        try {
          let _img = new Image();

          _img.src = this.directory + this.filteredImages[this.index + 1].name;
        } catch (e) {}
      }
    },

    restartCaptionTimer() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.controlsVisible = false, this.timeoutDuration);
    }

  }
});

const _withId = /*#__PURE__*/withScopeId("data-v-21966ddd");

pushScopeId("data-v-21966ddd");

const _hoisted_1 = {
  class: "lightbox-arrow-left-icon"
};

const _hoisted_2 = /*#__PURE__*/createVNode("svg", {
  height: "24",
  viewBox: "0 0 24 24",
  width: "24",
  xmlns: "http://www.w3.org/2000/svg"
}, [/*#__PURE__*/createVNode("circle", {
  cx: "12",
  cy: "12",
  r: "12",
  fill: "rgba(20, 20, 20, 0.4)"
}), /*#__PURE__*/createVNode("path", {
  d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z",
  fill: "white"
}), /*#__PURE__*/createVNode("path", {
  d: "M0-.5h24v24H0z",
  fill: "none"
})], -1);

const _hoisted_3 = {
  class: "lightbox-arrow-right-icon"
};

const _hoisted_4 = /*#__PURE__*/createVNode("svg", {
  height: "24",
  viewBox: "0 0 24 24",
  width: "24",
  xmlns: "http://www.w3.org/2000/svg"
}, [/*#__PURE__*/createVNode("circle", {
  cx: "12",
  cy: "12",
  r: "12",
  fill: "rgba(20, 20, 20, 0.4)"
}), /*#__PURE__*/createVNode("path", {
  d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z",
  fill: "white"
}), /*#__PURE__*/createVNode("path", {
  d: "M0-.25h24v24H0z",
  fill: "none"
})], -1);

const _hoisted_5 = {
  unselectable: "on"
};

popScopeId();

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return openBlock(), createBlock("div", null, [createVNode(Transition, {
    name: "lightbox-fade"
  }, {
    default: _withId(() => [_ctx.visible ? (openBlock(), createBlock("div", {
      key: 0,
      class: "lightbox",
      onMousedown: _cache[7] || (_cache[7] = withModifiers((...args) => _ctx.hide && _ctx.hide(...args), ["stop"]))
    }, [createVNode("div", {
      class: "lightbox-close",
      onMousedown: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.hide && _ctx.hide(...args), ["stop"]))
    }, "×", 32), createVNode("div", {
      class: "lightbox-arrow lightbox-arrow-left",
      onMousedown: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.prev && _ctx.prev(...args), ["stop", "prevent"]))
    }, [createVNode(Transition, {
      name: "lightbox-fade"
    }, {
      default: _withId(() => [withDirectives(createVNode("div", _hoisted_1, [_hoisted_2], 512), [[vShow, _ctx.has_prev() && _ctx.controlsVisible]])]),
      _: 1
    })], 32), createVNode("div", {
      class: "lightbox-arrow lightbox-arrow-right",
      onMousedown: _cache[3] || (_cache[3] = withModifiers((...args) => _ctx.next && _ctx.next(...args), ["stop", "prevent"]))
    }, [createVNode(Transition, {
      name: "lightbox-fade"
    }, {
      default: _withId(() => [withDirectives(createVNode("div", _hoisted_3, [_hoisted_4], 512), [[vShow, _ctx.has_next() && _ctx.controlsVisible]])]),
      _: 1
    })], 32), createVNode(Transition, {
      name: "lightbox-fade"
    }, {
      default: _withId(() => [withDirectives(createVNode("div", {
        class: "lightbox-caption",
        onMousedown: _cache[4] || (_cache[4] = withModifiers(() => {}, ["stop"]))
      }, [createVNode("span", _hoisted_5, toDisplayString(_ctx.filteredImages[_ctx.index].alt), 1)], 544), [[vShow, _ctx.controlsVisible && _ctx.filteredImages[_ctx.index].alt]])]),
      _: 1
    }), createVNode("div", {
      class: "lightbox-main",
      onMousedown: _cache[6] || (_cache[6] = withModifiers((...args) => _ctx.hide && _ctx.hide(...args), ["stop"]))
    }, [createVNode("div", {
      class: "lightbox-image-container",
      onMousedown: _cache[5] || (_cache[5] = withModifiers((...args) => _ctx.lightboxClick && _ctx.lightboxClick(...args), ["stop"]))
    }, [createVNode(Transition, {
      name: _ctx.slideTransitionName,
      mode: "out-in"
    }, {
      default: _withId(() => [(openBlock(), createBlock("div", {
        class: "lightbox-image",
        key: _ctx.index,
        style: {
          'backgroundImage': 'url(' + _ctx.directory + _ctx.filteredImages[_ctx.index].name + ')'
        }
      }, null, 4))]),
      _: 1
    }, 8, ["name"])], 32)], 32)], 32)) : createCommentVNode("", true)]),
    _: 1
  })]);
});

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n.lightbox[data-v-21966ddd] {\n    position: fixed;\n    top: 0;\n    left: 0;\n    background: rgba(0, 0, 0, 0.9);\n    width: 100%;\n    height: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: -webkit-flex;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index: 200;\n    color: rgba(255, 255, 255, 0.8);\n}\n.lightbox-close[data-v-21966ddd] {\n    position: fixed;\n    z-index: 210;\n    right: 0;\n    top: 0;\n    padding: 1rem;\n    font-size: 1.7rem;\n    cursor: pointer;\n    width: 4rem;\n    height: 4rem;\n    color: white;\n}\n.lightbox-main[data-v-21966ddd] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: -webkit-flex;\n    display: flex;\n    width: 100%;\n    height: 100%;\n}\n.lightbox-arrow[data-v-21966ddd] {\n    padding: 0 2rem;\n    cursor: pointer;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: -webkit-flex;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: absolute;\n    padding: 0 2rem;\n    height: 100%;\n    width: 2rem;\n    z-index: 100;\n}\n.lightbox-arrow-right[data-v-21966ddd] {\n    right: 0;\n}\n.lightbox-arrow-left[data-v-21966ddd] {\n    left: 0;\n}\n.lightbox-image-container[data-v-21966ddd] {\n    -webkit-box-flex: 1;\n    width: 20%;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n}\n.lightbox-image[data-v-21966ddd] {\n    width: 100%;\n    height: 100%;\n    background-size: contain;\n    background-repeat: no-repeat;\n    background-position: 50% 50%;\n}\n.lightbox-caption[data-v-21966ddd] {\n    position: absolute;\n    bottom: 15px;\n    width: 100%;\n    z-index: 100;\n    text-align: center;\n    text-shadow: 1px 1px 3px rgb(26, 26, 26);\n}\n.lightbox-caption span[data-v-21966ddd] {\n    border-radius: 12px;\n    background-color: rgba(0, 0, 0, 0.6);\n    padding: 2px 10px;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n.lightbox-slide-next-enter-active[data-v-21966ddd],\n.lightbox-slide-next-leave-active[data-v-21966ddd],\n.lightbox-slide-prev-enter-active[data-v-21966ddd],\n.lightbox-slide-prev-leave-active[data-v-21966ddd] {\n    transition: all 0.4s ease;\n}\n.lightbox-slide-next-enter[data-v-21966ddd] {\n    -webkit-transform: translateX(100px);\n    -ms-transform: translateX(100px);\n    transform: translateX(100px);\n    opacity: 0;\n}\n.lightbox-slide-next-leave-to[data-v-21966ddd] {\n    -webkit-transform: translateX(-100px);\n    -ms-transform: translateX(-100px);\n    transform: translateX(-100px);\n    opacity: 0;\n}\n.lightbox-slide-prev-enter[data-v-21966ddd] {\n    -webkit-transform: translateX(-100px);\n    -ms-transform: translateX(-100px);\n    transform: translateX(-100px);\n    opacity: 0;\n}\n.lightbox-slide-prev-leave-to[data-v-21966ddd] {\n    -webkit-transform: translateX(100px);\n    -ms-transform: translateX(100px);\n    transform: translateX(100px);\n    opacity: 0;\n}\n.lightbox-fade-enter-active[data-v-21966ddd],\n.lightbox-fade-leave-active[data-v-21966ddd] {\n    transition: all 0.4s ease;\n}\n.lightbox-fade-enter[data-v-21966ddd],\n.lightbox-fade-leave-to[data-v-21966ddd] {\n    opacity: 0;\n}\n";
styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-21966ddd";

// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var entry_esm = /*#__PURE__*/(() => {
  // Assign InstallableComponent type
  const installable = script; // Attach install function executed by Vue.use()

  installable.install = app => {
    app.component('Lightbox', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export default entry_esm;
