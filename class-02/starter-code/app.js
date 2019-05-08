// store the photo objects we'll be creating and displaying
const photos = [];

// store keywords that will populate select drop down
const keywords = [];

// construct a Photo given some information fetched externally
function Photo(info) {
    
}

Photo.prototype.render = function () {
    // do what it takes to add Photo to the DOM
}

function loadPhotoData() {

    $.get('someFileSomewhere.json', 'json')
        .then(rawPhotoObjects => {

            // convert the raw photo objects into Photo instances
            // add each instance to photos array
        
        }).then(() => {
            
            // for each Photo instance
            // 1) add the photo's keyword to keywords array, avoid duplicates
            // 2) "render" the photo to the screen

        }).then(() => {

            // populate <select> element with options
            // based on keywords array

        }).then(() => {

            // wire up an event handler that will listen
            // for the 'change' event
            // and show only photos that match selected value
            // should show all if on 'default' selection

        });
}

// when jQuery says document is ready then call function to load photo data
