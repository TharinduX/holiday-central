import Agent from '../models/Agent.js';
import bcrypt from 'bcrypt';
import { createError } from './../utils/error.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const agentRegister = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const agent = new Agent({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      branch: req.body.branch,
    });
    await agent.save();
    res.status(201).json({ message: 'Agent added successfully' });
  } catch (err) {
    next(err);
  }
};

export const agentLogin = async (req, res, next) => {
  try {
    const agent = await Agent.findOne({ username: req.body.username });
    if (!agent) return next(createError(404, 'Agent not found'));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      agent.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, 'Username or password is incorrect'));
    const token = jwt.sign({ id: agent._id }, process.env.JWT_SECRET);
    const { password, ...others } = agent._doc;

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({ ...others });
  } catch (err) {
    next(err);
  }
};
