var i = 0;
var title=sessionStorage.getItem("title");
var desc=JSON.parse(sessionStorage.getItem("desc"));
console.log(desc);
document.getElementById("todo-title").value = title;
var form = document.getElementById("form-control");

for(let j=0;j<desc.length;j++){
    var div = document.createElement("div");
    var check = document.createElement("input");
    check.type = "checkbox";
    check.className="check";
    check.checked = desc[j].isCheck;
    check.id = i;
    i++;
    text = document.createElement("input");
    text.type = "text";
    text.value = desc[j].task;
    div.appendChild(check);
    div.appendChild(text);
    form.appendChild(div);
    text.onchange=checktext;
    check.onclick=checkChanged;    
}

document.querySelector(".todo-btn").addEventListener("click",createTodo)

async function createTodo(e)
    {
        console.log(desc)
        e.preventDefault();
        let obj = {}
        obj.username=sessionStorage.getItem("user");
        obj.title = document.getElementById("todo-title").value;
        obj.description = desc;
        if(obj.title!=""){  
            let res = await putRequest("http://localhost:5000/toDo/updateTodo",obj);
            console.log(res);
            alert("ToDo saved!!");
            window.location.href="../todoHome/index.html";
        }   
        else{
            alert("Title is empty");
        }
    }

    var putRequest = async(url,obj)=>{
        let body = JSON.stringify(obj)
        
        let result = await fetch(url, {
            method: 'PUT',
            body:body,
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            });
            let res = await result.json();
            return res
    }

function checktext(){
    this.previousElementSibling.value=this.value;
    var list = {
        task: this.value,
        isCheck: this.previousElementSibling.checked
    }
    desc[this.previousElementSibling.id] = list;
}

function checkChanged(){
    desc[this.id].isCheck=this.checked;
}

function addTask() {
    var form = document.getElementById("form-control");
    var div = document.createElement("div");

    var check = document.createElement("input");
    check.type = "checkbox";
    check.className="check";
    check.id = i;
    i++;
    text = document.createElement("input");
    text.type = "text";
    text.value = "";
    text.placeholder="Enter your Task"; 
    text.onchange=checktext;
    check.onclick=checkChanged;
    div.appendChild(check);
    div.appendChild(text);
    form.appendChild(div);
}

document.querySelector(".del-btn").addEventListener("click",delNotes)

async function delNotes(e)
{
    e.preventDefault();
    let obj = {}
    obj.username=sessionStorage.getItem("user");
    obj.title = document.getElementById("todo-title").value; 
    let res = await delRequest("http://localhost:5000/toDo/deleteTodo",obj);
    console.log(res);
    alert("ToDo deleted!!");
    window.location.href="../todoHome/index.html";
}

var delRequest = async(url,obj)=>{
    let body = JSON.stringify(obj)
    
    let result = await fetch(url, {
        method: 'DELETE',
        body:body,
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        },
        });
        let res = await result.json();
        return res
}