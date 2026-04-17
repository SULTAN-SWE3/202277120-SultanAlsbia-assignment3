# Technical Documentation

## Project Overview
This assignment 3 portfolio is a static front-end website that demonstrates advanced client-side functionality. It builds on the earlier portfolio by combining API integration, conditional rendering, persistent state, multi-step validation, and performance improvements in a simple file structure.

## Implemented Requirements

### 1. API Integration
- The website connects to the GitHub REST API using `fetch`.
- It requests the latest public repositories for the GitHub user `sultan-swe3`.
- The interface displays repository name, language, update date, star count, and a direct GitHub link.
- If the request fails or returns no usable data, a friendly error message is shown instead of breaking the page.

### 2. Complex Logic
- The project explorer combines two conditions:
  - category filter
  - selected viewer track
- The filtered results can then be sorted by:
  - newest date
  - oldest date
  - alphabetical title
- The viewer track selector changes the recommendation message and highlights matching projects.
- The contact form uses multiple rules before allowing a successful result:
  - all fields must be completed
  - name must be at least 3 characters
  - email must match a valid pattern
  - message must contain at least 20 characters
- A visit timer counts how long the user has stayed on the page during the current session.

### 3. State Management
- The selected light or dark theme is saved in `localStorage`.
- The visitor name is saved and restored.
- The selected viewer track is saved and reapplied after reload.
- The visibility state of the welcome panel is also saved.
- A shared JavaScript state object keeps the UI consistent while filters, sorting, and track changes happen together.

### 4. Performance
- The project keeps a lightweight static structure with no framework overhead.
- CSS and JavaScript were rewritten to remove older assignment 2 logic that was no longer needed.
- DOM updates are limited to the specific sections that change, such as the projects list and repository list.
- The design uses efficient card-based rendering and avoids unnecessary repeated event logic.
- Existing local image assets were not expanded with large new files, helping keep the project size small.

### 5. Code Quality
- HTML is organized into clear semantic sections.
- CSS uses reusable variables for theme management and visual consistency.
- JavaScript is split into focused functions for state updates, rendering, validation, and API loading.
- Comments were kept minimal and the code was cleaned to reduce clutter.

## File Responsibilities
- `index.html`: page structure, controls, sections, and accessible content containers
- `css/styles.css`: themes, layout, responsive rules, component styling, and transitions
- `js/script.js`: state management, filtering, sorting, validation, timer logic, GitHub API loading, and UI rendering
- `docs/ai-usage-report.md`: record of AI tools and responsible use
- `README.md`: project summary and setup instructions

## How to Test
1. Open `index.html` in a browser.
2. Toggle the theme and refresh the page to verify persistence.
3. Enter a visitor name and refresh to verify it stays saved.
4. Hide and show the welcome panel and refresh to verify the saved state.
5. Change the viewer track, then confirm the recommendation message and project cards update.
6. Use the category filter and sort menu together to confirm combined logic works correctly.
7. Submit the contact form with invalid and valid input to verify validation messages.
8. Confirm that the GitHub repository cards load and that the reload button works.

## Browser Compatibility
The website is intended to work in current versions of:
- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari
