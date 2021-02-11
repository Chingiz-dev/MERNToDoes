const { Router } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = Router();

/**
 * @swagger
 * tags:
 *  name: UserAuthentication
 *  description: This is for user registration and login
 */
// /api/auth/register
/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      tags: [UserAuthentication]
 *      description: register user
 *      parameters:
 *        - in: body
 *          name: register user
 *          required: true
 *          description: body register user
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                default: chingiz5@gmail.com
 *              password:
 *                type: string
 *                default: davud
 *      responses:
 *        200:
 *          description: OK
 *        400:
 *          description: error
 */
router.post(
  "/register",
  [
    check("email", "very bad email").isEmail(),
    check("password", "to small password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      console.log(req.body, ' - body req')
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "bad registration data",
        });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email: email });
      if (candidate) {
        return res.status(400).json({ message: "such user exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email: email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: "user created" });
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      tags: [UserAuthentication]
 *      description: login user
 *      parameters:
 *        - in: body
 *          name: login user
 *          required: true
 *          description: body login user
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                default: chingiz5@gmail.com
 *              password:
 *                type: string
 *                default: davud
 *      responses:
 *        200:
 *          description: OK
 *        400:
 *          description: error
 */
router.post(
  "/login",
  [
    check("email", "enter correct email").isEmail(),
    check("password", "enter correct password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "bad logon data",
        });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ message: "no such email exists" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "password is incorect" });
      }
      const token = jwt.sign({ userID: user.id }, config.get("jwtSalt"), {
        expiresIn: "1h",
      });
      res.json({ token, userID: user.id });
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
);

module.exports = router;
