#include <Arduino.h>

//Motor Pins
int left[] = {5, 6};
int right[] = {9, 10};

//Output modulation
int out[] = {0, 127};
int count = 0;

//High Speed, Low Speed
const int HIGH_VALUE = 127;
const int LOW_VALUE = 0;

//IR sensors
int leftIR = 12;
int rightIR = 11;

//Pause time when correcting on left/right IR
const long PAUSE_TIME = 50;

int turns[] = {0};
int pointer = 0;
int length = 1;

void setup() {
  Serial.begin(9600);
  for (int i = 0; i < 2; i++) {
    pinMode(left[i], OUTPUT);
    pinMode(right[i], OUTPUT);
  }
  pinMode(leftIR, INPUT);
  pinMode(rightIR, INPUT);

  analogWrite(right[0], HIGH_VALUE);
  analogWrite(left[0], HIGH_VALUE);
}

void loop() {
  if (digitalRead(leftIR) == HIGH && digitalRead(rightIR) == HIGH) {
    if (pointer >= length) {
      analogWrite(left[0], LOW_VALUE);
      analogWrite(right[0], LOW_VALUE);
    } else if (turns[pointer] == 0) {
      analogWrite(left[0], LOW_VALUE);
      delay(PAUSE_TIME);
      analogWrite(left[0], HIGH_VALUE);
      pointer++;
    } else {
      analogWrite(right[0], LOW_VALUE);
      delay(PAUSE_TIME);
      analogWrite(right[0], HIGH_VALUE);
      pointer++;
    }
  }
  if (digitalRead(leftIR) == LOW) {
        analogWrite(right[0], LOW_VALUE);
        delay(PAUSE_TIME);
        digitalWrite(right[0], HIGH_VALUE);
    }
    if (digitalRead(rightIR) == LOW) {
        digitalWrite(left[0], LOW_VALUE);
        delay(PAUSE_TIME);
        digitalWrite(left[0], HIGH_VALUE);
    }
}

