// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerImg = document.querySelector('.hamburger img');
    const itemsContainer = document.querySelector('.hamburger .items');

    hamburgerImg.addEventListener('click', (event) => {
        // .stopPropagation() to preventing default and stop the stacking on click events
        event.stopPropagation();
        itemsContainer.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
        if (!itemsContainer.contains(event.target) && !hamburgerImg.contains(event.target)) {
            itemsContainer.classList.remove('active');
        }
    });

// Dashboard functionality
    const userList = document.getElementById('user-list');
    const searchInput = document.getElementById('search');
    let usersData = [];

    // Modal Elements
    let modalOverlay;

    // Fetch and render users
    // fetchUsers is an async function that retrieves user data from an API using the fetch() method. It waits
    // for the response, checks if it's OK, parses the JSON, and stores the users in a global variable. Then it
    // renders them to the DOM. If any error occurs during the request or parsing, it shows an error message in
    // the UI using a try/catch block.
    async function fetchUsers() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) throw new Error('Failed to fetch users');
            usersData = await response.json();
            renderUsers(usersData);
        } catch (error) {
            userList.innerHTML = `<p class="error">Error loading users: ${error.message}</p>`;
        }
    }

    // This function clears the existing user list, loops over the users, builds a styled card for each one,
    // attaches a click event to open the modal, and appends each card to the DOM.
    function renderUsers(users) {
        userList.innerHTML = ''; // Clear existing
        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'user-card';
            card.innerHTML = `
                <h3>${user.name}</h3>
                <p>${user.email}</p>
            `;
            card.addEventListener('click', () => openUserModal(user));
            userList.appendChild(card);
        });
    }

    // Live filtering users
    // This block adds live search functionality. It listens for changes in the input, filters the full user 
    // list by name (case-insensitive), and re-renders only the matched users using the same render function.
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredUsers = usersData.filter(user => 
            user.name.toLowerCase().includes(searchTerm)
        );
        renderUsers(filteredUsers);
    });

    // Modal logic
    // The openUserModal function builds and displays a modal overlay dynamically when a user is clicked. It
    // sets up the layout, includes a spinner as a loading indicator, adds a close button, and then triggers an API
    // request to fetch and show the user’s posts in that modal.
    function openUserModal(user) {
        // Create overlay
        modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.innerHTML = `
            <div class="modal">
                <h2>Posts by ${user.name}</h2>
                <div class="modal-content">
                    <div class="spinner">
                        <img src="assets/images/spinner.png" alt="spinner" />
                    </div>
                </div>
                <button class="close-modal">Close</button>
            </div>`
            ;
        document.body.appendChild(modalOverlay);

        // Close modal
        modalOverlay.querySelector('.close-modal').addEventListener('click', closeUserModal);

        // We call the fetchUserPosts() function while spinner is displayed
        fetchUserPosts(user.id);
    }

    function closeUserModal() {
        modalOverlay.remove();
    }

    // Fetching a single user data as content of the modal 
    // fetchUserPosts is an async function that fetches all posts for a specific user. It waits for the data,
    // handles possible errors, and displays the post titles inside the modal. If there are no posts, it shows a
    // message, and if the fetch fails, it gracefully shows an error.
    async function fetchUserPosts(userId) {
        const modalContent = modalOverlay.querySelector('.modal-content');
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
            if (!response.ok) throw new Error('Failed to fetch posts');
            const posts = await response.json();

            if (posts.length === 0) {
                modalContent.innerHTML = `<p>No posts found for this user.</p>`;
            } else {
                modalContent.innerHTML = posts.map(post => `<p>- ${post.title}</p>`).join('');
            }
        } catch (error) {
            modalContent.innerHTML = `<p class="error">Error loading posts: ${error.message}</p>`;
        }
    }

    // Initialize
    fetchUsers();
});
