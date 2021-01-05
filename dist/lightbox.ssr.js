'use strict';var vue=require('vue');function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}var script = vue.defineComponent({
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
    }
  },
  data: function data() {
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
  mounted: function mounted() {
    window.addEventListener("keydown", this.keyEventListener);
    window.addEventListener("mousemove", this.mouseEventListener); // window.addEventListener("touchmove", this.mouseEventListener);

    window.addEventListener("mouseup", this.mouseEventListener);
  },
  unmounted: function unmounted() {
    window.removeEventListener("keydown", this.keyEventListener);
    window.removeEventListener("mousemove", this.mouseEventListener); //  window.removeEventListener("touchmove", this.mouseEventListener);

    window.removeEventListener("mouseup", this.mouseEventListener);
  },
  computed: {
    filteredImages: function filteredImages() {
      var _this = this;

      if (this.filter === "all" || !this.filter.length) {
        return this.images;
      }

      return this.images.filter(function (img) {
        return img.filter === _this.filter;
      });
    }
  },
  methods: {
    // If closeOnBackdropClick is true, we need to close the lightbox when the user clicks on the
    // black part of the lightbox surrounding the image. Since the image is actually set as the background
    // we can't easily determine if the click event was on the image or the rest of the background. So instead
    // we get the dimensions of the original image, determine it's actual size within the lightbox and determine if
    // the click landed within the image (knowing that the image is centered horizontally and vertically in the lightbox
    lightboxClick: function lightboxClick(ev) {
      if (this.closeOnBackdropClick) {
        var target = ev.target;
        var lightboxWidth = target.clientWidth;
        var lightboxHeight = target.clientHeight;
        var img = new Image();
        img.src = this.directory + this.filteredImages[this.index].name;
        var actualImageWidth = img.width / img.height * lightboxHeight;
        var actualImageHeight = img.height / img.width * lightboxWidth; // If user clicked to the left or right of the image

        if (ev.clientX < (lightboxWidth - actualImageWidth) / 2 || ev.clientX > (lightboxWidth + actualImageWidth) / 2) {
          this.hide();
        } // If user clicked above or below the image
        else if (ev.clientY < (lightboxHeight - actualImageHeight) / 2 || ev.clientY > (lightboxHeight + actualImageHeight) / 2) {
            this.hide();
          }
      }
    },
    show: function show(imageName) {
      this.visible = true;
      this.controlsVisible = true;
      var index = this.filteredImages.findIndex(function (img) {
        return img.name === imageName;
      }); // Find the index of the image passed to Lightbox

      var _iterator = _createForOfIteratorHelper(this.filteredImages.entries()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
              i = _step$value[0],
              img = _step$value[1];

          if (img.name === imageName) {
            this.index = i;
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.restartCaptionTimer();
      this.preloadNextImage();
    },
    hide: function hide() {
      this.visible = false;
      this.index = 0;
      clearTimeout(this.timer);
    },
    has_next: function has_next() {
      return this.index + 1 < this.filteredImages.length;
    },
    has_prev: function has_prev() {
      return this.index - 1 >= 0;
    },
    prev: function prev() {
      if (this.has_prev()) {
        this.slideTransitionName = "lightbox-slide-prev";
        this.index -= 1;
      }
    },
    next: function next() {
      if (this.has_next()) {
        this.slideTransitionName = "lightbox-slide-next";
        this.index += 1;
        this.preloadNextImage();
      }
    },
    keyEventListener: function keyEventListener(e) {
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
    mouseEventListener: function mouseEventListener(e) {
      if (this.visible) {
        this.controlsVisible = true;
        this.restartCaptionTimer();
      }
    },
    preloadNextImage: function preloadNextImage() {
      if (this.has_next()) {
        try {
          var _img = new Image();

          _img.src = this.directory + this.filteredImages[this.index + 1].name;
        } catch (e) {}
      }
    },
    restartCaptionTimer: function restartCaptionTimer() {
      var _this2 = this;

      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        return _this2.controlsVisible = false;
      }, this.timeoutDuration);
    }
  }
});var _withId = /*#__PURE__*/vue.withScopeId("data-v-0805a4de");

vue.pushScopeId("data-v-0805a4de");

var _hoisted_1 = {
  class: "lightbox-arrow-left-icon"
};

