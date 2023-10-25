// Code here
document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "http://localhost:3000";
    const beerNameElement = document.getElementById("beer-name");
    const beerImageElement = document.getElementById("beer-image");
    const beerDescriptionElement = document.getElementById("beer-description");
    const reviewListElement = document.getElementById("review-list");
    const reviewForm = document.getElementById("review-form");
  
    
    function getFirstBeerDetails() {
      fetch(`${baseUrl}/beers/1`)
        .then((response) => response.json())
        .then((beerData) => {
          
          const { name, description, image_url, reviews } = beerData;
          beerNameElement.textContent = name;
          beerImageElement.src = image_url;
          beerImageElement.alt = name;
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
  
   
    getFirstBeerDetails(); 
    reviewForm.addEventListener("submit", handleReviewSubmission);
  });
  
  

                             