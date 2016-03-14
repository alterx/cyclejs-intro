const { Observable } = require('rx');
const { run } = require('@cycle/core');
const { makeDOMDriver, div, span, button } = require('@cycle/dom');

/*
  Cycle.js real version, MVI
*/

// Logic

function intent(DOM) {
  return {
    clicks$: DOM.select('button').events('click')
  };
}

function model(actions) {
  return actions.clicks$.map(e => 1).startWith(0).scan((p, c) => p + c);
}

function view(state$) {
  return state$.map(i =>
    div([
      span([
        `Count: ${i}`
      ]),
      button([
        'Add'
      ])
    ])
  );
}

function main({DOM}) { // sources
  return {
    DOM: view(model(intent(DOM)))
  };
}

// These map the effects to the same keys we have in our main function
const drivers = {
  DOM: makeDOMDriver('#app')
};

run(main, drivers);
