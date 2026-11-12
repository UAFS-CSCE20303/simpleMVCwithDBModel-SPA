// Function to fetch and render users asynchronously using async/await
async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();

        const tbody = document.getElementById('userTableBody');
        tbody.innerHTML = '';

        users.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.userID}</td>
                <td>${user.fname}</td>
                <td>${user.lname}</td>
                <td>${user.username}</td>
                <td>${user.passwd}</td>
            `;
            tbody.appendChild(tr);
        });

        // Update the timestamp element in the HTML
        const timeDisplay = document.getElementById('lastRefreshedTime');
        if (timeDisplay) {
            const now = new Date();
            timeDisplay.textContent = `Last updated: ${now.toLocaleTimeString()}`;
        }
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Handle form submission with client-side validation using async/await
document.getElementById('addUserForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;

    // Trigger Bootstrap validation styles & check validity
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    form.classList.remove('was-validated');

    const formData = {
        fname: document.getElementById('fname').value.trim(),
        lname: document.getElementById('lname').value.trim(),
        username: document.getElementById('username').value.trim(),
        passwd: document.getElementById('passwd').value
    };

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            form.reset();
            loadUsers(); // Refresh table data immediately on successful add
        } else {
            alert('Error adding user. Username may already exist.');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
    }
});

// Initial load on page start
loadUsers();

// Automatically refresh the user list every 60 seconds (60000 milliseconds)
setInterval(loadUsers, 30000);