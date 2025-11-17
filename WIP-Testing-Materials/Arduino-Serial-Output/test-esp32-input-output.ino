#define RXD2 16
#define TXD2 17 // does nothing on receiving ESP32
char receivedInt;
int receivedIntA = 0;
String input_str = "";
//---------------------------------------------------
void setup() {
  Serial.begin(115200);
  Serial1.begin(9600, SERIAL_8N1, RXD2, TXD2);
  Serial.print("Start: ");
}
//---------------------------------------------------
void loop() {
  
  if (Serial1.available() > 0) {
    Serial.print("serial1 available\n");
    //receivedIntA = Serial1.readString();
    input_str = Serial1.readString();

    Serial.print("Received Byte: \n");
    //Serial.println(receivedIntA,HEX);
    Serial.println(input_str);

    //delay(100);
    //Serial1.write(input_str);
    Serial1.println(input_str);
    //Serial.print("Sent Byte: %x\n", receivedIntA);
    Serial.println("Sent Str: " + input_str);

    //delay(10);
  }
}
  
