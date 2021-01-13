# Simple Image Lightbox for Vue.js
Upgraded to support Vue 3 and still no dependencies required!

Inspired by <a href="https://github.com/DCzajkowski/vue-pure-lightbox">vue-pure-lightbox</a>, however I 
needed a framework that allowed for a gallery of thumbnails as well as filtering functionality.

## Vue Compatibility
Versions >= 3.0.0 are built for Vue 3.

If your project uses Vue 2, <a href="https://www.npmjs.com/package/vue-my-photos/v/1.1.1" target="_blank">use vue-my-photos-1.1.1</a>
## Demo
<a href="https://codepen.io/am283721/pen/GRjYPzb" target="_blank">Live demo available on Codepen</a>

<a href="https://andrew-mcgrath.com/Portfolio" target="_blank">Or see it in action here</a>

## Installation

### Via NPM:
```bash
npm i vue-my-photos --save
```

### Via CDN:
```html
<!-- In <body>, after Vue import -->
<script src="https://unpkg.com/vue-my-photos/dist/lightbox.min.js"></script>
```

## Setup

In your App:
```html
<script>
    import Lightbox from "@/lightbox.vue";
    // ...
    export default defineComponent({
        name: "VueMyPhotosDemo",
        components: {
            Lightbox,
        },
        // ...
    })
</script>
```
## Usage

Simply initiate a lightbox component with the `lightbox` tag:

```html
<lightbox 
    id="myLightbox"
    ref="mylightbox"                            * Now Optional
    :images="images"
    :current-image-name="currentImageName"
    @on-lightbox-close="onLightboxClose"
    :filter="galleryFilter"                     * Optional
    :directory="thumbnailDir"                   * Optional
    :timeout-duration=5000                      * Optional
    :close-on-backdrop-click="true"             * Optional
    @on-lightbox-change="onLightboxChange"      * Optional
></lightbox>
```

Expose the appropriate data for the template:

```js
data() {
    return {
        thumbnailDir: "/.../.../",
        images: imageList,
        galleryFilter: "all",
        currentImageName: ""
    };
},
```

Each thumbnail in the gallery registers a click event, passing the name of the photo:

```html
<img @click="showLightbox('img.jpg')" src="..." alt="..." title="..." />
```

And add the showLightbox and onLightboxClose methods to your vue page (these can be named however you like):

```js
showLightbox(imageName: string) {
    this.currentImageName = imageName;
},
onLightboxClose(imageName: string) {
    this.currentImageName = imageName;
},
```

To update which images show within the lightbox, update the filter string like so:
```js
updateFilter(filterName) {
    this.galleryFilter = filterName;
}
```

### A Note On v3 Updates

Previously, the lightbox was shown by accessing the component via the $refs object and calling the show method directly:

```js
showLightbox: function(imageName) {
    this.$refs.mylightbox.show(imageName);
}
```

This approach can still be done (and in Vue 3 using Ref() within the setup method), however, in an effort to decouple the Lightbox Component from its parent Component, the new recommended approach is detailed above using the `currentImageName` prop. This is a reactive property that will trigger the lightbox to display whenever its value is changed. A method that listens to the `on-lightbox-close` event must also be implemented in order to reset the value of  `currentImageName` (Otherwise, if the user tries to open the lightbox with the same image twice in a row, `currentImageName` won't change and the lightbox won't open).

### Properties

| Property                                         | Type     | Value                                                                       |
| ------------------------------------------------ | -------- | --------------------------------------------------------------------------- |
| images (Required)                                | array    | Array of objects with image data (example below)                            |
| currentImageName (Required)                      | string   | Should initially be an empty string, then updated later to trigger lightbox |
| filter (Optional - Default: "all")               | string   | String to filter on specific images (Ex: "nature")                          |
| directory (Optional - Default: "")               | string   | Path to location of images (Ex: "/src/assets/")                             |
| timeoutDuration (Optional - Default: 3000)       | integer  | duration in ms of key/mouse inactivity before caption disappears            |
| closeOnBackdropClick (Optional - Default: false) | boolean  | toggle whether or not to close lightbox when clicking outside of image      |

### Events

| Event                                                                                     | Description                                                                                                                     |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| onLightboxClose(imageName: string)                                                        | Fired every time the lightbox is closed. Must implement a method to update currentImageName with the value passed by this event |
| onLightboxChange(newImage: { name: string, alt: string, filter: string, id: string }      | Fired every time the user advances the lightbox to the next or previous image.                                                  |

**Example of images array:**

```js
var images = [{'name':'mountains.jpg', 'alt':'The Dolomites', 'filter':'nature', 'id':'image1' },
              {'name':'bird.jpg', 'alt':'It is a bird', 'filter':'animals', 'id':'image2' }];
```

**Note**:
- 'name' value should include the file extension
- 'alt' is optional
- 'filter' is optional if you never pass or try to update the filter value on the lightbox component
- 'id' is optional, but useful as a key if you're displaying the images in a gallery using the v-for iterator

## Recommended additional modules

<a href="https://github.com/gilbarbara/disable-scroll#readme">disable-scroll</a> or similar module to prevent the user from scrolling while the lightbox is visible.

<a href="https://github.com/FortAwesome/vue-fontawesome">vue-fontawesome</a> if you want to replace/re-style the svg icons for left/right arrows and close icon.
