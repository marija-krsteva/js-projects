const data = [
    {
        name: "John Doe",
        age: 32,
        gender: "male",
        lookingfor: "female",
        location: "Boston MA",
        image: "https://randomuser.me/api/portraits/men/82.jpg"
    },
    {
        name: "Jen Smith",
        age: 26,
        gender: "female",
        lookingfor: "male",
        location: "Miami FL",
        image: "https://randomuser.me/api/portraits/women/82.jpg"
    },
    {
        name: "William Johnson",
        age: 38,
        gender: "male",
        lookingfor: "female",
        location: "Lynn MA",
        image: "https://randomuser.me/api/portraits/men/83.jpg"
    }
];

const profiles = profileIterator(data);

// Next event
document.getElementById('next').addEventListener('click', nextProfile);

// Call first profile
nextProfile();

// Next profile display
function nextProfile() {
    const currentProile = profiles.next().value;
    if(currentProile !== undefined) {
        document.getElementById('profileDisplay').innerHTML= `
            <ul class="list-group">
                <li class="list-group-item">Name: ${currentProile.name}</li>
                <li class="list-group-item">Age: ${currentProile.age}</li>
                <li class="list-group-item">Location: ${currentProile.location}</li>
                <li class="list-group-item">Preference: ${currentProile.gender} looking for ${currentProile.lookingfor}</li>
            </ul>
        `;

        document.getElementById('imageDisplay').innerHTML = `
            <img src="${currentProile.image}"/>
        `;
    } else {
        // No more profiles
        window.location.reload();
    }
    
}

// Profile Iterator
function profileIterator(profiles) {
    let nextIndex = 0;
    return {
        next: function() {
            return nextIndex < profiles.length ? 
            {value: profiles[nextIndex++], done: false} :
            {done: true}
        }
    };
}