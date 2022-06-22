

document.querySelector(".forgot-btn").addEventListener("click", validate)


async function validate(e) {
    e.preventDefault();
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let mail = document.forms["loginForm"]["emailid"].value;
    if (mail == "") {
        alert("Please enter your email id to change the password!");
        document.loginForm.emailid.focus();
        return false;
    }
    
    else if (!mail.match(mailformat)) {

        alert("You have entered an invalid email address!");
        document.loginForm.emailid.focus();
        return false;

    }
    else {

        let obj = {}
        obj.email = document.getElementById("email").value;
        if (obj.email != "") {
            let res = await postRequest("http://localhost:5000/users/forgotPass", obj);
            console.log(res)
            if (!res.error) {
                sessionStorage.setItem("otp", res.otp);
                window.location.href = "../otpCheck/otp.html";
            }
            else
                alert("Email not registered");
        }


    }


}


var postRequest = async (url, obj) => {
    // console.log(obj)
    let body = JSON.stringify(obj)

    let result = await fetch(url, {
        method: 'POST',
        body: body,
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        },
    });
    let res = await result.json();
    return res
}