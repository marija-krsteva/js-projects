document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e) {
    const number = document.querySelector('input[type="number"]').value;
    let output = '';

    if(number <=  0) {
        output = '<li style="color:red">Only positive numbers, please</li>';
        document.querySelector('.jokes').innerHTML = output;
    } else {
        const xhr = new XMLHttpRequest();

        xhr.open('GET',`http://api.icndb.com/jokes/random/${number}`, true);
    
        xhr.onload = function() {
            if(this.status === 200) {
                const response = JSON.parse(this.responseText);
    
                console.log(response);
                if(response.type === 'success') {
                    response.value.forEach(joke => {
                        output += `<li>${joke.joke}</li>`
                    });
                } else{
                    output = '<li>Something Went Wrong</li>';
                }

                document.querySelector('.jokes').innerHTML = output;
            }
        }
        xhr.send();
    }

    e.preventDefault();
}