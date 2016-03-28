import { div, span, button } from '@cycle/dom';
import isolate from '@cycle/isolate';

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

function main(sources) {
  return {
    DOM: view(model(intent(sources.DOM)))
  };
}

const Counter = sources => isolate(main)(sources);

export {
  Counter
}
