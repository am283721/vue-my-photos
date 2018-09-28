<template>
  <div id="app">
    <h1>vue-image-lightbox Demo</h1>
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
      <img v-for="(thumb, index) in images" :key="index" v-if="galleryFilter === 'all' || thumb.filter === galleryFilter"
           @click="showLightbox(thumb.name)"  :src="thumbnailDir + thumb.name" :alt="thumb.alt" :title="thumb.alt" />
    </transition-group>

    <lightbox ref="lightbox"
      :images="images"
      :filter="galleryFilter"
      :directory="thumbnailDir"
    ></lightbox>
  </div>
</template>

<script>
var imageList = [{'name':'mountains.jpg', 'alt':'The Dolomites', 'filter':'nature' },
               {'name':'bird.jpg', 'alt':'It is a bird on a tree!', 'filter':'animals' }, 
               {'name':'alps.jpg', 'alt':'I will live here someday', 'filter':'nature' },
               {'name':'bear.jpg', 'alt':'Friendly bear', 'filter':'animals' },
               {'name':'canyon.jpg', 'alt':'A worthy hike', 'filter':'nature' },
               {'name':'monumentvalley.jpg', 'alt':'Monument Valley', 'filter':'nature' },
               {'name':'puppy.jpg', 'alt':'Puppy with a feather', 'filter':'animals' }, 
               {'name':'redwoods.jpg', 'alt':'Foggy evening in the Redwoods', 'filter':'nature' } ];

export default {
  name: 'app',
  data () {
    return {
      thumbnailDir: '/src/assets/',
      galleryFilter: '',
      images: imageList
    }
  },
  methods: {
    showLightbox: function(imageName) {
      this.$refs.lightbox.show(imageName);
    },
    updateFilter(filterName) {
      this.galleryFilter = filterName;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ece1ca;
  margin-top: 60px;
}

body {
  border-color: #69655d;
  color: #ece1ca;
  background-color: #404041;
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
