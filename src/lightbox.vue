<template>
    <div>
        <transition name="lightbox-fade">
            <div class="lightbox" v-if="visible" @mousedown.stop="hide" @touchdown.stop="hide">
                    <div class="lightbox-close" @mousedown.stop="hide" @touchdown.stop="hide">&times;</div>
                    <div class="lightbox-arrow lightbox-arrow-left" @mousedown.stop.prevent="prev" @touchdown.stop.prevent="prev">
                        <transition name="lightbox-fade">
                            <div class="lightbox-arrow-left-icon" v-show="has_prev() && controlsVisible">
                                <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="12" fill="rgba(20, 20, 20, 0.4)" />
                                    <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" fill="white"/>
                                    <path d="M0-.5h24v24H0z" fill="none"/>
                                </svg>
                            </div>
                        </transition>
                    </div>
                    <div class="lightbox-arrow lightbox-arrow-right" @mousedown.stop.prevent="next" @touchdown.stop.prevent="next" >
                        <transition name="lightbox-fade">
                            <div class="lightbox-arrow-right-icon" v-show="has_next() && controlsVisible" >
                                <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="12" fill="rgba(20, 20, 20, 0.4)" />
                                    <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" fill="white" />
                                    <path d="M0-.25h24v24H0z" fill="none"/>
                                </svg>
                            </div>
                        </transition>
                    </div>
                    <transition name="lightbox-fade">
                        <div class="lightbox-caption" v-show="controlsVisible && filteredImages[index].alt" @mousedown.stop @touchdown.stop>
                            <span unselectable="on">{{ filteredImages[index].alt }}</span>
                        </div>
                    </transition>
                <div class="lightbox-main" @mousedown.stop="hide" @touchdown.stop="hide">
                    <div class="lightbox-image-container" @mousedown.stop @touchdown.stop>
                        <transition name="lightbox-slide" mode="out-in">
                            <div class="lightbox-image" :key="index" :style="{ 'backgroundImage':'url(' + directory + filteredImages[index].name + ')'}">
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
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
        data() {
            return {
                visible: false,        // Lightbox not visible by default
                controlsVisible: true, // Lightbox controls (arrows, caption, close button)
                index: 0,              // Index indicates which photo to display. Default to 1st photo
                timer: null          // Timer to show/hide lightbox controls           
            }
        },
        mounted() {
            window.addEventListener('keydown', this.keyEventListener);
            window.addEventListener('mousemove',this.mouseEventListener);
            window.addEventListener('touchmove',this.mouseEventListener);
            window.addEventListener('mouseup',this.mouseEventListener);
        },
        destroyed() {
            window.removeEventListener('keydown', this.keyEventListener);
            window.removeEventListener('mousemove',this.mouseEventListener);
            window.removeEventListener('touchmove',this.mouseEventListener);
            window.removeEventListener('mouseup',this.mouseEventListener);
        },
        methods: {
            show(imageName) {
                this.visible = true;
                this.controlsVisible = true;
                var that = this;

                // Find the index of the image passed to Lightbox
                for(var i = 0; i < this.filteredImages.length; i++){
                    if(this.filteredImages[i].name == imageName) {
                        this.index = i;
                        break;
                    }
                }
                clearTimeout(this.timer);
                this.timer = setTimeout(function() {that.controlsVisible = false}, that.timeoutDuration);
                this.preloadNextImage();
            },
            hide() {
                this.visible = false;
                this.index = 0;
                clearTimeout(this.timer);
            },
            has_next() {
                return (this.index + 1 < this.filteredImages.length);
            },
            has_prev() {
                return (this.index - 1 >= 0);
            },
            prev() {
                if (this.has_prev()) {
                    this.index -= 1;
                }
            },
            next() {
                if (this.has_next()) {
                    this.index += 1;
                    this.preloadNextImage();
                }
            },
            keyEventListener(e) {
                if (this.visible) {
                    var that = this;
                    this.controlsVisible = true;
                    clearTimeout(this.timer);
                    this.timer = setTimeout(function() {that.controlsVisible = false}, that.timeoutDuration);

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
            mouseEventListener(e) {
                if (this.visible) {
                    var that = this;
                    this.controlsVisible = true;
                    clearTimeout(this.timer);
                    this.timer = setTimeout(function() {that.controlsVisible = false}, that.timeoutDuration);
                }
            },
            preloadNextImage () {
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
    }
</script>

<style>
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .9);
        width: 100%;
        height: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 200;
        color: rgba(255,255,255,0.8);
    }

    .lightbox-close {
        position: fixed;
        z-index: 210;
        right: 0;
        top: 0;
        padding: 1rem;
        font-size: 1.7rem;
        cursor: pointer;
        width: 4rem;
        height: 4rem;
        color: white;
    }

    .lightbox-main {
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        width: 100%;
        height: 100%;
    }

    .lightbox-arrow {
        padding: 0 2rem;
        cursor: pointer;
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        padding: 0 2rem;
        height: 100%;
        width: 2rem;
        z-index: 100;
    }

    .lightbox-arrow-right { right: 0; }
    
    .lightbox-arrow-left { left: 0;}

    .lightbox-image-container {
        -webkit-box-flex: 1;
        width: 20%;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }

    .lightbox-image {
        width: 100%;
        height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% 50%;
    }

    .lightbox-caption {
        position: absolute;
        bottom: 15px;
        width: 100%;
        z-index: 100;
        text-align: center;
        text-shadow: 1px 1px 3px rgb(26, 26, 26);
    }

    .lightbox-caption span {
        border-radius: 12px;
        background-color: rgba(0, 0, 0, .6);
        padding: 2px 10px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .lightbox-slide-enter-active,
    .lightbox-slide-leave-active {
        transition: all 0.4s ease;
    }

    .lightbox-slide-enter {
        -webkit-transform: translateX(100px);
        -ms-transform: translateX(100px);
        transform: translateX(100px);
        opacity: 0;
    }

    .lightbox-slide-leave-to {
        -webkit-transform: translateX(-100px);
        -ms-transform: translateX(-100px);
        transform: translateX(-100px);
        opacity: 0;
    }

    .lightbox-fade-enter-active,
    .lightbox-fade-leave-active {
        transition: all 0.4s ease;
    }

    .lightbox-fade-enter,
    .lightbox-fade-leave-to {
        opacity: 0;
    }
    
</style>