import { http } from './http';
import { ui } from './ui';


// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// Listen for cancle state
document.querySelector('.card-form').addEventListener('click', cancelEdit);

// Get posts
function getPosts() {
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err));
}

// Submit post
function submitPost() {
    const title = ui.titleInput.value;
    const body = ui.bodyInput.value;
    const id = ui.idInput.value;

    
    // Validate input
    if(title === '' || body === '') {
        ui.showAlert('Please fill both fields', 'alert alert-danger');
    } else {
        const data = {
            title,
            body
        }
        // Check for ID
        if(id === '') {
            // Create Post
            http.post('http://localhost:3000/posts', data)
            .then(data => {
                ui.showAlert('Post added', 'alert alert-success');
                ui.clearFields();
                getPosts();
            })
            .catch(err => console.log(err));
        } else {
            // Update the post
            http.put(`http://localhost:3000/posts/${id}`, data)
            .then(data => {
                ui.showAlert('Post updated', 'alert alert-success');
                ui.changeFormState('add');
                getPosts();
            })
            .catch(err => console.log(err));
        }
        
    
        
    }
}

// Delete Post
function deletePost(e) {
    if(e.target.parentElement.classList.contains('delete')) {
        const id = e.target.parentElement.dataset.id;
        if(confirm('Are you sure?')) {
            http.delete(`http://localhost:3000/posts/${id}`)
            .then(data => {
                ui.showAlert('Post Removed', 'alert alert-success');
                getPosts();
            })
            .catch(err => console.log(err));
        }
    }

    e.preventDefault();
}

// Enable Edit State
function enableEdit(e) {
    if(e.target.parentElement.classList.contains('edit')) {
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;
        
        const data = {
            id,
            title,
            body
        };

        // Fill form with current post
        ui.fillForm(data);
    }
    e.preventDefault();
}

// Cancle Edit state
function cancelEdit(e) {

    if(e.target.classList.contains('post-cancel')) {
        ui.changeFormState('add');
    }
    e.preventDefault();

}