var _hoisted_2 = /*#__PURE__*/vue.createVNode("svg", {
  height: "24",
  viewBox: "0 0 24 24",
  width: "24",
  xmlns: "http://www.w3.org/2000/svg"
}, [/*#__PURE__*/vue.createVNode("circle", {
  cx: "12",
  cy: "12",
  r: "12",
  fill: "rgba(20, 20, 20, 0.4)"
}), /*#__PURE__*/vue.createVNode("path", {
  d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z",
  fill: "white"
}), /*#__PURE__*/vue.createVNode("path", {
  d: "M0-.5h24v24H0z",
  fill: "none"
})], -1);

var _hoisted_3 = {
  class: "lightbox-arrow-right-icon"
};

var _hoisted_4 = /*#__PURE__*/vue.createVNode("svg", {
  height: "24",
  viewBox: "0 0 24 24",
  width: "24",
  xmlns: "http://www.w3.org/2000/svg"
}, [/*#__PURE__*/vue.createVNode("circle", {
  cx: "12",
  cy: "12",
  r: "12",
  fill: "rgba(20, 20, 20, 0.4)"
}), /*#__PURE__*/vue.createVNode("path", {
  d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z",
  fill: "white"
}), /*#__PURE__*/vue.createVNode("path", {
  d: "M0-.25h24v24H0z",
  fill: "none"
})], -1);

var _hoisted_5 = {
  unselectable: "on"
};

vue.popScopeId();

