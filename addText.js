var fs = require('fs');
const d=new Date();

const days=["Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thru",
    "Fri",
    "Sat",
]
const month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const getDay=(ele)=>{
    return days[ele];
}
let counter = 1;
fs.appendFile("logfile.log","["+getDay(d.getDay())+" "+month[d.getMonth()]+" "+d.getDate()+" "+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+" GMT+0530 (India Standard Time)]:"+counter,(err) => {
    if(err) throw err;
    console.log("test file initialized");
});
counter++;
setInterval(function(){
    fs.appendFile("logfile.log","\n["+getDay(d.getDay())+" "+month[d.getMonth()]+" "+d.getDate()+" "+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+" GMT+0530 (India Standard Time)]:"+counter,(err) => {
    if(err) console.log(err);
    console.log("log updated");
    });
    counter++;
},1000);