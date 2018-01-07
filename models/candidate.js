var mongoose = require('../utils/database.js')

var Candidate = mongoose.model('candidate', { 
	company: String,
	position: String,
	salary: String,
	address: String,
	filename: String
});

module.exports = {
	addCandidate(company, position, salary, address,filename, cb) {
		var candidate = new Candidate({company, position, salary, address,filename});
		candidate.save(function(err) {
			cb(err)
		})
	},
	
	getCandidate(params, cb) {
		Candidate.find(params).then((result) => {
			cb(result)
		}).catch(() => {
			cb('error')
		})
	},
	
	getCandidateByPage(page, size, cb) {
		page = parseInt(page, 10);
		size = parseInt(size, 10);
		Candidate.find({}).limit(size).skip((page -1) * size).then((result) => {
			cb(result)
		}).catch(() => {
			cb('error')
		})
	},

	removeItemById(id, cb) {
		Candidate.findByIdAndRemove(id, (err) => {
			cb(err);
		})
	},

	getCandidateById(id, cb) {
		Candidate.findById(id).then((result) => {
			cb(result);
		}).catch(() => {
			cb('error')
		})
	},

	updateCandidateById(id, params, cb) {
		Candidate.findByIdAndUpdate(id, params).then((result) => {
			cb(result);
		}).catch(() => {
			cb("error")
		})
	},

	getsalaryChioce(salary,cb) {
		Candidate.find({salary:salary}).then((result) => {
			cb(result)
		}).catch(() => {
			cb('error')
		})
	}
}

