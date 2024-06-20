import * as Carousel from './Carousel.js';
import axios from 'axios';

// The breed selection input element.
const breedSelect = document.getElementById('breedSelect');
// The information section div element.
const infoDump = document.getElementById('infoDump');
// The progress bar div element.
const progressBar = document.getElementById('progressBar');
// The get favourites button element.
const getFavouritesBtn = document.getElementById('getFavouritesBtn');

// Step 0: Store API key here .
const API_KEY = 'live_oMMtNX0kUnD3CsxfdK8pRwna6LuTIuZFgzmOSG8nr1g8qGmB2D68IZT2R6gtUEIP';

/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */  
  // part 1 of assignment
  //==========================================================
     document.addEventListener('DOMContentLoaded', intialLoad);

     async function intialLoad() {
       const breedSelect = document.getElementById('breedSelect');

       try {
         const response = await fetch('https://api.thecatapi.com/v1/images/0XYvRd7oD');
         const breeds = await response.json();

         breeds.forEach(breed => {
           const option = document.createElement('option');
           option.value = breed.id;
           option.textContent = breed.name;
           breedSelect.appendChild(option);
         });
       } catch (error) {
        console.log('Error fetching the cat breeds:', error);
       }
     }
    

/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */ 
     breedSelect.addEventListener("change", loadBreedInfo);

     // load initial breed info
     if (breedSelect.options.length > 0 ) {
        loadBreedInfo();
     }

     async function loadBreedInfo() {
      const breedSelect = document.getElementById("breedSelect");
      const carouselInner = document.getElementById("carouselInner");
      const infoDump = document.getElementById("infoDump");

      // clear previous carousel items and info
      carouselInner.innerHTML = "" ;
      infoDump.innerHTML = "";

      const selectedBreedId = breedSelect.value;

      if (!selectedBreedId) {
        return;
      }
       try {
         const response = await fetch(
          ' `https://api.thecatapi.com/v1/images/search?breed_id=${selectedBreedId}&limit=10`'
     );
         const images = await response.json();

         images.forEach((imageData, index) => {
           const carouselItem = document.createElement("div");
           carouselItem.className = 'carousel-item${index === 0 ? "active" : ""}';
           const card = document.createElement("div");
           card.className = "card";

           const imgWrapper = document.createElement("div");
           imgWrapper.className = "img-wrapper" ;

           const img = document.createElement("img");
           img.src = imageData.url;
           img.className = "d-block w-100";
           img.alt = imageData.breeds[0].name;
           imgWrapper.appendChild(img);
           card.appendChild(imgWrapper);
           carouselItem.appendChild(card);
           carouselInner.appendChild(carouselItem);
         });

         const breedInfo = images[0].breeds[0];
         const infoContent = `
                 <h3>${breedInfo.name}</h3>
                 <p>${breedInfo.description}</p>
                 <p><strong>Temperament:</strong> ${breedInfo.temperament}</p>
                 <p><strong>Origin:</strong> ${breedInfo.origin}</p>
                 <p><strong>Life Span:</strong> ${breedInfo.life_span} years</p>
                 <p><strong>Weight:</strong> ${breedInfo.weight.metric} kg</p>
             `;
            infoDump.innerHTML = infoContent;
       } catch (error) {
        console.error("Error fetching breed information:", error);
       }
     }

    

/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.getElementById('breedSelect');
  const carouselInner = document.getElementById('carouselInner');
  const infoDump = document.getElementById('infoDump');
  const progressBar = document.getElementById('progressBar');
  
  async function initialLoad() {
      // Fetch breeds and populate the select element
      const response = await axios.get('/breeds');
      const breeds = response.data;
      
      breeds.forEach(breed => {
          const option = document.createElement('option');
          option.value = breed.id;
          option.textContent = breed.name;
          breedSelect.appendChild(option);
      });

      // Initial load of carousel with the first breed
      if (breeds.length > 0) {
          loadBreedInfo(breeds[0].id);
      }
  }

  async function loadBreedInfo(breedId) {
      if (!breedId) return;

      // Clear existing carousel items and info
      carouselInner.innerHTML = '';
      infoDump.innerHTML = '';

      try {
          // Fetch images for the selected breed
          const response = await axios.get(`/images/search?breed_id=${breedId}&limit=10`);
          const images = response.data;

          images.forEach((imageData, index) => {
              const carouselItem = document.createElement('div');
              carouselItem.className = `carousel-item${index === 0 ? ' active' : ''}`;
              
              const card = document.createElement('div');
              card.className = 'card';
              
              const imgWrapper = document.createElement('div');
              imgWrapper.className = 'img-wrapper';

              const img = document.createElement('img');
              img.src = imageData.url;
              img.className = 'd-block w-100';
              img.alt = imageData.breeds[0].name;

              imgWrapper.appendChild(img);

              const favButton = document.createElement('div');
              favButton.className = 'favourite-button';
              favButton.setAttribute('data-img-id', imageData.id);
              favButton.innerHTML = `
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
                  </svg>
              `;
              favButton.addEventListener('click', () => favourite(imageData.id));

              imgWrapper.appendChild(favButton);
              card.appendChild(imgWrapper);
              carouselItem.appendChild(card);
              carouselInner.appendChild(carouselItem);
          });

          // Update breed info
          const breedInfo = images[0].breeds[0];
          const infoContent = `
              <h3>${breedInfo.name}</h3>
              <p>${breedInfo.description}</p>
              <p><strong>Temperament:</strong> ${breedInfo.temperament}</p>
              <p><strong>Origin:</strong> ${breedInfo.origin}</p>
              <p><strong>Life Span:</strong> ${breedInfo.life_span} years</p>
              <p><strong>Weight:</strong> ${breedInfo.weight.metric} kg</p>
          `;
          infoDump.innerHTML = infoContent;
      } catch (error) {
          console.error('Error loading breed info:', error);
      }
  }

  breedSelect.addEventListener('change', () => {
      const selectedBreedId = breedSelect.value;
      loadBreedInfo(selectedBreedId);
  });

  initialLoad();
});

export async function favourite(imgId) {
  // your code here

   const API_KEY = 'live_oMMtNX0kUnD3CsxfdK8pRwna6LuTIuZFgzmOSG8nr1g8qGmB2D68IZT2R6gtUEIP';
    
    axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
    axios.defaults.headers.common['x-api-key'] = API_KEY;
    
    try {
        // Check if the image is already favourited
        const response = await axios.get('/favourites');
        const favourites = response.data;
        const favourite = favourites.find(fav => fav.image_id === imgId);
        
        if (favourite) {
            // If the image is already favourited, delete the favourite
            await axios.delete(`/favourites/${favourite.id}`);
            console.log(`Removed favourite with ID: ${favourite.id}`);
        } else {
            // If the image is not favourited, post it to the favourites endpoint
            await axios.post('/favourites', {
                image_id: imgId,
                sub_id: 'your_user_id' // Optional, but useful if you need to identify users
            });
            console.log(`Added favourite for image ID: ${imgId}`);
        }
    } catch (error) {
        console.error('Error toggling favourite:', error);
    }
}



/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
