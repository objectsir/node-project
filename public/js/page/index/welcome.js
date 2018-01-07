function Welcome (container) {
	this.container = container;
	this.init();
}

Welcome.template = `
	<div class="jumbotron">
	  <h1>欢迎登陆职位管理系统!</h1>
	  <p>祝您工作愉快！每天都有一个好心情!</p>
	 </div>
`

$.extend(Welcome.prototype,{
	init: function () {
		this.createdom()
	},

	createdom: function () {
		this.welTem = $(Welcome.template);
		this.container.append(this.welTem)
	}
})