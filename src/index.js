let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});



//Fetch data from json
function fetchToys () {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  // .then(data => console.log(data))
  // .then(data => data.forEach(lostToysData))
  .then(data => data.forEach(toysData))
  .catch(error => console.error('Error: ', error))
}

//Update data to json
function updateToys (toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .catch(error => console.error('Error:', error))
}


//Create new data to post to json
function addNewToy (newToy) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(newToy)
  })
  .then(res =>res.json())
  .then(data => toysData(data))
  .catch(error => console.error('Error: ',error))
} 


//delete 
function deleteToy(id){
  fetch(`http://localhost:3000/toys/${id}`,{
      method:'DELETE',
      headers:{
          'Content-Type':'application/json'
      }
  })
  .catch(error => console.error('Error:', error))
}


// Make the toy cards
function toysData (toy) {
//Add Toy Info to the Card
// Create or select elements into HTML
const div = document.createElement('div');
const h2 = document.createElement('h2');
const img = document.createElement('img');
const p = document.createElement('p');
const button = document.createElement('button'); 

//giving the elements attributes
div.className = 'card';
img.className = 'toy-avatar';
button.className = 'like-btn';
button.id = toy.id;


//fill the inner content of the element
h2.textContent = toy.name;
img.src = toy.image;
button.textContent = 'Like <3'; 

let likeNum = toy.likes;
function setLikeText () {
  if (likeNum === 0) {
    p.textContent = '';
  } else if (likeNum === 1) {
    p.textContent = '1 like';
  } else {
    p.textContent = `${likeNum} likes`
    }
}
setLikeText ();

//appending the elements
document.querySelector('#toy-collection').appendChild(div);
div.append(h2,img,p,button);

//addEventListeners
//like button
button.addEventListener('click', e => {
  likeNum = ++ likeNum;
  if (likeNum === 1) {
    p.textContent = `1 like`
  } else {
  p.textContent = `${likeNum} likes`
  }
  toy.likes = likeNum;
  updateToys (toy);
})

}

//form submission
const form = document.querySelector('.add-toy-form')
form.addEventListener('submit', e => {
  e.preventDefault();
  let newToy = {
  name: e.target.name.value,
  image: e.target.image.value,
  likes: 0
  }
  addNewToy (newToy);
})


fetchToys () 
