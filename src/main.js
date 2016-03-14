const { Observable } = require('rx');
const { run } = require('@cycle/core');
const { DOMDriver, div, span, button } = require('./drivers.js');

/*
  Cycle.js toy version, using cycle.js core and h-like syntax
*/

// Logic
function main(sources) {
  const click$ = sources.DOM.selectEvents('button', 'click');
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
  DOM: DOMDriver
};

run(main, drivers);
