const express = require('express');
const app = express();
app.use(express.json());//to read json data from request body
let students = [
  { id: 1, name: "A", mobileno: 8978735498, address: "ABC", age: 20 },
  { id: 2, name: "B", mobileno: 7873547890, address: "BCD", age: 25 }
];

app.post('/students', (req, res) => {
  let nextId = students.length > 0 ? students[students.length - 1].id + 1 : 1;
  const newStudent = {
    id: nextId,
    name: req.body.name,
    mobileno: req.body.mobileno,
    address: req.body.address,
    age: req.body.age
  };
  students.push(newStudent);
  res.send(newStudent);
});

app.get("/students", (req, res) => {
  res.send(students);
});

app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id, 10));
  if (!student) return res.status(404).send("Student not found");
  res.send(student);
});



app.put("/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id, 10));
  if (!student) return res.status(404).send("Student not found");
  student.name = req.body.name;
  student.mobileno = req.body.mobileno;
  student.address = req.body.address;
  student.age = req.body.age;
  res.send(student);
});

app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const before = students.length;
  students = students.filter(s => s.id !== id);
  if (students.length === before) return res.status(404).send("Student not found");
  res.send({ message: "Student deleted" });
});
app.listen(3000, () => console.log("API Started Listening"));