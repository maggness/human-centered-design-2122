const container = document.querySelector("#field");
let activeItem = null;
let active = false;

const dragStart = (e, yPos) => {
  if (e.target !== e.currentTarget) {
    active = true;

    // this is the item we are interacting with
    activeItem = e.target;

    if (activeItem !== null) {
      if (!activeItem.xOffset) {
        activeItem.xOffset = 0;
      }

      if (!activeItem.yOffset) {
        activeItem.yOffset = 0;
      }

      if (e.type === "touchstart") {
        activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
        activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
      } else {

        activeItem.initialX = e.clientX - activeItem.xOffset;
        activeItem.initialY = e.clientY - activeItem.yOffset;
      }
    }
  }
};

const dragEnd = (e) => {
  if (activeItem !== null) {
    const rectItem = activeItem.getBoundingClientRect();
    activeItem.initialX = activeItem.currentX;
    activeItem.initialY = activeItem.currentY;

    if ( rectItem.bottom / window.innerHeight * 100 < 63 ) {
        console.log('huts');
    }

  } 

  active = false;
  activeItem = null;
};

const drag = (e) => {
  if (active) {
    if (e.type === "touchmove") {
      //Mobile
      const rectItem = activeItem.getBoundingClientRect();
      if (
        rectItem.top > 520 &&
        rectItem.top < 660 &&
        rectItem.left > 180 &&
        rectItem.left < 280
      ) {
        if (!list.includes(activeItem.id)) {
          list.push(activeItem.id);
        }
      }

      e.preventDefault();

      activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
      activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
    } else {
      //Desktop

      activeItem.currentX = e.clientX - activeItem.initialX;
      activeItem.currentY = e.clientY - activeItem.initialY;
    }

    activeItem.xOffset = activeItem.currentX;
    activeItem.yOffset = activeItem.currentY;

    setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
  }
};

const setTranslate = (xPos, yPos, el) => {
  const rectItem = activeItem.getBoundingClientRect();
  let scaleyPos = rectItem.top / 670
  let indexPos = rectItem.top / 10 + 2

  if ( scaleyPos < .64 || rectItem.top < 260) {
    scaleyPos = .64;
  }

  if ( indexPos < 1) {
    indexPos = 1;
  }

  el.style.transform =
    "translate3d(" + xPos + "px, " + yPos + "px, 0)";
};

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

// document.addEventListener("keyup", (event) => {
//   if (event.keyCode === 9) {
//     console.log('tab');

//     const focusLeft = event.target.getBoundingClientRect().left/window.innerWidth*100
//     const focusTop = event.target.getBoundingClientRect().top/window.innerHeight*100

//     console.log(focusLeft.toFixed(0) + ' & Top:' + focusTop.toFixed(0))
//   }
// })

let fastSpeed = 1; 
const fastmsg = document.getElementById('fastdragmsg')

document.addEventListener("keydown", (event) => {
  const focusLeft = event.target.getBoundingClientRect().left/window.innerWidth*100
  const focusTop = event.target.getBoundingClientRect().top/window.innerHeight*100

  console.log(' left ' + focusLeft.toFixed(0) + ' top ' + focusTop.toFixed(0));

  if (event.keyCode === 90) {
    
    fastSpeed = fastSpeed + 4
    if (fastSpeed > 5) {
      fastSpeed = 1
    }

    if (fastmsg.textContent === 'Fast drag is ON, press Z to turn it ON') {
      fastmsg.textContent = 'Fast drag is OFF, press Z to turn it OFF'
    } else {
      fastmsg.textContent = 'Fast drag is ON, press Z to turn it ON'
    }
  }

  if (event.keyCode === 13) {
    console.log('enter');
    document.activeElement.classList.add('enterAdded');
    document.activeElement.blur()

    if (focusLeft > 59 && focusTop > 59) {
      event.target.style.transform = 'scale(0)'
    }
  }

    if (event.keyCode === 39) {
        event.preventDefault();
        console.log('>');

        document.activeElement.style.setProperty("--left", parseInt(focusLeft.toFixed(0)) + 1 * fastSpeed);
    }

    if (event.keyCode === 37) {
        event.preventDefault();
        console.log('<');

        document.activeElement.style.setProperty("--left", parseInt(focusLeft.toFixed(0)) - 1 * fastSpeed);
    }

    if (event.keyCode === 38) {
        event.preventDefault();
        console.log('^');

        document.activeElement.style.setProperty("--top", parseInt(focusTop.toFixed(0)) - 1 * fastSpeed);
    }

    if (event.keyCode === 40) {
        event.preventDefault();
        console.log('v');

        document.activeElement.style.setProperty("--top", parseInt(focusTop.toFixed(0)) + 1 * fastSpeed);
    }
});

const funButton = document.getElementById('funButton')

const funToggle = () => {
  document.body.classList.toggle('fun')
}

funButton.addEventListener('click', funToggle)