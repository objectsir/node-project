function Updatelist (container) {
	this.container = container;
	this.init();
}

Updatelist.template = `
	<div class="modal fade js-update-modal" role="dialog" aria-labelledby="AddPositionLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="AddPositionLabel">修改职位</h4>
	      </div>
	      <div class="modal-body">
			<div class="form-group">
			  <label for="update-company">公司名称</label>
			  <input type="text" class="form-control js-company" id="update-company" placeholder="请输入公司名">
			</div>
			<div class="form-group">
			  <label for="update-position">职位名称</label>
			  <input type="text" class="form-control js-position" id="update-position" placeholder="请输入职位名称">
			</div>
			<div class="form-group">
				<label for="update-salary">薪资范围</label>
				<select class="form-control js-salary" id="update-salary">
				  <option>10k-15k</option>
				  <option>15k-20k</option>
				  <option>20k-25k</option>
				  <option>25k-30k</option>
				  <option>30k+</option>
				</select>
			</div>
			<div class="form-group">
			  <label for="update-address">办公地点</label>
			  <input type="text" class="form-control js-address" id="update-address" placeholder="请输入办公地点">
			</div>
			<div class="form-group">
			  <label for="update-logo">logo</label>
			  <input type="file" class="form-control js-logo" id="update-logo" placeholder="请输入办公地点">
			</div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary js-submit">提交修改</button>
	      </div>
	      <div class="alert alert-success hide js-succ-notice" role="alert" style="margin:20px;">
			修改成功
	      </div>
	    </div>
	  </div>
	</div>
`;

$.extend(Updatelist.prototype,{
	init: function () {
		this.createDom();
		this.bindEvents();
	},

	createDom: function () {
		this.upTemplate = $(Updatelist.template);
		this.container.append(this.upTemplate);
		this.succNoticeElem = this.upTemplate.find(".js-succ-notice");
		this.logoElem = this.upTemplate.find(".js-logo");
	},

	showItem: function (id) {
		this.upTemplate.modal("show");
		this.UpdateListItem(id);
	},


	UpdateListItem: function (id) {
		$.ajax({
			url: '/api/updatePosition',
			data: {
				id: id
			},
			success: $.proxy(this.handleItemUpdateSucc,this)
		})
	},

	handleItemUpdateSucc: function (res) {
		if(res && res.data && res.data.info) {
			this.upTemplate.find(".js-company").val(res.data.info.company);
	 		this.upTemplate.find(".js-position").val(res.data.info.position);
	 		this.upTemplate.find(".js-salary").val(res.data.info.salary);
	 		this.upTemplate.find(".js-address").val(res.data.info.address);
	 		this.id = res.data.info._id;
		}
	},


	bindEvents: function () {
		var submitBtn = this.upTemplate.find(".js-submit");
		submitBtn.on("click",$.proxy(this.handleBtnClick,this))
	},

	handleBtnClick: function () {
		var company = this.upTemplate.find(".js-company").val(),
			position = this.upTemplate.find(".js-position").val(),
			salary = this.upTemplate.find(".js-salary").val(),
			address = this.upTemplate.find(".js-address").val(),
			logo = this.logoElem[0].files[0];

		var formData = new FormData();
		formData.append("company", company);
		formData.append("position", position);
		formData.append("salary", salary);
		formData.append("address", address);
		formData.append("id", this.id);
		formData.append("logo", logo);

		$.ajax({
			url: '/api/updatePositionNew',
			type: 'POST',
			cache: false,
			processData: false,
			contentType: false,
			data: formData,
			success: $.proxy(this.handleCbSucc,this)
		})
	},

	handleCbSucc: function (res) {
		if(res && res.ret && res.data.update) {
			this.succNoticeElem.removeClass("hide");
			$(this).trigger("change");
			setTimeout($.proxy(this.handleCbTrue,this),2000);
		}
	},

	handleCbTrue: function () {
		this.succNoticeElem.addClass("hide");
		this.upTemplate.modal("hide")
	}
})