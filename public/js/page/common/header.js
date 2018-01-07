function Header(headerContainer,index) {
	this.headerContainer = headerContainer;
	this.selectedIndex = index;
	this.init();
}

Header.template = `
	<nav class="navbar navbar-default">
	  <div class="container-fluid">
	    <!-- Brand and toggle get grouped for better mobile display -->
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
	      <a class="navbar-brand" href="/">职位管理系统</a>
	    </div>
	    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	      <ul class="nav navbar-nav js-left">
	        <li class=""><a href="/">首页 <span class="sr-only">(current)</span></a></li>
	        <li><a href="/list.html">列表页</a></li>
	        <li><a href="/candidate.html">候选人管理</a></li>
	      </ul>
	      <ul class="nav navbar-nav navbar-right js-right">
	      </ul>
	    </div>
	  </div>
	</nav>
`;

$.extend(Header.prototype,{
	init: function () {
		this.createDom();
		this.setSelected();
		this.getLoginInfo();
	},

	createDom: function () {
		this.element = $(Header.template);
		this.rightArea = this.element.find(".js-right");
		this.headerContainer.append(this.element)
	},

	setSelected: function () {
		var leftArea = this.element.find(".js-left"),
			leftItem = leftArea.find("li");
		leftItem.eq(this.selectedIndex).addClass("active")
	},

	getLoginInfo: function () {
		$.ajax({
			url: '/api/islogin',
			success: $.proxy(this.handleGetloginInfoSucc,this)
		})
	},

	handleGetloginInfoSucc: function (res) {
		if(res && res.ret && res.data.isLogin){
			this.createLogout();
		} else {
			this.createRegister();
			this.createLogin();
		}
	},

	createRegister: function () {
		this.register = new Register(this.rightArea,this.element);
	},

	createLogin: function () {
		this.login = new Login(this.rightArea,this.element);
	},

	createLogout: function() {
		this.logOut = new LogOut(this.rightArea)
	}

})