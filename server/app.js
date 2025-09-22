import express from "express";
import mongoose from "mongoose";
import TodoModel from "./models/todoSchema.js";
import cors from "cors"

const app= express();

const PORT= 3000;

app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(cors())
const URI =`mongodb+srv://todo-app:todoapp321@todo-app.0buijh6.mongodb.net/?retryWrites=true&w=majority&appName=todo-app`

mongoose.connect(URI)
.then((res)=>console.log("mongodb Connected"))

.catch((error)=>console.log(error.message))

app.get("/" , (request , response)=>{

    response.send("server is running ")
})

app.post("/createTodo" , async(request, response)=>{
  try {
    const body= request.body;
      const  todoDone = await TodoModel.create(body)

        response.json({
        message : "todo bun  chuka  hain" ,
        data : todoDone,
        status : true
    })
  } catch (error) {
    response.json({
        message : "todo nahi bana" || error.message,
        status : false 
    })
  }
  
})
app.get("/getTodos" , async(request, response)=>{
  try {

      const  todoDone = await TodoModel.find({})

        response.json({
        message : "get All  todos" ,
        data : todoDone,
        status : true
    })
  } catch (error) {
    response.json({
        message : "fetch error" || error.message,
        status : false 
    })
  }
  
})


// updateTodos

app.put("/updateTodo/:id" , async(request , response)=>{
   try {
      const userID= request.params.id;
      const body = request.body;
      const  updateData = await TodoModel.findByIdAndUpdate(userID, body, { new : true});

 response.json({
        message : "todo nahi bana",
        status : true,
        data : updateData, 
    })

   } catch (error) {
     response.json({
        message : "todo updates nahi howha" || error.message,
        status : false 
    })
   }
})
// delete todos 
app.delete("/deleteTodo", async(request , response)=>{
  try {
    await TodoModel.findByIdAndDelete(request.query.id)
   response.json({
        message : "deleted successFully",
        status : true,
        data : null, 
    })

  } catch (error) {
      response.json({
        message : "todo delete nahi howha" || error.message,
        status : false 
    })
  }
})

app.listen(PORT, ()=>{
console.log(`server is running on ${PORT}`);

})
