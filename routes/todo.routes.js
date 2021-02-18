const { Router } = require("express");
const Todo = require("../models/Todo.js");
const auth = require("../middleware/auth.middleware.js");
const config = require("config");

const router = Router();

/**
 * @swagger
 * tags:
 *  name: ToDoSection
 *  description: This is for ToDoes workflow
 */
// /api/todo/addTodo
/**
 * @swagger
 * /api/todo/addTodo:
 *  post:
 *      tags: [ToDoSection]
 *      description: adding todo
 *      parameters:
 *        - in: body
 *          name: add todo
 *          required: true
 *          description: todo to add
 *          schema:
 *            type: object
 *            properties:
 *              owner:
 *                type: string
 *                default: ''
 *              todoTitle:
 *                type: string
 *                default: React
 *              todoBody:
 *                type: string
 *                default: I will learn React soon
 *              todoType:
 *                type: string
 *                default: UI
 *      responses:
 *        200:
 *          description: OK
 *        400:
 *          description: error
 */

router.post("/addTodo", auth, async (req, res) => {
  try {
    const baseURL = config.get("baseURL");
    const { todoTitle, todoBody, todoType } = req.body;
    console.log(req.user);
    const todo = new Todo({
      owner: req.user.userID,
      todoTitle,
      todoBody,
      todoType,
    });
    await todo.save();
    res.status(201).json( todo );
  } catch (e) {
    res.status(409).json({message: e.message}); // refactor after
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ owner: req.user.userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json(error.message); // refactor after
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const todos = await Todo.findById(req.params.id);
    res.json(todos);
  } catch (e) {
    res.status(500).json(e.message); // refactor after
  }
});

module.exports = router;
