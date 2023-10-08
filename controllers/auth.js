const bcrypt = require("bcrypt")

const {User} = require("../models/user");
const { HttpError, controllerWrap } = require('../helpers');

const register = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    
    if (user) {
        throw HttpError(409, "Email already in use ")
    }
     
    const hashPassword = await bcrypt.hash(password, 10);
    
   const newUser = await User.create({...req.body, password: hashPassword});
   
   res.json({
       email: newUser.email,
       password: newUser.password,
   })
}

const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    
    if (!user) {
        throw  HttpError(401, "Email or password invalid")
    }
    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        throw  HttpError(401, "Email or password invalid")
    }
    const token = "gerwgew.werrewt.wert34252345we"
    
    res.json({
        token,
    })
}

module.exports = {
    register: controllerWrap(register),
}