function SalaryInfo(container,salary) {
	this.container = container;
	this.salary = salary;
	this.getSalary()
}

$.extend(SalaryInfo.prototype,{
	getSalary: function () {
		var salary = this.salary;
		$.ajax({
			url: '/api/salaryChioce',
			data: {
				salary : salary
			},
			success: $.proxy(this.handleGetSalarySucc,this)
		})
	},

	handleGetSalarySucc: function (res) {
		if(res && res.data && res.data.list) {
			this.createItem(res.data.list);
			console.log(res.data.list)
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
						<div class="checkbox">
						  <label>
						    <input type="checkbox" value="">
						    check me
						  </label>
						</div>
					</td>
				</tr>
			`
		}
		this.container.html(str)
	},
})