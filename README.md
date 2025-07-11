# Gallery.js
### Gallery.js is a simple, lightweight JavaScript library for creating image galleries.

>This library is at the very beginning of its development, so it may not be fully functional yet. However, it is already usable and can be used in production.


You can find an example of the gallery in action on the [demo page](https://gallery.nakyss.fr/).


## Get Started

#### 1. Include the `gallery.js` and `gallery.css` script in your HTML file:

```html
<script src="lib/gallery-min.js"></script>
<link rel="stylesheet" href="lib/gallery-min.css">
```
Or if you don't want to download the files :
> [!TIP]
> I recommend using this method only for testing, as the files may not be available, buggy or not the latest version.
```html
<script src="https://gallery.nakyss.fr/lib/gallery-min.js"></script>
<link rel="stylesheet" href="https://gallery.nakyss.fr/lib/gallery-min.css">
```
You can either use the minified version (`gallery-min.js`) for production or the unminified version (`gallery.js`) for development.

#### 2. Add your images to the gallery:

You can add images to the gallery by using the `img` tag with the class `gallery`. You can optionally use the `title` or `data-title` attribute to provide a caption for the image.

```html
<img class="gallery" src="image1.jpg" title="Image 1">
<img class="gallery" src="image2.jpg" data-title="Image 2">
```

#### 3. Initialize the gallery:
```html
<script>
    document.addEventListener("DOMContentLoaded", () => {
        Gallery.init();
    });
</script>
```

#### 4. Add a button to open the gallery (optional):

You can add a button to open the gallery by using the `open-gallery` class on a element. 

You can also specify an index to open a specific image in the gallery by using the `data-index` attribute. The index starts at 0.

```html
<button class="open-gallery">Open Gallery</button>

<div class="open-gallery" data-index="2">Open image 2</div>
```

## More Options
You can customize the gallery by using the following options:
```javascript
Gallery.init({
    // HTML collection of images to be used in the gallery
    images: document.querySelectorAll('.another-gallery'),
    
    // HTML collection of buttons to open the gallery
    buttons: document.querySelectorAll('.other-buttons'),
    
    // The color used for the main image border
    borderColor: 'black',
    
    // The color used for the miniatures border when the image is selected
    miniaBorderColor: '#8c8c8c',
    
    // The color used for the text of the title
    textColor: 'white',

    // Color of background/overlay
    backgroundColor = "rgba(0, 0, 0, 0.8)",

    // Title placement {inner | outer | none}
    title = "inner",

    // Display buttons
    isButtonsDisplayed = true,

    // Enable scrolling, true: scroll in images, false: scroll normally in the page
    isScrollActivated = true,

    // Function to display a custom title, takes as parameters the image index and the list of images
    titleFunction = null
});
```

## Extra Information

You can totally have multiple galleries on the same page, just make sure to use different classes for each gallery and initialize them separately.
You can also use the `Gallery` object to access the current gallery and its methods. For example, you can use `Gallery.changeColors()` to change the colors of the gallery.

```javascript
Gallery.changeColors({
    borderColor: 'red',
    miniaBorderColor: 'blue',
    textColor: 'yellow'
});
```
