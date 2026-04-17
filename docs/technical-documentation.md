# Technical Documentation

## Project Overview
This project is an interactive personal portfolio website built for Assignment 2. It extends the earlier static portfolio by adding dynamic content, saved preferences, user feedback, and improved visual transitions.

## Implemented Requirements

### 1. Dynamic Content
The portfolio includes multiple user-driven dynamic features:
- Tab buttons switch between About, Projects, and Skills content without reloading the page.
- A live search field filters project cards while the user types.
- A personalized greeting updates based on the visitor name and the current time of day.

### 2. Data Handling
The project uses JavaScript data handling with `localStorage`:
- The selected theme is saved and restored when the user revisits the page.
- The visitor name is saved and reused to display a personalized greeting.

### 3. Animation and Transitions
The interface uses light animations to improve the experience:
- Smooth hover transitions on buttons and cards
- Fade and slide reveal animations when sections enter the viewport
- Animated visual change when switching tab panels

### 4. Error Handling and User Feedback
The project provides clear feedback in multiple cases:
- The contact form shows an error if required fields are empty.
- The email field is checked for valid format.
- The message field requires a minimum length.
- A success message is shown after valid submission.
- The project filter shows an empty-state message when no matches are found.

## File Responsibilities
- `index.html`: semantic page structure, content areas, tabs, search input, and form
- `css/styles.css`: layout, responsive design, themes, transitions, and component styling
- `js/script.js`: theme persistence, greeting logic, tab switching, project filtering, validation, and reveal animation behavior

## How to Run
1. Download or clone the repository.
2. Open `index.html` in a modern web browser.
3. Test the interactive features:
   - switch the theme
   - enter a visitor name and save it
   - switch tabs
   - search for projects
   - submit the contact form with valid and invalid inputs

## Browser Compatibility
The website is designed to work on current versions of:
- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

## Performance Notes
- The project uses only plain HTML, CSS, and JavaScript.
- Images are local assets, which keeps loading simple.
- The JavaScript is lightweight and focused on small DOM updates.
