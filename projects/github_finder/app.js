// Init
const github = new GitHub;
const ui = new UI;

// Search User
const searchUser = document.getElementById('searchUser');

// Search input event listener
searchUser.addEventListener('keyup', (e) => {
    // Get input text
    const userText = e.target.value;

    if(userText !== '') {
        // Make HTTP call
        github.getUser(userText)
        .then(data => {
            // Show the profile
            ui.showProfile(data.profile);
            ui.showRepos(data.repos);
        })
        .catch((error) => {
            // Console log the error
            console.log(error);
        });
    } else {
        // Clear profile
        ui.clearProfile();
    }
});