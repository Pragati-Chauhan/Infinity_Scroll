// Unsplash API
let count = 5;
const apikey ='BrdhyzuvVt2Du3M9U8ucoSUp453jy6m4frx5NP-L2L8';
const imagecontainer = document.getElementById("image-container");
const loader = document.getElementById('loader');
let ready=false;
let imagesloaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;
let apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

// Check if all images were loaded
function imageloaded(){
    imagesloaded++;
    if (imagesloaded === totalImages)
        {
            ready = true;
            loader.hidden=true;
            initialLoad=false;
            count=30;
            apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;
        }
}

// Helper function for set attribute ondom elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos(){
    totalImages=photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo)=>{
        // create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank',
        });
        // Create <img> for photo
        const img=document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.user.instagram_username,
        });
        // Event listener, check when each is finished loading
        img.addEventListener('load',imageloaded);
        // Put image inside <a> then put both inside image container
        item.appendChild(img);
        imagecontainer.appendChild(item);
    }
    )
}

// Get photos from unsplash API
async function getphotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(err){
        //When we get error
    }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll',()=>{
    if (window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready)
    {
        ready=false;
        imagesloaded=0;
        getphotos();
    }
});

// On Load
getphotos();