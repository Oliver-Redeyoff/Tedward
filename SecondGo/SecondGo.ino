#include <Arduino.h>
#include <stdio.h>

//Motor Pins
int left[] = {5, 6};
int right[] = {9, 10};

//Output modulation
int out[] = {0, 255};
int count = 0;

//High Speed, Low Speed
const int HIGH_VALUE = 255;
const int LOW_VALUE = 0;

//IR sensors
int leftIR = 12;
int rightIR = 11;

//Pause time when correcting on left/right IR
//Pause time when correcting on left/right IR
const long PAUSE_TIME = 50;

// int turns[] = {0, 0};
// int pointer = 0;
// int length = 2;
int turns[1000];
int pointer = 0;
int length = 0;
char serialString[1000];


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
  Serial.readBytes(serialString, 1000); // read the left or right integer value and put in turns
  // split serial string as each item is direction
  Serial.println(serialString);
  int t;
  sscanf(serialString, "%d", &t);
  turns[length] = t;
  delay(1000);
  length++;
  // analogWrite(right[0], HIGH_VALUE);
  // analogWrite(left[0], HIGH_VALUE);
  // Serial.println(digitalRead(leftIR);
// Serial.println(digitalRead(rightIR)==LOW);
  if (digitalRead(leftIR) == HIGH && digitalRead(rightIR) == HIGH) {
    if (pointer == length) {
      analogWrite(left[0], LOW_VALUE);
      analogWrite(right[0], LOW_VALUE);
    } else if (turns[pointer] == 0) {
      digitalWrite(left[0], LOW_VALUE);
      delay(PAUSE_TIME);
      analogWrite(left[0], HIGH_VALUE);
    } else {
      digitalWrite(right[0], LOW_VALUE);
      delay(PAUSE_TIME);
      analogWrite(right[0], HIGH_VALUE);
    }
    pointer++;
    if (pointer > length) {
      pointer = 0;
    }
  }
  if (digitalRead(leftIR) == LOW) {
        digitalWrite(right[0], LOW_VALUE);
        delay(PAUSE_TIME);
        analogWrite(right[0], HIGH_VALUE);
    }
    if (digitalRead(rightIR) == LOW) {
        digitalWrite(left[0], LOW_VALUE);
        delay(PAUSE_TIME);
        analogWrite(left[0], HIGH_VALUE);
    }
}
