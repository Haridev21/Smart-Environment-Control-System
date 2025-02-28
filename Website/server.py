from flask import Flask, render_template, jsonify
import serial

app = Flask(__name__)

# Arduino( 'COM3' actual port)
arduino = serial.Serial('COM6', 9600, timeout=1)

def get_sensor_data():
    ldr_value = None
    temperature = None

    while arduino.in_waiting > 0:
        line = arduino.readline().decode('utf-8').strip()
        print(f"Raw Serial Data: {line}")

        if "LDR Value:" in line:
            try:
                ldr_value = int(line.split(": ")[1])  # Extract LDR value
            except ValueError:
                continue

        elif "Temperature:" in line:
            try:
                temperature = float(line.split(": ")[1].split(" ")[0])
            except ValueError:
                continue

        if ldr_value is not None and temperature is not None:
            break

    return {
        "ldr": ldr_value if ldr_value is not None else "N/A",
        "temperature": temperature if temperature is not None else "N/A"
    }

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def data():
    return jsonify(get_sensor_data())

if __name__ == '__main__':
    app.run(debug=False)
