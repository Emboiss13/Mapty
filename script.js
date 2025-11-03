'use strict';

// prettier-ignore
//GLOBAL VARIABLES  
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
// Managing workout data
//-------------------------------

class Workout {

    date = new Date();

    //Usually we would generate id using a library but for simplicity we will use this method
    id = (Date.now() + Math.random().toString().slice(2, 6) + '').slice(-10);

    constructor(coords, distance, duration) {
        this.coords = coords; // [lat, lng]
        this.distance = distance; // in km
        this.duration = duration; // in min
    }
}

class Running extends Workout { 
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration); //initializing the parent class or this keyword
        this.cadence = cadence;
        this.calcPace(); //We call the method here to set the pace property when a new object is created
    }

    calcPace() { 
        //min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
};

class Cycling extends Workout { 
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
    }

    calcSpeed() {
        // km/h
        this.speed = this.distance / (this.duration / 60); // convert min to hours (dividing by 60)
        return this.speed;
    }
};

const run1 = new Running([39, -12], 5.2, 24, 178);
const cycling1 = new Cycling([39, -12], 27, 95, 523);
console.log(run1, cycling1);

//-------------------------------
// App Architecture
//-------------------------------

class App {
    #map;
    #mapEvent;

    constructor() { 
        //Get user's position
        this._getPosition();
        //Attach event handlers
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField.bind(this));
    };

    _getPosition() { 
        if (navigator.geolocation) {
            //We have to bind this to the _loadMap method because otherwise this would point to the global object. Returning undefined in strict mode...
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this), function () {
                alert('Could not get your position');
            })
        };
    };

    _loadMap(position) { 
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        const coords = [latitude, longitude];
        
        this.#map = L.map('map').setView(coords, 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        //Displaying a Map Marker
        //We are adding an event listener to the map object
        this.#map.on('click', this._showForm.bind(this));

    };

    _showForm(mapE) { 
        this.#mapEvent = mapE;
        //Display form
        form.classList.remove('hidden');
        inputDistance.focus();
    };

    _toggleElevationField() { 
        //We are using closest to go up in the DOM tree to find the parent element with the class form__row
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    };

    _newWorkout(e) { 
        //Prevent form from submitting
        e.preventDefault();

        //Clear input fields
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

        // Display marker
        const { lat, lng } = this.#mapEvent.latlng;

        L.marker([lat, lng]).addTo(this.#map)
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
    };
}


//-------------------------------
//Create and object of the App class
//This will automatically call the constructor method
//-------------------------------
const app = new App();