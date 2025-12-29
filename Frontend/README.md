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

- ...
- ...
- ...

# Sources frontend:

- : The HTML Input element - HTML | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input

input element used in home.html

- HTML | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/email

email input specifics

- - HTML | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file

used to upload image from pc for profile pic in profile-setup.html

- Bodnar, J. (n.d.). JavaScript appendChild Guide: Learn how to add DOM elements easily. https://zetcode.com/dom/element-appendchild/

property used in movie.js,

- Date.prototype.toLocaleTimeString() - JavaScript | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString

'toLocalTimeString'used in main.js to get the time

- GeeksforGeeks. (2025a, July 28). JavaScript comparison operators. GeeksforGeeks. https://www.geeksforgeeks.org/javascript/javascript-comparison-operators/

compairison operator used in movie.js,

- GeeksforGeeks. (2025, July 28). JavaScript Logical Operators. GeeksforGeeks. https://www.geeksforgeeks.org/javascript/javascript-logical-operators/

logical operators used in register.js,

- How to measure time spent on a web page: using Unload Event and JavaScript tracking. (2025, November 7). Tutorialpedia. https://www.tutorialpedia.org/blog/how-to-measure-a-time-spent-on-a-page/

used for the time tracking of users (beforeunload event) in track.js

- HTTP status Code Constants in JavaScript: How to access them (Beyond XMLHttpRequest). (2025, November 14). Xjavascript. https://www.xjavascript.com/blog/accessing-http-status-code-constants/

used for the error status code

- M, M. (2025, July 30). What is JSON.stringify()? A Beginner’s Guide with Examples. DEV Community. https://dev.to/megha_m/what-is-jsonstringify-a-beginners-guide-with-examples-4hpn

Json.stringify used in register.js, login.js

- scroll-behavior - CSS | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-behavior

'scroll-behavior' proprety used in movie.css

- Shah, S. (2025, July 21). LocalStorage vs SessionStorage: How to Choose Wisely. DhiWise. https://www.dhiwise.com/post/localstorage-vs-sessionstorage-how-to-choose-wisely

for 'localStorage' used in register.js,

- The ToFixed() function in JavaScript. (n.d.). Mastering JS. https://masteringjs.io/tutorials/fundamentals/tofixed

'toFixed' used in main.js to convert number to string and round the number to a decimal

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

- ::-Webkit-scrollbar - CSS | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::-webkit-scrollbar

'innerHtml' property used in movie.js,

- W3Schools.com. (n.d.-g). https://www.w3schools.com/howto/howto_js_rangeslider.asp

to create the slider bar in profile-setup.html

- ::-Webkit-scrollbar - CSS | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::-webkit-scrollbar

'-webkit-scrollbar', '-webkit-scrollbar-thumb' used in movie.css

- Window: beforeunload event - Web APIs | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event

used to track the user time spent (beforeunload event) in track.js

- Window: location property - Web APIs | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/API/Window/location

'window.location' property

- Wu, H. (2024, May 8). How to implementing precise user duration tracking on webpages: A guide using JavaScript and Flask. Medium. https://medium.com/preprintblog/how-to-implementing-precise-user-duration-tracking-on-webpages-a-guide-using-javascript-and-flask-18a941dc61e3

used to track the user time spent (beforeunload event) in track.js
