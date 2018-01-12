% WiredHack 18.1-4
% Dr. Andrew Besmer



# Particle Photon

## Wiring The Addressable LEDs

* Needs `5v` no more, no less.
* Red to `5v`
* Black to `Gnd`
* Green is to `D6` with a resistor in series
	* `D6` is an arbitrary choice
	* Lack of a resistor will cause problems on output

## Microcontroller

* Will take `5v` just fine but runs at `3.3v`
	* Don't attempt more than `5v` or you will destroy your photon
* Microcontrollers turn on, initialize, then loop

```
void setup() {
	//runs once
}

void loop() {
	//runs continuously
}
```

## Microcontroller

* Using the web IDE you can flash firmware directly to the photon
* You can now use libraries so you don't need to reimplement the WS2812B communication protocol
	* I recommend FastLED or Adafruit's
	* You must add `FASTLED_USING_NAMESPACE` or you will get errors when compiling the firmware ***Besmer saves you 1 hour***

```
#include <FastLED.h>
FASTLED_USING_NAMESPACE

void setup() {

}

void loop() {

}
```

## Microcontroller

* Setup FastLED to use your WS2812B light strip and set the 75th pixel to red and 76th to white

```
#include <FastLED.h>
FASTLED_USING_NAMESPACE

const int NUM_LEDS=150;
CRGB leds[NUM_LEDS];
const int LED_DATA = D6;

        
void setup() {
    FastLED.addLeds<NEOPIXEL, LED_DATA>(leds, NUM_LEDS); 
    leds[75] = CRGB::Red; //Set pixel 75 to Red
    leds[76] = CRGB::White; //Set pixel 76 to White
    FastLED.show();
}

void loop() {

}
```

## Microcontroller

* Now we can use `loop()` to blink an led which continuously runs over and over and over and ...
* `delay()` is used to pause the app for that number of milliseconds `1000ms = 1sec`
	* In many cases this will cause problems in responding to events, you've been warned ***Besmer saves you 15 minutes***

```
#include <FastLED.h>
FASTLED_USING_NAMESPACE

const int NUM_LEDS=150;
CRGB leds[NUM_LEDS];
const int LED_DATA = D6;

        
void setup() {
    FastLED.addLeds<NEOPIXEL, LED_DATA>(leds, NUM_LEDS); 
    leds[75] = CRGB::Red; //Set pixel 75 to Red
    leds[76] = CRGB::White; //Set pixel 76 to White
    FastLED.show();
}

void loop() {
    //Blink pixel 77
    leds[77] = CRGB::Blue;
    FastLED.show(); //Needs to be called to update the LED strip
    delay(1000);
    leds[77] = CRGB::Black;
    FastLED.show(); //Needs to be called to update the LED strip
    delay(1000);
}
```

## Microcontroller

* Now that we understand how to control the led's lets create that sweet Knight Rider Animation

```
#include <FastLED.h>
FASTLED_USING_NAMESPACE

const int NUM_LEDS=150;
CRGB leds[NUM_LEDS];
const int LED_DATA = D6;

const int waveSize = 20; //How 

        
void setup() {
    FastLED.addLeds<NEOPIXEL, LED_DATA>(leds, NUM_LEDS); 
    FastLED.show();
}

void loop() {
    KnightRider();
}

void KnightRider()
{
    for(int dot = 0; dot < NUM_LEDS; dot++) { //Move from the start to end of the strip
        leds[dot] = CRGB::Red;
        FastLED.show();
    
        leds[max(0,dot-waveSize)] = CRGB::Black; // Create a trail of the waveSize
    
    }
    
    for(int dot = NUM_LEDS; dot > 0; dot--) { //Move from the end to the start of the strip
        leds[dot] = CRGB::Red;
        FastLED.show();
    
        leds[min(dot+waveSize, NUM_LEDS-1)] = CRGB::Black; //Create a trail of the waveSize
    }

}
```

## Microcontroller

