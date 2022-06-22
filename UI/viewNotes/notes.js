var title=sessionStorage.getItem("title");
var desc=sessionStorage.getItem("desc");
document.getElementById("notes-title").value = title;
document.getElementById("content").innerHTML = desc;



    document.querySelector(".notes-btn").addEventListener("click",saveNotes)

    async function saveNotes(e)
    {
        e.preventDefault();
        let obj = {}
        obj.username=sessionStorage.getItem("user");
        obj.title = document.getElementById("notes-title").value;
        obj.description = document.getElementById("content").innerHTML;
        const data=[];
        if(obj.title!=""){  
            let res = await putRequest("http://localhost:5000/notes/updateNotes",obj);
            console.log(res);
            alert("Notes saved!!");
            window.location.href="../home/index.html";
           
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



    document.querySelector(".del-btn").addEventListener("click",delNotes)

    async function delNotes(e)
    {
        e.preventDefault();
        let obj = {}
        obj.username=sessionStorage.getItem("user");
        obj.title = document.getElementById("notes-title").value; 
        let res = await delRequest("http://localhost:5000/notes/deleteNotes",obj);
        console.log(res);
        alert("Note deleted!!");
        window.location.href="../home/index.html";
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