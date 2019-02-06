document.addEventListener("DOMContentLoaded", () => {

const dogUrl = 'http://localhost:3000/pups'
let dogBar = document.querySelector('#dog-bar')
let dogInfo = document.querySelector('#dog-info')


//this initial funtion calls all pups
//the callback on the data is a funon that operates on an individual
fetch(dogUrl)
.then(res => res.json())
.then(pups => {
	pups.forEach(displayPup)
})

//just add data-id to each span
function displayPup(pup){
	dogBar.innerHTML += `<span class="dog-span" data-id=${pup.id}>${pup.name}</span>`
}

//By using document you can elseif through clicks if needs be instead of creating new event addEvent
document.addEventListener("click", (e) => {
	e.preventDefault()
	if(e.target.className === "dog-span"){
	  dogCard(e)
	} else if(e.target.className === 'status-btn'){
		changeStatus(e)
	}
})

function dogCard(e){
	let id = e.target.dataset.id
	fetch(`${dogUrl}/${id}`)
	.then(res => res.json())
	.then(displayCard)
}

function displayCard(pup){

	let button
	if(pup.isGoodDog){
		button = `<button data-id=${pup.id} class="status-btn">Good Dog!</button>`
	}else {
	  button = `<button data-id=${pup.id} class="status-btn">Bad Dog!</button>`
	}


	dogInfo.innerHTML = `<img src=${pup.image}>
  <h2>${pup.name}</h2>
	 ${button}`
}

function changeStatus(e){
	let id = e.target.dataset.id

	let status

	if(e.target.innerText === "Good Dog!"){
		e.target.innerText= 'Bad Dog!'
		status = false
	} else {
		e.target.innerText= 'Good Dog!'
		status = true
	}
	e.target.innerText
	fetch(`${dogUrl}/${id}`,{
		method: "PATCH",
		headers: {
			"Content-type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({isGoodDog: status})
	})

}











})
