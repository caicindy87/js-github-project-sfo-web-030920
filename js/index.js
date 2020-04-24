// declare here so variables are available for all functions
let searchInput = '';
let usersList = '';

document.addEventListener('DOMContentLoaded', () => {
  // reassign the global variables to the values we want
  searchInput = document.getElementById('search');
  usersList = document.getElementById('user-list');

  listenToForm();
  listenToUsername();
})

function listenToForm() {
  const searchForm = document.getElementById('github-form');
  searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    fetchUsers();
  })
}

function fetchUsers() {
  fetch(`https://api.github.com/search/users?q=${searchInput.value}`)
    .then(resp => resp.json())
    .then(results => renderResults(results))
}

function renderResults(json) {
  json.items.forEach (user => {
    const username = user.login
    const profilePic = user.avatar_url
    const profileLink = user.html_url
    // const usersList = document.getElementById('user-list')
    const userListItem = document.createElement('li')
    userListItem.innerHTML = `<h2>${username}</h2> 
      <h3>Link to Profile: ${profileLink}</h3> 
      <img src=${profilePic}><br>`
    usersList.appendChild(userListItem)
})
}

// waiting for user to click on a github user's username
function listenToUsername() {
  usersList.addEventListener('click', function(event) {
    const h2Tag = event.target.tagName
    const username = event.target.innerText

    if (h2Tag === "H2") {
      fetch(`https://api.github.com/users/${username}/repos`, {headers: {Accept: 'application/vnd.github.v3+json'}})
      .then(resp => resp.json())
      .then(repos => renderRepos(repos))
    }
    
  })
}

function renderRepos(json) {
  const reposList = document.getElementById('repos-list');

  // clear previous person's repos before displaying next person's
  reposList.innerHTML = "<h2>User's Repositories</h2>";
  
  json.forEach (repo => {
    const repoName = repo.name;
    const repoListItem = document.createElement('li');
    repoListItem.innerText = repoName;
    reposList.appendChild(repoListItem);
  })
}