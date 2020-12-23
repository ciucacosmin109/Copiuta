const bcrypt = require("bcrypt");
const { models } = require("../database");
const config = require("../config.json")
 
// Middleware
const loginChecker = (req, res, next) => {
    // activat/dezactivat
    //next(); return;

    if ( !req.session.studId && !config.login.unprotectedUrls.includes(req.originalUrl) ) {
        res.cookie('isLoggedIn', {}, { maxAge: 0, httpOnly: false });
        res.status(403).send({message: "You don't have access here. Please log in"});
    }else { 
        res.cookie('isLoggedIn', {}, { httpOnly: false });
        next();
    } 
}

// Routes
const login = async (req, res) => {
    try {
        const stud = req.body;
        
        const found = await models.Student.findOne({ where: { email: stud.email } });
        if (found != null) {
            const validPassword = await bcrypt.compare(stud.password, found.password);
            if(validPassword){
                req.session.studId = found.id; 
                res.status(200).send({ 
                    studId: found.id
                });
                return;
            }
        }
        res.status(400).send({ 
            message: "Invalid email or password"
        });
         
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}
const logout = (req, res) => {
    req.session.destroy();
    res.status(200).send({message: "Successfully logged out"});
}
const isLoggedIn = async (req, res) => { 
    try {
        if (req.session.studId) {
            const stud = await models.Student.findOne({ where: { id: req.session.studId } });
            if(stud){
                res.status(200).send({result: true, studId: req.session.studId});
            }else{
                res.status(200).send({result: false, message: "The user does not exists"});
            }
        }else{
            res.status(200).send({result: false, message: "Logged out"});
        }
    } catch (err) { 
        res.status(500).send({result: false, message: err.message});
    }
}

module.exports = { loginChecker, login, logout, isLoggedIn }