* Let's add another animation
	* Notice millis instead of delay?

```
#include <FastLED.h>
FASTLED_USING_NAMESPACE

const int NUM_LEDS=150;
CRGB leds[NUM_LEDS];
const int LED_DATA = D6;

const int waveSize = 20; //How big

unsigned long previousMillis = 0; //When did we last time we change the lights
const long interval = 1000; //How often should we change?
CRGB::HTMLColorCode currentColor = CRGB::Blue;  //What color did we last use?

        
void setup() {
    FastLED.addLeds<NEOPIXEL, LED_DATA>(leds, NUM_LEDS); 
    FastLED.show();
}

void loop() {
   //KnightRider();
   Patriotic(); //Will not unnecessarily block events like buttons, PIR sensor, etc...
}

void KnightRider()
{
    for(int dot = 0; dot < NUM_LEDS; dot++) { //Move from the start to end of the strip
        leds[dot] = CRGB::Red;
        FastLED.show();
    
        leds[max(0,dot-waveSize)] = CRGB::Black; // Create a trail of the waveSize
    
    }
    
    for(int dot = NUM_LEDS; dot > 0; dot--) { //Move from the end to the start of the strip
        leds[dot] = CRGB::Red;
        FastLED.show();
    
        leds[min(dot+waveSize, NUM_LEDS-1)] = CRGB::Black; //Create a trail of the waveSize
    }

}

void Patriotic()
{
    unsigned long currentMillis = millis();
    
    if (currentMillis - previousMillis >= interval) { //Avoids use of delay
        previousMillis = currentMillis;
        
        if(currentColor == CRGB::Blue) //Cycles the colors
        {
            currentColor = CRGB::Red;
        }
        else if(currentColor == CRGB::Red)
        {
            currentColor = CRGB::White;
        }
        else if(currentColor == CRGB::White)
        {
            currentColor = CRGB::Blue;
        }
        
        
        for(int ct=0; ct<NUM_LEDS; ct++) //Sets the color
        {
            leds[ct] = currentColor; 
        }

        FastLED.show(); 
    
    }
}
```


## Microcontroller

* And another...

```
#include <FastLED.h>
FASTLED_USING_NAMESPACE

const int NUM_LEDS=150;
CRGB leds[NUM_LEDS];
const int LED_DATA = D6;

const int waveSize = 20; //How big

unsigned long previousMillis = 0; //When did we last time we change the lights
const long interval = 1000; //How often should we change?
CRGB::HTMLColorCode currentColor = CRGB::Blue;  //What color did we last use?

        
void setup() {
    FastLED.addLeds<NEOPIXEL, LED_DATA>(leds, NUM_LEDS); 
    FastLED.show();
}

void loop() {
   //KnightRider();
   //Patriotic(); 
   Off();
}

void Off()
{
    for(int ct=0; ct<NUM_LEDS; ct++) //Sets the color
    {
        leds[ct] = CRGB::Black; 
    }
    
    FastLED.show(); 
}

void KnightRider()
{
    for(int dot = 0; dot < NUM_LEDS; dot++) { //Move from the start to end of the strip
        leds[dot] = CRGB::Red;
        FastLED.show();
    
        leds[max(0,dot-waveSize)] = CRGB::Black; // Create a trail of the waveSize
    
    }
    
    for(int dot = NUM_LEDS; dot > 0; dot--) { //Move from the end to the start of the strip
        leds[dot] = CRGB::Red;
        FastLED.show();
    
        leds[min(dot+waveSize, NUM_LEDS-1)] = CRGB::Black; //Create a trail of the waveSize
    }

}

void Patriotic()
{
    unsigned long currentMillis = millis();
    
    if (currentMillis - previousMillis >= interval) { //Avoids use of delay
        previousMillis = currentMillis;
        
        if(currentColor == CRGB::Blue) //Cycles the colors
        {
            currentColor = CRGB::Red;
        }
        else if(currentColor == CRGB::Red)
        {
            currentColor = CRGB::White;
        }
        else if(currentColor == CRGB::White)
        {
            currentColor = CRGB::Blue;
        }
        
        
        for(int ct=0; ct<NUM_LEDS; ct++) //Sets the color
        {
            leds[ct] = currentColor; 
        }

        FastLED.show(); 
    
    }
}
```

