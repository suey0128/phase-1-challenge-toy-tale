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

  getToys()
  .then(data => data.forEach(toysData))
  .catch(error => console.error('Error: ', error))
});



//Fetch GET data from json 'GET'
function getToys () {
  return fetch('http://localhost:3000/toys')
  .then(res => res.json())
}

//fetch 'PATCH'
function updateToys (toy) {
  return fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(res => res.json())
}

//Create new data to post to json 'POST'
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

//fetch 'DELETE'
function deleteToy(id){
  fetch(`http://localhost:3000/toys/${id}`,{
      method:'DELETE',
      headers:{
          'Content-Type':'application/json'
      }
  })
  // .then(res =>res.json())
  // .then(data => toysData(data))
  .catch(error => console.error('Error:', error))
}

// create and display toy cards
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
  if (toy.likes === 0) {
    p.textContent = '';
  } else if (toy.likes === 1) {
    p.textContent = '1 like';
  } else {
    p.textContent = `${toy.likes} likes`
  }

  //appending the elements
  div.append(h2,img,p,button);
  document.querySelector('#toy-collection').append(div);
}


//like button addEventListeners
document.querySelector('#toy-collection').addEventListener('click', e => {
  getToys()
  .then(data => data.forEach(toy => {
    if (toy.name === e.target.parentNode.firstChild.textContent) {
      toy.likes = ++toy.likes
      console.log(e.target.parentNode.firstChild.textContent, toy)
      updateToys (toy)
      .then(toy => {
        if (toy.likes === 1) {
          e.target.parentNode.children[2].textContent = '1 like'
        } else {
          e.target.parentNode.children[2].textContent = `${toy.likes} likes`
        }
      })
      .catch(error => console.error('Error:', error))
    }
  }))
})



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


