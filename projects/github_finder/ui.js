class UI {
    constructor() {
        this.profile = document.getElementById("profile");
    }

    // Display profile in UI
    showProfile(user) {
        // Defining the values of the list items
        let list_fields = {
            'Company' : user.company !== null ? user.company : '',
            'Website/Blog' : user.blog !== null ? user.blog : '',
            'Location' : user.location !== null ? user.location : '',
            'Member Since' : this.formattedDate(new Date(user.created_at))
        };
        
        // Creating the list items HTML
        let list_items = '';
        
        for(let field in list_fields) {
            list_items += `<li class="list-group-item">${field}: ${list_fields[field]}</li>`
        }

        // Creating the profile HTML
        this.profile.innerHTML = `
            <div class="card card-body mb-3">
                <div class="row">
                    <div class="col-md-3">
                        <img class="img-fluid mb-2" src="${user.avatar_url}"/>
                        <a id="profile" href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
                    </div>
                    <div class="col-md-9">
                        <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                        <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
                        <span class="badge badge-success">Folowers: ${user.followers}</span>
                        <span class="badge badge-info">Following: ${user.following}</span>
                        <br><br>
                        <ul class="list-group">
                            ${list_items}
                        </ul>
                    </div>
                </div>
            </div>
            <h3 class="page-heading mb-3">Latest Repos</h3>
            <div id="repos"></div>
        `;
    }

    // Show user repos
    showRepos(repos) {
        let output = '';

        repos.forEach(repo => {
            output += `
                <div class="card card-body mb-2">
                    <div class="row">
                        <div class="col-md-6">
                            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                        </div>
                        <div class="col-md-6">
                            <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                            <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
                            <span class="badge badge-success">Forks: ${repo.forks_count}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        // Ouput the repos
        document.getElementById('repos').innerHTML = output;
    }

    // Format date
    formattedDate(date) {
        return [date.getDate(), date.getMonth()+1, date.getFullYear()]
            .map(n => n < 10 ? `0${n}` : `${n}`).join('-');
      }

    // Show alert message
    showAlert(message, className) {
        // // Clear profile
        this.clearProfile();
        // Clear any remaining alerts
        this.clearAlert();
        // Create div
        const alertDiv = document.createElement('div');
        // Add classes
        alertDiv.className = className;
        // Add text
        alertDiv.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.searchContainer');
        // Get search box
        const search = document.querySelector('.search');
        // Insert alert
        container.insertBefore(alertDiv, search);

        // Timeout after 3 seconds
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    // Clear alert message
    clearAlert() {
        const currentAlert = document.querySelector('.alert');
        if(currentAlert) {
            currentAlert.remove();
        }
    }

    // Clear profile
    clearProfile() {
        this.profile.innerHTML = '';
    }
}