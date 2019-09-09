const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const collection = document.querySelector('#toy-collection')
let addToy = false

addBtn.addEventListener('click', () => {
  // toggles the form - only shows when you click button
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

function getToys(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toyArray => addToyDivs(toyArray))
}

function addToyDivs(array){
  for(let i = 0; i < array.length; i++){
    addToyDiv(array[i])
  }
}

function addToyDiv(toy){  // could refactor this into several functions, depends on student
  let div = document.createElement("div")
  let h = document.createElement("h2")
  let img = document.createElement("img")
  let button = document.createElement("BUTTON")
  let p = document.createElement("p")

  h.innerHTML = toy.name
  img.src = toy.image
  img.classList.add("toy-avatar")
  // if (toy.likes !== 0){ // guess it depends if you want to display "0 likes" or not
    p.innerHTML = `${toy.likes} Likes`
  // }

  button.classList.add("like-btn")
  button.innerText = "Like <3"
  button.addEventListener('click', e => {
   fetch('http://localhost:3000/toys')
   .then(resp => resp.json())
   .then(toys => updateLikes(toys, e));
  });

  div.classList.add("card")
  div.append(h)
  div.append(img)
  div.append(button)
  div.append(p)
  collection.append(div)
}

function updateLikes(toys, e){

  const name = e.target.parentElement.querySelector('h2').innerText
  const likesElement = e.target.parentElement.querySelector('p')
  const toy = toys.find(toy => name === toy.name);

  likesElement.innerText = `${parseInt(likesElement.innerText) + 1} Likes`

  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({likes: toy.likes + 1})
  })
  .then(resp => resp.json())
  .then(object => object) // could also update the DOM here
  .catch(error => alert(error.message));
}

function fetchToy(name, imageUrl){
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: imageUrl,
      likes: 0
    })
  })
  .then(resp => resp.json())
  .then(toy => addToyDiv(toy))
  .catch(error => alert(error.message));
}

document.addEventListener("DOMContentLoaded", function() {
  getToys()

  const form = document.getElementsByClassName('add-toy-form')[0];

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = event.target[0].value;
    const imageUrl = event.target[1].value;

    fetchToy(name, imageUrl)
    toyForm.style.display = 'none';
    document.querySelectorAll('input')[0].value = "";
    document.querySelectorAll('input')[1].value = "";
  })

});
