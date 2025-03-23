// Sample user data
const users = [
    { name: "Nani", email: "Nani@gmail.com", phone: "9515112266", address: "123 ABC Road, Vijayawada", company: "Space D" },
    { name: "Teju", email: "teju@yahoo.com", phone: "9515112288", address: "05 Tilak Road, Vijayawada", company: "Media House" },
    { name: "krishna", email: "krishna@gmail.com", phone: "9102222084", address: "MG Road, Vijayawada", company: "Stark Enterprises" },
    { name: "bobby", email: "bobby@gmail.com", phone: "9398593259", address: "KM05, Noida", company: "Umbrella PVT LTD" },
];

// DOM elements
const tableBody = document.getElementById('tableBody');
const searchInput = document.getElementById('searchInput');
const tableHeaders = document.querySelectorAll('th[data-sort]');

let sortColumn = 'name';
let sortDirection = 'asc';

// Initialize the table
document.addEventListener('DOMContentLoaded', () => {
    renderTable(users);
    setupEventListeners();
});

// Render the table
function renderTable(data) {
    tableBody.innerHTML = '';

    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="no-results">No matching users found</td></tr>`;
        return;
    }

    data.forEach(user => {
        const row = `<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.address}</td>
            <td>${user.company}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Setup event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    tableHeaders.forEach(header => {
        header.addEventListener('click', () => handleSort(header.dataset.sort));
    });
}

// Handle search
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredUsers = users.filter(user => Object.values(user).some(value => value.toLowerCase().includes(searchTerm)));
    renderTable(sortData(filteredUsers));
}

// Handle sorting
function handleSort(column) {
    sortDirection = sortColumn === column ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc';
    sortColumn = column;
    renderTable(sortData(users));
}

// Sort data
function sortData(data) {
    return [...data].sort((a, b) => a[sortColumn].localeCompare(b[sortColumn]) * (sortDirection === 'asc' ? 1 : -1));
}
