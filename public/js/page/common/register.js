function Register(rightArea,element) {
  this.rightArea = rightArea;
  this.element = element;
	this.init();
}

Register.regBtn = `
	<li><a href="#" data-toggle="modal" data-target=".js-reg-model">注册</a></li>
`;

Register.regTemplate = `
  <div class="modal fade js-reg-model" id="myModal" tabindex="-1" role="dialog" aria-labelledby="RegisterLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="RegisterLabel">注册</h4>
        </div>
        <div class="modal-body">
          
          <div class="form-group">
            <label for="reg-username">用户名</label>
            <input type="email" class="form-control" id="reg-username" placeholder="请输入用户名">
          </div>
          <div class="form-group">
            <label for="reg-password">密码</label>
            <input type="password" class="form-control" id="reg-password" placeholder="请输入密码">
          </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary js-submit">提交</button>
        </div>
        <div class="alert alert-success js-reg-succ hide" role="alert">恭喜您注册成功</div>
        <div class="alert alert-info js-reg-err hide" role="alert">...用户名已存在，请重新注册</div>
      </div>
    </div>
  </div>
`;

$.extend(Register.prototype,{
	init: function () {
		this.createBtn();
    this.createModel();
    this.bindEvents();
	},

	createBtn: function () {
    this.regBtn = $(Register.regBtn);
    this.rightArea.append(this.regBtn);
	},

  createModel: function () {
    this.regTemplate = $(Register.regTemplate);
    this.regSucc = this.regTemplate.find(".js-reg-succ");
    this.regErr = this.regTemplate.find(".js-reg-err");
    this.element.append(this.regTemplate)
  },

  bindEvents: function () {
    this.regSubmit = this.regTemplate.find(".js-submit");
    this.regSubmit.on("click",$.proxy(this.handleBtnClick,this))
  },

  handleBtnClick: function () {
    var username = this.regTemplate.find("#reg-username").val(),
        password = this.regTemplate.find("#reg-password").val();

    $.ajax({
      url: "/api/register",
      type:"POST",
      data: {
        username: username,
        password: password
      },
       success: $.proxy(this.handleRegisterSucc, this)
    }) 
  },

   handleRegisterSucc: function (res) {
      if (res.ret && res.data && res.data.register) {
        this.regSucc.removeClass("hide");
        this.regSubmit.addClass("hide");
        setTimeout($.proxy(this.handleModelFade,this),3000)
      }else {
        this.regErr.removeClass("hide");
        setTimeout($.proxy(this.handleModelFad,this),3000)
      }
   },

   handleModelFade: function () {
      this.regTemplate.modal("hide");
      this.regSucc.addClass("hide");
      this.regSubmit.removeClass("hide");
   },

   handleModelFad () {
      this.regErr.addClass("hide");
   }
})