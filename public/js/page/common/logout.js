function LogOut (rightArea) {
	this.rightArea = rightArea;
	this.init();
}

LogOut.template = `
	<li><a href="javascript:;">注销</a></li>
`;

$.extend(LogOut.prototype,{
	init: function () {
		this.createDom();
		this.bindEvents();
	},

	createDom: function () {
		this.logout = $(LogOut.template);
		this.rightArea.append(this.logout)
	},

	bindEvents: function () {
		this.logout.on("click",$.proxy(this.handleLogoutClick,this))
	},

	handleLogoutClick: function () {
		$.ajax({
			url: '/api/logout',
			success: $.proxy(this.handleLogoutSucc,this)
		})
	},

	handleLogoutSucc: function (res) {
		if (res && res.data && res.data.logout) {
			window.location.reload();
		}
	}
})