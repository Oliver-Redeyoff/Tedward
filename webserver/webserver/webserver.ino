#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include <ESP8266WebServer.h>
// #include <ESP_SSD1306.h>    // Modification of Adafruit_SSD1306 for ESP8266 compatibility
// #include <Adafruit_GFX.h>   // Needs a little change in original Adafruit library (See README.txt file)
// #include <SPI.h>            // For SPI comm (needed for not getting compile error)
// #include <Wire.h>

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
// ESP_SSD1306 display(-1); // FOR I2C

ESP8266WebServer server(80);
void handleRecDir();

int inst[1000];
int len = 1;

void setup() {
  Serial.begin(9600);
  WiFi.begin(SSID, PWD);
  // display.begin(SSD1306_SWITCHCAPVCC);  // Switch OLED
  // display.clearDisplay();
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");

  server.on("/recdir", handleRecDir);
  server.begin();
  Serial.println(WiFi.localIP());
  // display.println(WiFi.localIP());
  // display.display();
}
//
void loop() {
  server.handleClient();
}


/*
  Post Request
  Rec json {array: [0, 1]} 0 = Left, 1 = Right
*/
void handleRecDir() {
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
       Serial.write(v.as<int>());
       inst[i] = v.as<int>();
       i++;
       message += v.as<String>();
       message += "\n";
     }
     // send string version of inst

   } else {
     Serial.println(doc.containsKey("array"));
     message += "no body";
   }
   message += "\n";
   server.send(200, "text/plain", message);
   Serial.println(message);
}
