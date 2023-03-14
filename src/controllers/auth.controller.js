import User from "../models/User";
import Role from "../models/Role";

import jwt from "jsonwebtoken";
import config from "../config";

export const signUp = async (req, res) => {
    const { username, email, password, roles } = req.body

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })
    if (roles) {
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map( role => role._id)
    }else{
        //rol por defecto
        const role = await Role.findOne({name: "user"})
        newUser.roles = [role._id]
    }
    //qué guardo del token, un string que es una palabra secreta y un obj de config
    const savedUser = await newUser.save()

    console.log(savedUser);
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 86400 //24hs en segundos 
    })    
    
    res.status(200).json({token})

}
export const signIn = async (req, res) => {
    res.json('signin')

}