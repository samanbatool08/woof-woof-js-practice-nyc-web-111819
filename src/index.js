window.addEventListener('DOMContentLoaded', (event) => {

        const dogBar = document.getElementById('dog-bar')
        const dogShowDiv = document.getElementById('dog-info')
            // console.log(dogShowDiv)

        fetch("http://localhost:3000/pups")
            .then(resp => resp.json())
            .then(dogData => dogData.forEach(dog => renderDogSpan(dog))) //ends second .then

        function renderDogSpan(dog) {
            let span = document.createElement('span')
            span.dataset.id = dog.id
            span.innerText = dog.name
            dogBar.appendChild(span)
        } // ends renderDogSpan function


        dogBar.addEventListener('click', function(e) {
                let id = e.target.dataset.id

                fetch(`http://localhost:3000/pups/${id}`)
                    .then(resp => resp.json())
                    .then(dogData => showDogInfo(dogData)) //ends .then

                function showDogInfo(dog) {
                    dogShowDiv.innerHTML = ` `
                    let div = document.createElement('div')
                    div.dataset.id = dog.id
                    div.innerHTML = `
                    <img src=${dog.image}>
                    <h2>${dog.name}</h2>
                    <button id='good-bad'>${dog.isGoodDog ? "Good" : "Bad"}</button>
                    `
                    dogShowDiv.appendChild(div)

                } //ends showDogInfo function
            }) //ends eventlistener


        dogShowDiv.addEventListener('click', function(e) {
                let newValue;

                if (e.target.id === 'good-bad') {
                    // let deleteButton = document.getElementById('good-bad')
                    if (e.target.innerText === "Good") {
                        e.target.innerText = "Bad"
                        newValue = false
                            // console.log("Made good")
                    } else if (e.target.innerText === "Bad") {
                        e.target.innerText = "Good"
                        newValue = true
                            // console.log("made bad")
                    }
                } //ends main if
                let id = e.target.parentNode.dataset.id

                fetch(`http://localhost:3000/pups/${id}`, {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json",
                            accept: "application/json"
                        }, //ends headers
                        body: JSON.stringify({ isGoodDog: newValue })
                    }) //ends fetch

            }) //ends event listener





    }) //ends dom content loaded