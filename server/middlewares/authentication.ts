import jwt, { Secret } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

const authenticate = async (req: any, res: Response, next: NextFunction) => {
    try {
        const authHeader: string = String(req.headers['auth-token']);
        if (!authHeader) {
            return res.status(401).json({ "error": "Please use a valid authentication token" });
        }

        const secret : any = process.env.JWT_SECRET_STRING;
        const token_verification: any = jwt.verify(authHeader, secret);
        req.user = token_verification;
    } catch (error) {
    	console.log(error);
        return res.status(500).send({ error: "Internal Server error occured" });
    }
    next();
}

export default authenticate;
