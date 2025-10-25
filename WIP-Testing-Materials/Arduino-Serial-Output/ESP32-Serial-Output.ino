int i = 0;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
}

void loop() {
  // put your main code here, to run repeatedly:
  Serial.println(i);
  delay(1000);
  i = (i + 1) % 10;
}
