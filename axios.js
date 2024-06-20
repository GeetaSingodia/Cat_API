/* 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */


document.addEventListener("DOMContentLoaded", initialLoad);

// Step 0: Store API key here 
// const API_KEY =
//   "live_oMMtNX0kUnD3CsxfdK8pRwna6LuTIuZFgzmOSG8nr1g8qGmB2D68IZT2R6gtUEIP";

// // Set default Axios configuration
// axios.defaults.baseURL = "https://api.thecatapi.com/v1";
// axios.defaults.headers.common["x-api-key"] = API_KEY;

// async function initialLoad() {
//   const breedSelect = document.getElementById("breedSelect");

//   try {
//     const response = await axios.get("/breeds");
//     const breeds = response.data;

//     breeds.forEach((breed) => {
//       const option = document.createElement("option");
//       option.value = breed.id;
//       option.textContent = breed.name;
//       breedSelect.appendChild(option);
//     });

//     breedSelect.addEventListener("change", loadBreedInfo);

//     // Load initial breed info
//     if (breedSelect.options.length > 0) {
//       loadBreedInfo();
//     }
//   } catch (error) {
//     console.error("Error fetching the cat breeds:", error);
//   }
// }

// async function loadBreedInfo() {
//   const breedSelect = document.getElementById("breedSelect");
//   const carouselInner = document.getElementById("carouselInner");
//   const infoDump = document.getElementById("infoDump");

//   // Clear previous carousel items and info
//   carouselInner.innerHTML = "";
//   infoDump.innerHTML = "";

//   const selectedBreedId = breedSelect.value;

//   if (!selectedBreedId) {
//     return;
//   }

//   try {
//     const response = await axios.get(
//       `/images/search?breed_id=${selectedBreedId}&limit=10`
//     );
//     const images = response.data;

    // images.forEach((imageData, index) => {
    //   const carouselItem = document.createElement("div");
    //   carouselItem.className = `carousel-item${index === 0 ? " active" : ""}`;
    //   const card = document.createElement("div");
    //   card.className = "card";

    //   const imgWrapper = document.createElement("div");
    //   imgWrapper.className = "img-wrapper";

    //   const img = document.createElement("img");
    //   img.src = imageData.url;
    //   img.className = "d-block w-100";
    //   img.alt = imageData.breeds[0].name;

//       imgWrapper.appendChild(img);
//       card.appendChild(imgWrapper);
//       carouselItem.appendChild(card);
//       carouselInner.appendChild(carouselItem);
//     });

//     const breedInfo = images[0].breeds[0];
//     const infoContent = `
//             <h3>${breedInfo.name}</h3>
//             <p>${breedInfo.description}</p>
//             <p><strong>Temperament:</strong> ${breedInfo.temperament}</p>
//             <p><strong>Origin:</strong> ${breedInfo.origin}</p>
//             <p><strong>Life Span:</strong> ${breedInfo.life_span} years</p>
//             <p><strong>Weight:</strong> ${breedInfo.weight.metric} kg</p>
//         `;
//     infoDump.innerHTML = infoContent;
//   } catch (error) {
//     console.error("Error fetching breed information:", error);
//   }
// }

/* 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

// Add Axios interceptors
axios.interceptors.request.use(request => {
    request.metadata = { startTime: new Date() };
    console.log(`Starting request to ${request.url} at ${request.metadata.startTime}`);
    return request;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    response.config.metadata.endTime = new Date();
    const duration = response.config.metadata.endTime - response.config.metadata.startTime;
    console.log(`Request to ${response.config.url} took ${duration} ms`);
    return response;
}, error => {
    return Promise.reject(error);
});

async function initialLoad() {
    const breedSelect = document.getElementById('breedSelect');
}

// part 6 of assignment  and part 7 combine both
//-------------------------------------------------------

document.addEventListener('DOMContentLoaded', initialLoad);

// Step 0: Store  API key here  
const API_KEY = "live_oMMtNX0kUnD3CsxfdK8pRwna6LuTIuZFgzmOSG8nr1g8qGmB2D68IZT2R6gtUEIP";

// Set default Axios configuration
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] = API_KEY;

// Add Axios interceptors
axios.interceptors.request.use(request => {
    request.metadata = { startTime: new Date() };
    console.log(`Starting request to ${request.url} at ${request.metadata.startTime}`);
    
    // Reset the progress bar
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = '0%';

    // Set the cursor style to "progress"
    document.body.style.cursor = 'progress';
    
    return request;
}, error => {
    // Remove the progress cursor style
    document.body.style.cursor = 'default';
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    response.config.metadata.endTime = new Date();
    const duration = response.config.metadata.endTime - response.config.metadata.startTime;
    console.log(`Request to ${response.config.url} took ${duration} ms`);
    
    // Complete the progress bar
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = '100%';

    // Remove the progress cursor style
    document.body.style.cursor = 'default';
    
    return response;
}, error => {
    // Remove the progress cursor style
    document.body.style.cursor = 'default';
    return Promise.reject(error);
});

// Update progress function
function updateProgress(event) {
    const progressBar = document.getElementById('progressBar');
    if (event.lengthComputable) {
        const percentCompleted = Math.round((event.loaded * 100) / event.total);
        progressBar.style.width = `${percentCompleted}%`;
    }
    console.log(event);
}

async function initialLoad() {
    const breedSelect = document.getElementById('breedSelect');

    try {
        const response = await axios.get('/breeds');
        const breeds = response.data;

        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            breedSelect.appendChild(option);
        });

        breedSelect.addEventListener('change', loadBreedInfo);

        // Load initial breed info
        if (breedSelect.options.length > 0) {
            loadBreedInfo();
        }
    } catch (error) {
        console.error('Error fetching the cat breeds:', error);
    }
}

async function loadBreedInfo() {
    const breedSelect = document.getElementById('breedSelect');
    const carouselInner = document.getElementById('carouselInner');
    const infoDump = document.getElementById('infoDump');

    // Clear previous carousel items and info
    carouselInner.innerHTML = '';
    infoDump.innerHTML = '';

    const selectedBreedId = breedSelect.value;

    if (!selectedBreedId) {
        return;
    }

    try {
        const response = await axios.get(`/images/search?breed_id=${selectedBreedId}&limit=10`, {
            onDownloadProgress: updateProgress
        });
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
        console.error('Error fetching breed information:', error);
    }
}
