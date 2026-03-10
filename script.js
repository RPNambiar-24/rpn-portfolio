/* typing animation */

const roles=[
"Machine Learning Engineer",
"AI Researcher",
"Data Scientist",
"Computer Vision Developer"
]

let roleIndex=0
let charIndex=0

const typing=document.querySelector(".typing")

function type(){

if(charIndex<roles[roleIndex].length){

typing.textContent+=roles[roleIndex].charAt(charIndex)

charIndex++

setTimeout(type,80)

}

else{

setTimeout(erase,1500)

}

}

function erase(){

if(charIndex>0){

typing.textContent=roles[roleIndex].substring(0,charIndex-1)

charIndex--

setTimeout(erase,40)

}

else{

roleIndex++

if(roleIndex>=roles.length)roleIndex=0

setTimeout(type,200)

}

}

document.addEventListener("DOMContentLoaded",type)


/* theme toggle */

const toggle=document.getElementById("themeToggle")

toggle.onclick=()=>{

document.body.classList.toggle("light")

}


/* particle background */

tsParticles.load("particles",{

particles:{

number:{value:80},

size:{value:3},

move:{speed:1},

links:{enable:true},

color:{value:"#38bdf8"}

},

background:{color:"transparent"}

})
