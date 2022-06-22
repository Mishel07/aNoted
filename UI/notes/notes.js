

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
            let res = await postRequest("http://localhost:5000/notes/add",obj);
            console.log(res);
            if(!res.err){
                alert("Notes saved!!");
                window.location.href="../home/index.html";
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
        // console.log(obj)
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