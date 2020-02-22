#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include <ESP8266WebServer.h>

const char* SSID="Pifi";
const char* PWD="";
ESP8266WebServer server(80);
void handleRecDir();

void setup() {
  Serial.begin(9600);
  WiFi.begin(SSID);

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
  server.handleClient();
}

void handleRecDir() {
  StaticJsonDocument<200> doc;
  if (server.arg("plain") == false) {
    //TODO Handle null input
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
     for (JsonVariant v : arr) {
       Serial.println(v.as<String>());
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
