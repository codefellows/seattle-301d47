'use strict';

// why is Dog with a capital D?
// Is this a rule or convention?
function Dog(dog) {
  this.name = dog.name;
  this.image_url = dog.image_url; // how do you feel about this name?
  this.hobbies = dog.hobbies;
}

// A function is actually an Object
// and can have properties
Dog.allDogs = [];

// why no arrow function here?
Dog.prototype.render = function() {

  const dogClone = $('#dog-template').clone();

  // what is 'this' ?
  dogClone.find('h2').text(this.name);
  dogClone.find('img').attr('src', this.image_url);
  dogClone.find('p').text(this.hobbies);
  dogClone.addClass(this.name); // vs. dogClone.attr('class', this.name)'
  dogClone.removeAttr('id');
  dogClone.removeClass('hidden');

  $('#dog-spot').append(dogClone);
};

Dog.readJson = () => {

  // whoah, that's not a callback
  $.get('data.json', 'json')
    .then(data => {
      data.forEach(item => {
        Dog.allDogs.push(new Dog(item));
      });
    })
    .then(Dog.renderDogs);
};

// why arrow function ok?
Dog.renderDogs = () => {
  Dog.allDogs.forEach(dog => dog.render());
};

// what's going on down below?
$(document).ready(function() {
  Dog.readJson();
});
// $(() => Dog.readJson());
// $(Dog.readJson);
