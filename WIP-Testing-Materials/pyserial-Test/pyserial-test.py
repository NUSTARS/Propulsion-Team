# simple script that prints data received over UART
# may be necessary to change the serial port
import serial
import time

ser = serial.Serial('COM3', baudrate = 9600)

sending = True

while True:
    
    if not sending:
        
        if (ser.in_waiting > 7):
            print(f"ser in waiting {ser.in_waiting}\n")
            data = ser.read(ser.in_waiting).decode('utf-8')
            print(f"Recieved: {data}")
            #time.sleep(0.5)
            sending = True
    else:   
        data_to_send = input("input: ")  
        print(f"{data_to_send}")
        ser.write(data_to_send.encode('utf-8'))
        sending = False
        time.sleep(.01)
        
    #time.sleep(0.5)