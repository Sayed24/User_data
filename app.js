
let users=[]
let filteredUsers=[]

const usersPerPage = 6
let currentPage = 1


async function loadUsers(){

const res = await fetch("users.json")

const data = await res.json()

users = data.users

filteredUsers = users

displayUsers()

createPagination()

}

function displayUsers(){

const container = document.getElementById("userContainer")

container.innerHTML=""

const start = (currentPage-1)*usersPerPage
const end = start+usersPerPage

const pageUsers = filteredUsers.slice(start,end)

pageUsers.forEach(user=>{

container.innerHTML += `

<div class="card">

<img src="${user.avatar}">

<h3>${user.name}</h3>

<p>${user.email}</p>

<button onclick="viewUser(${user.id})">
View
</button>

<button onclick="addFavorite(${user.id})">
Favorite
</button>

</div>

`

})

}

function createPagination(){

const pageCount = Math.ceil(filteredUsers.length/usersPerPage)

const pagination = document.getElementById("pagination")

pagination.innerHTML=""

for(let i=1;i<=pageCount;i++){

pagination.innerHTML += `
<button onclick="changePage(${i})">${i}</button>
`

}

}

function changePage(page){

currentPage = page

displayUsers()

}


document.getElementById("searchInput").addEventListener("keyup", e=>{

const keyword = e.target.value.toLowerCase()

filteredUsers = users.filter(u =>
u.name.toLowerCase().includes(keyword)
)

currentPage=1

displayUsers()

createPagination()

})


function viewUser(id){

const user = users.find(u=>u.id==id)

document.getElementById("homePage").classList.add("hidden")

document.getElementById("detailsPage").classList.remove("hidden")

document.getElementById("userDetails").innerHTML=`

<div class="card">

<img src="${user.avatar}">

<h2>${user.name}</h2>

<p>Email: ${user.email}</p>

<p>Phone: ${user.phone}</p>

<p>City: ${user.city}</p>

<button onclick="addFavorite(${user.id})">
Add to Favorites
</button>

</div>

`

}


function showHome(){

document.getElementById("homePage").classList.remove("hidden")

document.getElementById("detailsPage").classList.add("hidden")

document.getElementById("favoritesPage").classList.add("hidden")

}


function addFavorite(id){

let favorites = JSON.parse(localStorage.getItem("favorites")) || []

if(!favorites.includes(id)){

favorites.push(id)

}

localStorage.setItem("favorites",JSON.stringify(favorites))

alert("Added to favorites")

}


function showFavorites(){

document.getElementById("homePage").classList.add("hidden")

document.getElementById("favoritesPage").classList.remove("hidden")

const favorites = JSON.parse(localStorage.getItem("favorites")) || []

const container = document.getElementById("favoriteContainer")

container.innerHTML=""

favorites.forEach(id=>{

const user = users.find(u=>u.id==id)

container.innerHTML += `

<div class="card">

<img src="${user.avatar}">

<h3>${user.name}</h3>

<p>${user.email}</p>

</div>

`

})

}


loadUsers()
