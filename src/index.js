const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const newToyForm = document.querySelector('.add-toy-form')
const toyContainer = document.querySelector('#toy-collection')
let addToy = false

// YOUR CODE HERE

window.onload = () => {
  fetchToys()
  newToyForm.addEventListener('submit', addNewToy)
}

const fetchToys = () => {
  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(toys) {
      toys.forEach( (toy) => {
        toyContainer.innerHTML += generateToy(toy)
      })
    })
    .catch(function(error) {
      alert("Bad things! Ragnarők!");
      console.log(error.message);
    });
}

const generateToy = (toy) => {
  return  toyDiv = `
    <div class="card" id=${toy.id}>
      <h2> ${toy.name} </h2>
      <img src="${toy.image}" class="toy-avatar"/>
      <p class="likes">${toy.likes} Likes</p>
      <button onClick=incrementLikes(event) class="like-btn">Like <3</button>
    </div>
  `
}

const incrementLikes = (event) => {
  event.preventDefault()

  parentElement = event.target.parentElement
  const likes = parentElement.children[2]
  numLikes = parseInt(likes.innerText)
  likes.innerText = `${ numLikes += 1 } Likes`

  let patchData = {
    likes: numLikes
  };

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },

    body: JSON.stringify(patchData)
  };

  fetch(`http://localhost:3000/toys/${parentElement.id}`, configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    console.log(object);
  })
  .catch(function(error) {
    alert("Bad things! Ragnarők!");
    console.log(error.message);
  });
  //debugger
}

addNewToy = (event) => {
  event.preventDefault();

  let formData = {
    name: event.target[0].value,
    image: event.target[1].value,
    likes: 0
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },

    body: JSON.stringify(formData)
  };

  fetch("http://localhost:3000/toys", configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(toy) {
    toyContainer.innerHTML += generateToy(toy)
    newToyForm.reset()

  })
  .catch(function(error) {
    alert("Bad things! Ragnarők!");
    console.log(error.message);
  });
}



addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  addBtn.innerText = addToy ? "Hide Form" : "Add a new toy!"
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
