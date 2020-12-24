const bcrypt = require("bcrypt");
const { models } = require("../database");
const config = require("../config.json")

const { OAuth2Client } = require("google-auth-library");
const googleClientId = config.googleLogin.clientId;
const googleClient = new OAuth2Client(googleClientId);
 
// Middleware
const loginChecker = (req, res, next) => {
    // activat/dezactivat
    //next(); return; 

    if ( !req.session.studId && !config.login.unprotectedUrls.includes(req.originalUrl) ) {
        res.cookie('isLoggedIn', {}, { maxAge: 0, httpOnly: false });
        res.status(403).send({message: "You don't have access here. Please log in"});
    }else if(req.session.studId){ 
        res.cookie('isLoggedIn', {}, { httpOnly: false });
        next();
    }else{
        res.cookie('isLoggedIn', {}, { maxAge: 0, httpOnly: false });
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
                // Login
                req.session.studId = found.id; 
                res.cookie('isLoggedIn', {}, { httpOnly: false });

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

// External login routes
const googleLogin = async (req, res) => {
    try {
        // Get the user info from the tokenId
        const tokenId = req.body.tokenId;
        const ticket = await googleClient.verifyIdToken({
            idToken: tokenId,
            audience: googleClientId
        }); 
        if(!ticket){ 
            res.status(400).send({
                message: "The google's api response was not valid"
            });
            return;
        }

        // Create a student from the payload
        const googleUser = ticket.getPayload();  
        if(!googleUser){ 
            res.status(400).send({
                message: "Error while extracting the payload from the google's api response"
            });
            return;
        }   
        const newStud = {
            firstName: googleUser.given_name,
            lastName: googleUser.family_name,
            email: googleUser.email,
            password: "external"
        };

        // Update or insert the student in DB
        let stud = await models.Student.findOne({ where: { email: newStud.email } }); 
        if (stud){ 
            // Update the student
            const result = await models.Student.update(newStud, {
                where: {id: stud.id}
            });
            if (!result) {
                res.status(400).send({
                    message: "Error while trying to update the student"
                });
                return;
            } 
        } else {
            // Insert the student 
            const result = await models.Student.create(newStud);
            if (!result) {
                res.status(400).send({
                    message: "Error while trying to insert the student"
                });
                return;
            } 
            stud = result; 
        }

        // Login
        req.session.studId = stud.id;  
        res.cookie('isLoggedIn', {}, { httpOnly: false });

        // Success 
        res.status(200).send({
            message: "Successfully logged in using google", 
            studId: stud.id
        });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
} 

module.exports = { loginChecker, login, logout, isLoggedIn, googleLogin }