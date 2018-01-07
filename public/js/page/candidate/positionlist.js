function PositionList (container) {
	this.container = container;
	this.page = 1;
	this.size = 10;
	this.init();
}

PositionList.Temp = `
	<table class="table" style="margin-top:20px;">
		<thead>
			<tr>
				<th>序号</th>
				<th>照片</th>
				<th>姓名</th>
				<th>职位</th>
				<th>期望薪资</th>
				<th>住址</th>
				<th>操作</th>
			</tr>
		</thead>
		<tbody class="js-tbody"></tbody>
	</table>
`

$.extend(PositionList.prototype,{
	init: function () {
		this.createDom();
		this.bindEvents();
		this.createUpdateList();
		this.getListInfo();
	},

	createDom: function () {
		this.posTem = $(PositionList.Temp);
		this.container.append(this.posTem);
		this.itemContainer = this.posTem.find('.js-tbody');
	},

	bindEvents: function () {
		this.container.on("click",$.proxy(this.handleTableClick,this))
	},

	createUpdateList: function () {
		this.updateList = new Updatelist(this.container);
		$(this.updateList).on("change",$.proxy(this.handleUpdateChange,this))
	},

	handleTableClick: function (e) {
		var target = $(e.target),
			isDeleteClick = target.hasClass("js-delete"),
			isUpdateClick = target.hasClass("js-update");
			// isSalaryClick = target.hasClass("js-salary"),
			if(isDeleteClick) {
				this.deleteItem(target.attr("data-id"));
			};
			if(isUpdateClick) {
				this.updateList.showItem(target.attr("data-id"));
			 };
			// if(isSalaryClick) {
			// 	this.salaryList(target.attr("data-id"));
			// }
	},

	deleteItem: function (id) {
		$.ajax({
			url: '/api/removeCandidate',
			data: {
				id: id
			},
			success: $.proxy(this.handleItemDeleteSucc,this)
		})
	},

	handleItemDeleteSucc: function (res) {
		if(res && res.data && res.data.delete) {
			this.getListInfo()
		}
	},
	
	getListInfo: function () {
		$.ajax({
			url: "/api/getCandidateList",
			data: {
				page: this.page,
				size: this.size
			},
			success : $.proxy(this.handleSucc,this)
		})
	},

	handleSucc: function (res) {
		if(res && res.data && res.data.list) {
			this.createItem(res.data.list);
			if(this.page > res.data.totalPage){
				this.page = res.data.totalPage;
				this.getListInfo();
			} else {
				
				$(this).trigger(new $.Event("change",{
					total: res.data.totalPage
				}))
			}
			
		}
	},

	createItem: function (list) {
		
		str = "";
		for(var i = 0;i < list.length; i ++) {
			var item = list[i],
				file = item.filename ? item.filename: "15151998069613.jpg";
			str += `
				<tr>
					<td>${i + 1}</td>
					<td><img style="width:30px;height:30px;" src="/uploads/${file}"/></td>
					<td>${item.company}</td>
					<td>${item.position}</td>
					<td>${item.salary}</td>
					<td>${item.address}</td>
					<td>
						<span class="js-update" data-id="${item._id}">修改</span>
						<span class="js-delete" data-id="${item._id}">删除</span>
					</td>
					
				</tr>
			`
		}
		this.itemContainer.html(str)
	},

	changePage: function (page) {
		this.page = page;
		this.getListInfo();
	},

	handleUpdateChange: function () {
		this.getListInfo();
	},

	info: function (salary) {
		this.salary = salary;
		this.salaryInfo = new SalaryInfo(this.itemContainer,this.salary); 
	},

	// salaryList: function (salary) {

	// }
	
	
})