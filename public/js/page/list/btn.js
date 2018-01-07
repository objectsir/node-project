function Btn (container) {
	this.container = container;
	this.init();
}

Btn.addTem = `
	<button type="button" class="btn btn-info" data-toggle='modal' data-target='.js-addpos-modal'>增加</button>
`;

Btn.template = `
	<div class="modal fade js-addpos-modal" role="dialog" aria-labelledby="AddPositionLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="AddPositionLabel">新增职位</h4>
	      </div>
	      <div class="modal-body">
			<div class="form-group">
			  <label for="addpos-company">公司名称</label>
			  <input type="text" class="form-control js-company" id="addpos-company" placeholder="请输入公司名">
			</div>
			<div class="form-group">
			  <label for="addpos-position">职位名称</label>
			  <input type="text" class="form-control js-position" id="addpos-position" placeholder="请输入职位名称">
			</div>
			<div class="form-group">
				<label for="addpos-salary">薪资范围</label>
				<select class="form-control js-salary" id="addpos-salary">
				  <option>10k-15k</option>
				  <option>15k-20k</option>
				  <option>20k-25k</option>
				  <option>25k-30k</option>
				  <option>30k+</option>
				</select>
			</div>
			<div class="form-group">
			  <label for="addpos-address">办公地点</label>
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
		this.container.append(this.addTem);
		this.container.append(this.addTemplate);
		this.succNoticeElem = this.addTemplate.find(".js-succ-notice");
	},

	bindEvents: function () {
		var submitBtn = this.addTemplate.find(".js-submit");
		submitBtn.on("click",$.proxy(this.handleBtnClick,this))
	},

	handleBtnClick: function () {
		var company = this.addTemplate.find(".js-company").val(),
			position = this.addTemplate.find(".js-position").val(),
			salary = this.addTemplate.find(".js-salary").val(),
			address = this.addTemplate.find(".js-address").val();

		$.ajax({
			url: '/api/addPosition',
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
		console.log(res)
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