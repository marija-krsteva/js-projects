const PageState = function() {
    let currentState = new homeState(this);
    
    this.init = function() {
        this.change(new homeState);
    }

    this.change = function(state) {
        currentState = state
    }
};

// Home State
const homeState = function(page) {
    document.querySelector('#heading').textContent = null;
    document.querySelector('#content').innerHTML = `
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <ol class="carousel-indicators">
                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></li>
                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="../../images/chuck-norris-jokes-generator.jpg" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="../../images/form_validation.jpg" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="../../images/task-list.jpg" class="d-block w-100" alt="...">
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </a>
        </div>
    `;

};

// About State
const aboutState = function(page) {
    document.querySelector('#heading').textContent = 'About us';
    document.querySelector('#content').innerHTML = `
        <p>This is the about page</p>
    `;
};

// Contact State
const contactState = function(page) {
    document.querySelector('#heading').textContent = 'Contact us';
    document.querySelector('#content').innerHTML = `
        <form id="contact_form">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputText" class="form-label">Message</label>
                <input type="password" class="form-control" id="exampleInputText">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    `;
};

// Instantiate Page
const page = new PageState();

// Init the first state
page.init();

// UI Vars
const home = document.getElementById('home'),
      about = document.getElementById('about'),
      contact = document.getElementById('contact');

// Home
home.addEventListener('click', (e) => {
    page.change(new homeState);

    e.preventDefault();
});

// About
about.addEventListener('click', (e) => {
    page.change(new aboutState);

    e.preventDefault();
});

// Contact
contact.addEventListener('click', (e) => {
    page.change(new contactState);

    e.preventDefault();
});