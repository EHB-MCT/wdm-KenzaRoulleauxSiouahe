# Title:

Watching the Watcher: Emotional Data Collection with Horror movie App

# Concept

This project is a web-based platform that studies user behavior and emotional reactions while watching or browsing horror movies. The system collects both explicit data, such as profile information, fear level, and genre preferences, and implicit data, such as clicks, navigation behavior, time spent on pages, and interaction patterns.

Each user is assigned a unique identifier, allowing the backend to build and store an evolving profile over time. Although the platform appears to function as a movie discovery and personalization tool, it continuously records and analyzes user behavior to infer emotional sensitivity and fear tolerance.

Because real biometric devices such as smartwatches are not available, the project simulates physiological data, such as heart rate, based on user interactions, selected fear level, movie genre, and viewing context. This simulated data is treated as biometric input and stored persistently in the database.

The collected data influences the user-facing experience by adjusting content recommendations and perceived intensity, reinforcing behavioral patterns without the user being fully aware of the profiling process.

An administrative dashboard allows access to the collected data, enabling analysis per user, session, and interaction. Administrators can visualize trends, compare users, and observe how emotional profiles change over time.

The project intentionally exposes the weaknesses, biases, and ethical risks of large-scale personal data collection. It demonstrates how entertainment platforms can subtly influence users when individual behavior is continuously tracked, quantified, and interpreted.

# Features:

- User registration en login
- Profile setup and personalisation
- Behavioral data collection
- Simulated Biometric data (heart rate)
- Admin dashboard for data analysis

# Data collection

This project will collect both explicit and implicit data from the user:

- Profile information
- Navigation and interaction
- Watch behavior
- Simulated heart data

# Used languages/tools

- Frontend: HTML, CSS and Javascript
- Backend: Node.js, Express
- Database: MongoBD
- File Uploads: Multer
- Containerization: Docker

# Running the project

- npm install
- run "node server.js" in terminal
- open "welcome page" in front end
- make an account and browse movies

For admin:

- login with email : admin@gmail.com
- password: "adminpassword"
- admin paswword "SECRETCODE"
- browse the user data

# Pitfalls, Shortcomings, and Reflections on my Spooky Scary App

The data used in this project contains several important limitations that affect its accuracy, reliability, and realism. A major shortcoming is that much of the data is synthetic or simulated rather than naturally occurring. For example, heart rate measurements, user behaviour events, and interactions are generated in a controlled or artificial way. Because of this, the data does not fully capture the complexity, variability, and unpredictability of real human behaviour. This makes it difficult to draw strong or fully realistic conclusions from the visualizations and analyses.

Another issue is limited context and scale. The number of users is relatively small, and their actions are constrained by the structure of the application. Real-world platforms typically involve thousands or millions of users with diverse habits, devices, emotional states, and environmental factors. In this project, user behaviour such as page visits, clicks, and time spent on pages may not accurately reflect genuine interest or emotional response, but rather test usage or repeated interactions during development.

The heart rate data is inherently flawed due to missing external factors. Real heart rate changes can be influenced by stress, movement, caffeine, fitness level, or background activity, none of which are accounted for in this dataset. As a result, correlating heart rate directly to how “scary” a movie is can be misleading and oversimplified.

Working with fake or simulated data also proved challenging because it lacks authenticity. Even though the data provides a general idea of how a real system might behave, it does not carry the same weight or uncertainty as real-world data. This experience highlighted how difficult it can be to validate assumptions or identify meaningful trends when the data does not originate from genuine user behaviour.

Despite these shortcomings, this project was highly informative. One key lesson learned is that even a seemingly simple application, such as a horror movie rating app, can collect a surprisingly large amount of personal and behavioural information. Data such as viewing habits, friendships, interaction patterns, time spent on pages, and physiological signals can quickly build a detailed profile of a user. This realization emphasizes the importance of ethical data collection, transparency, and privacy-aware system design.

Overall, the project demonstrated both the power and the risk of data collection. While data visualization can provide valuable insights, it is only as reliable as the data itself. This experience reinforced the importance of understanding data limitations, questioning assumptions, and treating user data responsibly.

# Sources frontend:

- : The HTML Input element - HTML | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input

input element used in home.html

- HTML | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/email

email input specifics

- HTML | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file

used to upload image from pc for profile pic in profile-setup.html

- Alam, A. (2025, November 11). JavaScript Fetch API. Intellipaat. https://intellipaat.com/blog/fetch-api-javascript/

used for the fetch post API in multiple js files

- Array.prototype.filter() - JavaScript | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

".filter" method used in multiple js files

- Array.prototype.slice() - JavaScript | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice

".slice" method used in multiple js files

- Array.prototype.sort() - JavaScript | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

".sort" method used in multiple js files

- Bodnar, J. (n.d.). JavaScript appendChild Guide: Learn how to add DOM elements easily. https://zetcode.com/dom/element-appendchild/

property used in multiple js files

- Date.prototype.toLocaleTimeString() - JavaScript | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString

'toLocalTimeString'used in main.js to get the time

- Document: querySelector() method - Web APIs | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector

"document.querySelector()" method used in multiple js files

- Document: querySelectorAll() method - Web APIs | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll

"document.querySelectorAll()" method used in multiple js files

