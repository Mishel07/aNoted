

document.querySelector(".otp-btn").addEventListener("click",validate)


async function validate(e) {
    e.preventDefault();
    let otp = document.getElementById("otp").value;
    if(otp){
        let check=sessionStorage.getItem("otp");
        if(check==otp)
            window.location.href="../resetPass/reset.html"
        else
            alert("Invalid otp");
    }
}


