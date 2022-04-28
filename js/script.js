let fastSpeed = 1; 
const fastmsg = document.getElementById('fastdragmsg')

//0 is off
let insertMode = 0
let dragMode = 0

// 0 = links
let schermkant = 0

let cmdTextitem = document.querySelector('[cmdText0]')
let info = document.querySelector('#info')
const vimContainerdiv = document.querySelector('.vimContainer')
let text
let textInsert = document.getElementById('vim0')

window.addEventListener('load', (event) => {
  cmdTextitem.focus()
});

window.addEventListener('click', () => {
  if (insertMode == 0) {
    cmdTextitem.focus()
  }
})

document.addEventListener("keyup", (event) => {
  if (event.keyCode === 73 && insertMode == 1) {
    insertMode = 0
    cmdTextitem.focus()
    cmdTextitem.value = ''
    vimContainerdiv.classList.remove('swag')
    info.classList.remove('inmode')
  } 
})

document.addEventListener("keydown", (event) => {

  if (schermkant == 0) {
    cmdTextActive = document.querySelector('[cmdText0]')
    textInsert = document.getElementById('vim0')
  } else {
    cmdTextActive = document.querySelector('[cmdText1]')
    textInsert = document.getElementById('vim1')
  }

  if (event.keyCode === 27 && insertMode == 0) {
    insertMode = 1
    vimContainerdiv.classList.add('swag')
    info.classList.add('inmode')
  }

    //als je kan moven met knoppen
  if (insertMode == 1) { 
    event.preventDefault()
    cmdTextitem.focus()
    // console.log(insertMode);
    const focusLeft = event.target.getBoundingClientRect().left/window.innerWidth*100
    const focusTop = event.target.getBoundingClientRect().top/window.innerHeight*100
  
    // console.log(' left ' + focusLeft.toFixed(0) + ' top ' + focusTop.toFixed(0));

    if (event.keyCode === 69) {
      if (dragMode === 0) {
        dragMode = 1
      } else {
        dragMode = 0
      }
      console.log(dragMode);
    }
  
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
  
      if (event.keyCode === 76) {
          event.preventDefault();
          console.log('>');
          //L

          if (dragMode === 0) {
            schermkant = 1
            cmdTextitem = document.querySelector('[cmdText'+schermkant+']')
            cmdTextitem.focus()
          }

          if (dragMode === 1) {
            cmdTextitem.style.setProperty("--left", parseInt(focusLeft.toFixed(0)) + 1 * fastSpeed);
          }
      }
  
      if (event.keyCode === 72) {
          event.preventDefault();
          console.log('<');
          //H
          schermkant = 0
          cmdTextitem = document.querySelector('[cmdText'+schermkant+']')
          cmdTextitem.focus()
  
          document.activeElement.style.setProperty("--left", parseInt(focusLeft.toFixed(0)) - 1 * fastSpeed);
      }
  
      if (event.keyCode === 75) {
          event.preventDefault();
          console.log('^');
          //K
  
          document.activeElement.style.setProperty("--top", parseInt(focusTop.toFixed(0)) - 1 * fastSpeed);
      }
  
      if (event.keyCode === 74) {
          event.preventDefault();
          console.log('v');
          //J
  
          document.activeElement.style.setProperty("--top", parseInt(focusTop.toFixed(0)) + 1 * fastSpeed);
      }
  }

  //Als je kan typen
  if (insertMode == 0) {
    if (event.keyCode === 13) {
        cmdTextitem.outerHTML = document.activeElement.value
  
      if (cmdTextitem.value === ':ter') {
        textInsert.appendChild(Object.assign(document.createElement('li'), { innerHTML: '<div class="prompt">Work in progress...</div>' }))
      } else {
          textInsert.appendChild(Object.assign(document.createElement('li'), { innerHTML: '<input type="text" cmdText'+schermkant+' tabindex="2">' }))
          cmdTextitem = document.querySelector('[cmdText'+schermkant+']')
          cmdTextitem.focus()
      }
    }
  }
});

// const funButton = document.getElementById('funButton')

// const funToggle = () => {
//   document.body.classList.toggle('fun')
// }

// funButton.addEventListener('click', funToggle)