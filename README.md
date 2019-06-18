# Accounting Tools

A desktop app that replaces a user error-prone spreadsheet used in my current accounts payable position. 

![project-at](https://user-images.githubusercontent.com/16675876/59707067-d8056200-91cf-11e9-92d9-e72b32710232.jpg)

## Technologies used 

+ HTML
+ CSS
+ SASS
+ JavaScript
+ Vue.js
+ Vuex
+ Electron

## Reason for creation
To learn a reactive framework. 

## What I did
This desktop accounting tool is setup for multiple modules allowing for future tool additions. The main module, Tax Accrual, takes user input from the main form and the multiple card inputs, stores the content with Vuex and displays real-time calculations. Bootstrap was utilized for input fields and grid system. 

## Backstory
 I work in accounts payable. We frequently need to perform calculations for material purchases over a certain threshold. We have a spreadsheet for that.

This spreadsheet is unnecessarily difficult to learn and understand. We have multiple versions for different tax rate and freight scenarios. I thought to myself, "Maybe I could consolidate these and make one single spreadsheet that does everything and is easier on the eyes."

I saw this as the perfect opportunity to stretch my legs in a new framework—Vue.js. I asked my mentor if he could provide the foundation to start a new project in Vue.js as if it were a project he'd develop for his company. "Sure!" he said. "I'll even throw Electron in there so you can make a desktop app instead of a web app." Say what?

This was the first programming anything I learned through immersion. I didn't know how Vue.js worked let alone what a package.json file was. I stayed inside the Vue components for as long as I could. The day came when I needed input content to be usable for real-time calculation display. At the time I didn't understand how data sharing between components in plain Vue.js worked let alone retrieving state from Vuex. I understood how JavaScript objects worked! I understand their differences now but at the time I needed dear ol' mentor to point me to the right resource.

Once I got the hang of how to code and maneuver around this big, scary "real-world" project, I started to appreciate the simplicity of putting all relevant code in one self-contained Vue component. I could make the components talk to each other and, together, they became an app. How cool is that!
