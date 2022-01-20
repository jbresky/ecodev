let mainController = {
    index: (req, res) => {
        res.render('home');
    },
    about: (req, res) => {
        res.render('about')
    },
    eco: (req, res) => {
        res.render('environment')
    },
}

module.exports = mainController;