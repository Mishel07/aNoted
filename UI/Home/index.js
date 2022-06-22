const notes = [];
let result;
async function onloadFun(){
    console.log(sessionStorage.getItem("user"));
    let obj = sessionStorage.getItem("user");
    let res = await getRequest("http://localhost:5000/notes/all",obj);
    console.log(res)
    result=res;
    const div = document.getElementById("cards");
    const childDiv = document.createElement("div");
    childDiv.className="childDiv";
    for(let i=0; i<res.length; i++){
        const h4 = document.createElement("h4");
        h4.id = i;
        h4.onclick = function() { 
            sessionStorage.setItem("title",h4.innerHTML);
            sessionStorage.setItem("desc",res[h4.id].description);
            console.log(sessionStorage.getItem("title"));
            console.log(sessionStorage.getItem("desc"));
            window.location.href="../viewNotes/notes.html";
        };
        h4.innerHTML = res[i].title;
        childDiv.appendChild(h4);
        notes[i] = h4.innerHTML;
    }
    div.appendChild(childDiv);
}
var getRequest = async(url,obj)=>{
    url+="/"+obj;
    console.log(url)
    let result = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        },
        });
        let res = await result.json();
        return res
}

async function sortByCreation(){
    let obj = sessionStorage.getItem("user");
    let res = await getRequest("http://localhost:5000/notes/sortByCreatedDate",obj);
    console.log(res)
    result=res;
    const div = document.getElementById("cards");
    const childDiv = document.createElement("div");
    childDiv.className="childDiv";
    for(let i=0; i<res.length; i++){
        const h4 = document.createElement("h4");
        h4.id = i;
        h4.onclick = function() { 
            sessionStorage.setItem("title",h4.innerHTML);
            sessionStorage.setItem("desc",res[h4.id].description);
            console.log(sessionStorage.getItem("title"));
            console.log(sessionStorage.getItem("desc"));
            window.location.href="../viewNotes/notes.html";
        };
        h4.innerHTML = res[i].title;
        childDiv.appendChild(h4);
        notes[i] = h4.innerHTML;
    }
    while(div.hasChildNodes())
        div.removeChild(div.firstChild);
    div.appendChild(childDiv);
}

async function sortByModification(){
    let obj = sessionStorage.getItem("user");
    let res = await getRequest("http://localhost:5000/notes/sortByModifiedDate",obj);
    console.log(res)
    result=res;
    const div = document.getElementById("cards");
    const childDiv = document.createElement("div");
    childDiv.className="childDiv";
    for(let i=0; i<res.length; i++){
        const h4 = document.createElement("h4");
        h4.id = i;
        h4.onclick = function() { 
            sessionStorage.setItem("title",h4.innerHTML);
            sessionStorage.setItem("desc",res[h4.id].description);
            console.log(sessionStorage.getItem("title"));
            console.log(sessionStorage.getItem("desc"));
            window.location.href="../viewNotes/notes.html";
        };
        h4.innerHTML = res[i].title;
        childDiv.appendChild(h4);
        notes[i] = h4.innerHTML;
    }
    while(div.hasChildNodes())
        div.removeChild(div.firstChild);
    div.appendChild(childDiv);
}

async function sortByTitle(){
    let obj = sessionStorage.getItem("user");
    let res = await getRequest("http://localhost:5000/notes/sortByTitle",obj);
    console.log(res)
    result=res;
    const div = document.getElementById("cards");
    const childDiv = document.createElement("div");
    childDiv.className="childDiv";
    for(let i=0; i<res.length; i++){
        const h4 = document.createElement("h4");
        h4.id = i;
        h4.onclick = function() { 
            sessionStorage.setItem("title",h4.innerHTML);
            sessionStorage.setItem("desc",res[h4.id].description);
            console.log(sessionStorage.getItem("title"));
            console.log(sessionStorage.getItem("desc"));
            window.location.href="../viewNotes/notes.html";
        };
        h4.innerHTML = res[i].title;
        childDiv.appendChild(h4);
        notes[i] = h4.innerHTML;
    }
    while(div.hasChildNodes())
        div.removeChild(div.firstChild);
    div.appendChild(childDiv);
}

function search(){
    var flag = 0;
    const val = document.getElementById("search");
    const childDiv = document.createElement("div");
    childDiv.className="childDiv";

    if(val.value!=""){
        for(let i=0;i<notes.length;i++){
            if(val.value == notes[i]){
                const h4 = document.createElement("h4");
                h4.innerHTML = notes[i];
                h4.id = i;
                h4.onclick = function() { 
                    sessionStorage.setItem("title",h4.innerHTML);
                    sessionStorage.setItem("desc",result[i].description);
                    console.log(sessionStorage.getItem("title"));
                    console.log(sessionStorage.getItem("desc"));
                    window.location.href="../viewNotes/notes.html";
                };
                childDiv.appendChild(h4);
                flag = 1;
            }
        }
        if(flag == 1){
            const div = document.getElementById("cards");
            while(div.hasChildNodes())
                div.removeChild(div.firstChild);
            div.appendChild(childDiv);
        }

    }
    else{
        const div = document.getElementById("cards");
        div.removeChild(div.firstChild);
        onload();
    }
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

