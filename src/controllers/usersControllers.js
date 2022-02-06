

const usersController = {
    login: (req, res) => {
        res.render('login');
    },
    register: (req,res) => {
        res.render('register');
    },
    administracion: (req, res) => {
        res.render('my-products')
    },
    processLogin: (req, res) => {

    },
    processRegister: (req, res) => {
        
    }
}

module.exports = usersController;