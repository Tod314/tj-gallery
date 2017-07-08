# TJ gallery
Plugin for jquery. 
[Plugin's page](https://tj-s.ru/tod/tj-gallery.html)

![TJ Gallery](https://tj-s.ru/images/articles/img_blog.jpg)<br />
[Demo1](https://tj-s.ru/demo/tjgallery/img.html)<br />
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
**selector**<br />
type: string<br />
Default: 'img'<br /><br />
Block selector<br /><br />

**row_min_height**<br />
type: integer<br />
Default: 180<br /><br />
Min height for block's line<br /><br />

**margin**<br />
type: integer<br />
Default: 5<br /><br />
Margin between blocks<br /><br />

## Methods
**clear**<br />
clear grid<br /><br />

**destroy**<br />
destroy grid<br />
