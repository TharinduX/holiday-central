import jwt from 'jsonwebtoken';
import { createError } from './error.js';

import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, 'You are not authenticated!'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, agent) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    req.agent = agent;
    next();
  });
};

export const verifyAgent = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.agent.id === req.params.id) {
      next();
    } else {
      return next(createError(403, 'You are not authorized!'));
    }
  });
};
