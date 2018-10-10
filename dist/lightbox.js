var Lightbox = (function (exports) {
    'use strict';

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    var script = {
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
                default: 'all'
            },
            // Used if images are located in a separate folder (e.g. '/images/')
            directory: {
                type: String,
                default: ''
            },
            // Used to set the duration in miliseconds of key/mouse inactivity before caption
            // and arrows disappear
            timeoutDuration: {
                type: Number,
                default: 3000
            }
        },
        data: function data() {
            return {
                visible: false,        // Lightbox not visible by default
                controlsVisible: true, // Lightbox controls (arrows, caption, close button)
                index: 0,              // Index indicates which photo to display. Default to 1st photo
                timer: null          // Timer to show/hide lightbox controls           
            }
        },
        mounted: function mounted() {
            window.addEventListener('keydown', this.keyEventListener);
            window.addEventListener('mousemove',this.mouseEventListener);
            window.addEventListener('touchmove',this.mouseEventListener);
            window.addEventListener('mouseup',this.mouseEventListener);
        },
        destroyed: function destroyed() {
            window.removeEventListener('keydown', this.keyEventListener);
            window.removeEventListener('mousemove',this.mouseEventListener);
            window.removeEventListener('touchmove',this.mouseEventListener);
            window.removeEventListener('mouseup',this.mouseEventListener);
        },
        methods: {
            show: function show(imageName) {
                var this$1 = this;

                this.visible = true;
                this.controlsVisible = true;
                var that = this;

                // Find the index of the image passed to Lightbox
                for(var i = 0; i < this.filteredImages.length; i++){
                    if(this$1.filteredImages[i].name == imageName) {
                        this$1.index = i;
                        break;
                    }
                }
                clearTimeout(this.timer);
                this.timer = setTimeout(function() {that.controlsVisible = false;}, that.timeoutDuration);
                this.preloadNextImage();
            },
            hide: function hide() {
                this.visible = false;
                this.index = 0;
                clearTimeout(this.timer);
            },
            has_next: function has_next() {
                return (this.index + 1 < this.filteredImages.length);
            },
            has_prev: function has_prev() {
                return (this.index - 1 >= 0);
            },
            prev: function prev() {
                if (this.has_prev()) {
                    this.index -= 1;
                }
            },
            next: function next() {
                if (this.has_next()) {
                    this.index += 1;
                    this.preloadNextImage();
                }
            },
            keyEventListener: function keyEventListener(e) {
                if (this.visible) {
                    var that = this;
                    this.controlsVisible = true;
                    clearTimeout(this.timer);
                    this.timer = setTimeout(function() {that.controlsVisible = false;}, that.timeoutDuration);

                    switch (e.key) {
                        case 'ArrowRight':
                            this.next();
                            break;
                        case 'ArrowLeft':
                            this.prev();
                            break;
                        case 'ArrowDown':
                        case 'ArrowUp':
                        case ' ':
                            e.preventDefault();
                            break;
                        case 'Escape':
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
                    var that = this;
                    this.controlsVisible = true;
                    clearTimeout(this.timer);
                    this.timer = setTimeout(function() {that.controlsVisible = false;}, that.timeoutDuration);
                }
            },
            preloadNextImage: function preloadNextImage () {
                if (this.has_next()){
                    try {
                        var _img = new Image();
                        _img.src = this.directory + this.filteredImages[this.index + 1].name;
                    } catch (e) { }
                }
            }
        },
        computed: {
            filteredImages: function () {
                var that = this;
                if (that.filter === 'all' || !that.filter.length){
                    return that.images;
                }
                else {
                    return that.images.filter(function (item) {
                        return item.filter === that.filter;
                    })
                }
            }
        }
    };

    /* script */
                var __vue_script__ = script;
    /* template */
    var __vue_render__ = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        [
          _c("transition", { attrs: { name: "lightbox-fade" } }, [
            _vm.visible
              ? _c(
                  "div",
                  {
                    staticClass: "lightbox",
                    on: {
                      mousedown: function($event) {
                        $event.stopPropagation();
                        return _vm.hide($event)
                      },
                      touchdown: function($event) {
                        $event.stopPropagation();
                        return _vm.hide($event)
                      }
                    }
                  },
                  [
                    _c(
                      "div",
                      {
                        staticClass: "lightbox-close",
                        on: {
                          mousedown: function($event) {
                            $event.stopPropagation();
                            return _vm.hide($event)
                          },
                          touchdown: function($event) {
                            $event.stopPropagation();
                            return _vm.hide($event)
                          }
                        }
                      },
                      [_vm._v("×")]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "lightbox-arrow lightbox-arrow-left",
                        on: {
                          mousedown: function($event) {
                            $event.stopPropagation();
                            $event.preventDefault();
                            return _vm.prev($event)
                          },
                          touchdown: function($event) {
                            $event.stopPropagation();
                            $event.preventDefault();
                            return _vm.prev($event)
                          }
                        }
                      },
                      [
                        _c("transition", { attrs: { name: "lightbox-fade" } }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.has_prev() && _vm.controlsVisible,
                                  expression: "has_prev() && controlsVisible"
                                }
                              ],
                              staticClass: "lightbox-arrow-left-icon"
                            },
                            [
                              _c(
                                "svg",
                                {
                                  attrs: {
                                    height: "24",
                                    viewBox: "0 0 24 24",
                                    width: "24",
                                    xmlns: "http://www.w3.org/2000/svg"
                                  }
                                },
                                [
                                  _c("circle", {
                                    attrs: {
                                      cx: "12",
                                      cy: "12",
                                      r: "12",
                                      fill: "rgba(20, 20, 20, 0.4)"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("path", {
                                    attrs: {
                                      d:
                                        "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z",
                                      fill: "white"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("path", {
                                    attrs: { d: "M0-.5h24v24H0z", fill: "none" }
                                  })
                                ]
                              )
                            ]
                          )
                        ])
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "lightbox-arrow lightbox-arrow-right",
                        on: {
                          mousedown: function($event) {
                            $event.stopPropagation();
                            $event.preventDefault();
                            return _vm.next($event)
                          },
                          touchdown: function($event) {
                            $event.stopPropagation();
                            $event.preventDefault();
                            return _vm.next($event)
                          }
                        }
                      },
                      [
                        _c("transition", { attrs: { name: "lightbox-fade" } }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.has_next() && _vm.controlsVisible,
                                  expression: "has_next() && controlsVisible"
                                }
                              ],
                              staticClass: "lightbox-arrow-right-icon"
                            },
                            [
                              _c(
                                "svg",
                                {
                                  attrs: {
                                    height: "24",
                                    viewBox: "0 0 24 24",
                                    width: "24",
                                    xmlns: "http://www.w3.org/2000/svg"
                                  }
                                },
                                [
                                  _c("circle", {
                                    attrs: {
                                      cx: "12",
                                      cy: "12",
                                      r: "12",
                                      fill: "rgba(20, 20, 20, 0.4)"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("path", {
                                    attrs: {
                                      d:
                                        "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z",
                                      fill: "white"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("path", {
                                    attrs: { d: "M0-.25h24v24H0z", fill: "none" }
                                  })
                                ]
                              )
                            ]
                          )
                        ])
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("transition", { attrs: { name: "lightbox-fade" } }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value:
                                _vm.controlsVisible &&
                                _vm.filteredImages[_vm.index].alt,
                              expression:
                                "controlsVisible && filteredImages[index].alt"
                            }
                          ],
                          staticClass: "lightbox-caption",
                          on: {
                            mousedown: function($event) {
                              $event.stopPropagation();
                            },
                            touchdown: function($event) {
                              $event.stopPropagation();
                            }
                          }
                        },
                        [
                          _c("span", { attrs: { unselectable: "on" } }, [
                            _vm._v(_vm._s(_vm.filteredImages[_vm.index].alt))
                          ])
                        ]
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "lightbox-main",
                        on: {
                          mousedown: function($event) {
                            $event.stopPropagation();
                            return _vm.hide($event)
                          },
                          touchdown: function($event) {
                            $event.stopPropagation();
                            return _vm.hide($event)
                          }
                        }
                      },
                      [
                        _c(
                          "div",
                          {
                            staticClass: "lightbox-image-container",
                            on: {
                              mousedown: function($event) {
                                $event.stopPropagation();
                              },
                              touchdown: function($event) {
                                $event.stopPropagation();
                              }
                            }
                          },
                          [
                            _c(
                              "transition",
                              { attrs: { name: "lightbox-slide", mode: "out-in" } },
                              [
                                _c("div", {
                                  key: _vm.index,
                                  staticClass: "lightbox-image",
                                  style: {
                                    backgroundImage:
                                      "url(" +
                                      _vm.directory +
                                      _vm.filteredImages[_vm.index].name +
                                      ")"
                                  }
                                })
                              ]
                            )
                          ],
                          1
                        )
                      ]
                    )
                  ],
                  1
                )
              : _vm._e()
          ])
        ],
        1
      )
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      var __vue_inject_styles__ = undefined;
      /* scoped */
      var __vue_scope_id__ = undefined;
      /* module identifier */
      var __vue_module_identifier__ = undefined;
      /* functional template */
      var __vue_is_functional_template__ = false;
      /* component normalizer */
      function __vue_normalize__(
        template, style, script$$1,
        scope, functional, moduleIdentifier,
        createInjector, createInjectorSSR
      ) {
        var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

        // For security concerns, we use only base name in production mode.
        component.__file = "/Users/andrew/Documents/GitHub/vue-image-lightbox/src/lightbox.vue";

        if (!component.render) {
          component.render = template.render;
          component.staticRenderFns = template.staticRenderFns;
          component._compiled = true;

          if (functional) { component.functional = true; }
        }

        component._scopeId = scope;

        return component
      }
      /* style inject */
      
      /* style inject SSR */
      

      
      var Lightbox = __vue_normalize__(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        undefined,
        undefined
      );

    // Import vue component

    // Declare install function executed by Vue.use()
    function install(Vue) {
    	if (install.installed) { return; }
    	install.installed = true;
    	Vue.component('Lightbox', Lightbox);
    }

    // Create module definition for Vue.use()
    var plugin = {
    	install: install,
    };

    // Auto-install when vue is found (eg. in browser via <script> tag)
    var GlobalVue = null;
    if (typeof window !== 'undefined') {
    	GlobalVue = window.Vue;
    } else if (typeof global !== 'undefined') {
    	GlobalVue = global.Vue;
    }
    if (GlobalVue) {
    	GlobalVue.use(plugin);
    }

    exports.install = install;
    exports.default = Lightbox;

    return exports;

}({}));
