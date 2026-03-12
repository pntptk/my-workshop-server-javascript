const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let data = [
  {
    id: "1234324",
    title: "",
    amount: 12,
    type: "INCOME" | "EXPENSE",
    category: "",
    date: "",
  },
];

app.get("/", (req, res) => {
  res.send("server is runner");
});
app.get("/expenses", (req, res) => {
  res.status(200).json(data);
});
app.post("/expenses", (req, res) => {
  const { title, amount, type, category, date } = req.body;

  if (!title || !amount) {
    res.status(404).json({ message: "name or amount is not found" });
    return;
  }

  const newData = {
    id: String(Date.now()),
    title,
    amount,
    type,
    category,
    date,
  };

  data.push(newData);
  //   res.status(201).json({message: "create new expenses success"},data);
  res.status(201).json(data);
});
app.put("/expenses/:id", (req, res) => {

  const id = req.params.id
  const { title, amount, type, category, date } = req.body;

  const index = data.findIndex((t) => t.id === id);

  if (index !== -1) {
    data[index] = {
      ...data[index],
      title,
      amount,
      type,
      category,
      date,
    };
    return res.status(200).json({message : "data is editing success",data});

  }
  else{
    return res.status(404).json({message : "id not found"});
  }
});

app.delete("/expenses/:id",(req,res)=>{
    const id = req.params.id;
    const initialLength = data.length;
    
    data = data.filter((t)=> t.id !== id);
    
    if(data.length === initialLength){
        return res.status(404).json({message : "data not found"});
    }

    return res.status(200).json({message : "delete data success",data});
})



app.listen(3001, () => {
  console.log(`http://localhost:3001 is running`);
});
