const { Observable } = require('rx');
const { run } = require('@cycle/core');
const { DOMDriver } = require('./drivers.js');

/*
  Cycle.js toy version, v5
*/

// Logic
function main(sources) {
  const click$ = sources.DOM.selectEvents('button', 'click');
  const sinks = {
    DOM: click$
    .map(e => 1)
    .startWith(0)
    .scan((p, c) => p + c)
    .map(i => {
      return {
        tagName: 'DIV',
        children: [
          {
            tagName: 'SPAN',
            children: [
              `Count: ${i}`
            ]
          },
          {
            tagName: 'BUTTON',
            children: [
              'Add'
            ]
          }
        ]
      }
    })
  };

  return sinks;
}

// These map the effects to the same keys we have in our main function
const drivers = {
  DOM: DOMDriver
};

run(main, drivers);
