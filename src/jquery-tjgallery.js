/*!
 * tjGallery 1.1
 * http://tj-s.ru
 *
 * description	JQuery Plugin create responsive gallery grid
 * Options:	{
 *				selector		:'img', // jquery selector for ersizing and positions element 
 *				row_min_height	: 180,	// minimal height of grid row
 *				margin			: 5		// border betwin elements
 *			}
 *
 * @copyright	Tod, tod@tj-s.ru
 * @license		MIT License
 */

(function($) {
	var methods = {
		init : function(options) {
			var $settings = $.extend({
				selector		:'img',
				row_min_height	: 180,
				margin			: 5
			}, options);

			
			return this.each(function() {
				var $this = $(this),
					data = $this.data('tjGallery');
				
				if ( ! data ) {
					$this.data('tjGallery', {
						target		: $this,
						tjGallery	: $settings,
					});
				}
				$(window).bind('resize.tjGallery', responding);
				
				return build($this);
				
				
				function responding(){
					methods.clear.apply($this);
					build($this);
				}
				
				function build(items){
					return items.each(function() {
						var $container = $(this);
						var max_bucket_width = $container.width();
						var buckets = [],
							last_bucket = {
								items: [],
								width: 0,
								height: 0
							};
						$container.find($settings.selector).each(function() {
							var $this = $(this);
							var $pic = $this;


							if ($pic[0].nodeName.toUpperCase() != 'IMG') {
								$pic = $pic.find('img');
								$this = $('<div class="tjGalleryItem">').insertBefore($this).append($this);
							} else {
								$this = $('<div class="tjGalleryItem">').insertBefore($pic).append($pic);
							}
							if (!$pic.length) return;

							$this.css({width: 'auto', float: 'left', position: 'relative'});
							
							var item = {
								pic: $pic,
								container: $this,
								original_height:  $pic.attr('height') || $pic.height(),
								original_width: $pic.attr('width') || $pic.width()
							};
							item.aspect = item.original_width / item.original_height;
							item.scale = $settings.row_min_height / item.original_height;				
							item.width = item.original_width * item.scale;
							item.height = item.original_height * item.scale;
							
							var new_bucket_width = getWidthForBucket(last_bucket.items, item);
							if (new_bucket_width > max_bucket_width) {
								buckets.push(last_bucket);
								last_bucket = {
									items: [],
									width: 0,
									height: 0
								};
							}
							last_bucket.items.push(item);
						});
						
						if (last_bucket.items.length == 1 && buckets[buckets.length-1].items.length > 1){
							buckets[buckets.length-1].items.push(last_bucket.items[0]);
						}else{
							buckets.push(last_bucket);
							last_bucket.last = true;
						}

						$.each(buckets, function(idx, bucket) {
							bucket.scale = (max_bucket_width - (bucket.items.length - 1) * $settings.margin) / getWidthForBucket(bucket.items);
							var $last_item;
							
							var n = 0;
							$.each(bucket.items, function(idx2, item) {
								if (bucket.scale) {
									item.width = Math.floor(item.width * bucket.scale);
									item.height = Math.floor(item.height * bucket.scale);
								}
								item.index = n;
								var pic = item.pic,
									container = item.container;
								$last_item = item;							
								n++;

								pic.css({
									height: parseInt(item.height)+"px",
									width: parseInt(item.width)+"px"
								});
								item.container.css({
									height: parseInt(item.height)+"px",
									width: parseInt(item.width)+"px",
									marginTop: $settings.margin + 'px'
								});
								if (idx2 > 0) {
									item.container.css({
										marginLeft: $settings.margin + 'px'
									});
								} else {
									item.container.css({
										clear: 'left'
									});
								}
							});
						});
					});
				}
				function getWidthForBucket(bucket, extra){
					var width = 0;
					if (bucket.length) {
						$.each(bucket, function(idx, item) {
							width += item.width;
						});
					}
					if (extra) {
						width += extra.width;
					}
					return width;
				}
				
			})			
		},
		clear: function(){
			conteiner = this;
            data = conteiner.data('tjGallery');
			conteiner.each(function() {
				$(this).find(data.tjGallery.selector).each(function() {
					if (!$(this).is('img'))
						$(this).find('img').css({'width': 'auto', 'height': 'auto'});
					$(this).removeAttr('style');
					$(this).appendTo(conteiner);
				})
				$(this).find('div:empty').remove();
			})
		},
		destroy : function() {
			methods.clear.apply(this);
			$(window).unbind('.tjGallery');
		}
	};


	$.fn.tjGallery = function( method ) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			var that = this;
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist for jQuery.tjGallery' );
		} 
		
	};

})(jQuery);