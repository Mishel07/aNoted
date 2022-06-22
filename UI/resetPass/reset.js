
document.querySelector(".reset-btn").addEventListener("click",validate)

async function validate(e) {
    e.preventDefault();

   

    let newPass = document.getElementById("newPass").value;
    let conPass = document.getElementById("conPass").value;
    let username=document.getElementById("username").value;

    if(newPass=="" || conPass=="" || username=="")
    alert("Enter all the credentials!")
    


   

    if(newPass == conPass){
        let obj = {}
        obj.username=document.getElementById("username").value;
        obj.password=newPass;
        let res = await postRequest("http://localhost:5000/users/resetPass",obj);
        console.log(res)
        if(!res.error){
            window.location.href="../login/login.html";
        }
        else{
            alert("Invalid username");
        }
    }
    else{
        alert("Confirm password must be same as new password")
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