function Btn (container) {
	this.container = container;
	this.init();
}

Btn.addTem = `
	<div class="btn-group" role="group" aria-label="...">
		<button type="button" class="btn btn-info" data-toggle='modal' data-target='.js-addpos-modal'>添加候选人</button>
	</div>
`;

Btn.addSelaryTem = `
	<div class="dropdown btn-group" role="group" aria-label="..." style="margin-left:20px">
	  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	    按薪资筛选
	    <span class="caret"></span>
	  </button>
	  <ul class="dropdown-menu js-salary-choice" aria-labelledby="dropdownMenu2">
	    <li><a href="#">10k-15k</a></li>
	    <li><a href="#">15k-20k</a></li>
	    <li><a href="#">20k-25k</a></li>
	    <li><a href="#">25k-30k</a></li>
	    <li><a href="#">30k+</a></li>
	  </ul>
	</div>
`;

Btn.template = `
	<div class="modal fade js-addpos-modal" role="dialog" aria-labelledby="AddPositionLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="AddPositionLabel">新增候选人</h4>
	      </div>
	      <div class="modal-body">
			<div class="form-group">
			  <label for="addpos-company">姓名</label>
			  <input type="text" class="form-control js-company" id="addpos-company" placeholder="请输入姓名">
			</div>
			<div class="form-group">
			  <label for="addpos-position">职位名称</label>
			  <input type="text" class="form-control js-position" id="addpos-position" placeholder="请输入职位名称">
			</div>
			<div class="form-group">
				<label for="addpos-salary">期望薪资</label>
				<select class="form-control js-salary" id="addpos-salary">
				  <option>10k-15k</option>
				  <option>15k-20k</option>
				  <option>20k-25k</option>
				  <option>25k-30k</option>
				  <option>30k+</option>
				</select>
			</div>
			<div class="form-group">
			  <label for="addpos-address">住址</label>
			  <input type="text" class="form-control js-address" id="addpos-address" placeholder="请输入办公地点">
			</div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary js-submit">提交</button>
	      </div>
	      <div class="alert alert-success hide js-succ-notice" role="alert" style="margin:20px;">
			添加成功
	      </div>
	    </div>
	  </div>
	</div>
`;

$.extend(Btn.prototype,{
	init: function () {
		this.createDom();
		this.bindEvents();
	},

	createDom: function () {
		this.addTem = $(Btn.addTem);
		this.addTemplate = $(Btn.template);
		this.addSalaryTem = $(Btn.addSelaryTem)
		this.container.append(this.addTem);
		this.container.append(this.addSalaryTem);
		this.container.append(this.addTemplate);
		this.succNoticeElem = this.addTemplate.find(".js-succ-notice");
		this.salaryChoice = this.addSalaryTem.find(".js-salary-choice");
	},

	bindEvents: function () {
		var submitBtn = this.addTemplate.find(".js-submit");
		submitBtn.on("click",$.proxy(this.handleBtnClick,this));
		this.salaryChoice.on("click",$.proxy(this.handleSalaryClick,this))
	},

	handleSalaryClick: function (e) {
		var target = $(e.target),
		    salary = target.text();
		$(this).trigger(new $.Event("click", {
			salary: salary
		}))
	},

	handleBtnClick: function () {
		var company = this.addTemplate.find(".js-company").val(),
			position = this.addTemplate.find(".js-position").val(),
			salary = this.addTemplate.find(".js-salary").val(),
			address = this.addTemplate.find(".js-address").val();

		$.ajax({
			url: '/api/addCandidate',
			type: 'POST',
			data: {
				company: company,
				position: position,
				salary: salary,
				address: address
			},
			success: $.proxy(this.handleCbSucc,this)
		})
	},

	handleCbSucc: function (res) {
		if(res && res.ret && res.data.inserted) {
			this.succNoticeElem.removeClass("hide");
			$(this).trigger("change");
			setTimeout($.proxy(this.handleCbTrue,this),2000);
		}
	},

	handleCbTrue: function () {
		this.succNoticeElem.addClass("hide");
	}

	
})