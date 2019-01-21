# Simple Image Lightbox for Vue.js
No dependencies required!

Inspired by <a href="https://github.com/DCzajkowski/vue-pure-lightbox">vue-pure-lightbox</a>, however I 
needed a framework that allowed for a gallery of thumbnails as well as filtering functionality.

## Demo
<a href="https://codepen.io/am283721/pen/VEwNKR" target="_blank">Live demo available on Codepen</a>

<a href="https://andrew-mcgrath.com/Portfolio" target="_blank">Or see it in action here</a>

## Installation and Setup

### Via NPM:
```bash
npm i vue-my-photos --save
```

Then in your main.js file:
```js
import Lightbox from 'vue-my-photos'
Vue.component('lightbox', Lightbox);
```

### Via CDN:
```html
<!-- In <head> -->
<meta rel="stylesheet" href="https://unpkg.com/vue-my-photos/dist/lightbox.css">
<!-- In <body>, after Vue import -->
<script src="https://unpkg.com/vue-my-photos/dist/lightbox.js"></script>
```

Then in your App:
```html
<script>
    Vue.use(Lightbox)

    new Vue({
        // ...
    })
</script>
```

## Usage

Simply initiate a lightbox component with the 'lightbox' tag and unique ref name:

```html
<lightbox id="mylightbox"
    ref="lightbox"
    :images="images"
    :filter="galleryFilter"
    :directory="thumbnailDir"
    :timeoutDuration="5000"
></lightbox>
```

Each thumbnail in the gallery then registers a click event, passing the name of the photo:

```html
@click="showLightbox(image.name)"
```

And add the showLightbox (or w/e name you choose) method to your vue page:

```js
showLightbox: function(imageName) {
    this.$refs.lightbox.show(imageName);
}
```

To update which images show within the lightbox, update the filter string like so:
```js
updateFilter(filterName) {
    this.galleryFilter = filterName;
}
```

### Properties

| Property                                   | Type     | Value                                                           |
| ------------------------------------------ | -------- | --------------------------------------------------------------- |
| images (Required)                          | array    | Array of objects with image data (example below)                |
| filter (Optional - Default: "all")         | string   | String to filter on specific images (Ex: "nature")              |
| directory (Optional - Default: "")         | string   | Path to location of images (Ex: "/src/assets/")                 |
| timeoutDuration (Optional - Default: 3000) | integer  | duration in ms of key/mouse inactivity before caption disappears|

**Example of images array:**

```js
var images = [{'name':'mountains.jpg', 'alt':'The Dolomites', 'filter':'nature', 'id':'image1' },
              {'name':'bird.jpg', 'alt':'It is a bird', 'filter':'animals', 'id':'image2' }];
```

**Note**:
- 'name' value should include the file extension
- 'alt' is optional
- 'filter' is optional if you don't pass/update the filter value on the lightbox component
- 'id' is optional, but useful as a key if you're displaying the images in a gallery using the v-for iterator

## Recommended additional modules

<a href="https://github.com/gilbarbara/disable-scroll#readme">disable-scroll</a> or similar module to prevent the user from scrolling while the lightbox is visible.

<a href="https://github.com/FortAwesome/vue-fontawesome">vue-fontawesome</a> if you want to replace/re-style the svg icons for left/right arrows and close icon.
