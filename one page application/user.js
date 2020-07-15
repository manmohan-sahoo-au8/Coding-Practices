console.log("Connected");

// DOM Elements
var loadingElement = document.querySelector("h2.loading");
var usersList = document.querySelector("ul");
var userCreateForm = document.querySelector("form.createuser-form");

var baseURL = "https://reqres.in";

function fetchUsers() {
  var fetchPromise = fetch(`${baseURL}/api/users`)
    .then(function (responseReadableStream) {
      return responseReadableStream.json();
    })
    .then(function (userData) {
      return userData.data;
    });
  return fetchPromise;
}

function createUser(user) {
  var fetchPromise = fetch(`${baseURL}/api/users`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (response) {
    return response.json();
  });

  return fetchPromise;
}

userCreateForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var name = event.target.name.value;
  var job = event.target.job.value;
  var user = { name: name, job: job };

  loadingElement.style.display = "block";
  loadingElement.textContent = "Creating user ...";
  usersList.style.display = "none";

  event.target.name.value = "";
  event.target.job.value = "";
  createUser(user)
    .then(function (response) {
      var userListItem = `
      <li>
        <h3>Name: ${response.name}</h3>
        <p>Job: ${response.job}</p>
      </li>
    `;
      usersList.insertAdjacentHTML("afterbegin", userListItem);
      loadingElement.style.display = "none";
      usersList.style.display = "block";
    })
    .catch(function (err) {
      alert(err);
      loadingElement.style.display = "none";
      usersList.style.display = "block";
    });
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("Document has been loaded.. Fetching users ... ");
  fetchUsers().then(function (users) {
    loadingElement.style.display = "none";
    for (var user of users) {
      var userListItem = `
        <li>
          <img style="width: 100px; height: 100px; border-radius: 50%" src=${user.avatar} />
          <h3>Name: ${user.first_name} ${user.last_name}</h3>
          <p>Email: ${user.email}</p>
        </li>
      `;
      usersList.insertAdjacentHTML("beforeend", userListItem);
    }
  });
});

// Easy method
var userListItem = `
        <li>
          <img style="width: 100px; height: 100px; border-radius: 50%" src=${user.avatar} />
          <h3>Name: ${user.first_name} ${user.last_name}</h3>
          <p>Email: ${user.email}</p>
        </li>
      `;

// Delete button
userListItemButton = document.createElement("button");
userListItemButton.addEventListener("click", function (event) {});
// Injecting everything
userListItem.append(userListAvatar);
userListItem.append(userListItemName);
userListItem.append(userListItemEmail);
