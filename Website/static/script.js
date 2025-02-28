const arduinoDataUrl = "http://127.0.0.1:5000/data"; // Arduino sensor data URL

function displayMessage(sender, message) {
    let chatMessages = document.getElementById("chat-messages");
    if (!chatMessages) {
        console.error("Chat messages div not found!");
        return;
    }

    let formattedMessage = message.replace(/\d+\./g, "<br><strong>$&</strong>");
    chatMessages.innerHTML += `<p><strong>${sender}:</strong> ${formattedMessage}</p>`;
    chatMessages.scrollTop = chatMessages.scrollHeight; 
}

function fetchWeather() {
    let city = document.getElementById("city").value.trim();
    let weatherResult = document.getElementById("weather-result");
    
    if (!city) {
        weatherResult.innerHTML = "<p style='color: red;'>Please enter a city name.</p>";
        return;
    }

    let apiKey = "6e747a9a4474295d8c4eb127058e662b";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => {
        console.log("Response Status:", response.status); 
        return response.json();
    })
    .then(data => {
        console.log("API Response:", data); 
        if (data.cod === 200) {
            weatherResult.innerHTML = `
                <h3>Weather in ${data.name}</h3>
                <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Condition:</strong> ${data.weather[0].description}</p>
            `;
        } else {
            console.error("Weather API Error:", data);
            weatherResult.innerHTML = `<p style='color: red;'>City not found: ${data.message}</p>`;
        }
    })
    .catch(error => {
        console.error("Fetch Error:", error);
        weatherResult.innerHTML = "<p style='color: red;'>Error fetching weather data.</p>";
    });

}


function fetchSensorData() {
    fetch(arduinoDataUrl)
        .then(response => response.json())
        .then(data => {
            if (data.ldr !== undefined && data.temperature !== undefined) {
                let suggestions = generateSuggestions(data.temperature, data.ldr);
                
                document.getElementById("cse-data").innerHTML = `
                    <strong>Light Intensity (LDR):</strong> ${data.ldr}<br>
                    <strong>Temperature:</strong> ${data.temperature} °C<br>
                    <strong>Suggestion:</strong> ${suggestions}
                `;
            } else {
                displayMessage("System", "Sensor data format incorrect.");
            }
        })
        .catch(error => {
            console.error("Error fetching sensor data:", error);
            displayMessage("System", "Failed to fetch sensor data. Ensure Arduino is running.");
        });
}

        
function generateSuggestions(temperature, ldr) {
    let suggestion = "";

    // Temperature-based suggestions
    if (temperature > 30) {
        suggestion += "It's quite hot! Consider turning on a fan or AC. ";
    } else if (temperature < 20) {
        suggestion += "It's a bit cold. You may not need a fan. ";
    }

    // LDR-based suggestions
    if (ldr > 700) {
        suggestion += "The room is bright, you can turn off unnecessary lights.";
    } else if (ldr < 300) {
        suggestion += "The room is dark, consider turning on the lights.";
    }

    return suggestion || "Everything looks good! No actions needed.";
}


        
    

// Delay for Fetching sensor data every 5 seconds
setInterval(fetchSensorData, 5000);
fetchSensorData();