var render = /*#__PURE__*/_withId(function (_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", null, [vue.createVNode(vue.Transition, {
    name: "lightbox-fade"
  }, {
    default: _withId(function () {
      return [_ctx.visible ? (vue.openBlock(), vue.createBlock("div", {
        key: 0,
        class: "lightbox",
        onMousedown: _cache[7] || (_cache[7] = vue.withModifiers(function () {
          return _ctx.hide && _ctx.hide.apply(_ctx, arguments);
        }, ["stop"]))
      }, [vue.createVNode("div", {
        class: "lightbox-close",
        onMousedown: _cache[1] || (_cache[1] = vue.withModifiers(function () {
          return _ctx.hide && _ctx.hide.apply(_ctx, arguments);
        }, ["stop"]))
      }, "×", 32), vue.createVNode("div", {
        class: "lightbox-arrow lightbox-arrow-left",
        onMousedown: _cache[2] || (_cache[2] = vue.withModifiers(function () {
          return _ctx.prev && _ctx.prev.apply(_ctx, arguments);
        }, ["stop", "prevent"]))
      }, [vue.createVNode(vue.Transition, {
        name: "lightbox-fade"
      }, {
        default: _withId(function () {
          return [vue.withDirectives(vue.createVNode("div", _hoisted_1, [_hoisted_2], 512), [[vue.vShow, _ctx.has_prev() && _ctx.controlsVisible]])];
        }),
        _: 1
      })], 32), vue.createVNode("div", {
        class: "lightbox-arrow lightbox-arrow-right",
        onMousedown: _cache[3] || (_cache[3] = vue.withModifiers(function () {
          return _ctx.next && _ctx.next.apply(_ctx, arguments);
        }, ["stop", "prevent"]))
      }, [vue.createVNode(vue.Transition, {
        name: "lightbox-fade"
      }, {
        default: _withId(function () {
          return [vue.withDirectives(vue.createVNode("div", _hoisted_3, [_hoisted_4], 512), [[vue.vShow, _ctx.has_next() && _ctx.controlsVisible]])];
        }),
        _: 1
      })], 32), vue.createVNode(vue.Transition, {
        name: "lightbox-fade"
      }, {
        default: _withId(function () {
          return [vue.withDirectives(vue.createVNode("div", {
            class: "lightbox-caption",
            onMousedown: _cache[4] || (_cache[4] = vue.withModifiers(function () {}, ["stop"]))
          }, [vue.createVNode("span", _hoisted_5, vue.toDisplayString(_ctx.filteredImages[_ctx.index].alt), 1)], 544), [[vue.vShow, _ctx.controlsVisible && _ctx.filteredImages[_ctx.index].alt]])];
        }),
        _: 1
      }), vue.createVNode("div", {
        class: "lightbox-main",
        onMousedown: _cache[6] || (_cache[6] = vue.withModifiers(function () {
          return _ctx.hide && _ctx.hide.apply(_ctx, arguments);
        }, ["stop"]))
      }, [vue.createVNode("div", {
        class: "lightbox-image-container",
        onMousedown: _cache[5] || (_cache[5] = vue.withModifiers(function () {
          return _ctx.lightboxClick && _ctx.lightboxClick.apply(_ctx, arguments);
        }, ["stop"]))
      }, [vue.createVNode(vue.Transition, {
        name: _ctx.slideTransitionName,
        mode: "out-in"
      }, {
        default: _withId(function () {
          return [(vue.openBlock(), vue.createBlock("div", {
            class: "lightbox-image",
            key: _ctx.index,
            style: {
              'backgroundImage': 'url(' + _ctx.directory + _ctx.filteredImages[_ctx.index].name + ')'
            }
          }, null, 4))];
        }),
        _: 1
      }, 8, ["name"])], 32)], 32)], 32)) : vue.createCommentVNode("", true)];
    }),
    _: 1
  })]);
});function styleInject(css, ref) {
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
}var css_248z = "\n.lightbox[data-v-0805a4de] {\n    position: fixed;\n    top: 0;\n    left: 0;\n    background: rgba(0, 0, 0, 0.9);\n    width: 100%;\n    height: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: -webkit-flex;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index: 200;\n    color: rgba(255, 255, 255, 0.8);\n}\n.lightbox-close[data-v-0805a4de] {\n    position: fixed;\n    z-index: 210;\n    right: 0;\n    top: 0;\n    padding: 1rem;\n    font-size: 1.7rem;\n    cursor: pointer;\n    width: 4rem;\n    height: 4rem;\n    color: white;\n}\n.lightbox-main[data-v-0805a4de] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: -webkit-flex;\n    display: flex;\n    width: 100%;\n    height: 100%;\n}\n.lightbox-arrow[data-v-0805a4de] {\n    padding: 0 2rem;\n    cursor: pointer;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: -webkit-flex;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: absolute;\n    padding: 0 2rem;\n    height: 100%;\n    width: 2rem;\n    z-index: 100;\n}\n.lightbox-arrow-right[data-v-0805a4de] {\n    right: 0;\n}\n.lightbox-arrow-left[data-v-0805a4de] {\n    left: 0;\n}\n.lightbox-image-container[data-v-0805a4de] {\n    -webkit-box-flex: 1;\n    width: 20%;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n}\n.lightbox-image[data-v-0805a4de] {\n    width: 100%;\n    height: 100%;\n    background-size: contain;\n    background-repeat: no-repeat;\n    background-position: 50% 50%;\n}\n.lightbox-caption[data-v-0805a4de] {\n    position: absolute;\n    bottom: 15px;\n    width: 100%;\n    z-index: 100;\n    text-align: center;\n    text-shadow: 1px 1px 3px rgb(26, 26, 26);\n}\n.lightbox-caption span[data-v-0805a4de] {\n    border-radius: 12px;\n    background-color: rgba(0, 0, 0, 0.6);\n    padding: 2px 10px;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n.lightbox-slide-next-enter-active[data-v-0805a4de],\n.lightbox-slide-next-leave-active[data-v-0805a4de],\n.lightbox-slide-prev-enter-active[data-v-0805a4de],\n.lightbox-slide-prev-leave-active[data-v-0805a4de] {\n    transition: all 0.4s ease;\n}\n.lightbox-slide-next-enter[data-v-0805a4de] {\n    -webkit-transform: translateX(100px);\n    -ms-transform: translateX(100px);\n    transform: translateX(100px);\n    opacity: 0;\n}\n.lightbox-slide-next-leave-to[data-v-0805a4de] {\n    -webkit-transform: translateX(-100px);\n    -ms-transform: translateX(-100px);\n    transform: translateX(-100px);\n    opacity: 0;\n}\n.lightbox-slide-prev-enter[data-v-0805a4de] {\n    -webkit-transform: translateX(-100px);\n    -ms-transform: translateX(-100px);\n    transform: translateX(-100px);\n    opacity: 0;\n}\n.lightbox-slide-prev-leave-to[data-v-0805a4de] {\n    -webkit-transform: translateX(100px);\n    -ms-transform: translateX(100px);\n    transform: translateX(100px);\n    opacity: 0;\n}\n.lightbox-fade-enter-active[data-v-0805a4de],\n.lightbox-fade-leave-active[data-v-0805a4de] {\n    transition: all 0.4s ease;\n}\n.lightbox-fade-enter[data-v-0805a4de],\n.lightbox-fade-leave-to[data-v-0805a4de] {\n    opacity: 0;\n}\n";
styleInject(css_248z);script.render = render;
script.__scopeId = "data-v-0805a4de";// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var component = /*#__PURE__*/(function () {
  // Assign InstallableComponent type
  var installable = script; // Attach install function executed by Vue.use()

  installable.install = function (app) {
    app.component('Lightbox', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default': component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;