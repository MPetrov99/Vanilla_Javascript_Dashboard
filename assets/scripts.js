// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerImg = document.querySelector('.hamburger img');
    const itemsContainer = document.querySelector('.hamburger .items');

    hamburgerImg.addEventListener('click', (event) => {
        event.stopPropagation();
        itemsContainer.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
        if (!itemsContainer.contains(event.target) && !hamburgerImg.contains(event.target)) {
            itemsContainer.classList.remove('active');
        }
    });

//Dashboard functionality
    const userList = document.getElementById('user-list');
    const searchInput = document.getElementById('search');
    let usersData = [];

    // Modal Elements
    let modalOverlay;

    // Fetch and render users
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
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredUsers = usersData.filter(user => 
            user.name.toLowerCase().includes(searchTerm)
        );
        renderUsers(filteredUsers);
    });

    // Modal logic
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

        fetchUserPosts(user.id);
    }

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

    function closeUserModal() {
        modalOverlay.remove();
    }

    // Initialize
    fetchUsers();
});
