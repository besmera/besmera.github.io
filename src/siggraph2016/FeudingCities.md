% Feuding Cities
% Andrew Besmer
% http://......

# Overview

## Overview

* The Game
* Arduino Setup
* Kit Components
* Feuding Cities Remote Control

# The Game

## The Game

* Physical and Virtual
* Two ways to play
* Battle is Wednesday

# Arduino Setup

## Arduino Setup

* Plug in the Arduino using the provided usb cord
![Board and USB Cord!!!!!!!!!!!!!!!!!](!!!!!!!!!!!!.png)

## Arduino Setup

* Open the Arduino Software (IDE)
* Select the board included in the kit

![Arduino IDE Board Choice](ArduinoBoard.png)

## Arduino Setup

* Select the proper port for the software to communicate with the board on

![Arduino IDE Port Choice](ArduinoPort.png)


# Kit Components


## Kit Notes

* Free to use but not keep
* Please replace all kit components the way you found them


## Balls

* 3/4 plastic balls serve as ammunition

![3/4 Balls](!!A!!!!!!!!!rduinoUpload.png)

## Breadboard

* Use with jumper cables/wire
* Some components like buttons etc... fit nicely in it
* Each group of 5 is actually connected

![Breadboard](!!A!!!!!!!!!rduinoUpload.png)

## Arduino Board

* Arduino Uno
    * 16Mhz
    * 14 Digital Inputs/Outputs
        * HIGH
        * LOW
* Three Powering Options (5v)
    * USB (As you work)
    * Power Jack
    * VIN/GND Pins

## Arduino Board

* Pin Locations
![Arduino Board](!!!Ar!!duinoBoard.png)

## Programming the Board

* Use Arduino Software (IDE) to create sketch
* The Arduino language supports all standard c/c++ constructors supported by avr-g++

```c
void setup() {
  // put your setup code here, to run once:

}

void loop() {
  // put your main code here, to run repeatedly:

}
```

## Programming with Pins [^sourceArduino]


* Before using a pin you should initialize it setting it's mode using `pinMode()` and the constant `INPUT` or `OUTPUT`

```c

int buttonPin = 12;              // Button connected to digital input 12
int ledPin = 13;                 // LED connected to digital pin 13

void setup()
{
  pinMode(buttonPin, INPUT);
  pinMode(ledPin, OUTPUT);
}

void loop()
{
}
```

## Digital vs Analog

* Analog maps the 0-5v to 0-1023
    * `analogRead(pin)` will return values from 0-1023
    * `analogWrite(pin, value)` will accept values from 0-255
        * Generates a square wave based on duty cycle
        * (0 - 0%), (64 - 25%), (127 - 50%), (255 - 100%)

* Digital maps 0v to `LOW` and 5v to `HIGH`
    * `digitalRead(pin)` will return value of `HIGH` or `LOW`
    * `digitalWrite(pin, value)` will accept values of `HIGH` or `LOW`

## Combining The Two

```c
int ledPin = 9;      // LED connected to digital pin 9
int analogPin = 3;   // potentiometer connected to analog pin 3
int val = 0;         // variable to store the read value

void setup()
{
  pinMode(ledPin, OUTPUT);   // sets the pin as output
}

void loop()
{
  val = analogRead(analogPin);   // read the input pin
  analogWrite(ledPin, val / 4);  // analogRead values go from 0 to 1023, analogWrite values from 0 to 255
}
```

## Uploading

* Upload your Sketch

![Arduino IDE Sketch Upload](ArduinoUpload.png)

## Motor and Wheel

* Two hobby motors w/gear (up to 12v)
* Two wheels with rubber tires
* Powering motors should not be done through the arduino (directly)
* Direction the motor spins is based on which way you wire it, switching wires will reverse motor Direction

## Servos [^sourceArduino]

* Three high torque servos with variety of attachments
* Run @ 4.8v-6.0v through the arduino
* Rotation is 0-180 degrees
* Three wires
    * Brown - Ground
    * Red - 5v Power
    * Orange - Data from arduino
* Note that 0 degree will depend on how you attach the attachments

![Servos and Attachments](!!A!!!!!!!!!rduinoUpload.png)



## Servos

* Be sure to use a PWM pin to control the servo
* Use the Arduino Servo Library so that you can work with angles instead of PWM
* Start by `attach()`ing the servo and then `write()` an angle to it

```c
#include <Servo.h>

Servo myservo;

void setup()
{
  myservo.attach(9);
  myservo.write(90);  // set servo to mid-point
}

void loop() {}
```

## Remote Control

* [http://www.feudingcities.com/remote.html](http://www.feudingcities.com/remote.html)
* Supplies digital outputs to your arduino board for input
    * `HIGH`/`LOW`
* Register with me to get one (or more)
* I expect common usage will be L/R/U/D and FIRE!
* Controls are movable and support multi touch

## Remote Controls

* The remote supplies only digital inputs for you (`HIGH`/`LOW`)
* Need to decide between `delay()` and `millis()`, recommend the latter
* Both work with milliseconds (1000ms = 1s)
* `delay(milliseconds)` actually pauses most of sketch for specified time
* `millis()` returns number of milliseconds since the arduino started
    * Requires some custom logic

```c
/* Blink without Delay

 Turns on and off a light emitting diode (LED) connected to a digital
 pin, without using the delay() function.  This means that other code
 can run at the same time without being interrupted by the LED code.

 The circuit:
 * LED attached from pin 13 to ground.
 * Note: on most Arduinos, there is already an LED on the board
 that's attached to pin 13, so no hardware is needed for this example.

 created 2005
 by David A. Mellis
 modified 8 Feb 2010
 by Paul Stoffregen
 modified 11 Nov 2013
 by Scott Fitzgerald


 This example code is in the public domain.

 http://www.arduino.cc/en/Tutorial/BlinkWithoutDelay
 */

// constants won't change. Used here to set a pin number :
const int ledPin =  13;      // the number of the LED pin

// Variables will change :
int ledState = LOW;             // ledState used to set the LED

// Generally, you should use "unsigned long" for variables that hold time
// The value will quickly become too large for an int to store
unsigned long previousMillis = 0;        // will store last time LED was updated

// constants won't change :
const long interval = 1000;           // interval at which to blink (milliseconds)

void setup() {
  // set the digital pin as output:
  pinMode(ledPin, OUTPUT);
}

void loop() {
  // here is where you'd put code that needs to be running all the time.

  // check to see if it's time to blink the LED; that is, if the
  // difference between the current time and last time you blinked
  // the LED is bigger than the interval at which you want to
  // blink the LED.
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    // save the last time you blinked the LED
    previousMillis = currentMillis;

    // if the LED is off turn it on and vice-versa:
    if (ledState == LOW) {
      ledState = HIGH;
    } else {
      ledState = LOW;
    }

    // set the LED with the ledState of the variable:
    digitalWrite(ledPin, ledState);
  }
}
```


## Firing Range

* Test Weapons

USe printers, laser cutters



[^sourceArduino]: Source code on this slide based on arduino examples.
