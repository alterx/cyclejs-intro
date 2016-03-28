import { ul, li , Text} from '@cycle/dom';
import isolate from '@cycle/isolate';
import { Counter } from './counter.js';

var sources = null;

function intent(sources) {
  return {
    responses$: sources.props$,
    DOM: sources.DOM
  };
}

function model(actions) {
  return actions.responses$.map(res => { return { items: res.body.items, DOM: actions.DOM} } )
    .startWith({items: [], DOM: actions.DOM});
}

function view(state$) {
  return state$.map(obj => {
    let listItems = obj.items.map(item => {

      const childSources = {
        DOM: obj.DOM
      };
      const counter = Counter(childSources);
      const vtree$ = counter.DOM;

      return li([`${item.full_name}`, vtree$]);
    });
    return ul(listItems);
  });
}

function main(sources) {
  return {
    DOM: view(model(intent(sources)))
  };
}

const List = sources => isolate(main)(sources);

export {
  List
}
