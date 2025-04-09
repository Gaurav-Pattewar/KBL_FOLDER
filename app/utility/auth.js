/* eslint-disable no-undef */
// import { ExcludedRoutes } from "../modules/routes/routes.type";
import jwt  from "jsonwebtoken";


export const createToken = (payload) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
}

export const verifyToken = (token) => {
    try{
        const secretKey = process.env.JWT_SECRET_KEY;
        const payload = jwt.verify(token, secretKey);
        return payload;
    } catch (error) {
        const err = new Error("INVALID_TOKEN");
        err.status = 401; 
        throw err;
    }

}


export const authorization = (ExcludedRoutes) => {
    return (req,res,next) => {
        try {
            if(ExcludedRoutes.find(ERoutes => req.url.includes(ERoutes.path) && ERoutes.method == req.method)) {
                return next();
            }
            const token = req.headers.authorization?.split(' ')[1];
            if(!token) {
                const error = new Error("JWT_TOKEN_MISSING");
                error.status = 401; 
                throw error;
            }
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
