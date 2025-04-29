Sky Prime Frontend Technical Task – Vanilla JavaScript Dashboard

Check out the live demo [here](https://mpetrov99.github.io/Vanilla_Javascript_Dashboard.MPetrov99.github.io/).

Project Overview

This project is a fully responsive dashboard built using HTML, CSS (with SCSS syntax), and Vanilla JavaScript — no frameworks. It demonstrates a clean, modern user interface with dynamic user interaction, responsive behavior across devices, and API-driven content.

Features:
- Responsive Navigation Menu.
- Mobile-first hamburger menu that toggles a dropdown.
- Full menu visible on larger screens (≥768px).

Dashboard Layout:
- Sidebar navigation with clickable options.
- Main section displaying a list of users.

Dynamic User Listing:
- Fetches user data from https://jsonplaceholder.typicode.com/users.
- Displays users in styled cards.
- Real-time search functionality to filter users by name.

Interactive Modal:
- Clicking a user opens a modal.
- Modal fetches and displays posts by the selected user.
- Loading spinner shown while fetching posts.

Fully Responsive Design:
- Mobile, tablet, and desktop layouts handled via media queries.
- Adaptive grid layout for the user list.

Error Handling:
- Friendly error messages if data fetching fails.

Technologies Used:
- HTML5 – for structuring the page.
- CSS3 – for styling with nested rules and reusable patterns.
- Vanilla JavaScript – for all interactivity (DOM manipulation, API calls, event handling).

How to Run:
- Clone/download the project.
- Ensure the files remain in the provided structure (assets/ folder intact).
- Open index.html in your preferred browser.
- Interact with the dashboard — search users, click user cards, explore posts!
- No local server needed. Pure static front-end project.

Possible Improvements:
- Add routing (e.g., with a library or Vanilla JS hash-routing) for better user experience.
- Integrate a backend or database for real user management.
- Implement pagination for users/posts if the dataset becomes large.
- Refactor styles using a preprocessor pipeline (Sass compiling).
