require("dotenv").config();

//package
const express = require("express");
const cors = require("cors");
//const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase Connected...");
  })
  .catch((err) => {
    console.log(err);
});

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

//Start Page
app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/UI/login/login.html");
})
app.get("/login.css",(req,res)=>{
  res.sendFile(__dirname+"/UI/login/login.css");
})
app.get("/login.js",(req,res)=>{
  res.sendFile(__dirname+"/UI/login/login.js");
})
app.get("/logo.png",(req,res)=>{
  res.sendFile(__dirname+"/UI/login/logo.png");
})

//Login page
app.get("/login/login.html",(req,res)=>{
  res.sendFile(__dirname+"/UI/login/login.html");
})
app.get("/login/login.css",(req,res)=>{
  res.sendFile(__dirname+"/UI/login/login.css");
})
app.get("/login/login.js",(req,res)=>{
  res.sendFile(__dirname+"/UI/login/login.js");
})
app.get("/login/logo.png",(req,res)=>{
  res.sendFile(__dirname+"/UI/login/logo.png");
})

//Register Page
app.get("/register/register.html",(req,res)=>{
  res.sendFile(__dirname+"/UI/register/register.html");
})
app.get("/register/register.css",(req,res)=>{
  res.sendFile(__dirname+"/UI/register/register.css");
})
app.get("/register/register.js",(req,res)=>{
  res.sendFile(__dirname+"/UI/register/register.js");
})
app.get("/register/logo.png",(req,res)=>{
  res.sendFile(__dirname+"/UI/register/logo.png");
})

//ForgotPassword Page
app.get("/forgotPass/forgot.html",(req,res)=>{
  res.sendFile(__dirname+"/UI/forgotPass/forgot.html");
})
app.get("/forgotPass/forgot.css",(req,res)=>{
  res.sendFile(__dirname+"/UI/forgotPass/forgot.css");
})
app.get("/forgotPass/forgot.js",(req,res)=>{
  res.sendFile(__dirname+"/UI/forgotPass/forgot.js");
})
app.get("/forgotPass/logo.png",(req,res)=>{
  res.sendFile(__dirname+"/UI/forgotPass/logo.png");
})

//OtpCheck Page
app.get("/otpCheck/otp.html",(req,res)=>{
  res.sendFile(__dirname+"/UI/otpCheck/otp.html");
})
app.get("/otpCheck/otp.css",(req,res)=>{
  res.sendFile(__dirname+"/UI/otpCheck/otp.css");
})
app.get("/otpCheck/otp.js",(req,res)=>{
  res.sendFile(__dirname+"/UI/otpCheck/otp.js");
})
app.get("/otpCheck/logo.png",(req,res)=>{
  res.sendFile(__dirname+"/UI/otpCheck/logo.png");
})

//ResetPass Page
app.get("/resetPass/reset.html",(req,res)=>{
  res.sendFile(__dirname+"/UI/resetPass/reset.html");
})
app.get("/resetPass/reset.css",(req,res)=>{
  res.sendFile(__dirname+"/UI/resetPass/reset.css");
})
app.get("/resetPass/reset.js",(req,res)=>{
  res.sendFile(__dirname+"/UI/resetPass/reset.js");
})
app.get("/resetPass/logo.png",(req,res)=>{
  res.sendFile(__dirname+"/UI/resetPass/logo.png");
})

//Diary Page
app.get("/diary/diary.html",(req,res)=>{
  res.sendFile(__dirname+"/UI/diary/diary.html");
})
app.get("/diary/diary.css",(req,res)=>{
  res.sendFile(__dirname+"/UI/diary/diary.css");
})
app.get("/diary/diary.js",(req,res)=>{
  res.sendFile(__dirname+"/UI/diary/diary.js");
})

//DiaryNotes Page
app.get("/diaryNotes/notes.html",(req,res)=>{
  res.sendFile(__dirname+"/UI/diaryNotes/notes.html");
})
app.get("/diaryNotes/notes.css",(req,res)=>{
  res.sendFile(__dirname+"/UI/diaryNotes/notes.css");
})
app.get("/diaryNotes/notes.js",(req,res)=>{
  res.sendFile(__dirname+"/UI/diaryNotes/notes.js");
})

//ViewDiary Page
app.get("/viewDiary/notes.html",(req,res)=>{
  res.sendFile(__dirname+"/UI/viewDiary/notes.html");
})
app.get("/viewDiary/notes.css",(req,res)=>{
  res.sendFile(__dirname+"/UI/viewDiary/notes.css");
})
app.get("/viewDiary/notes.js",(req,res)=>{
  res.sendFile(__dirname+"/UI/viewDiary/notes.js");
})

//Home Page
app.get("/Home/index.html",(req,res)=>{
  res.sendFile(__dirname+"/UI/Home/index.html");
})
app.get("/Home/index.css",(req,res)=>{
  res.sendFile(__dirname+"/UI/Home/index.css");
})
app.get("/Home/index.js",(req,res)=>{
  res.sendFile(__dirname+"/UI/Home/index.js");
})

//Notes Page
app.get("/notes/notes.html",(req,res)=>{
  res.sendFile(__dirname+"/UI/notes/notes.html");
})
app.get("/notes/notes.css",(req,res)=>{
  res.sendFile(__dirname+"/UI/notes/notes.css");
})
app.get("/notes/notes.js",(req,res)=>{
  res.sendFile(__dirname+"/UI/notes/notes.js");
})

//ViewNotes Page
app.get("/viewNotes/notes.html",(req,res)=>{
  res.sendFile(__dirname+"/UI/viewNotes/notes.html");
})
app.get("/viewNotes/notes.css",(req,res)=>{
  res.sendFile(__dirname+"/UI/viewNotes/notes.css");
})
app.get("/viewNotes/notes.js",(req,res)=>{
  res.sendFile(__dirname+"/UI/viewNotes/notes.js");
})

//ToDo Page
app.get("/todo/todo.html",(req,res)=>{
  res.sendFile(__dirname+"/UI/todo/todo.html");
})
app.get("/todo/todo.css",(req,res)=>{
  res.sendFile(__dirname+"/UI/todo/todo.css");
})
app.get("/todo/todo.js",(req,res)=>{
  res.sendFile(__dirname+"/UI/todo/todo.js");
})

//ViewToDo Page
app.get("/updateTodo/todo.html",(req,res)=>{
  res.sendFile(__dirname+"/UI/updateTodo/todo.html");
})
app.get("/updateTodo/todo.css",(req,res)=>{
  res.sendFile(__dirname+"/UI/updateTodo/todo.css");
})
app.get("/updateTodo/todo.js",(req,res)=>{
  res.sendFile(__dirname+"/UI/updateTodo/todo.js");
})

//ToDoHome Page
app.get("/todoHome/index.html",(req,res)=>{
  res.sendFile(__dirname+"/UI/todoHome/index.html");
})
app.get("/todoHome/index.css",(req,res)=>{
  res.sendFile(__dirname+"/UI/todoHome/index.css");
})
app.get("/todoHome/index.js",(req,res)=>{
  res.sendFile(__dirname+"/UI/todoHome/index.js");
})


const userRouter = require('./app/routes/user');
app.use('/users',userRouter);

const notesRouter = require('./app/routes/notes');
app.use('/notes',notesRouter);

const toDoRouter = require('./app/routes/toDo');
app.use('/toDo',toDoRouter);

const diaryRouter = require('./app/routes/diary');
app.use('/diary',diaryRouter);

app.listen(port,()=>{
    console.log(`Server is running on port:${port}`);
});

