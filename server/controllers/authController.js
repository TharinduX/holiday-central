import Agent from '../models/Agent.js';
import bcrypt from 'bcrypt';
import { createError } from './../utils/error.js';

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
    res.status(200).json(agent);
  } catch (err) {
    next(err);
  }
};
