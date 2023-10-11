<img src="./screenshots/investment group mockup.png" style="width:100%;margin-bottom:2rem">

# [Live demo](https://portfoliowebdesignone.netlify.app)

# About

An eye-catching and aesthetically pleasing website, meticulously crafted for my portfolio, that showcases the experience I've gained from integrating HTML, Tailwind CSS, and JavaScript.

Feel free to explore the repository at your leisure to see the project in action and take it as testimony of my skills in producing sleek and premium web experiences.

# Screenshots

| Mobile                                | Desktop                                 |
| ------------------------------------- | --------------------------------------- |
| ![Screenshots](screenshots/phone.png) | ![Screenshots](screenshots/desktop.png) |

# Highlights

1. **Fully** responsive design
2. Loading **animation**
3. **Smooth** page transitions
4. **Custom** video player
5. **Trailing** mouse
6. **Modular code** (ES6 modules)

## Fully responsive design

TailwindCSS played a pivotal role in implementing responsive design as it provies developers with a straightforward approach to responsiveness ensuring that web designs adapts seamlessly to various screen sizes.

Adding to that, I've integrated responsive units (vw and vh) to make all elements contract or expand proportionally to the viewport width or height with minimal code.

## Loading animation

<img src="./screenshots/loading animation.gif" style="width:100%;margin-bottom:2rem">

For this features, I made use of the Local storage to run the loading animation every 10 min after the user's first visit and smooth page transitions as the user changes routes. You can examine the relevant code snippet below for a closer examination at the implementation:

```javascript
  const loading_animation_params = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    localStorage.setItem("user", JSON.stringify({ date: new Date() }));
    loadingAnimation();
    return;
  }

  if (user) {
    const visit_time = new Date(JSON.parse(localStorage.getItem("user")).date);
    const now = new Date();
    const time_diff = new Date(now - visit_time);
    if (time_diff.getMinutes() > 9) {
      loadingAnimation();
    // Resetting the visit time
      localStorage.setItem("user", JSON.stringify({ date: new Date() }));
      return;
  }
};
```

## Smooth page transitions

<img src="screenshots/page transition.gif" style="width:100%;margin-bottom:2rem;"/>

As explained earlier, if a user changes routes within the 10 minutes interval, a clip-path animation will be triggered to smooth transition from one page to another.

```javascript
if (time_diff.getMinutes() < 10) {
  pageTransition();
  return;
}
```

## Custom cursor

A circle that follows the mouse mouvements using the mousemove event. Check the [cursor.js](public/common/cursor.js) file for an in-depth examination

## Custom video player

<img src="screenshots/video player.png" style="width:100%;margin-bottom:2rem;"/>

A video player encompassing most functionalities of modern video players such as:

1. Fast forward/backward
2. Full screen mode
3. Captions
4. Volume slider
5. Timeline slider
7. Keyboard shortcuts


Check the [video-controls.js](public/common/videocontrols.js) file for a close examination.

<u>NB:</u> I did not include video quality controls as they suggest the need for __streaming functionalities__ and a __back-end.__ which falls outside the scope of this project.


## Modular code

<img src="screenshots/js modules.png" style="width:100%;margin-bottom:2rem;"/>

To make my code as clean as possible, I divided my codebase into multiple files using __ES6 modules__.

I first came accross this functionality when I was learning React. Initially I assumed that it was React specific. Much to my satisfaction, I discovered I could use it to enhance the readability of my code with vanilla js.

# Notes

Page transitions may not work properly as I had to make do with vanilla js and some third party library. Changing routes in javascript without resorting to dom manipulation resulted in a sometimes unstable animation. (Especially on mobile devices)

# Contact me

If you have any suggestions or questions, you can email me at the address [a.elbazzazi.outlook.com](mailto:a.elbazzazi@outlook.com) or you can use the contact form on my [website](https://ayoubelbazzazi.vercel.app/Contact)

## Best regards!
