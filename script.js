let voiceText = "";

async function analyze(){

const text =
document
.getElementById("message")
.value
.trim();

if(!text){

alert("Enter some text");

return;

}

document
.getElementById("result")
.classList
.remove("hidden");

document
.getElementById("reason")
.innerHTML="Analyzing...";

document
.getElementById("score")
.innerHTML="";

document
.getElementById("verdict")
.innerHTML="";

const bar =
document
.getElementById("bar");

bar.className="";

bar.style.width="0%";

try{

const response=
await fetch(
"http://127.0.0.1:5000/check",
{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify({
text
})

}

);

const data=
await response.json();

const score=
data.score || 0;

voiceText=
`${data.verdict}. ${data.reason}`;

setTimeout(()=>{

bar.style.width=
score+"%";

if(score<35){

bar.className=
"safe";

}

else if(score<70){

bar.className=
"warning";

}

else{

bar.className=
"danger";

}

},100);

document
.getElementById("score")
.innerHTML=
score+
"% Scam Probability";

document
.getElementById("verdict")
.innerHTML=
data.verdict;

document
.getElementById("reason")
.innerHTML=
data.reason;

document
.getElementById("speakBtn")
.style.display=
"block";

}

catch(e){

console.log(e);

document
.getElementById("reason")
.innerHTML=
"Server error or offline.";

}

}

async function speak(){

if(!voiceText){

alert(
"Analyze first"
);

return;

}

try{

const response=
await fetch(
"http://127.0.0.1:5000/voice",
{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify({
text:voiceText
})

}

);

if(
!response.ok
)
throw Error();

const blob=
await response.blob();

const audio=
new Audio(
URL.createObjectURL(
blob
)
);

audio.play();

}

catch{

alert(
"Voice generation failed"
);

}

}