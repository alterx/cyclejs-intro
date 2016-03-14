const { Observable } = require('rx');
const { run } = require('./run.js');

const button = document.createElement('button');
button.innerHTML= 'Add';
const label = document.createElement('label');
label.innerHTML = 'Count: 0';
const app = document.querySelector('#app');
app.appendChild(label);
app.appendChild(button);

/*
  Cycle.js toy version, v4
*/

// Logic
function main(sources) {
  const click$ = sources.DOM;
  return {
    DOM: click$
      .map(e => 1).scan((p, c) => p + c)
  };
}

// Effect
function DOMDriver(label$) {
  label$.subscribe(text => {
    const container = document.querySelector('label');
    container.textContent = 'Count: ' + text;
  });

  const DOMSource = Rx.Observable.fromEvent(button, 'click');
  return DOMSource;
}

// These map the effects to the same keys we have in our main function
const drivers = {
  DOM: DOMDriver
};

run(main, drivers);
