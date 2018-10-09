# Simple Image Lightbox for Vue.js
No dependencies required!

Inspired by <a href="https://github.com/DCzajkowski/vue-pure-lightbox">vue-pure-lightbox</a>, however I 
needed a framework that allowed for a gallery of thumbnails as well as filtering functionality.

## Demo
<a href="https://codepen.io/am283721/pen/VEwNKR">Live demo available on Codepen</a>

## Installation and Setup

### Via NPM:
```bash
npm i vue-image-lightbox --save
```

Then in your main.js file:
```js
import Lightbox from 'vue-image-lightbox'
Vue.component('lightbox', Lightbox);
```

### Via CDN:
```html
<!-- In <head> -->
<meta rel="stylesheet" href="">
<!-- In <body>, after Vue import -->
<script src=""></script>
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
<lightbox ref="lightbox"
    :images="images"
    :filter="galleryFilter"
    :directory="thumbnailDir"
></lightbox>
```

Each thumbnail in the gallery then registers a click event:

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

| Property                           | Type     | Value                                             |
| ---------------------------------- | -------- | ------------------------------------------------- |
| images (Required)                  | array    | Array of objects with image data (example below)  |
| filter (Optional - Default: "all") | string   | String to filter on specific images (Ex: "nature")|
| directory (Optional - Default: "") | string   | Path to location of images (Ex: "/src/assets/")   |

**Example of images array:**

```js
var images = [{'name':'mountains.jpg', 'alt':'The Dolomites', 'filter':'nature' },
              {'name':'bird.jpg', 'alt':'It is a bird', 'filter':'animals' }];
```

**Note**:
- 'name' value should include the file extension
- 'alt' is required, but can be an empty string
- 'filter' is optional if you don't pass/update the filter value on the lightbox component

## Recommended additional modules

<a href="https://github.com/gilbarbara/disable-scroll#readme">disable-scroll</a> or similar module to prevent the user from scrolling while the lightbox is visible.

<a href="https://github.com/FortAwesome/vue-fontawesome">vue-fontawesome</a> if you want to replace/re-style the svg icons for left/right arrows and close icon.
