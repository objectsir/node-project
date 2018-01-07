function Login(rightArea,element) {
  this.rightArea = rightArea;
  this.element = element;
	this.init();
}

Login.loginBtn = `
	<li><a href="#" data-toggle="modal" data-target=".js-login-model">登录</a></li>
`;

Login.loginTemplate = `
  <div class="modal fade js-login-model" id="myModal" tabindex="-1" role="dialog" aria-labelledby="RegisterLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="loginLabel">登录</h4>
        </div>
        <div class="modal-body">
          
          <div class="form-group">
            <label for="login-username">用户名</label>
            <input type="email" class="form-control" id="login-username" placeholder="请输入用户名">
          </div>
          <div class="form-group">
            <label for="login-password">密码</label>
            <input type="password" class="form-control" id="login-password" placeholder="请输入密码">
          </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary js-submit">提交</button>
        </div>
        <div class="alert alert-success js-log-succ hide" role="alert">登陆成功</div>
        <div class="alert alert-info js-log-err hide" role="alert">账号/密码错误请重新输入</div>
      </div>
    </div>
  </div>
`;

$.extend(Login.prototype,{
	init: function () {
		this.createBtn();
    this.createModel();
    this.bindEvents();
	},

	createBtn: function () {
    this.loginBtn = $(Login.loginBtn);
    this.rightArea.append(this.loginBtn);
	},

  createModel: function () {
    this.loginTemplate = $(Login.loginTemplate);
    this.logSucc =  this.loginTemplate.find(".js-log-succ");
    this.logErr = this.loginTemplate.find(".js-log-err");
    this.element.append(this.loginTemplate)
  },

  bindEvents: function () {
    this.loginSubmit = this.loginTemplate.find(".js-submit");
    this.loginSubmit.on("click",$.proxy(this.handleBtnClick,this))
  },

  handleBtnClick: function () {
    var username = this.loginTemplate.find("#login-username").val(),
        password = this.loginTemplate.find("#login-password").val();

    $.ajax({
      url: '/api/login',
      type: 'POST',
      data: {
        username: username,
        password: password
      },
      success: $.proxy(this.handelLogSucc,this)
    })
  },

  handelLogSucc: function (res) {
    if(res && res.ret && res.data.login) {
      this.logSucc.removeClass("hide");
      setTimeout($.proxy(this.handleModelFade,this),3000)
    } else {
      this.logErr.removeClass("hide");
      setTimeout($.proxy(this.handleModelFad,this),3000)
    }
  },

  handleModelFade: function () {
    window.location.reload();
  },

  handleModelFad: function () {
    this.logErr.addClass("hide");
  }
})