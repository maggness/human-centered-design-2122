let fastSpeed = 1;
const fastmsg = document.getElementById("fastdragmsg");

//0 is off
let insertMode = 0;
let dragMode = 0;

// 0 = links
let schermkant = 0;

let rowLengthLeft = 12;
let rowLengthPlaceLeft = 12;

let rowLengthRight = 2;
let rowLengthPlaceRight = 2;

let usedKeys = [];
let yankedWord = "";

let cmdTextitem = document.querySelector("[cmdText0]");
let info = document.querySelector("#info");
const vimContainerdiv = document.querySelector(".vimContainer");
let text;
let textInsert = document.getElementById("vim0");

window.addEventListener("load", (event) => {
  cmdTextitem.focus();
});

window.addEventListener("click", () => {
  if (insertMode == 0) {
    cmdTextitem.focus();
  }
});

document.addEventListener("keyup", (event) => {
  if (event.keyCode === 73 && insertMode == 1) {
    insertMode = 0;
    cmdTextitem.focus();
    cmdTextitem.value = "";
    vimContainerdiv.classList.remove("swag");
    info.classList.remove("inmode");
    if (schermkant == 0) {
      rowLengthPlaceLeft = rowLengthLeft;
    } else {
      rowLengthPlaceRight = rowLengthRight;
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (schermkant == 0) {
    cmdTextActive = document.querySelector("[cmdText0]");
    textInsert = document.getElementById("vim0");
  } else {
    cmdTextActive = document.querySelector("[cmdText1]");
    textInsert = document.getElementById("vim1");
  }

  if (event.keyCode === 27 && insertMode == 0) {
    insertMode = 1;
    vimContainerdiv.classList.add("swag");
    info.classList.add("inmode");

    if (schermkant == 0) {
      rowLengthPlaceLeft = rowLengthLeft;
    } else {
      rowLengthPlaceRight = rowLengthRight;
    }
  }

  //als je kan moven met knoppen
  if (insertMode == 1) {
    event.preventDefault();

    if (schermkant == 0) {
      if (rowLengthLeft === rowLengthPlaceLeft) {
        cmdTextitem.focus();
      }
    } else {
      if (rowLengthRight === rowLengthPlaceRight) {
        cmdTextitem.focus();
      }
    }
    // console.log(insertMode);
    const focusLeft =
      (event.target.getBoundingClientRect().left / window.innerWidth) * 100;
    const focusTop =
      (event.target.getBoundingClientRect().top / window.innerHeight) * 100;

    // console.log(' left ' + focusLeft.toFixed(0) + ' top ' + focusTop.toFixed(0));

    if (event.keyCode === 69) {
      if (dragMode === 0) {
        dragMode = 1;
      } else {
        dragMode = 0;
      }
      console.log(dragMode);
    }

    if (event.keyCode === 90) {
      fastSpeed = fastSpeed + 4;
      if (fastSpeed > 5) {
        fastSpeed = 1;
      }

      if (fastmsg.textContent === "Fast drag is ON, press Z to turn it ON") {
        fastmsg.textContent = "Fast drag is OFF, press Z to turn it OFF";
      } else {
        fastmsg.textContent = "Fast drag is ON, press Z to turn it ON";
      }
    }

    if (event.keyCode === 13) {
      console.log("enter");
      document.activeElement.classList.add("enterAdded");
      document.activeElement.blur();

      if (focusLeft > 59 && focusTop > 59) {
        event.target.style.transform = "scale(0)";
      }
    }

    if (event.keyCode === 68) {
      console.log("d");
      usedKeys.push("d");
      setTimeout(function () {
        usedKeys = []
      }, 500);
      if (usedKeys.length == 2) {
        if (schermkant == 0) {
          document.getElementById(rowLengthPlaceLeft+'L').classList.add('invis');
        } else {
          document.getElementById(rowLengthPlaceRight+'R').classList.add('invis');
        }
      }
      console.log(usedKeys);
      if (schermkant == 0) {
        document.getElementById(rowLengthPlaceLeft+'L').textContent = "";
      } else {
        document.getElementById(rowLengthPlaceRight+'R').textContent = "";
      }
    }

    if (event.keyCode === 89) {
      console.log("y");
      if (schermkant == 0) {
        yankedWord = document.getElementById(rowLengthPlaceLeft+'L').textContent;
      } else {
        yankedWord = document.getElementById(rowLengthPlaceRight+'R').textContent;
      }
    }

    if (event.keyCode === 80) {
      console.log("p");
      if (schermkant == 0) {
        document.getElementById(rowLengthPlaceLeft+'L').textContent = yankedWord;
      } else {
        document.getElementById(rowLengthPlaceRight+'R').textContent = yankedWord;
      }
    }

    if (event.keyCode === 76) {
      event.preventDefault();
      console.log(">");
      //L

      if (dragMode === 0) {
        schermkant = 1;
        console.log(schermkant);
        cmdTextitem = document.querySelector("[cmdText" + schermkant + "]");
        cmdTextitem.focus();
      }

      if (dragMode === 1) {
        cmdTextitem.style.setProperty(
          "--left",
          parseInt(focusLeft.toFixed(0)) + 1 * fastSpeed
        );
      }
    }

    if (event.keyCode === 72) {
      event.preventDefault();
      console.log("<");
      //H
      schermkant = 0;
      console.log(schermkant);
      cmdTextitem = document.querySelector("[cmdText" + schermkant + "]");
      cmdTextitem.focus();

      document.activeElement.style.setProperty(
        "--left",
        parseInt(focusLeft.toFixed(0)) - 1 * fastSpeed
      );
    }

    if (event.keyCode === 75) {
      event.preventDefault();
      console.log("^");
      //K

      if (schermkant == 0) {
        rowLengthPlaceLeft = rowLengthPlaceLeft - 1;
        if (rowLengthPlaceLeft < 1) {
          rowLengthPlaceLeft = 1;
        }
        console.log(document.getElementById(rowLengthPlaceLeft+'L'));
        document.getElementById(rowLengthPlaceLeft+'L').focus();
      } else {
        rowLengthPlaceRight = rowLengthPlaceRight - 1;
        if (rowLengthPlaceRight < 1) {
          rowLengthPlaceRight = 1;
        }
        console.log(document.getElementById(rowLengthPlaceRight+'R'));
        document.getElementById(rowLengthPlaceRight+'R').focus();
      }
      document.activeElement.style.setProperty(
        "--top",
        parseInt(focusTop.toFixed(0)) - 1 * fastSpeed
      );
    }

    if (event.keyCode === 74) {
      event.preventDefault();
      console.log("v");
      //J

      if (schermkant == 0) {
        rowLengthPlaceLeft = rowLengthPlaceLeft + 1;
        if (rowLengthPlaceLeft > rowLengthLeft) {
          rowLengthPlaceLeft = rowLengthLeft;
        }
        console.log(document.getElementById(rowLengthPlaceLeft+'L'));
        document.getElementById(rowLengthPlaceLeft+'L').focus();
      } else {
        rowLengthPlaceRight = rowLengthPlaceRight + 1;
        if (rowLengthPlaceRight > rowLengthRight) {
          rowLengthPlaceRight = rowLengthRight;
        }
        console.log(document.getElementById(rowLengthPlaceRight+'R'));
        document.getElementById(rowLengthPlaceRight+'R').focus();
      }
      document.activeElement.style.setProperty(
        "--top",
        parseInt(focusTop.toFixed(0)) + 1 * fastSpeed
      );
    }
  }

  //Als je kan typen
  if (insertMode == 0) {
    if (event.keyCode === 13) {
      cmdTextitem.outerHTML = document.activeElement.value;

      if (cmdTextitem.value === ":ter") {
        textInsert.appendChild(
          Object.assign(document.createElement("li"), {
            innerHTML: '<div class="prompt">Work in progress...</div>',
          })
        );
      } else {

        if (schermkant == 0) {
          rowLengthLeft= rowLengthLeft+ 1;
          rowLengthPlaceLeft = rowLengthPlaceLeft + 1;
          if (rowLengthPlaceLeft > rowLengthLeft) {
            rowLengthPlaceLeft = rowLengthLeft;
          }
          // textInsert.appendChild(Object.assign(document.createElement('li'), { innerHTML: '<input type="text" cmdText'+schermkant+' tabindex="2">' }))
          textInsert.insertAdjacentHTML(
            "beforeend",
            `<li id="${rowLengthLeft}L" tabindex="2"> 
              <input type="text" cmdText${schermkant} tabindex="2">
            </li>`
          );
        } else {
          rowLengthRight= rowLengthRight+ 1;
          rowLengthPlaceRight = rowLengthPlaceRight + 1;
          if (rowLengthPlaceRight > rowLengthRight) {
            rowLengthPlaceRight = rowLengthRight;
          }
          // textInsert.appendChild(Object.assign(document.createElement('li'), { innerHTML: '<input type="text" cmdText'+schermkant+' tabindex="2">' }))
          textInsert.insertAdjacentHTML(
            "beforeend",
            `<li id="${rowLengthRight}R" tabindex="2"> 
              <input type="text" cmdText${schermkant} tabindex="2">
            </li>`
          );
        }
        cmdTextitem = document.querySelector("[cmdText" + schermkant + "]");
        cmdTextitem.focus();
      }
    }
  }
});

// const funButton = document.getElementById('funButton')

// const funToggle = () => {
//   document.body.classList.toggle('fun')
// }

// funButton.addEventListener('click', funToggle)