## Microcontroller


* Now lets use the Particle Cloud and register a function that can be called using a REST based API
* The function will change the mode of our light output
* `Particle.function('funcName', funcRef)`
* The function takes a `String` and returns an `int` (usually status code)


```
#include <FastLED.h>
FASTLED_USING_NAMESPACE

const int NUM_LEDS=150;
CRGB leds[NUM_LEDS];
const int LED_DATA = D6;

const int waveSize = 20; //How big

unsigned long previousMillis = 0; //When did we last time we change the lights
const long interval = 1000; //How often should we change?
CRGB::HTMLColorCode currentColor = CRGB::Blue;  //What color did we last use?

uint8_t currentMode = 1;

        
void setup() {
    FastLED.addLeds<NEOPIXEL, LED_DATA>(leds, NUM_LEDS); 
    FastLED.show();
    
    Particle.function("setMode",setMode); //Setup function
    
}

void loop() {
    if(currentMode == 1)
    {
        Off();
    } else if (currentMode == 2)
    {
        Patriotic();
    } else if (currentMode == 3)
    {
        KnightRider();
    }
}

int setMode(String command)
{
    if(command == "1")
    {
        currentMode = 1;
        return 1; //Success
    }
    else if(command == "2")
    {
        currentMode = 2;
        return 1;
    }
    else if(command == "3")
    {
        currentMode = 3;
        return 1;
    }
    return -1; //Fail
}

void Off()
{
    for(int ct=0; ct<NUM_LEDS; ct++) //Sets the color
    {
        leds[ct] = CRGB::Black; 
    }
    
    FastLED.show(); 
}

void KnightRider()
{
    for(int dot = 0; dot < NUM_LEDS; dot++) { //Move from the start to end of the strip
        leds[dot] = CRGB::Red;
        FastLED.show();
    
        leds[max(0,dot-waveSize)] = CRGB::Black; // Create a trail of the waveSize
    
    }
    
    for(int dot = NUM_LEDS; dot > 0; dot--) { //Move from the end to the start of the strip
        leds[dot] = CRGB::Red;
        FastLED.show();
    
        leds[min(dot+waveSize, NUM_LEDS-1)] = CRGB::Black; //Create a trail of the waveSize
    }

}

void Patriotic()
{
    unsigned long currentMillis = millis();
    
    if (currentMillis - previousMillis >= interval) { //Avoids use of delay
        previousMillis = currentMillis;
        
        if(currentColor == CRGB::Blue) //Cycles the colors
        {
            currentColor = CRGB::Red;
        }
        else if(currentColor == CRGB::Red)
        {
            currentColor = CRGB::White;
        }
        else if(currentColor == CRGB::White)
        {
            currentColor = CRGB::Blue;
        }
        
        
        for(int ct=0; ct<NUM_LEDS; ct++) //Sets the color
        {
            leds[ct] = currentColor; 
        }

        FastLED.show(); 
    
    }
}
```

## Microcontroller

* Call the function using HTTP `POST`, the `access_token` and `args` (only really takes one)

```	
 curl -d "access_token=REDACT&args=1" -X POST
 https://api.particle.io/v1/devices/REDACT/setMode
```



# Echo Dot

## Developer Account

* You will need to have:
	* An Amazon AWS account (if you want to use AWS lambda)
	* An Amazon Developer Account
* For this hackathon please use the provided credentials and account for both

## Create a Skill 

* Start by creating a new skill, you can find that feature under the Alexa tab

## Skill Information

