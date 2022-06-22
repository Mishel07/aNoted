var i = 0;
var desc=[];
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
            let res = await postRequest("http://localhost:5000/toDo/add",obj);
            console.log(res);
            if(!res.err){
                alert("ToDo saved!!");
                window.location.href="../todoHome/index.html";
            }
            else{
                alert("Title already exist");
            }
        }   
        else{
            alert("Title is empty");
        }
    }

    var postRequest = async(url,obj)=>{
        let body = JSON.stringify(obj)
        
        let result = await fetch(url, {
            method: 'POST',
            body:body,
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            });
            let res = await result.json();
            return res
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
    // check.onchange = function(){

    // }
    // div.id = i;
    // i = i+1;
    div.appendChild(check);
    div.appendChild(text);
    form.appendChild(div);
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