let events = {}; // Object to store events for each date
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

// Display Calendar for the Current Month
function displayCalendar(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    document.getElementById('month-year').innerText = `${monthNames[month]} ${year}`;
    const calendarGrid = document.getElementById('calendar-grid');
    calendarGrid.innerHTML = '';

    // Headers for the days of the week
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
        const header = document.createElement('div');
        header.classList.add('calendar-header');
        header.innerText = day;
        calendarGrid.appendChild(header);
    });

    // Empty cells before the first day
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('calendar-day');
        calendarGrid.appendChild(emptyCell);
    }

    // Days in the month
    for (let day = 1; day <= daysInMonth; day++) {
        let date = `${year}-${month + 1}-${day}`;
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.innerText = day;
        dayElement.onclick = () => openModal(date);
        
        // Highlight if events exist on this date
        if (events[date]) {
            dayElement.classList.add('has-events');
        }
        
        calendarGrid.appendChild(dayElement);
    }
}

// Month Navigation
function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    displayCalendar(currentYear, currentMonth);
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    displayCalendar(currentYear, currentMonth);
}

// Event Modal
function openModal(date) {
    document.getElementById('event-modal').style.display = 'flex';
    document.getElementById('modal-date').innerText = `Events on ${date}`;
    document.getElementById('event-input').setAttribute('data-date', date);
    displayEventsInModal(date);
}

function closeModal() {
    document.getElementById('event-modal').style.display = 'none';
}

// Display Events in Modal
function displayEventsInModal(date) {
    const eventListModal = document.getElementById('event-list-modal');
    eventListModal.innerHTML = ''; // Clear previous events

    if (events[date]) {
        events[date].forEach((event) => {
            const li = document.createElement('li');
            li.innerText = event;
            eventListModal.appendChild(li);
        });
    }
}

// Add Event to Date and Update Main Dashboard
function addEvent() {
    const date = document.getElementById('event-input').getAttribute('data-date');
    const eventText = document.getElementById('event-input').value;
    
    if (!eventText) return; // Do nothing if input is empty
    
    if (!events[date]) {
        events[date] = [];
    }
    events[date].push(eventText);
    document.getElementById('event-input').value = ''; // Clear input field
    
    // Update the modal event list and close modal
    displayEventsInModal(date);
    closeModal();

    // Update calendar to show events and display the new event on the main dashboard
    displayCalendar(currentYear, currentMonth);
    updateOngoingEvents();
}

// Update the "Ongoing Events" Section on Main Dashboard
function updateOngoingEvents() {
    const ongoingEventsList = document.getElementById('event-list');
    ongoingEventsList.innerHTML = ''; // Clear previous events

    Object.keys(events).forEach(date => {
        events[date].forEach(event => {
            const li = document.createElement('li');
            li.innerText = `${event} (on ${date})`;
            ongoingEventsList.appendChild(li);
        });
    });
}

// Initialize Vendor and Supplier List
function loadVendors() {
    const vendorItems = document.getElementById('vendor-items');
    const vendors = ["raj Kumar decorator", "shyama catering", "Husen Dj", "Tripathy Lights"]; // Example vendor names
    
    vendors.forEach(vendor => {
        const li = document.createElement('li');
        li.innerText = vendor;
        vendorItems.appendChild(li);
    });
}

// Initialize Calendar and Data on Page Load
window.onload = function() {
    displayCalendar(currentYear, currentMonth);
    loadVendors();
    updateOngoingEvents();
};
