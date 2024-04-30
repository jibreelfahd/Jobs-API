import { UnauthenticatedError } from "../errors/index.js";
import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
        throw new UnauthenticatedError('You are unauthorized to access this resource. Try Again Later');
    }

    const token = authHeaders.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            console.log(err)
            throw new UnauthenticatedError('Invalid Token. Try Again Later');
        }
        req.user = { userId: decoded.userId, name: decoded.username }
        console.log(req.user);
        next();
    });
}

export default authUser;