const { Observable } = require('rx');

const button = document.createElement('button');
button.innerHTML= 'Add';
const label = document.createElement('label');
label.innerHTML = 'Count: 0';
const app = document.querySelector('#app');
app.appendChild(label);
app.appendChild(button);

/*
  Cycle.js toy version, v2
*/

// Logic
function main() {
  return {
    DOM: Rx.Observable.fromEvent(button, 'click')
      .map(e => 1).scan((p, c) => p + c)
  };
}

// Effect
function DOMDriver(label$) {
  label$.subscribe(text => {
    const container = document.querySelector('label');
    container.textContent = 'Count: ' + text;
  });
}

// Nor logic, nor effect, just ties everything up together
// Making it more generic by sending an object with the available effects
function run(mainFn, drivers) {
  const sinks = mainFn();
  Object.keys(drivers).forEach(key => {
    drivers[key](sinks[key])
  });
}

// These map the effects to the same keys we have in our main function
const drivers = {
  DOM: DOMDriver
};

run(main, drivers);
