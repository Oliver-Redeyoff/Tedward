#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include <ESP8266WebServer.h>

const char* SSID="Pifi";
const char* PWD="";
ESP8266WebServer server(80);
void handleRecDir();

bool ready = true;
int inst[1000];
int len = 1;
int irSensors[] = {12, 13}; //LEFT IR RIGHT IR: MIDDLE IR
int trig = 5;
int echo = 15;


void setup() {
  Serial.begin(9600);
  WiFi.begin(SSID);
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);

  for (int i = 0; i < 2; i++) {
    pinMode(irSensors[i], INPUT);
  }

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");

  server.on("/recdir", handleRecDir);
  server.begin();
  Serial.println(WiFi.localIP());


}

void loop() {
  long duration, distance;
 digitalWrite(trig, LOW);
 delayMicroseconds(2);
 digitalWrite(trig, HIGH);
 delayMicroseconds(10);
 digitalWrite(trig, LOW);
 duration = pulseIn(echo, HIGH);
 distance = (duration/2)/29.1;
 if (distance < 20) {
   Serial.println("Trig");
   //STOP!!
   //REVERSE
 }
  if (ready) {
    server.handleClient();
  } else {
    int pointer = 0;
    while (pointer < len) {
      int curr = inst[pointer];
      if (digitalRead(irSensors[curr]) == HIGH) {
        //TODO TURN TO THERE
      } else {
        //TODO MOVE FORWARD
      }
      //TODO ENSURE CORRECT FOLLOW
    }
    ready = true;
  }
}

/*
  Post Request
  Rec json {array: [0, 1]} 0 = Left, 1 = Right
*/
void handleRecDir() {
  ready = false;
  StaticJsonDocument<200> doc;
  if (server.arg("plain") == false) {
    Serial.println("null body");
    String message = "Body null\n";
    server.send(200, "text/plain", message);
    return;
  }

   DeserializationError error = deserializeJson(doc, server.arg("plain"));
   if (error) {
     Serial.println(error.c_str());
     String message = error.c_str();
     server.send(200, "text/plain", message);
     return;
   }

   String message = "Body received:\n";
   if (doc.containsKey("array")) {
     JsonArray arr = doc["array"];
     len = arr.size();
     int i = 0;
     for (JsonVariant v : arr) {
       Serial.println(v.as<int>());
       inst[i] = v.as<int>();
       i++;
       message += v.as<String>();
       message += "\n";
     }
   } else {
     Serial.println(doc.containsKey("array"));
     message += "no body";
   }
   message += "\n";
   server.send(200, "text/plain", message);
   Serial.println(message);
}

// #include <Arduino.h>
//
// const int pins [3] = {14, 2, 0}; //Pin D5, D4, D3
//
// void setup() {
//   for (int i = 0; i < 3; i++) {
//     pinMode(pins[i], INPUT);
//   }
//     Serial.begin(9600);
// }
//
// void loop() {
//   Serial.println("Left: " + String(digitalRead(pins[0])));
//   Serial.println("Front: " + String(digitalRead(pins[1])));
//   Serial.println("Right: " + String(digitalRead(pins[2])));
//   delay(100);
// }