* Set the `Skill Type` to `Custom Interaction Model`, consider examining others if they are relevant for your features
* Name your skill
* Pick an invocation name - *this is an important decision* 
* If you plan on playing any mp3 files set the radio box for `Audio Player` to `Yes` ***Besmer saves you 3 hours! Yes seriously... I spent 3 hours figuring this out. I should RTM better.***

## Interaction Model

* Launch the Skill Builder
* Intents are actions you want Alexa to perform
* Slots are essentially variables which can be populated form user input

## Intents 

* Amazon has supplied you with required intents
* You need to add at least one intent
	* Lets create one to say hi to an arbitrary person
	* Name your intent `SayHi`
	* Add some sample utterances using curly braces anytime you want slots
* E.g.
	* `Say hi to someone for me`
	* `Say hi to {person}`
	* `Say hi`
* Notice how a new intent slot was created for you, we need to configure it

## Intent Slots

* Configure the intent slot to help Alexa identify what type of words/numbers/etc might be used
* `AMAZON.US_FIRST_NAME` seems appropriate
* Under `Slot filling` set the slot to required and fill out the prompts and utterance you expect as before

## Configuration

* Now `Build Model` and move to `Configuration`
* You have the option to use your own https endpoint that returns valid json for Alexa to consome or use an AWS Lambda function
* Use `AWS Lambda ARN (Amazon Resource Name)`
* Hop over to AWS Lambda and create a new Lambda function to handle this Alexa skill

## Lambda function

* From the Lambda dashboard click `Create function`
* You can start from scratch or use a blueprint
	* `alexa-skill-kit-sdk-factskill` is a good starter blueprint
* I'll `Author from scratch` and assign a function name
* Create a `lambda_basic_execution` role
* Click `Next`
* Add the `Alexa Skills Kit` trigger and Click `Add` then `Save`

## Lambda function

* Copy the ARN at the top over to the Alexa Developer Skill section under `Configuration` for the skill you are building
* At this point the skill is configured and you can say `Alexa, open SKILLINVOCATION` however it will fail because the Lambda function is empty
* In the terminal add a `package.json` file

```
{
  "name": "wiredhack",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "alexa-sdk": "^1.0.10" 
  }
}
```

* This will require the alexa nodejs sdk

## Lambda function

* To install the sdk you need to `npm install` and it will create a node_modules folder for you with all the relevant files
* Now create an `index.js` to handle the skill
* Note the handler matches exactly the skill intent you created earlier


```
'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined; // TODO replace with your app ID (OPTIONAL).

const handlers = {
    'LaunchRequest': function() {
        this.emit(':ask', 'What would you like to do?', 'Please say that again?');
    },
    'SayHi': function() {
        if (!this.event.request.intent.slots.person.value) {
            this.emit(":delegate", this.event.request.intent);
        } else {
            this.emit(':tell', "Hi there  " + this.event.request.intent.slots.person.value);
        }
    },
    'AMAZON.HelpIntent': function() {
	this.emit(':ask', 'Try saying, say hi to Alexa.');
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', "OK");
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', "OK");
    }
};

exports.handler = function(event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

```

## Lambda function

* `zip -r lambda.zip .` and upload the zip as your AWS lambda function
* After browsing for the upload click `Save` ***Besmer saves you 10 minutes***

## Lambda function

* Try your skill by opening your skill 
	* Notice how `LaunchRequest` was fired
* Try:
	* `Help`
		* Notice how the help... helps!
	* `Say hi to Alexa`
		* Notice how `this.event.request.intent.slots.person.value` extracts the person slot's value
	* `Say hi`
		* Notice how `this.emit(":delegate", this.event.request.intent);` has Alexa prompt
	
## Lambda function

* Lets expand the skill to be able to respond to a question about family and connect to the photon
* Add the intent in the Alexa Skill Builder with as many sample utterances as you can think of
* Create the handler with the same name in the index.js, include the `https` library

