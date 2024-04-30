import { StatusCodes } from "http-status-codes"

const notFouud = (req, res) => res.status(StatusCodes.NOT_FOUND).json({ message: 'Resource not available at the moment' });

export default notFouud;