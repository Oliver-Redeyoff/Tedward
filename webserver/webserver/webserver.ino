#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include <ESP8266WebServer.h>

static const uint8_t Di0   = 16;
static const uint8_t Di1   = 5;
static const uint8_t Di2   = 4;
static const uint8_t Di3   = 0;
static const uint8_t Di4   = 2;
static const uint8_t Di5   = 14;
static const uint8_t Di6   = 12;
static const uint8_t Di7   = 13;
static const uint8_t Di8   = 15;
static const uint8_t RXPi  = 3;
static const uint8_t TXPi  = 1;

const char* SSID="JunctionX Exeter";
const char* PWD="junctionx";
ESP8266WebServer server(80);
void handleRecDir();

bool ready = true;
int inst[1000];
int len = 1;

//LEFT IR RIGHT IR
int irSensors[] = {Di6, Di7};

// echo distance sensor pins
int trig = Di1;
int echo = Di8;

// right motor pins
int p1 = Di2;
int p2 = Di3;

// left motor pins
int p3 = Di5;
int p4 = Di4;

void setup() {
  Serial.begin(9600);
  WiFi.begin(SSID);
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);

  pinMode(irSensors[0], INPUT);
  pinMode(irSensors[1], INPUT);

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
  // first check if there is an obstacle in front
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

  // then check if both IR sensors are either side of the line
  Serial.println("Left: " + String(digitalRead(irSensors[0])));
  Serial.println("Right: " + String(digitalRead(irSensors[1])));

  // finally deal with internet releated stuff 
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

