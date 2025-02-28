# Smart Environment Control System  

This project is a **Smart College Environment Control System** that integrates **weather information** and **sensor-based room monitoring** to enhance classroom conditions. It fetches real-time **weather data** using OpenWeather API and **Arduino-based sensor data** to suggest environmental adjustments.

---

## Features  
- Fetches **real-time weather** for a given city.  
- Reads **light intensity (LDR)** and **temperature** from an **Arduino sensor**.  
- Provides **environmental suggestions** based on sensor readings.  
- Web-based UI for displaying data dynamically.  

---

## Working of Website 

### 1. Weather Data Fetching  
- Users enter a city name.  
- The system fetches weather data from **OpenWeather API** and displays:  
  - **Temperature**  
  - **Humidity**  
  - **Weather condition**  

### 2. Arduino Sensor Monitoring  

- The **Arduino board** is equipped with:  
  - **LDR (Light Dependent Resistor)** → Measures **light intensity**.  
  - **Temperature Sensor** → Measures **room temperature**.  

#### **Arduino Working Process:**  
1. Arduino continuously reads **LDR & temperature** values.  
2. Sends data via **serial communication** to the Flask server.  
3. The Flask server processes this data and sends it to the **web interface**.  
4. The web page displays:  
   - Light intensity (LDR Value)  
   - Temperature  
   - Suggestions (e.g., turn on/off lights or fans)  
5. The sensor data updates **every 5 seconds** automatically.  

---

## Credits  
This project utilizes the **OpenWeather API** to fetch real-time weather data.  
We acknowledge and give full credit to **OpenWeather** for providing free access to weather information.  

- **Website**: [OpenWeather](https://openweathermap.org/)  
- **API Documentation**: [OpenWeather API Docs](https://openweathermap.org/api)  

---

## Future Enhancements  
- Add fan/light control based on sensor data.  
- Implement historical data tracking.  
- Deploy on cloud services.  

---

## Contributors  
- Haridev M  
- Sanjay Nair  
- Jilsiya Ali C  


---

## Installation & Setup  

### Prerequisites  
- **Python** (Flask, Serial)  
- **Arduino with LDR & Temperature Sensor**  
- **OpenWeather API Key**  

### Steps to Run  

#### 1. Setup Arduino  
- Connect **LDR** and **Temperature Sensor** to Arduino.  
- Upload the Arduino code for reading sensor values and sending them over **serial communication**.  

#### 2. Setup Flask Server  
```sh
# Clone the repository
git clone https://github.com/your-repo-name.git
cd smart-environment-system

# Install dependencies
pip install flask pyserial
