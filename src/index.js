// Code here
document.addEventListener("DOMContentLoaded", () => {
  const baseUrl = "http://localhost:3000";
  const beerNameElement = document.getElementById("beer-name");
  const beerImageElement = document.getElementById("beer-image");
  const beerDescriptionElement = document.getElementById("beer-description");
  const reviewListElement = document.getElementById("review-list");
  const beerMenu = document.getElementById("beer-list");
  const reviewForm = document.getElementById("review-form");

  const beerImages = {}; 

  
  function preloadBeerImages(beers) {
    beers.forEach((beer) => {
      const image = new Image();
      image.src = beer.image_url;
      beerImages[beer.id] = image;
    });
  }

  
  function getAllBeers() {
    fetch(`${baseUrl}/beers`)
      .then((response) => response.json())
      .then((beers) => {
        
        preloadBeerImages(beers);

        
        beerMenu.innerHTML = beers.map((beer) => {
          return `<li data-beer-id="${beer.id}">${beer.name}</li>`;
        }).join("");
        
        
        const beerMenuItems = beerMenu.querySelectorAll("li");
        beerMenuItems.forEach((menuItem) => {
          menuItem.addEventListener("click", (event) => {
            const beerId = event.target.getAttribute("data-beer-id");
            displayBeerDetails(beerId);
          });
        });

        
        displayBeerDetails(beers[0].id);
      })
      .catch((error) => console.error("Error fetching beers:", error));
  }

  
  function displayBeerDetails(beerId) {
    
    beerImageElement.src = beerImages[beerId].src;

    fetch(`${baseUrl}/beers/${beerId}`)
      .then((response) => response.json())
      .then((beerData) => {
        
        const { name, description, reviews } = beerData;
        beerNameElement.textContent = name;
        beerDescriptionElement.textContent = description;

        
        reviewListElement.innerHTML = reviews.map((review) => `<li>${review}</li>`).join("");
      })
      .catch((error) => console.error("Error fetching beer details:", error));
  }

  
  function handleReviewSubmission(event) {
    event.preventDefault(); 

    
    const newReview = document.getElementById("review").value;

    
    reviewListElement.innerHTML += `<li>${newReview}</li>`;

    
    document.getElementById("review").value = "";
  }

  
  getAllBeers(); 
  reviewForm.addEventListener("submit", handleReviewSubmission);
});
