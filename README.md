# TJ gallery
Plugin for jquery. 
[Plugin's page](https://tj-s.ru/tod/tj-gallery.html)

![TJ Gallery](https://tj-s.ru/images/articles/img_blog.jpg)
[Demo1](https://tj-s.ru/demo/tjgallery/img.html)
[Demo2](https://tj-s.ru/demo/tjgallery/div.html)

### Installation
```html
<script src="js/jquery.min.js"></script>
<script src="js/jquery-tjgallery.min.js"></script>
```

### HTML
```html
<div class="pictures">
    <img src="images/i_1.jpg" alt="" />
    <img src="images/i_2.jpg" alt="" />
    <img src="images/i_3.jpg" alt="" />
    <img src="images/i_4.jpg" alt="" />
    <img src="images/i_5.jpg" alt="" />
    <img src="images/i_6.jpg" alt="" />
    <img src="images/i_7.jpg" alt="" />
    <img src="images/i_8.jpg" alt="" />
    <img src="images/i_9.jpg" alt="" />
    <img src="images/i_10.jpg" alt="" />
</div>
```


### JS
```javascript
$(document).ready(function(){
    /* Waiting for the pictures to load */
    $(window).load(function(){
        $('.pictures').tjGallery();
    })
});
```

## Options
**selector**
type: string
Default: 'img'

Block selector


**row_min_height**
type: integer
Default: 180

Min height for block's line


**margin**
type: integer
Default: 5

Margin between blocks


## Methods
**clear**
clear grid

**destroy**
destroy grid
