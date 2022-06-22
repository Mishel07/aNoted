var diary_date=sessionStorage.getItem('diary_date');
console.log(diary_date);
document.querySelector(".diary-btn").addEventListener("click", saveNotes)

async function saveNotes(e) {
    e.preventDefault();
    let obj = {}
    obj.username = sessionStorage.getItem("user");
    obj.description = document.getElementById("content").innerHTML;
    obj.diary_date=diary_date;
    if (obj.description != "") {
        let res = await postRequest("http://localhost:5000/diary/add", obj);
        console.log(res);
        alert("Diary saved!!");
        window.location.href = "../diary/diary.html";
    }
    else {
        alert("Description is empty");
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