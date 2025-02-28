#include <Wire.h>
#include <NewPing.h>

int entryPIR = 2;
int exitPIR = 4;
int ledPin = 12;
int personCount = 0;
int entryConfirm = 0;
int exitConfirm = 0;

const int ldrPin = A0;
const int lm35Pin = A7;

#define trigPin 8
#define echoPin 9
#define buzzer 3

const int maxTankDepth = 19;
const int buzzerThreshold = 80;

NewPing sonar(trigPin, echoPin, maxTankDepth);

void setup() {
    pinMode(entryPIR, INPUT);
    pinMode(exitPIR, INPUT);
    pinMode(ledPin, OUTPUT);
    Serial.begin(9600);
    pinMode(buzzer, OUTPUT);
    digitalWrite(buzzer, LOW);
}

void loop() {
    int entryMotion = digitalRead(entryPIR);
    int exitMotion = digitalRead(exitPIR);
    int ldrValue = analogRead(ldrPin);
    Serial.print("LDR Value: ");
    Serial.println(ldrValue);

    if (ldrValue >= 0 && ldrValue <= 200) {
        digitalWrite(ledPin, HIGH);
    } else if (ldrValue >= 600 && ldrValue <= 800) {
        digitalWrite(ledPin, LOW);
    }

    int sensorValue = analogRead(lm35Pin);
    float temperature = (sensorValue * 5.0 * 100.0) / 1024.0;
    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.println(" °C");

    if (entryMotion == HIGH) {
        entryConfirm++;
        if (entryConfirm >= 3) {
            personCount++;
            Serial.print("Person Entered! Total Count: ");
            Serial.println(personCount);
            entryConfirm = 0;
            delay(2000);
        }
    } else {
        entryConfirm = 0;
    }

    if (exitMotion == HIGH) {
        exitConfirm++;
        if (exitConfirm >= 3) {
            if (personCount > 0) {
                personCount--;
                Serial.print("Person Exited! Total Count: ");
                Serial.println(personCount);
            }
            exitConfirm = 0;
            delay(2000);
        }
    } else {
        exitConfirm = 0;
    }

    int distance = sonar.ping_cm();
    if (distance == 0) {
        distance = maxTankDepth;
    }
    int waterLevel = map(distance, 0, maxTankDepth, 100, 0);
    waterLevel = constrain(waterLevel, 0, 100);

    Serial.print("Distance: ");
    Serial.print(distance);
    Serial.print(" cm, Water Level: ");
    Serial.print(waterLevel);
    Serial.println(" %");

    if (waterLevel >= buzzerThreshold) {
        digitalWrite(buzzer, HIGH);
    } else {
        digitalWrite(buzzer, LOW);
    }

    delay(1000);
}
