# Mapty

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/dbb103c3-1076-4ef9-ba98-c5cb0ff28c05" />

## 📌 Project Overview
**Mapty** is a workout logging application that combines geolocation, interactive maps, and local storage. The app allows users to track their **running** and **cycling** workouts directly on a map.

The main features include:
- A **map interface** (loaded from a third-party service).
- A **sidebar** for workout details.
- Automatic detection of the user’s location via the **Geolocation API**.
- Dynamic **map markers** and popups for each logged workout.
- Persistent storage of workouts in the browser (data remains after reload).


## ⚙️ Features
- **Geolocation**: Automatically centers the map based on the user’s location.
- **Workout Logging**: Add details such as distance, duration, cadence (for running), or elevation gain (for cycling).
- **Dynamic Map Pins**: Each workout creates a pin on the map with a pop-up summary.
- **Interactive Sidebar**: Clicking a workout in the sidebar pans the map to the corresponding pin.
- **Persistent Data**: Workouts are saved to browser storage and restored when the page is reloaded.


## 👩🏻‍💻 Tech Stack
- **JavaScript (ES6+)**
- **HTML5 / CSS3**
- **Leaflet.js** (for maps)
- **Browser APIs**: 
  - Geolocation API
  - Local Storage API


## ⭐ Key Takeaways
- Built a workout logging application featuring a map interface.  
- Integrated **browser geolocation API** to obtain user position.  
- Implemented **persistent data storage** using Local Storage.  
- Demonstrated **dynamic UI updates** with map markers and workout lists.  


## 🏄🏻‍♀️ How to Use
1. Clone the repository:
   ```bash
   git clone [<your-repo-url>](https://github.com/Emboiss13/Mapty.git)
   ```
2. Open index.html in your browser.

3. Allow location access when prompted.

4. Start logging workouts directly on the map!

## 👨‍🏫 Lecturer 
This project is part of the course taught by Jonas Schmedtmann on [Udemy](udemy.com/course/the-complete-javascript-course/learn/).
