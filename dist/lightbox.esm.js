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
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-0861d65e_0", { source: "\n.lightbox {\n    position: fixed;\n    top: 0;\n    left: 0;\n    background: rgba(0, 0, 0, .9);\n    width: 100%;\n    height: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: -webkit-flex;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index: 200;\n    color: rgba(255,255,255,0.8);\n}\n.lightbox-close {\n    position: fixed;\n    z-index: 210;\n    right: 0;\n    top: 0;\n    padding: 1rem;\n    font-size: 1.7rem;\n    cursor: pointer;\n    width: 4rem;\n    height: 4rem;\n    color: white;\n}\n.lightbox-main {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: -webkit-flex;\n    display: flex;\n    width: 100%;\n    height: 100%;\n}\n.lightbox-arrow {\n    padding: 0 2rem;\n    cursor: pointer;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: -webkit-flex;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: absolute;\n    padding: 0 2rem;\n    height: 100%;\n    width: 2rem;\n    z-index: 100;\n}\n.lightbox-arrow-right { right: 0;\n}\n.lightbox-arrow-left { left: 0;\n}\n.lightbox-image-container {\n    -webkit-box-flex: 1;\n    width: 20%;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n}\n.lightbox-image {\n    width: 100%;\n    height: 100%;\n    background-size: contain;\n    background-repeat: no-repeat;\n    background-position: 50% 50%;\n}\n.lightbox-caption {\n    position: absolute;\n    bottom: 15px;\n    width: 100%;\n    z-index: 100;\n    text-align: center;\n    text-shadow: 1px 1px 3px rgb(26, 26, 26);\n}\n.lightbox-caption span {\n    border-radius: 12px;\n    background-color: rgba(0, 0, 0, .6);\n    padding: 2px 10px;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n.lightbox-slide-enter-active,\n.lightbox-slide-leave-active {\n    transition: all 0.4s ease;\n}\n.lightbox-slide-enter {\n    -webkit-transform: translateX(100px);\n    -ms-transform: translateX(100px);\n    transform: translateX(100px);\n    opacity: 0;\n}\n.lightbox-slide-leave-to {\n    -webkit-transform: translateX(-100px);\n    -ms-transform: translateX(-100px);\n    transform: translateX(-100px);\n    opacity: 0;\n}\n.lightbox-fade-enter-active,\n.lightbox-fade-leave-active {\n    transition: all 0.4s ease;\n}\n.lightbox-fade-enter,\n.lightbox-fade-leave-to {\n    opacity: 0;\n}\n\n", map: {"version":3,"sources":["/Users/andrew/Documents/GitHub/vue-image-lightbox/src/lightbox.vue"],"names":[],"mappings":";AAgMA;IACA,gBAAA;IACA,OAAA;IACA,QAAA;IACA,8BAAA;IACA,YAAA;IACA,aAAA;IACA,qBAAA;IACA,qBAAA;IACA,sBAAA;IACA,cAAA;IACA,wBAAA;IACA,oBAAA;IACA,aAAA;IACA,6BAAA;CACA;AAEA;IACA,gBAAA;IACA,aAAA;IACA,SAAA;IACA,OAAA;IACA,cAAA;IACA,kBAAA;IACA,gBAAA;IACA,YAAA;IACA,aAAA;IACA,aAAA;CACA;AAEA;IACA,qBAAA;IACA,qBAAA;IACA,sBAAA;IACA,cAAA;IACA,YAAA;IACA,aAAA;CACA;AAEA;IACA,gBAAA;IACA,gBAAA;IACA,qBAAA;IACA,qBAAA;IACA,sBAAA;IACA,cAAA;IACA,wBAAA;IACA,oBAAA;IACA,mBAAA;IACA,gBAAA;IACA,aAAA;IACA,YAAA;IACA,aAAA;CACA;AAEA,wBAAA,SAAA;CAAA;AAEA,uBAAA,QAAA;CAAA;AAEA;IACA,oBAAA;IACA,WAAA;IACA,gBAAA;IACA,YAAA;IACA,QAAA;CACA;AAEA;IACA,YAAA;IACA,aAAA;IACA,yBAAA;IACA,6BAAA;IACA,6BAAA;CACA;AAEA;IACA,mBAAA;IACA,aAAA;IACA,YAAA;IACA,aAAA;IACA,mBAAA;IACA,yCAAA;CACA;AAEA;IACA,oBAAA;IACA,oCAAA;IACA,kBAAA;IACA,0BAAA;IACA,uBAAA;IACA,sBAAA;IACA,kBAAA;CACA;AAEA;;IAEA,0BAAA;CACA;AAEA;IACA,qCAAA;IACA,iCAAA;IACA,6BAAA;IACA,WAAA;CACA;AAEA;IACA,sCAAA;IACA,kCAAA;IACA,8BAAA;IACA,WAAA;CACA;AAEA;;IAEA,0BAAA;CACA;AAEA;;IAEA,WAAA;CACA","file":"lightbox.vue","sourcesContent":["<template>\n    <div>\n        <transition name=\"lightbox-fade\">\n            <div class=\"lightbox\" v-if=\"visible\" @mousedown.stop=\"hide\" @touchdown.stop=\"hide\">\n                    <div class=\"lightbox-close\" @mousedown.stop=\"hide\" @touchdown.stop=\"hide\">&times;</div>\n                    <div class=\"lightbox-arrow lightbox-arrow-left\" @mousedown.stop.prevent=\"prev\" @touchdown.stop.prevent=\"prev\">\n                        <transition name=\"lightbox-fade\">\n                            <div class=\"lightbox-arrow-left-icon\" v-show=\"has_prev() && controlsVisible\">\n                                <svg height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\n                                    <circle cx=\"12\" cy=\"12\" r=\"12\" fill=\"rgba(20, 20, 20, 0.4)\" />\n                                    <path d=\"M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z\" fill=\"white\"/>\n                                    <path d=\"M0-.5h24v24H0z\" fill=\"none\"/>\n                                </svg>\n                            </div>\n                        </transition>\n                    </div>\n                    <div class=\"lightbox-arrow lightbox-arrow-right\" @mousedown.stop.prevent=\"next\" @touchdown.stop.prevent=\"next\" >\n                        <transition name=\"lightbox-fade\">\n                            <div class=\"lightbox-arrow-right-icon\" v-show=\"has_next() && controlsVisible\" >\n                                <svg height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\n                                    <circle cx=\"12\" cy=\"12\" r=\"12\" fill=\"rgba(20, 20, 20, 0.4)\" />\n                                    <path d=\"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z\" fill=\"white\" />\n                                    <path d=\"M0-.25h24v24H0z\" fill=\"none\"/>\n                                </svg>\n                            </div>\n                        </transition>\n                    </div>\n                    <transition name=\"lightbox-fade\">\n                        <div class=\"lightbox-caption\" v-show=\"controlsVisible && filteredImages[index].alt\" @mousedown.stop @touchdown.stop>\n                            <span unselectable=\"on\">{{ filteredImages[index].alt }}</span>\n                        </div>\n                    </transition>\n                <div class=\"lightbox-main\" @mousedown.stop=\"hide\" @touchdown.stop=\"hide\">\n                    <div class=\"lightbox-image-container\" @mousedown.stop @touchdown.stop>\n                        <transition name=\"lightbox-slide\" mode=\"out-in\">\n                            <div class=\"lightbox-image\" :key=\"index\" :style=\"{ 'backgroundImage':'url(' + directory + filteredImages[index].name + ')'}\">\n                            </div>\n                        </transition>\n                    </div>\n                </div>\n            </div>\n        </transition>\n    </div>\n</template>\n\n<script>\n    export default {\n        props: {\n            // images = [{ name:'image1.jpg', alt:'Redwoods', filter:'nature' }, ...]\n            images: {\n                type: Array,\n                required: true\n            },\n            // Used to display a subset of photos. If used, images array must contain a property\n            // titled 'filter' which contains the desired filter string\n            filter: {\n                type: String,\n                default: 'all'\n            },\n            // Used if images are located in a separate folder (e.g. '/images/')\n            directory: {\n                type: String,\n                default: ''\n            },\n            // Used to set the duration in miliseconds of key/mouse inactivity before caption\n            // and arrows disappear\n            timeoutDuration: {\n                type: Number,\n                default: 3000\n            }\n        },\n        data() {\n            return {\n                visible: false,        // Lightbox not visible by default\n                controlsVisible: true, // Lightbox controls (arrows, caption, close button)\n                index: 0,              // Index indicates which photo to display. Default to 1st photo\n                timer: null          // Timer to show/hide lightbox controls           \n            }\n        },\n        mounted() {\n            window.addEventListener('keydown', this.keyEventListener);\n            window.addEventListener('mousemove',this.mouseEventListener);\n            window.addEventListener('touchmove',this.mouseEventListener);\n            window.addEventListener('mouseup',this.mouseEventListener);\n        },\n        destroyed() {\n            window.removeEventListener('keydown', this.keyEventListener);\n            window.removeEventListener('mousemove',this.mouseEventListener);\n            window.removeEventListener('touchmove',this.mouseEventListener);\n            window.removeEventListener('mouseup',this.mouseEventListener);\n        },\n        methods: {\n            show(imageName) {\n                this.visible = true;\n                this.controlsVisible = true;\n                var that = this;\n\n                // Find the index of the image passed to Lightbox\n                for(var i = 0; i < this.filteredImages.length; i++){\n                    if(this.filteredImages[i].name == imageName) {\n                        this.index = i;\n                        break;\n                    }\n                }\n                clearTimeout(this.timer);\n                this.timer = setTimeout(function() {that.controlsVisible = false}, that.timeoutDuration);\n                this.preloadNextImage();\n            },\n            hide() {\n                this.visible = false;\n                this.index = 0;\n                clearTimeout(this.timer);\n            },\n            has_next() {\n                return (this.index + 1 < this.filteredImages.length);\n            },\n            has_prev() {\n                return (this.index - 1 >= 0);\n            },\n            prev() {\n                if (this.has_prev()) {\n                    this.index -= 1;\n                }\n            },\n            next() {\n                if (this.has_next()) {\n                    this.index += 1;\n                    this.preloadNextImage();\n                }\n            },\n            keyEventListener(e) {\n                if (this.visible) {\n                    var that = this;\n                    this.controlsVisible = true;\n                    clearTimeout(this.timer);\n                    this.timer = setTimeout(function() {that.controlsVisible = false}, that.timeoutDuration);\n\n                    switch (e.key) {\n                        case 'ArrowRight':\n                            this.next();\n                            break;\n                        case 'ArrowLeft':\n                            this.prev();\n                            break;\n                        case 'ArrowDown':\n                        case 'ArrowUp':\n                        case ' ':\n                            e.preventDefault();\n                            break;\n                        case 'Escape':\n                            this.hide();\n                            break;\n                    }\n                }\n            },\n            // This event shows the arrows and caption on the lightbox when the mouse is moved or clicked.\n            // Also used for touch events on touchscreen devices. The elements are set to disappear\n            // after a given duration via a timer.\n            mouseEventListener(e) {\n                if (this.visible) {\n                    var that = this;\n                    this.controlsVisible = true;\n                    clearTimeout(this.timer);\n                    this.timer = setTimeout(function() {that.controlsVisible = false}, that.timeoutDuration);\n                }\n            },\n            preloadNextImage () {\n                if (this.has_next()){\n                    try {\n                        var _img = new Image();\n                        _img.src = this.directory + this.filteredImages[this.index + 1].name;\n                    } catch (e) { }\n                }\n            }\n        },\n        computed: {\n            filteredImages: function () {\n                var that = this;\n                if (that.filter === 'all' || !that.filter.length){\n                    return that.images;\n                }\n                else {\n                    return that.images.filter(function (item) {\n                        return item.filter === that.filter;\n                    })\n                }\n            }\n        }\n    }\n</script>\n\n<style>\n    .lightbox {\n        position: fixed;\n        top: 0;\n        left: 0;\n        background: rgba(0, 0, 0, .9);\n        width: 100%;\n        height: 100%;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        z-index: 200;\n        color: rgba(255,255,255,0.8);\n    }\n\n    .lightbox-close {\n        position: fixed;\n        z-index: 210;\n        right: 0;\n        top: 0;\n        padding: 1rem;\n        font-size: 1.7rem;\n        cursor: pointer;\n        width: 4rem;\n        height: 4rem;\n        color: white;\n    }\n\n    .lightbox-main {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n        width: 100%;\n        height: 100%;\n    }\n\n    .lightbox-arrow {\n        padding: 0 2rem;\n        cursor: pointer;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        position: absolute;\n        padding: 0 2rem;\n        height: 100%;\n        width: 2rem;\n        z-index: 100;\n    }\n\n    .lightbox-arrow-right { right: 0; }\n    \n    .lightbox-arrow-left { left: 0;}\n\n    .lightbox-image-container {\n        -webkit-box-flex: 1;\n        width: 20%;\n        -webkit-flex: 1;\n        -ms-flex: 1;\n        flex: 1;\n    }\n\n    .lightbox-image {\n        width: 100%;\n        height: 100%;\n        background-size: contain;\n        background-repeat: no-repeat;\n        background-position: 50% 50%;\n    }\n\n    .lightbox-caption {\n        position: absolute;\n        bottom: 15px;\n        width: 100%;\n        z-index: 100;\n        text-align: center;\n        text-shadow: 1px 1px 3px rgb(26, 26, 26);\n    }\n\n    .lightbox-caption span {\n        border-radius: 12px;\n        background-color: rgba(0, 0, 0, .6);\n        padding: 2px 10px;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n    }\n\n    .lightbox-slide-enter-active,\n    .lightbox-slide-leave-active {\n        transition: all 0.4s ease;\n    }\n\n    .lightbox-slide-enter {\n        -webkit-transform: translateX(100px);\n        -ms-transform: translateX(100px);\n        transform: translateX(100px);\n        opacity: 0;\n    }\n\n    .lightbox-slide-leave-to {\n        -webkit-transform: translateX(-100px);\n        -ms-transform: translateX(-100px);\n        transform: translateX(-100px);\n        opacity: 0;\n    }\n\n    .lightbox-fade-enter-active,\n    .lightbox-fade-leave-active {\n        transition: all 0.4s ease;\n    }\n\n    .lightbox-fade-enter,\n    .lightbox-fade-leave-to {\n        opacity: 0;\n    }\n    \n</style>"]}, media: undefined });

  };
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

    {
      var hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var Lightbox = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    __vue_create_injector__,
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

export default Lightbox;
export { install };