```
'use strict';

var http = require('https');

const Alexa = require('alexa-sdk');

const APP_ID = undefined; // TODO replace with your app ID (OPTIONAL).

const handlers = {
    'LaunchRequest': function() {
        this.emit(':ask', 'What would you like to do?', 'Please say that again?');
    },
    'SayHi': function() {
        if (!this.event.request.intent.slots.person.value) {
            this.emit(":delegate", this.event.request.intent);
        } else {
            this.emit(':tell', "Hi there  " + this.event.request.intent.slots.person.value);
        }
    },
    'AMAZON.HelpIntent': function() {
	this.emit(':ask', 'Try saying, say hi to Alexa.');
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', "OK");
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', "OK");
    },
    'HaveRelative': function() {

	var options = {
		hostname: 'api.particle.io',
		path: '/v1/devices/REDACTED/setMode',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': 60
		}
	};

	var intentHandler = this;

	var req = http.request(options, function(response) {
        	intentHandler.response
		.speak("You know I'm, not human right? <break time='3s'/> Now that I think of it though I do have an uncle.  You might know him! ")
       	 	.audioPlayerPlay('REPLACE_ALL', 'https://deltona.birdnest.org/~acc.besmera2/wiredhack/KnightRiderAlexa.mp3', 'krtheme', null, 0);
	        intentHandler.emit(':responseReady');

	});

	req.write('access_token=REDACTED&args=3');
	req.end();


    }
};

exports.handler = function(event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
```

* I don't like how this gives away the punch line by starting the animation as the voice starts

## Lambda Function

* Binding to `PlaybackStarted` and `PlaybackFinished` will take care of that though...
	* Not `AudioPlayer.PlaybackStarted` ***Besmer saves you 5 minutes***

```
'use strict';

var http = require('https');

const Alexa = require('alexa-sdk');

const APP_ID = undefined; // TODO replace with your app ID (OPTIONAL).

const handlers = {
    'LaunchRequest': function() {
        this.emit(':ask', 'What would you like to do?', 'Please say that again?');
    },
    'SayHi': function() {
        if (!this.event.request.intent.slots.person.value) {
            this.emit(":delegate", this.event.request.intent);
        } else {
            this.emit(':tell', "Hi there  " + this.event.request.intent.slots.person.value);
        }
    },
    'AMAZON.HelpIntent': function() {
	this.emit(':ask', 'Try saying, say hi to Alexa.');
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', "OK");
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', "OK");
    },
    'HaveRelative': function() {

        	this.response
		.speak("You know I'm, not human right? <break time='3s'/> Now that I think of it though I do have an uncle.  You might know him! ")
       	 	.audioPlayerPlay('REPLACE_ALL', 'https://deltona.birdnest.org/~acc.besmera2/wiredhack/KnightRiderAlexa.mp3', 'krtheme', null, 0);
	        this.emit(':responseReady');


    },
    'PlaybackStarted': function() {
	var options = {
		hostname: 'api.particle.io',
		path: '/v1/devices/REDACTED/setMode',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': 60
		}
	};

	var req = http.request(options, function(response) {

	});

	req.write('access_token=REDACTED&args=3');
	req.end();
    },
    'PlaybackFinished': function() {
	var options = {
		hostname: 'api.particle.io',
		path: '/v1/devices/REDACTED/setMode',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': 60
		}
	};

	var req = http.request(options, function(response) {

	});

	req.write('access_token=REDACTED&args=1');
	req.end();
    },
    'PlaybackStopped': function() {
    },
    'PlaybackNearlyFinished': function() {
    },
    'PlaybackFailed': function() {
    }
};

exports.handler = function(event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

```

## Debugging/Alexa Tips

* Cloudwatch is your friend
* `console.log()` is your friend
* The manual is your friend
* Manual provides the following about using mp3 files, use it:

```
ffmpeg -i some.wav -ac 2 -codec:a libmp3lame -b:a 48k -ar 16000  someAlexa.mp3
```



