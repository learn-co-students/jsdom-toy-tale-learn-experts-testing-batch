const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false


// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => renderToys(json));
}

function renderToys(json) {
  for (toy of json) {
    renderToy(toy);
  }
}

function renderToy(toy) {
  const spot = document.getElementById('toy-collection');
  const div = createDiv();
  const h2 = createH2(toy);
  const img = createImg(toy);
  const p = createP(toy);
  const button = createButton();
  spot.append(div);
  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(button);
}

function createDiv() {
  div = document.createElement('div');
  div.className = 'card';
  return div;
}

function createH2(toy) {
  const h2 = document.createElement('h2');
  h2.innerText = toy.name;
  return h2;
}

function createImg(toy) {
  const img = document.createElement('img');
  img.src = toy.image;
  img.className = 'toy-avatar';
  return img;
}

function createP(toy) {
  const p = document.createElement('p');
  p.innerText = toy.likes + " Likes";
  return p;
}

function createButton() {
  const button = document.createElement('button');
  button.innerText = "Like <3";
  button.className = "like-btn";
  button.addEventListener('click', function(e){
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(json => updateLikes(json, e));
  });
  return button;
}

document.addEventListener('DOMContentLoaded', function() {
  fetchToys();
  const form = document.getElementsByClassName('add-toy-form')[0];
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const toyName = event.target[0].value;
    const toyImage = event.target[1].value;

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 0
      })
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      renderToy(object);
      toyForm.style.display = 'none';
      document.querySelectorAll('input')[0].value = "";
      document.querySelectorAll('input')[1].value = "";
    })
    .catch(function(error) {
      alert(error.message);
    });
  })
})

function updateLikes(json, e) {
  debugger;
  const toyName = e.target.parentElement.querySelector('h2').innerText;
  const likes = e.target.parentElement.querySelector('p');
  const toy = json.find((toy) => { return toy.name === toyName });
  const numLikes = toy.likes + 1;
  const fetchUrl = "http://localhost:3000/toys/" + toy.id.toString(); 
  fetch(fetchUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: numLikes
    })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    likes.innerText = numLikes + " Likes"
  })
  .catch(function(error) {
    alert(error.message);
  });
}
