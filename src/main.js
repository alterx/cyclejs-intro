const { Observable } = require('rx');

const button = document.createElement('button');
button.innerHTML= 'Add';
const label = document.createElement('label');
label.innerHTML = 'Count: 0';
const app = document.querySelector('#app');
app.appendChild(label);
app.appendChild(button);

/*
  Cycle.js toy version, v3
*/

// Logic
function main(DOMSource) {
  const click$ = DOMSource;
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

// Nor logic, nor effect, just ties everything up together
// Adding proxyDOMSource to solve the infinite cycle problem
function run(mainFn, drivers) {
  const proxyDOMSource = new Rx.Subject();
  const sinks = mainFn(proxyDOMSource);
  const DOMSource = drivers.DOM(sinks.DOM);
  DOMSource.subscribe(click => proxyDOMSource.onNext(click));
}

// These map the effects to the same keys we have in our main function
const drivers = {
  DOM: DOMDriver
};

run(main, drivers);
