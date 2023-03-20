//verifico si esta enviando un token
import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User"
import Role from "../models/Role"


export const verifyToken = async (req, res, next) => {
    try {
         //recibo el token
    const token = req.headers["x-access-token"]

    console.log(token);

    //compruebo que exista el token
if(!token) return res.status(403).json({message: "No token provided"})

//si existe extraemos su valor en el objeto decoded que tiene un id
const decoded = jwt.verify(token, config.SECRET)

req.userId = decoded.id

const user = await User.findById(req.userId, {password: 0})
console.log(user);
//si no existe
if(!user) return res.status(404).json({message: "User not found"})

//si existe continua con la ruta
    next()
    } catch (error) {
        return res.status(500).json({message: "Unauthorized"})
    }
}

export const isModerator = async (req, res, next) => {
   const user = await User.findById(req.userId)
   //busco los roles cuyos id´s esten en los roles del usuario
   const roles = await Role.find({_id: {$in: user.roles}})
   
   for (let i = 0; i < roles.length; i++) {
    if(roles[i].name == "moderator"){
        next();
        return;
    }
   }
   return res.status(403).json({message: "Moderator role required"})
}
export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({_id: {$in: user.roles}})
    
    for (let i = 0; i < roles.length; i++) {
     if(roles[i].name === "admin"){
         next();
         return;
     }
    }
 
    return res.status(403).json({
     message: "Admin role required "
    })
}