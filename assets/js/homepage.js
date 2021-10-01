var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var RepoSearchTerm = document.querySelector("#repo-search-term");


var formSubmitHandler = function (event) {
    event.preventDefault();
    var username = nameInputEl.value.trim();
    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    }
    else {
        alert("Please enter a Github username")
    }
    console.log(event);
};

userFormEl.addEventListener("submit", formSubmitHandler);

var getUserRepos = function (user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a get request to url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
          response.json().then(function(data) {
            displayRepos(data, user);
          });
        } else {
          alert("Error: GitHub User Not Found");
        }
      })
      .catch(function(error) {
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect to GitHub");
      });
};
var displayRepos = function (repos, searchTerm) {
    if(repos.length ===0 ){
        repoContainerEl.textContent = "no repositories found";
        return;
    }
    // loop over repos
    console.log(repos);
    console.log(searchTerm);
    repoContainerEl.textContent = "";
    RepoSearchTerm.textContent = searchTerm;
    for (var tit = 0; tit < repos.length; tit++) {
        var repoName = repos[tit].owner.login + "/" + repos[tit].name;
        
        // create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        
        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if current repo has issues or not
        if(repos[tit].open_issues_count > 0){
            statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[tit].open_issues_count + " issue(s)";

        }
        else{
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(titleEl);

        //append container to the dom
        repoContainerEl.appendChild(repoEl);

    }
    
}


getUserRepos("latenightdan");



