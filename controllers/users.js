var fs = require('fs-extra');

/**
 * @param firstname
 * @param lastname
 * @param email
 * @param username
 * @param password
 * @constructor
 */
class UserObject{
    constructor (firstname, lastname, email, username, password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.password = password;
    }
}


var jsonData = JSON.parse(fs.readFileSync('./sample_users.json'));
console.log(jsonData);

exports.create = function(req, res) {
    // create user object
    var userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        var newUser = new UserObject(userData.firstname, userData.lastname, userData.email, userData.username, userData.password);
        var newUserData = { firstname:newUser.firstname, lastname:newUser.lastname, email:newUser.email, username:newUser.username, password:newUser.password };

        res.setHeader('Content-Type', 'application/json');
        jsonData.push(newUserData);
        console.log(jsonData);
        //res.send(true);
        res.redirect('/');

    } catch (e) {
        res.status(500).send('error ' + e);
    }
};

exports.list = jsonData;