# tinyadventure

This project was inspired by [Cats-of-jasnah project](https://github.com/countable/cats-of-jasnah).

The idea of tiny adventure is simple:

 - Use your phone or anything with a web browser + a speaker (internal phone speaker or a bluetooth speaker for even better experience)
 - Choose your scenario/play and hit play. 
 - Mum and dad can play together or just act it out from outside + provide light effect, etc... :p 

# Create your own adventure

 I put this code together quickly and i dont do Javascript often so it is not very well written. I did include some thoughts to expand it in the future. The crux of it is in `scenarios.js`. You will find i have some predefined sound library in `main.js` ... I'm still sorting/picking the sound from google's free list - https://developers.google.com/assistant/tools/sound-library.

To right a scenario is quite simple. You write a description and a whole bunch of stages. Internationalisation is there if you want to add other languages which responseivevoice.js supports. 

Stages require 3 things: 
 - time : How long you need that stage to run for. The minimum would default to however long it take for resonsivevoice to speak.
 - read : What line do you want to say at beginning of the scene
 - sound: A collection of sound and for each sound, we define when it would be triggered. Some sound, by default, are not looped (eg gun shot). You can use it to create fun scenarios/stories.

 You can write scanerios in yaml and convert it using [this site](https://www.json2yaml.com/)

Happy holiday
San
