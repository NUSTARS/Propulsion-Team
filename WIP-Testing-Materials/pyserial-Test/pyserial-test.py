# simple script that prints data received over UART
# may be necessary to change the serial port
import serial
import time

ser = serial.Serial('COM3', baudrate = 115200)

while True:
    if ser.in_waiting > 0:
        data = ser.readline().decode('utf-8').strip()
        print(f"Recieved: {data}")
        
    time.sleep(0.1)