- DOM Manipulation cheat sheet. (n.d.). DevSheets. https://www.devsheets.io/sheets/dom-manipulation

DOM manipulation cheat sheet used in multiple js files

- EventTarget: addEventListener() method - Web APIs | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

"addEventListener()" method used in multiple js files

- Font awesome. (n.d.). Font Awesome. https://fontawesome.com/

library used for the icons in the bottom navigation

- GeeksforGeeks. (2025a, July 28). JavaScript comparison operators. GeeksforGeeks. https://www.geeksforgeeks.org/javascript/javascript-comparison-operators/

compairison operator used in movie.js,

- GeeksforGeeks. (2025, July 28). JavaScript Logical Operators. GeeksforGeeks. https://www.geeksforgeeks.org/javascript/javascript-logical-operators/

logical operators used in register.js,

- How to measure time spent on a web page: using Unload Event and JavaScript tracking. (2025, November 7). Tutorialpedia. https://www.tutorialpedia.org/blog/how-to-measure-a-time-spent-on-a-page/

used for the time tracking of users (beforeunload event) in track.js

- HTML cheatsheet for syntax and common tasks - HTML | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Cheatsheet

HTML cheat sheet common syntax code used for multiple HTML files

- HTTP status Code Constants in JavaScript: How to access them (Beyond XMLHttpRequest). (2025, November 14). Xjavascript. https://www.xjavascript.com/blog/accessing-http-status-code-constants/

used for the error status code

- M, M. (2025, July 30). What is JSON.stringify()? A Beginner’s Guide with Examples. DEV Community. https://dev.to/megha_m/what-is-jsonstringify-a-beginners-guide-with-examples-4hpn

Json.stringify used in register.js, login.js

- Object.entries() - JavaScript | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries

"object.enteries()" used in admin.js

- scroll-behavior - CSS | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-behavior

'scroll-behavior' proprety used in movie.css

- Semah, B. (2025, April 2). How to use LocalStorage in JavaScript. freeCodeCamp.org. https://www.freecodecamp.org/news/use-local-storage-in-modern-applications/

for 'localStorage' used in multiple js files

- Shah, S. (2025, July 21). LocalStorage vs SessionStorage: How to Choose Wisely. DhiWise. https://www.dhiwise.com/post/localstorage-vs-sessionstorage-how-to-choose-wisely

for 'localStorage' used in multiple js files

- Sharma, R. (2023, November 23). 28 Javascript Array Methods: a cheat sheet for developer. DEV Community. https://dev.to/devsmitra/28-javascript-array-hacks-a-cheat-sheet-for-developer-5769µ

cheat sheet for the array methods used in multiple js files

- The ToFixed() function in JavaScript. (n.d.). Mastering JS. https://masteringjs.io/tutorials/fundamentals/tofixed

'toFixed' used in main.js to convert number to string and round the number to a decimal

- Using the Fetch API - Web APIs | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

used when creating the "fetch" API in multiple js files

- vis.js - Network documentation. (n.d.). https://visjs.github.io/vis-network/docs/network/

used for the network data visualisation in admin.html, admin.js

- W3Schools.com. (n.d.). https://www.w3schools.com/tags/tag_label.asp

label tag used in home.html

- W3Schools.com. (n.d.-b). https://www.w3schools.com/tags/att_input_placeholder.asp

placeholder used in register and login html

- W3Schools.com. (n.d.-c). https://www.w3schools.com/js/js_window_location.asp

redirection for the 'back'button in register and login html

- W3Schools.com. (n.d.-d). https://www.w3schools.com/jsref/event_onclick.asp

'onclick' event in register and login html

- W3Schools.com. (n.d.-e). https://www.w3schools.com/js/js_window_location.asp

'window.location.href' used in register.js, login.js, register.html, login.html,

- W3Schools.com. (n.d.-h). https://www.w3schools.com/jsref/jsref_object_keys.asp
  "object.keys" used in admin.js

- ::-Webkit-scrollbar - CSS | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::-webkit-scrollbar

'innerHtml' property used in movie.js,

- W3Schools.com. (n.d.-g). https://www.w3schools.com/howto/howto_js_rangeslider.asp

to create the slider bar in profile-setup.html

- ::-Webkit-scrollbar - CSS | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::-webkit-scrollbar

'-webkit-scrollbar', '-webkit-scrollbar-thumb' used in movie.css

- Webta.St.Ic. (2016, October 13). Animate ecg pulse line builded with border and border-radius. Stack Overflow. https://stackoverflow.com/questions/40014999/animate-ecg-pulse-line-builded-with-border-and-border-radius

used as inspiration for the hearRateMonitor animation in "watch-movie.html" and "watch-movie.js"

- Window - Web APIs | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/API/Window

general information about "window." used for understanding

- Window: beforeunload event - Web APIs | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event

used to track the user time spent (beforeunload event) in track.js

- Window: location property - Web APIs | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/API/Window/location

'window.location' property

- Wu, H. (2024, May 8). How to implementing precise user duration tracking on webpages: A guide using JavaScript and Flask. Medium. https://medium.com/preprintblog/how-to-implementing-precise-user-duration-tracking-on-webpages-a-guide-using-javascript-and-flask-18a941dc61e3

used to track the user time spent (beforeunload event) in track.js
