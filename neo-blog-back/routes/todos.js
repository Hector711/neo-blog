const router = require("express").Router();
const Todo = require("../schema/todo")

router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      title: "JohnDoe",
      completed: false,
    },
  ]);
});

router.post("/", async (req, res) => {
  if(!req.body.title) {
    res.status(400).json({error: "Title is required"})
  } 
  try {
    const todo = new todo({
      title: req.body.title,
      completed: false,
      idUser: req.body.id,
    })

    const newTodo = await todo.save();
    res.json(newTodo)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

module.exports = router;
