const date = new Date();
var month;
var year;

async function diaryVisited(){
  let obj = sessionStorage.getItem("user");
  let res = await checkRequest("http://localhost:5000/diary/all",obj);
  console.log(res)
  var monthDates = [];
  for(let j=0;j<res.length;j++){
    var dates = res[j].diary_date.split(" ");
    if(dates[1] == month && dates[2] == year){
        monthDates.push(dates[0]);
    }
  }
  for(let j=0;j<monthDates.length;j++){
    document.getElementById(monthDates[j]).style.color="red";
  }
}

var checkRequest = async(url,obj)=>{
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

diaryVisited();

async function getDiary(data){
  var day=data.id+" "+month+" "+year;
  console.log(day);
  sessionStorage.setItem("diary_date",day);
  let obj = {}
  obj.username = sessionStorage.getItem("user");
  obj.day=day;
  let res = await getRequest("http://localhost:5000/diary/searchByDate", obj);
  console.log(res);
  if(!res)
    window.location.href="../diaryNotes/notes.html";
  else{
    sessionStorage.setItem("desc",res.description);
    sessionStorage.setItem("day",res.diary_date);
    window.location.href="../viewDiary/notes.html";
  }
}

var getRequest = async (url, obj) => {
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

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay()+1;

  const nextDays = 7 - lastDayIndex;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];
  month=months[date.getMonth()];
  year=new Date().getFullYear();

  let days = "";
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
      days += `<div id="today" onclick="getDiary(this)">${i}</div>`;
    } else {
      days += `<div id="${i}" onclick="getDiary(this)">${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
  }
  monthDays.innerHTML = days;
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
  diaryVisited();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
  diaryVisited();
});

renderCalendar();
