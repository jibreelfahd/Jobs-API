import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import UserModel from "../models/user.js";
import { StatusCodes } from "http-status-codes";

export const register = async (req, res) => {
    const user = await UserModel.create({ ...req.body });
    const token = user.createTokens();
    res.status(StatusCodes.CREATED).json({ user:{ name: user.name }, token });
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
        throw new UnauthenticatedError('User does not exist');
    }

    const matchedPassword = await user.comparePasswords(password);
    
    if (!matchedPassword) {
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const token = user.createTokens();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
}

