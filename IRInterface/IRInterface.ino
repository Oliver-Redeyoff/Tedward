#include <Arduino.h>

const int pins [3] = {14, 2, 0}; //Pin D5, D4, D3

void setup() {
  for (int i = 0; i < 3; i++) {
    pinMode(pins[i], INPUT);
  }
    Serial.begin(9600);
}

void loop() {
  Serial.println("Left: " + String(digitalRead(pins[0])));
  Serial.println("Front: " + String(digitalRead(pins[1])));
  Serial.println("Right: " + String(digitalRead(pins[2])));
  delay(100);
}

