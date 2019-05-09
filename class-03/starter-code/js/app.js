'use strict';

function Image(item) {
  // TODO: set properties on instance with values from item input
}

Image.prototype.render = function() {
  // TODO: use Handlebars to render Image markup
};

// NOTE: we have 2 json files to potentially read now 
Image.readJson = (page) => {
  
  // why are we doing this here instead of once on start up?
  Image.all = [];

  // clear out any old images to make room for new
  $('#image-container').empty();

  $.get(`data/maybe-page-1-or-maybe-page-2.json`).then(data => {

    // TODO: convert each raw data item into Image instance
    // and add them to appropriate array
  
    // TODO: add each "rendered" Image to the DOM

    // TODO: populate the keyword filter

  });
};

// Probably a way to make a generic sortByProperty method
Image.sortByHorns = (array) => {
  array.sort((a, b) => {
    // TODO: sort by horns property
  });
};

// Probably a way to make a generic sortByProperty method
Image.sortByTitle = (array) => {
  array.sort((a, b) => {
    // TODO: sort by title property
  });
};

Image.populateFilter = () => {
  let filterKeywords = [];

  // the first <option> is the default one which we don't want to lost
  // notice the handy 'not' method
  $('option').not(':first').remove();

  // TODO: make unique set of keywords
  // and create/add options to select element
  // based off the keywords

};

Image.handleFilter = () => {
  $('select').on('change', function() {
    // selected filter has changed
  });
};

Image.handleSort = () => {
  $('input').on('change', function() {
    // sort choice has changed
  });
};

Image.handleNavEvents = () => {
  $('footer ul, header ul').on('click', 'li', function() {
    $('#image-container').empty();

    // TODO: user has switched pages
    // what should we do? It's a pretty big deal
    
  });
};

$(() => {

  // document is ready
  // so fetch the data
  Image.readJson(1);

  // and do any other things that don't first require data to be finished loading
  // e.g. wire up event handlers

});
