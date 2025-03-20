document.addEventListener('DOMContentLoaded', () => {
    // JavaScript to toggle the mobile menu
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Placeholder for user details, you could fetch this from a database in a real-world scenario.
    const userName = 'John Doe'; // Example User Name
    const userPoints = 200; // Example Loyalty Points
    const recentBookings = [
        { route: 'Johannesburg to Bulawayo', date: '10th November 2025' }
    ];

    // Updating User Dashboard dynamically
    const userNameElement = document.querySelector('.dashboard h3');
    const loyaltyPointsElement = document.querySelector('.dashboard p strong');
    const recentBookingsElement = document.querySelector('.dashboard ul');

    // Display user name and loyalty points
    userNameElement.textContent = `Welcome back, ${userName}!`;
    loyaltyPointsElement.textContent = `${userPoints} points`;

    // Populate recent bookings
    recentBookingsElement.innerHTML = ''; // Clear current list
    recentBookings.forEach(booking => {
        const listItem = document.createElement('li');
        listItem.textContent = `${booking.route} - ${booking.date}`;
        recentBookingsElement.appendChild(listItem);
    });

    // Placeholder for Employee Dashboard tasks and activities
    const employeeName = 'Jane Smith'; // Example Employee Name
    const tasks = [
        'Assist with check-ins',
        'Prepare schedules for upcoming trips'
    ];
    const activities = [
        'Completed ticket bookings for the Bulawayo route'
    ];

    // Updating Employee Dashboard dynamically
    const employeeNameElement = document.querySelector('.employee-dashboard h3');
    const employeeTasksElement = document.querySelector('.employee-dashboard .mb-6 ul');
    const employeeActivitiesElement = document.querySelector('.employee-dashboard .list-disc');

    // Display employee name
    employeeNameElement.textContent = `Welcome, ${employeeName}`;

    // Populate tasks
    employeeTasksElement.innerHTML = ''; // Clear current list
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = task;
        employeeTasksElement.appendChild(listItem);
    });

    // Populate activities
    employeeActivitiesElement.innerHTML = ''; // Clear current list
    activities.forEach(activity => {
        const listItem = document.createElement('li');
        listItem.textContent = activity;
        employeeActivitiesElement.appendChild(listItem);
    });

    // Handling Return Date checkbox
    document.getElementById('return').addEventListener('change', function() {
        const returnDateContainer = document.getElementById('return-date-container');
        if (this.checked) {
            returnDateContainer.classList.remove('hidden');
        } else {
            returnDateContainer.classList.add('hidden');
        }
    });

    // Handling Check Availability button click
    document.getElementById('check-availability').addEventListener('click', function() {
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;

        if (from && to) {
            document.getElementById('bus-list').classList.remove('hidden');
        } else {
            alert('Please select both pick up and drop off locations.');
        }
    });

    // Handle bus selection and redirect to PassengerDetails.html
    document.querySelectorAll('.select-bus').forEach(button => {
        button.addEventListener('click', function() {
            const selectedBus = this.getAttribute('data-bus');
            localStorage.setItem('selectedBus', selectedBus); // Store selected bus for later use
            window.location.href = 'PassengerDetails.html';
        });
    });
});