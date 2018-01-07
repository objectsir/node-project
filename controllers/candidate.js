const candidateModel = require("../models/candidate.js");

module.exports = {
	addCandidate(req, res) {
		const { company, position, salary, address } = req.body;
		const filename = req.file ? req.file.filename : "";

		candidateModel.addCandidate(company, position, salary, address,filename, (err) => {
			res.json({
				ret: true,
				data: {
					inserted: !err
				}
			})
		})
	},

	getCandidateList(req, res) {
		const { page, size } = req.query;
		let totalPage = 0;
		candidateModel.getCandidate({}, (result) => {
			if (result && result !== "error") {
				totalPage = Math.ceil(result.length / size)
				candidateModel.getCandidateByPage(page, size, (result) => {
					res.json({
						ret: true,
						data: {
							list: result,
							totalPage : totalPage
						}
					})
				})
			}
		})
	},

	removeCandidate(req, res) {
		const {id} = req.query;

		candidateModel.removeItemById(id, (err) => {
			res.json({
				ret: true,
				data: {
					delete: !err
				}
			})
		})
	},

	getCandidate(req,res) {
		candidateModel.getCandidateById(req.query.id, (result) => {
			res.json({
				ret: true,
				data: {
					info: (result && result != 'error') ? result : false
				}
			})
		})
	},

	updateCandidateNew(req, res) {
		const {company, position, salary, address, id} = req.body;
		const params = {
			company,
			position,
			salary,
			address
		}

		if (req.file && req.file.filename) {
			params.filename = req.file.filename
		}

		candidateModel.updateCandidateById(id, params, (result) => {
			res.json({
				ret: true,
				data: {
					update: (result && result !== "error") ? true : false
				}
			})
		})
	 },

	 salaryChioce(req,res) {
	 	const { salary } = req.query;
	 	candidateModel.getsalaryChioce(salary, (result) => {
			if (result && result !== "error") {
					res.json({
						ret: true,
						data: {
							list: result
						}
					})
			}
		})
	 }
}
