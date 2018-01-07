function Page() {
	
}

$.extend(Page.prototype,{
	init: function () {
		this.createHeader();
		this.createBtn();
		this.createPositionlist();
		this.createPagination();
	},

	createHeader: function () {
		this.headerContainer = $(".js-container");
		this.header = new Header(this.headerContainer,2);
	},

	createBtn: function () {
		this.btnContainer = $(".js-btn-container");
		this.btn = new Btn(this.btnContainer);
		$(this.btn).on("change",$.proxy(this.handleBtnChange,this));
		$(this.btn).on("click",$.proxy(this.handleBtnSalaryClick,this));
	},

	createPositionlist: function () {
		this.positioncontainer = $(".js-positionlist");
		this.positionList = new PositionList(this.positioncontainer)
		$(this.positionList).on("change",$.proxy(this.handlePosListChange,this))
	},

	handleBtnSalaryClick: function (e) {
			this.positionList.info(e.salary);
		},

	createPagination: function () {
		this.paginationCon = $(".js-pagination");
		this.pagination = new Pagination (this.paginationCon);
		$(this.pagination).on("click",$.proxy(this.handlePagClick,this))
	},

	handlePosListChange: function (e) {
		this.pagination.setTotal(e.total)
	},

	handlePagClick: function (e) {
		this.positionList.changePage(e.page)
	},

	handleBtnChange: function () {
		this.positionList.getListInfo()
	}
	
	
})