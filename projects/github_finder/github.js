class GitHub {
    constructor() {
        this.repos_count = 5;
        this.repos_sort = 'created: asc';
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}`);
        this.handleErrors(profileResponse);

        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}`)
        .catch((response) => {this.handleErrors(response)});
        
        const profile = await profileResponse.json();
        const repos = await repoResponse.json();
        return {
            profile,
            repos
        };
    }

    handleErrors(response) {
        if (!response.ok) {
            const ui = new UI;
            ui.clearProfile();
            if(response.statusText === 'Not Found') {
                // Show alert
                ui.showAlert('User not found', 'alert alert-danger');
            }
            throw Error(response.statusText);
        }
        return response;
    }
}