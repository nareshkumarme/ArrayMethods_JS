// Get references to various buttons and DOM elements
const addUser = document.getElementById("add-btn");
const dbMoney = document.getElementById("double-btn");
const millionaires = document.getElementById("millionire-btn");
const sort = document.getElementById("sort-btn");
const wealth = document.getElementById("wealth-btn");
const parentElement1 = document.getElementById("addwealth");
const parentElement = document.getElementById("addperson");

const users = [];


// Function to update the DOM with content

function updateDOM(obj, element) {
    const childElement = document.createElement('p');
    childElement.textContent = obj;
    element.appendChild(childElement);
}

// Function to display users with money over $100,000
function showMillionaires() {
    parentElement.innerHTML = "";
    parentElement1.innerHTML = "";
    users.filter(user => user.money > 100000).forEach(user => {
        updateDOM(user.name, parentElement);
        updateDOM(user.money, parentElement1);
    });
}

// Function to double the money of all displayed users
function doubleMoney() {
    const allMoney = parentElement1.querySelectorAll("p");
    allMoney.forEach(ptag => {
        const currentContent = parseInt(ptag.innerHTML);
        const doubledContent = currentContent * 2;
        ptag.innerHTML = doubledContent;
    });
}

// Function to display users sorted by their wealth
function showRichest() {
    parentElement.innerHTML = "";
    parentElement1.innerHTML = "";
    const sortedUsers = users.slice().sort((a, b) => b.money - a.money);
    sortedUsers.forEach(user => {
        updateDOM(user.name, parentElement);
        updateDOM(user.money, parentElement1);
    });
}

// Function to fetch a random user and add them to the users array
async function fetchRandomUser() {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first}`,
        money: Math.floor(Math.random() * 110000)
    };

    users.push(newUser);
    localStorage.setItem('randomUsers', JSON.stringify(users));
    updateDOM(newUser.name, parentElement);
    updateDOM(newUser.money, parentElement1);
}

// Function to calculate and display the total wealth of all users
function calculateTotalWealth() {
    const sum = users.reduce((acc, user) => acc + user.money, 0);
    updateDOM('Total wealth', parentElement);
    updateDOM(sum, parentElement1);

}

addUser.addEventListener('click', fetchRandomUser);
dbMoney.addEventListener('click', doubleMoney);
millionaires.addEventListener('click', showMillionaires);
sort.addEventListener('click', showRichest);
wealth.addEventListener('click', calculateTotalWealth);

















