

const listParent= document.getElementById("listParent");
const addTodo=async()=>{
  try {
    const input= document.getElementById("input");
    console.log(input.value);

    const body ={
   todo: input.value
    }
    
    const response= await fetch("http://localhost:3000/createTodo", {
        method : "POST",
        headers :{
            "content-type" :"application/json"
        },
        body : JSON.stringify(body)
    }).then((res)=> res.json())

    console.log(response);
    getTodos();
   input.value = ""

  } catch (error) {
    console.log(error.message);
    
  }
}


const getTodos= async()=>{

    try {
        const response = await fetch("http://localhost:3000/getTodos")
        .then((res)=> res.json())
        console.log(response.data);
         listParent.innerHTML ="";
        response.data.map((userTodo)=>{
       listParent.innerHTML += `
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${userTodo.todo}</span>
    <div>
      <button id="${userTodo._id}" class="btn btn-sm btn-warning me-2" onclick="updateTodo(this)">Edit</button>
      <button id="${userTodo._id}" class="btn btn-sm btn-danger" onclick="deleteTodo(this)">Delete</button>
    </div>
  </li>
`;


        })
        
    } catch (error) {
        
    }
}


const updateTodo= async(ele)=>{
    
    
try {
    const oldValue= prompt("Enter New Vale");
    const obj={
        todo :oldValue
    }
   const response = await fetch(`http://localhost:3000/updateTodo/${ele.id}`, {
    method : "PUT", 
    headers :{
        "content-type" : "application/json"
    },
    body : JSON.stringify(obj)
   })
     .then((res)=> res.json())
      getTodos()

    
} catch (error) {
    alert(error.message)
}
}

const deleteTodo = async (ele) => {
  try {
    const response = await fetch(`http://localhost:3000/deleteTodo?id=${ele.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    console.log("Deleted:", data);

    getTodos();
  } catch (error) {
    console.log("Error deleting todo:", error.message);
  }
};




window.addTodo= addTodo;
window.updateTodo= updateTodo;
window.deleteTodo= deleteTodo;
window.addEventListener("load", getTodos)