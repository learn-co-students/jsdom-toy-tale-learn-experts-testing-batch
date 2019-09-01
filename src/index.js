const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let toyCollection = document.querySelector('#toy-collection')

// YOUR CODE HERE

//need to start json server and run open index.html

window.onload = () => {
  fetchToys()
  toyForm.addEventListener('submit', addNewToy)
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

function fetchToys() {
  //make get request to fetch all toys
  fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    json.forEach(function(toy){
      toyCollection.innerHTML += makeCard(toy);
    })
  });

}

function makeCard(toy) {
  console.log(toy)
  return `
    <div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
    </div>
  `

}


function addNewToy(event) {
  event.preventDefault();
  //"http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png"
  let data = {
     name: event.target[0].value,
     image: event.target[1].value,
     likes: 0
  };
  let postedToy = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },

      body: JSON.stringify(formData)
    };
    fetch("http://localhost:3000/toys", postedToy)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json)

    })
}
