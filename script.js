'use strict';

// prettier-ignore
//GLOBAL VARIABLES  
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let map, mapEvent;

//-------------------------------
//DOM Elements
//-------------------------------

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


//-------------------------------
//Refactoring our code to use classes
//-------------------------------

class App {
    constructor() { };

    _getPosition() { 
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this._loadMap, function () {
                alert('Could not get your position');
            })
        };
    };

    _loadMap(position) { 
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        const coords = [latitude, longitude];
        
        map = L.map('map').setView(coords, 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        //-------------------------------
        //Displaying a Map Marker
        //-------------------------------
        //We are adding an event listener to the map object
        map.on('click', function (mapE) { 
            mapEvent = mapE;
            //Display form
            form.classList.remove('hidden');
            inputDistance.focus();
        })

    };

    _showForm() { };
    _toggleElevationField() { };
    _newWorkout() { };
}

//-------------------------------
//Requesting Geolocation API
//-------------------------------



form.addEventListener('submit', function (e) {

    //Prevent form from submitting
    e.preventDefault();

    //Clear input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

    // Display marker
    const { lat, lng } = mapEvent.latlng;

    L.marker([lat, lng]).addTo(map)
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup',
        })
    )
    .setPopupContent('Workout!')
    .openPopup();
});

inputType.addEventListener('change', function () {
    //We are using closest to go up in the DOM tree to find the parent element with the class form__row
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
});


    
