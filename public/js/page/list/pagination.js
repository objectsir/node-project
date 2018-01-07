function Pagination (container) {
	this.container = container;
	this.bindEvents();
}

$.extend(Pagination.prototype,{
	bindEvents: function () {
		this.container.on("click",$.proxy(this.handlePagClick,this))
	},

	handlePagClick: function (e) {
		var target = $(e.target),
		    page = parseInt(target.text());
		$(this).trigger(new $.Event("click", {
			page:page
		}))
	},

	setTotal: function (total) {
		this.createDom(total);
	},

	createDom: function (total) {
		var str = "";
		for(var i = 1; i <= total; i ++){
			str += `<li><a href="javascript:;">${i}</a></li>`
		};
		this.container.html(str);
	}
})