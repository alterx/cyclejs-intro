const { Observable } = require('rx');
const { run } = require('@cycle/core');
const { makeDOMDriver, div, span, button } = require('@cycle/dom');

/*
  Cycle.js real version
*/

// Logic
function main(sources) {
  const click$ = sources.DOM.select('button').events('click');
  const sinks = {
    DOM: click$
    .map(e => 1)
    .startWith(0)
    .scan((p, c) => p + c)
    .map(i =>
      div([
        span([
          `Count: ${i}`
        ]),
        button([
          'Add'
        ])
      ])
    )
  };

  return sinks;
}

// These map the effects to the same keys we have in our main function
const drivers = {
  DOM: makeDOMDriver('#app')
};

run(main, drivers);
