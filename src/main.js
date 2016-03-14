const { Observable } = require('rx');

const button = document.createElement('button');
button.innerHTML= 'Add';
const label = document.createElement('label');
label.innerHTML = 'Count: 0';
const app = document.querySelector('#app');
app.appendChild(label);
app.appendChild(button);

/*
  Cycle.js toy version, v1
*/

// Logic
function main() {
  return {
    DOM: Rx.Observable.fromEvent(button, 'click')
      .map(e => 1).scan((p, c) => p + c)
  };
}

// Effect
function DOMEffect(label$) {
  label$.subscribe(text => {
    const container = document.querySelector('label');
    container.textContent = 'Count: ' + text;
  });
}

// Nor logic, nor effect, just ties everything up together
function run(mainFn) {
  const sinks = mainFn();
  DOMEffect(sinks.DOM);
}

run(main);
