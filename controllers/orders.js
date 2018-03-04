const Orders = require('../models/orders')
const dateFormat = require('dateformat');
const now = new Date();

module.exports = {

		async	ordersPage (req, res) {
				try {
						res.render('orders/index', {
								page_name: 'orders',
						})
				}
				catch (err) {
						console.log(err)
				}
		},
		async	ordersGetter (req, res) {
				try {
						Orders.find({}, function (err, result) {
								if(err) return res.status(201).send({err: err})
								res.status(200).send({result: result})
						})
				}
				catch (err) {
						console.log(err)
				}
		},
		async newOrder (req, res) {
				try {
						const newOrder = {
								company: req.body.company,
								quantity: req.body.quantity,
								material: req.body.material,
								regDate: dateFormat(now, 'd-mmmm-yyyy'),
								boxHeight: req.body.boxHeight,
								boxWidth: req.body.boxWidth,
								divHeight: req.body.divHeight,
								divWidth: req.body.divWidth,
								deadline: dateFormat(req.body.deadline, 'd-mmmm-yyyy'),
								comment: req.body.comment,
								status: 'Pending'
						}
						Orders.create(newOrder, function (err, result) {
								if(err) return res.status(201).send({msg: err})
								res.status(200).send({page_name: 'orders', location: '/orders'})
						})
				}
				catch (err) {
						console.log(err)
				}
		},
		async modifyOrder (req, res) {
				try {
						const data = req.body
						data.deadline = dateFormat(req.body.deadline, 'd-mmmm-yyyy')
						Orders.findByIdAndUpdate(req.body.id, data, function (err, result) {
							if(err) return res.status(201).send({err: err})
								res.status(200).send({result: result, location: '/orders'})
						})
				}
				catch (err) {

				}
		},
		async removeOrder (req, res) {
				try {
						Orders.findByIdAndRemove(req.body.id, function (err, result) {
								if(err) return res.status(201).send({err: err})
								res.status(200).send({location: '/orders'})
						})
				}
				catch (err) {

				}
		}

}