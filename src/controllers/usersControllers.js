const usersController = {
    login: (req, res) => {
        res.render('login');
    },
    register: (req,res) => {
    },
    administracion: (req, res) => {
        res.render('my-products')
    },
}

module.exports = usersController;