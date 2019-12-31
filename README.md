# tinyadventure

This project was inspired by [Cats-of-jasnah project](https://github.com/countable/cats-of-jasnah).

The idea of tiny adventure is simple:

 - Use your phone or anything with a web browser + a speaker (internal phone speaker or a bluetooth speaker for even better experience)
 - Choose your scenario/play and hit play. 
 - Mum and dad can play together or just act it out from outside + provide light effect, etc... :p 

# Create your own adventure

 I put this code together quickly and i dont do Javascript often so it is not very well written. I did include some thoughts to expand it in the future. The crux of it is in `main.js`. You will find i have some predefined sound library ... I'm still sorting/picking the sound from google's free list - https://developers.google.com/assistant/tools/sound-library.

To right a scenario is quite simple. You write a description and a whole bunch of stages. Internationalisation is planned and responseivevoice.js does support many many languages. 

Stages require 3 things: 
 - time : How long you need that stage to run for. The minimum would default to however long it take for resonsivevoice to speak.
 - read : What line do you want to say at beginning of the scene
 - sound: A collection of sound and for each sound, we define when it would be triggered. Some sound, by default, are not looped (eg gun shot). You can use it to create fun scenarios/stories.

Clearly having scenario in the same javascript will grows quickly so i will move it out later. 

Happy holiday
San
