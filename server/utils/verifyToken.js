import jwt from 'jsonwebtoken';
import { createError } from './error.js';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, 'You are not authenticated'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(createError(401, 'Token is not valid'));
    }
    req.agentId = decoded.id;
    next();
  });
};
