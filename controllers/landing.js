module.exports = {

	async	landing (req, res) {
			try {
					res.render('landing', {
							page_name: 'landing'
					})
			}
			catch (err) {
					console.log(err)
			}
		}

}