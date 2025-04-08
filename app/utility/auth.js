/* eslint-disable no-undef */
// import { ExcludedRoutes } from "../modules/routes/routes.type";
import jwt  from "jsonwebtoken";


export const createToken = (payload) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(payload, secretKey);
    return token;
}

export const verifyToken = (token) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    const payload = jwt.verify(token, secretKey);
    return payload;
}


export const authorization = (ExcludedRoutes) => {
    return (req,res,next) => {
        try {
            if(ExcludedRoutes.find(ERoutes => req.url.includes(ERoutes.path) && ERoutes.method == req.method)) {
                return next();
            }
            const token = req.headers.authorization?.split(' ')[1];
            const payload = verifyToken(token);
            res.locals.user = payload;
            
            return next();
        } catch (error) {
            next(error);
        }
     }
}

export const permit = (permittedRoles) => {
    return (req, res, next) => {
        if(permittedRoles.includes(res.locals.user.role)) {
            return next();
        }
        const error = new Error("UNAUTHORIZED");
        error.status = 403; 
        throw error;
    }
}
