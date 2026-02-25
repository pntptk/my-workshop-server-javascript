const express = require("express");
const cors = require("cors");
// const { error } = require("console");

const app = express();

app.use(express.json());
app.use(cors());

let todos = [
  {
    id: 1,
    name: "homework",
    description: "งาน คณิต",
    startDate: "2026-01-12",
    endDate: "2026-01-12",
    status: "",
    duration: 5,
  },
];

app.get("/", (req, res) => res.status(200).json(error));

//
app.get("/todos", (req, res) => {
  res.json(todos);
});

//create todo
app.post("/todos", (req, res) => {
  const { name, description, status, startDate, endDate } = req.body;

  if (!name) {
    res.status(400).json({ message: "Name is required" });
    return;
  }
  const newTodo = {
    id: Date.now(),
    name,
    description,
    status,
    startDate,
    endDate,
    duration: 5,
  };

  todos.push(newTodo);
  res.status(201).json(todos);
});

//delete todo
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;

  const initialLength = todos.length;

  todos = todos.filter((t) => t.id !== parseInt(id));

  if (todos.length === initialLength) {
    return res.status(404).json({ message: "ไม่พบข้อมูลที่ต้องการ" });
  }

  res.status(200).json({ message: "ลบสำเร็จ", todos });
});

//update todo
app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const { name, description, status } = req.body;

  const index = todos.findIndex((t) => t.id === parseInt(id));

  if (index !== -1) {
    todos[index] = { ...todos[index], name, description, status };
    return res.status(200).json({ message: "update data", todos });
  } else {
    return res.status(404).json({ message: "not found id", todos });
  }
});

//update status todo
app.patch("/todos/:id", (req, res) => {
  const id = req.params.id;
  const {status} = req.body;
  const index = todos.findIndex((t) => t.id === parseInt(id));

  if (index !== -1) {
    todos[index].status = status


    return res.status(200).json({
      message : "Status updated",
      data: todos[index]
    })
  }

  return res.status(404).json({message : "Todo not found"});


});

// const server = createServer(app);
app.listen(3001, () => {
  console.log(`server running at http://localhost:3001`);
});
