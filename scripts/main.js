var city = prompt("Please enter your city: ")

var request = new XMLHttpRequest();
request.open('GET', `https://api.openweathermap.org/data/2.5/forecast?q=${city}
             &units=metric&appid=${config.apiKey}`, true)
request.onload = function () {
    // Accessing JSON data here
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
        data.list.forEach(weather => {
            const card = document.createElement('div')
            card.setAttribute('class', 'card')

            const h1 = document.createElement('h1')
            // Print date more nicely
            var d = new Date(weather.dt_txt)
            h1.innerHTML = d.toDateString() + '<br />' +
                d.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                })

            const img = document.createElement('img')
            img.setAttribute('src', 'http://openweathermap.org/img/w/' +
                `${weather.weather[0].icon}.png`)

            const p = document.createElement('p')
            p.textContent =
                // Capitalize first letter of weather description
                // Append the rest to get complete description 
                `${weather.weather[0].description}`.charAt(0).toUpperCase() +
                `${weather.weather[0].description} `.slice(1) +
                `with min. ${weather.main.temp_min}°C and ` +
                `max. ${weather.main.temp_max}°C`

            container.appendChild(card)
            card.appendChild(h1)
            card.appendChild(img)
            card.appendChild(p)
        })
    } else {
        const errorMessage = document.createElement('h2')
        errorMessage.textContent = `HTTP error ${data.cod} :-(`
        app.appendChild(errorMessage)
    }

}

request.send()

const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'img/logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)