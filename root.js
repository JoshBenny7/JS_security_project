var express = require("express");
var app = express();

app.use(express.json());

let users=[
    {id:1,name:"Ali",age:25},
    {id:2,name:"Sara",age:22}
];

app.post('/users', (req, res) => {

  const newUsers = req.body;
  if (!Array.isArray(newUsers)) {
    return res.status(400).send("Please send an array of users");
  }
   let nextId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
   const addedUsers = newUsers.map(user => {
    const newUser = {
      id: nextId++,
      name: user.name,
      age: user.age
    };

    users.push(newUser);
    return newUser;
  });
  res.status(201).json(addedUsers);
});

app.get("/users",(req,res)=>{
    res.send(users);
})

app.get("/users/:id",(req,res) => {
    const user = users.find(u=>u.id == req.params.id);

    if(!user) return res.status(404).send("User not found");
    res.send(user);
})
app.put("/users/:id",(req,res)=>{
    const user = users.find(u => u.id == req.params.id)

    if(!user) return res.status(404).send("User not found");
    
    user.name=req.body.name;
    user.age=req.body.age;
    res.send(user);
})
app.delete("/users/:id",(req, res) => {
  users=users.filter(u => u.id != req.params.id);
  res.send("User Deleted");
});
app.listen(3000, () => console.log("Server running on port 3000"));
