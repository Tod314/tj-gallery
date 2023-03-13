/*!
 * tjGallery 1.2
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
 * thanks Aleksandr Protasenya
 *
 * @license		MIT License
 *
 * Date: 2023-03-13
 */

(function ($) {

	const pluginName = 'tjGallery';

	function init(options) {

		const images = this.find('img');
		if (images.length < 2) {
			return; // For one image, this component does not make sense
		}

		const settings = $.extend({
			selector: 'img',
			rowMinHeight: 180,
			margin: 5
		}, options);

		this.data(pluginName, settings);

		const container = this;
		let containerWidth = this.width();

		// It is necessary to ensure that all pictures are loaded, otherwise system can't calculate result
		let unloadedImageCount = images.length;
		images.each(function () {
			if (getImageSize($(this))) {
				--unloadedImageCount;
				if (unloadedImageCount === 0) {
					build(container);
				}
			} else {
				const test = new Image();
				this.onload = function () {
					--unloadedImageCount;
					if (unloadedImageCount === 0) {
						build(container);
					}
				};
				test.src = this.src;
			}
		});

		$(window).bind('resize.' + pluginName, function () {
			if (container.width() === containerWidth) {
				return; // Size does not changes
			}

			containerWidth = container.width();
			clear(container);
			build(container);
		});
	}

	function build(container) {
		const settings = container.data(pluginName);
		const containerWidth = container.width();

		container.each(function () {
			const buckets = [];
			let lastBucket = {
				items: []
			};

			$(this).find(settings.selector).each(function () {
				let $this = $(this);
				let $pic;

				if (!$this.is('img')) {
					$pic = $this.find('img');
					if ($pic.length === 0) {
						return;
					}
					$this = $('<div class="tjGalleryItem">').insertBefore($this).append($this);
				} else {
					$pic = $this;
					$this = $('<div class="tjGalleryItem">').insertBefore($pic).append($pic);
				}

				$this.css({ width: 'auto', float: 'left', position: 'relative' });

				let size = getImageSize($pic);

				const item = {
					pic: $pic,
					container: $this,
					originalHeight: size.height,
					originalWidth: size.width
				};

				item.aspect = item.originalWidth / item.originalHeight;
				item.scale = settings.rowMinHeight / item.originalHeight;
				item.width = item.originalWidth * item.scale;
				item.height = item.originalHeight * item.scale;

				const newBucketWidth = getWidthForBucket(lastBucket.items, item);
				if (newBucketWidth > containerWidth) {
					buckets.push(lastBucket);
					lastBucket = {
						items: []
					};
				}
				lastBucket.items.push(item);
			});

			if (lastBucket.items.length === 1 && buckets[buckets.length - 1].items.length > 1) {
				buckets[buckets.length - 1].items.push(lastBucket.items[0]);
			} else {
				buckets.push(lastBucket);
			}

			$.each(buckets,function (_, bucket) {
					bucket.scale = (containerWidth - (bucket.items.length - 1) * settings.margin) / getWidthForBucket(bucket.items);

					$.each(bucket.items,
						function (index, item) {
							if (bucket.scale) {
								item.width = item.width * bucket.scale;
								item.height = item.height * bucket.scale;
							}

							item.width = Math.trunc(item.width * 100) / 100; // Example: 1.777777 -> 1.77

							item.pic.css({
								height: item.height + 'px',
								width: item.width + 'px'
							});
							item.container.css({
								width: item.width + 'px',
								marginBottom: settings.margin + 'px'
							});
							if (index > 0) {
								item.container.css({
									marginLeft: settings.margin + 'px'
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

	function clear(container) {
		const settings = container.data(pluginName);
		container.each(function () {
			const $this = $(this);
			$this.find(settings.selector).each(function () {
				const $this = $(this);

				if (!$this.is('img')) {
					$this.find('img').css({ 'width': 'auto', 'height': 'auto' });
				}
				$this.removeAttr('style');
				$this.appendTo(container);
			});
			$this.find('div:empty').remove();
		});
	}

	function getWidthForBucket(bucket, extra) {
		let width = 0;

		$.each(bucket,
			function (_, item) {
				width += item.width;
			});

		if (extra) {
			width += extra.width;
		}

		return width;
	}

	function getImageSize(img) {
		let width = img.attr('width') || img.width();
		let height = img.attr('height') || img.height();
		if (width && height) {
			return { width: width, height: height };
		} else {
			return null;
		}
	}

	$.fn.tjGallery = function (obj) {
		if (obj === 'destroy') {
			clear(this);
			this.removeData(pluginName);
			$(window).unbind('.' + pluginName);
		} else {
			return init.call(this, obj);
		}
	};

})(jQuery);