import serial
import time

ser = serial.Serial('/dev/tty.usbserial-0001', baudrate = 9600)

sending = True


while True:
    data_to_send = 0
    ser.write(bytes([data_to_send]))
    print(bytes([data_to_send]))
    print("0\n")
    time.sleep(1) 
    
    data_to_send = 1
    ser.write(bytes([data_to_send]))
    print(bytes([data_to_send]))

    print("1\n")
    time.sleep(1)
    
    data_to_send = 5
    ser.write(bytes([data_to_send]))
    time.sleep(1)



