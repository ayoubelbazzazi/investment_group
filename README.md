<img src="./screenshots/investment group mockup.png" style="width:100%;margin-bottom:2rem">

# [Live demo](https://portfoliowebdesignone.netlify.app)

# About

An eye-catching and aesthetically pleasing website, meticulously crafted for my portfolio, that showcases the experience I've gained from integrating HTML, Tailwind CSS, and JavaScript.

Feel free to explore the repository at your leisure to see the project in action and take it as testimony of my skills in producing premium digital experiences.

# Stack used

1. <img src="screenshots/html.png" style="width:15px;"/> HTML
2. <img src="screenshots/tailwindcss.png" style="width:15px;"/> Tailwind CSS
3. <img src="screenshots/javascript.png" style="width:15px;"/> Javascript

# Screenshots

| Mobile                                | Desktop                                 |
| ------------------------------------- | --------------------------------------- |
| ![Screenshots](screenshots/phone.png) | ![Screenshots](screenshots/desktop.png) |

# Highlights

1. [**Fully** responsive design](#fully-responsive-design)
2. [Loading **animation**](#loading-animation)
3. [**Smooth** page transitions](#smooth-page-transitions)
4. [**Custom** video player](#custom-video-player) (About page)
5. [**Custom** cursor](#custom-cursor)
6. [**Horizontal** scrolling](#horizontal-scrolling) (Desktop only)
7. [**Modular code** (ES6 modules)](#modular-code)

## Fully responsive design

Tailwind CSS played a pivotal role in implementing responsive design as it provies developers with a straightforward approach to responsiveness ensuring that web designs adapts seamlessly to various screen sizes.

Adding to that, I've integrated responsive units (vw and vh) to make all elements contract or expand proportionally to the viewport width or height with minimal code.

## Loading animation

<img src="./screenshots/loading animation.gif" style="width:100%;margin-bottom:2rem">

For this feature, I made use of the browser's local storage to get the exact moment the user visits the website for the first time. This allowed to run a loading animation whenever the user visits a page after a 10 minutes session and run smooth page transitions as the user changes routes within that time interval. You can examine the relevant code snippet below for a closer look at the implementation:

```javascript
const loading_params = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    localStorage.setItem("user", JSON.stringify({ date: new Date() }));
    loadingAnimation();
    return true;
  }

  if (user) {
    const visit_time = new Date(JSON.parse(localStorage.getItem("user")).date);
    const now = new Date();
    const time_diff = new Date(now - visit_time);
    if (time_diff.getMinutes() > 9) {
      // Resetting the visit time
      localStorage.setItem("user", JSON.stringify({ date: now }));

      loadingAnimation();
      return true;
    }
  }
};

window.addEventListener("load", loading_params);
```

## Smooth page transitions

<img src="screenshots/page transition.gif" style="width:100%;margin-bottom:2rem;"/>

As explained earlier, if a user changes routes within the 10 minutes interval, a clip-path animation will be triggered to smooth transition from one page to another.

```javascript
// ...Loading animation code

if (time_diff.getMinutes() < 10) {
  pageTransition();
  return false;
}
```

## Custom cursor

A circle that follows the mouse movements using the mousemove event. It goes something like this:

```javascript
const cursor = document.getElementById("cursor");
document.addEventListener("mousemove", cursormove);

function cursorMove(e) {
  const { width, height } = cursor.getBoundingClientRect();
  cursor.style.left = e.clientX - width / 2;
  cursor.style.top = e.clientY - height / 2;
}

// I used gsap to achieve the same effect
```

Check the [cursor.js](public/common/cursor.js) file for an in-depth examination.

## Custom video player

<img src="screenshots/video player.png" style="width:100%;margin-bottom:2rem;"/>

A video player encompassing most of modern functionalities such as:

1. Fast forward/rewind
2. Full screen mode
3. Captions
4. Volume slider
5. Timeline slider
6. Keyboard shortcuts
7. Playback speed
8. Picture in picture mode
9. A touch screen version

Check the [video-controls.js](public/common/videocontrols.js) file for a close examination.

<u>NB:</u> I did not include video quality controls as they suggest the need for **streaming functionalities** and a **back-end.** which falls outside the scope of this project.

## Horizontal scrolling

<img src="screenshots/horizontal scrolling.gif" style="width:100%;margin-bottom:2rem"/>

I made this effect using ScrollTrigger, a gsap plugin for scroll based animations. ScrollTrigger links the transform translate property to the mouse wheel and allows elements to translate to the left as I scroll down the page and vice versa.

## Modular code

```javascript
import "./svg-animations.js";
import "../common/cursor.js";
import "../common/phonenav.js";
import "../common/header.js";

import { loadingAnimation } from "../common/loading.js";
import { pageTransition } from "../common/page_transition.js";
```

In order to make my code as clean as possible, I divided my codebase into multiple files using **ES6 modules**.

# Notes

1. Currently, I've only included three pages: Home, about and contact. The main purpose of this project is to showcase my programming skills highlighted by the features I added to these pages and I see no need for adding more content as that would be redundant and uninteresting for the user.

2. Page transitions may not work properly since I had to make do with vanilla js and some third party library (barba.js) to achieve that effect. Therefore, smoothly changing routes in javascript without resorting to dom manipulation resulted in a sometimes unstable animation. (Especially on mobile devices).<br>
   NextJs or any other framework supporting SSG would be better suited for this task.

3. If you want want to experiment with the code, clone the main branch. The master branch is full of bugs.

4. I did not design this website. I drew inspiration from another site I found while browsing the internet.

# Contact me

If you have any suggestions or questions, you can email me at the address [a.elbazzazi.outlook.com](mailto:a.elbazzazi@outlook.com) or you can use the contact form on my [website](https://ayoubelbazzazi.vercel.app/Contact).

Best regards!
