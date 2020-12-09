const bcrypt = require("bcrypt");
const { models } = require("../database");

// Allowed URLs without login
const allowedUrls = ["/api/login", "/api/register"]; 

// Middleware
const loginChecker = (req, res, next) => {
    // l-am lasat dezactivat pana terminam app
    next();
    return;

    if ( !req.session.studId && !allowedUrls.includes(req.originalUrl) ) {
        res.status(403).send({message: "You don't have access here. Please log in"});
    }else {
        next();
    } 
}

// Routes
const login = async (req, res) => {
    try {
        const stud = req.body;
        
        const found = await models.Student.findOne({ where: { email: stud.email } });
        if (found) {
            const validPassword = await bcrypt.compare(stud.password, found.password);
            if(validPassword)  
                req.session.studId = found.id;
            else 
                req.session.studId = false;
        }
 
        res.status(200).send({
            success: !!found,
            studId: found.id,
            stud: found
        });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}
const logout = (req, res) => {
    req.session.destroy();
    res.status(200).send({message: "Successfuly logged out"});
}

module.exports = { loginChecker, login, logout }