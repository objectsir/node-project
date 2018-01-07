function Page() {
	
}

$.extend(Page.prototype,{
	init: function () {
		this.createHeader();
		this.createWelcome()
	},

	createHeader: function () {
		this.headerContainer = $(".js-container");
		this.header = new Header(this.headerContainer,0);
	},

	createWelcome: function () {
		this.welContainer = $(".js-welcome");
		this.welcome = new Welcome(this.welContainer)
	}
})