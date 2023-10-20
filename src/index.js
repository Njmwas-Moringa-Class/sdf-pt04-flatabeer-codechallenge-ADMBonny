// Code here

function fetchBeerById(beerId) {
    return new Promise((resolve, reject) => {
      fetch(`\Downloads\Phase-1-Code-Challenge-Flatabeer-092921/beers/${beerId}`)
        .then((response) => response.json())
        .then((beerData) => resolve(beerData))
        .catch((error) => reject(error));
    });
  }
  
  
  function fetchAllBeers() {
    return new Promise((resolve, reject) => {
      fetch('\Downloads\Phase-1-Code-Challenge-Flatabeer-092921/beers')
        .then((response) => response.json())
        .then((beersData) => resolve(beersData))
        .catch((error) => reject(error));
    });
  }
  
  
  function updateBeerDetails(beerData) {
    const beerNameElement = document.getElementById('beer-name');
    const beerImageElement = document.getElementById('beer-image');
    const beerDescriptionElement = document.getElementById('beer-description');
    const reviewListElement = document.getElementById('review-list');
  
    beerNameElement.textContent = beerData.name;
    beerImageElement.src = beerData.image_url;
    beerImageElement.alt = beerData.name;
    beerDescriptionElement.textContent = beerData.description;
  
   
    reviewListElement.innerHTML = '';
  
    
    beerData.reviews.forEach((review) => {
      const li = document.createElement('li');
      li.textContent = review;
      reviewListElement.appendChild(li);
    });
  }
  
  
  function updateBeerMenu(beers) {
    const beerListElement = document.getElementById('beer-list');
    beerListElement.innerHTML = '';
  
    beers.forEach((beer, index) => {
      const li = document.createElement('li');
      li.textContent = beer.name;
      li.addEventListener('click', () => {
       
        updateBeerDetails(beer);
      });
  
      beerListElement.appendChild(li);
    });
  }
  
  
  function handleReviewFormSubmission(event) {
    event.preventDefault();
    const reviewTextarea = document.getElementById('review');
    const reviewListElement = document.getElementById('review-list');
  
    const reviewText = reviewTextarea.value;
  
    if (reviewText.trim() !== '') {
      const li = document.createElement('li');
      li.textContent = reviewText;
      reviewListElement.appendChild(li);
      reviewTextarea.value = ''; 
    }
  }
  
  
  const reviewForm = document.getElementById('review-form');
  reviewForm.addEventListener('submit', handleReviewFormSubmission);
  
  
  fetchBeerById(1)
    .then((beerData) => {
      updateBeerDetails(beerData);
      return fetchAllBeers();
    })
    .then((beers) => {
      updateBeerMenu(beers);
    })
    .catch((error) => console.error(error));
  

                             