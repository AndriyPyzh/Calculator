const HttpStatuses = require('http-status-codes')

module.exports = function (req,res,next) {

	if(req.user.isAdmin) return res.status(HttpStatuses.FORBIDDEN).send('Access denied.');

	next();

}
