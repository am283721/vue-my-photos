<template>
    <div id="app">
        <h1>vue-my-photos Demo</h1>
        <div id="filters">
            <form>
                <fieldset>
                    <legend>Filter</legend>
                    <span>
                        <input type="radio" id="all" name="filters" checked v-on:click="updateFilter('all')" />
                        <label for="all">All</label>
                    </span>
                    <span>
                        <input type="radio" id="animals" name="filters" v-on:click="updateFilter('animals')" />
                        <label for="animals">Animals</label>
                    </span>
                    <span>
                        <input type="radio" id="natue" name="filters" v-on:click="updateFilter('nature')" />
                        <label for="nature">Nature</label>
                    </span>
                </fieldset>
            </form>
        </div>

        <transition-group name="thumbnailfade" tag="div">
            <img v-for="thumb in filteredImages" :key="thumb.id"
                @click="showLightbox(thumb.name)" :src="thumbnailDir + thumb.name" :alt="thumb.alt" :title="thumb.alt" />
        </transition-group>

        <lightbox ref="myLightbox"
            :images="images"
            :directory="thumbnailDir"
            :filter="galleryFilter"
            :timeout-duration=5000
            :close-on-backdrop-click="true"></lightbox>
    </div>
</template>

<script lang="ts">
import Lightbox from "@/lightbox.vue";
import { defineComponent } from "vue";

interface Image {
    name: string;
    alt?: string;
    filter?: string;
    id?: string;
}

let imageList = [
    { name: "mountains.jpg", alt: "The Dolomites", filter: "nature", id: "image1" },
    { name: "bird.jpg", alt: "It is a bird on a tree!", filter: "animals", id: "image2" },
    { name: "alps.jpg", alt: "I will live here someday", filter: "nature", id: "image3" },
    { name: "bear.jpg", alt: "Friendly bear", filter: "animals", id: "image4" },
    { name: "canyon.jpg", alt: "A worthy hike", filter: "nature", id: "image5" },
    { name: "monumentvalley.jpg", alt: "Monument Valley", filter: "nature", id: "image6" },
    { name: "puppy.jpg", alt: "Puppy with a feather", filter: "animals", id: "image7" },
    { name: "redwoods.jpg", alt: "Foggy evening in the Redwoods", filter: "nature", id: "image8" },
] as Image[];

export default defineComponent({
    name: "VueMyPhotosDemo",
    components: {
        Lightbox,
    },
    data() {
        return {
            thumbnailDir: "https://unpkg.com/vue-my-photos@1.0.0/src/assets/",
            images: imageList,
            galleryFilter: "all",
        };
    },
    methods: {
        showLightbox: function (imageName: string) {
            let lightbox = this.$refs.myLightbox as typeof Lightbox;
            lightbox.show(imageName);
        },
        updateFilter(filterName: string) {
            this.galleryFilter = filterName;
        },
    },
    computed: {
        filteredImages(): Image[] {
            if (this.galleryFilter === "all") {
                return this.images;
            } else {
                return this.images.filter((image) => image.filter === this.galleryFilter);
            }
        },
    },
});
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #ece1ca;
    margin-top: 60px;
}

body {
    border-color: #69655d;
    color: #ece1ca;
    background-color: #676769;
}

#filters {
    width: 500px;
    margin: 30px auto;
}

#filters span {
    margin: 15px;
}

img {
    width: 270px;
    height: 180px;
    margin: 20px;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.4s ease;
}

.thumbnailfade-leave-active,
.thumbnailfade-enter-active {
    transition: all 0.4s ease;
}

.thumbnailfade-enter-active {
    transition-delay: 0.4s;
}

.thumbnailfade-enter,
.thumbnailfade-leave-to {
    opacity: 0;
}
</style>
