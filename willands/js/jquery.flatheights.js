/*
	jquery.flatheights.js
	Version: 2007-08-01
*/

/*
======================================================================
	$.changeLetterSize.addHandler(func)
	譁�ｭ励�螟ｧ縺阪＆縺悟､牙喧縺励◆譎ゅ↓螳溯｡後☆繧句�逅�ｒ霑ｽ蜉
======================================================================
*/

jQuery.changeLetterSize = {
	handlers : [],
	interval : 1000,
	currentSize: 0
};

(function($) {

	var self = $.changeLetterSize;

	/* 譁�ｭ励�螟ｧ縺阪＆繧堤｢ｺ隱阪☆繧九◆繧√�ins隕∫ｴ */
	var ins = $('<ins>M</ins>').css({
		display: 'block',
		visibility: 'hidden',
		position: 'absolute',
		padding: '0',
		top: '0'
	});

	/* 譁�ｭ励�螟ｧ縺阪＆縺悟､峨ｏ縺｣縺溘° */
	var isChanged = function() {
		ins.appendTo('body');
		var size = ins[0].offsetHeight;
		ins.remove();
		if (self.currentSize == size) return false;
		self.currentSize = size;
		return true;
	};

	/* 譁�嶌繧定ｪｭ縺ｿ霎ｼ繧薙□譎らせ縺ｧ
	   譁�ｭ励�螟ｧ縺阪＆繧堤｢ｺ隱阪＠縺ｦ縺翫￥ */
	$(isChanged);

	/* 譁�ｭ励�螟ｧ縺阪＆縺悟､峨ｏ縺｣縺ｦ縺�◆繧峨
	   handlers荳ｭ縺ｮ髢｢謨ｰ繧帝�↓螳溯｡ */
	var observer = function() {
		if (!isChanged()) return;
		$.each(self.handlers, function(i, handler) {
			handler();
		});
	};

	/* 繝上Φ繝峨Λ繧堤匳骭ｲ縺励
	   譛蛻昴�逋ｻ骭ｲ縺ｧ縺ゅｌ縺ｰ縲∝ｮ壽悄蜃ｦ逅�ｒ髢句ｧ */
	self.addHandler = function(func) {
		self.handlers.push(func);
		if (self.handlers.length == 1) {
			setInterval(observer, self.interval);
		}
	};

})(jQuery);

/*
======================================================================
	$(expr).flatHeights()
	$(expr)縺ｧ驕ｸ謚槭＠縺溯､�焚縺ｮ隕∫ｴ縺ｫ縺､縺�※縲√◎繧後◇繧碁ｫ倥＆繧
	荳逡ｪ鬮倥＞繧ゅ�縺ｫ謠�∴繧
======================================================================
*/

(function($) {

	/* 蟇ｾ雎｡縺ｨ縺ｪ繧玖ｦ∫ｴ鄒､縺ｮ髮�粋 */
	var sets = [];

	/* 鬮倥＆謠�∴縺ｮ蜃ｦ逅�悽菴 */
	var flatHeights = function(set) {
		var maxHeight = 0;
		set.each(function(){
			var height = this.offsetHeight;
			if (height > maxHeight) maxHeight = height;
		});
		set.css('height', maxHeight + 'px');
	};

	/* 隕∫ｴ鄒､縺ｮ鬮倥＆繧呈純縺医《ets縺ｫ霑ｽ蜉 */
	jQuery.fn.flatHeights = function() {
		if (this.length > 1) {
			flatHeights(this);
			sets.push(this);
		}
		return this;
	};

	/* 譁�ｭ励�螟ｧ縺阪＆縺悟､峨ｏ縺｣縺滓凾縺ｫ縲
	   sets縺ｫ蜷ｫ縺ｾ繧後ｋ蜷�ｦ∫ｴ鄒､縺ｫ蟇ｾ縺励※鬮倥＆謠�∴繧貞ｮ溯｡ */
	$.changeLetterSize.addHandler(function() {
		$.each(sets, function() {
			this.height('auto');
			flatHeights(this);
		});
	});

})(jQuery);


/*
Copyright (c) 2007, KITAMURA Akatsuki

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/









