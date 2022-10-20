var express = require("express");
var todos = require("../resource/todo");
var router = express.Router();

const Todos = require("../models/Todos");

// console.log(todos);
/* GET home page. */
router.get("/", async function (req, res, next) {
  // res.render("home", { todosList: todos });
  const todos = await Todos.find();
  console.log(todos);
  res.render("home", { todosList: todos });
});
// router.get("/home", function (req, res, next) {
//   res.render("home", { title: "Home" });
// });
router.get("/add-to-do", function (req, res, next) {
  res.render("addToDo", { title: "Add To Do" });
});

router.post("/save-to-do", async function (req, res, next) {
  await Todos.insertMany({
    title: req.body.title,
    description: req.body.description,
  });
  // todos.push({ ...req.body, _id: `00${todos.length}` });
  res.redirect("/");
});
// router.get("/delete-to-do/:id", function (req, res, next) {
//   //console.log(req.params);
//   const index = todos.findIndex((todo) => todo._id === req.params.id);
//   todos.splice(index, 1);
//   res.redirect("/");
// });
router.get("/delete-to-do/:id", async function (req, res, next) {
  await Todos.deleteOne(
    { _id: req.params.id },
    { $set: { title: req.body.title, description: req.body.description } }
  );
  res.redirect("/");
});
router.get("/open-update-form/:id", async function (req, res, next) {
  const todo = await Todos.findOne({ _id: req.params.id });
  res.render("editToDo", { title: "Edit To-Do", todo: todo });
});
// router.get("/open-update-form/:id", async function (req, res, next) {
//   // const todotodo = todos.find((todo) => todo._id === req.params.id);
//   // res.render("editToDo", { todo: todotodo });
// });

// router.post("/update-to-do/:id", function (req, res, next) {
//   //console.log(req.params);
//   //console.log(req.body);
//   // const index = todos.findIndex((todo) => todo._id === req.params.id);
//   // todos.splice(index, 1, { ...req.body, _id: req.params.id });
//   // res.redirect("/");

//   })
// });
router.post("/update-to-do/:id", async function (req, res, next) {
  // await Todos.findOne({ _id: req.params.id });
  await Todos.updateOne(
    { _id: req.params.id },
    { $set: { title: req.body.title, description: req.body.description } }
  );
  res.redirect("/");
});

module.exports = router;
