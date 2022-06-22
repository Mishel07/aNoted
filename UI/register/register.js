
document.querySelector(".submit-btn").addEventListener('click', addUser)

async function addUser(e) {

    e.preventDefault()

    let firstName = document.forms["registerForm"]["fname"].value;
    let lastName = document.forms["registerForm"]["lname"].value;
    let userName = document.forms["registerForm"]["username"].value;
    let mail = document.forms["registerForm"]["emailid"].value;

    if (firstName == "" || lastName == "" || userName == "") {
        alert("Form cannot be kept empty!");

    }
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!mail.match(mailformat)) {

        alert("You have entered an invalid email address!");
        document.registerForm.emailid.focus();
        return false;

    }
    else {

        let obj = {}

        obj.first_name = document.getElementById("firstName").value;
        obj.last_name = document.getElementById("lastName").value;
        obj.email = document.getElementById("email").value;
        obj.username = document.getElementById("username").value;
        obj.password = document.getElementById("password").value;
        const data = [];
        if (obj.first_name != "" && obj.last_name != "" && obj.email != "" && obj.username != "" && obj.password != "") {
            let res = await postRequest("http://localhost:5000/users/register", obj)
            console.log(res)
            if (res.status == "ok")
                window.location.href = "../login/login.html";
            else {
                alert("User already exist!!");
            }
        }


    }


}

var postRequest = async (url, obj) => {
    console.log(obj)
    let body = JSON.stringify(obj)
    let result = await fetch(url, {
        method: 'POST',
        body: body,
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        },
    });
    let res = await result.json()
    return res
}

