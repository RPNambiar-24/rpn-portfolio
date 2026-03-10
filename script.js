const roles = [
"Machine Learning Engineer",
"AI Researcher",
"Data Scientist",
"Computer Vision Developer"
]

let roleIndex = 0
let charIndex = 0

const typingElement = document.querySelector(".typing")

function type(){

if(charIndex < roles[roleIndex].length){

typingElement.textContent += roles[roleIndex].charAt(charIndex)

charIndex++

setTimeout(type,80)

}

else{

setTimeout(erase,1500)

}

}

function erase(){

if(charIndex > 0){

typingElement.textContent = roles[roleIndex].substring(0,charIndex-1)

charIndex--

setTimeout(erase,40)

}

else{

roleIndex++

if(roleIndex >= roles.length) roleIndex = 0

setTimeout(type,200)

}

}

document.addEventListener("DOMContentLoaded",type)
