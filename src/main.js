import { Observable } from 'rx';
import { run } from '@cycle/core';
import { makeDOMDriver, div, span, button } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';
import { List } from './components/list.js';

function main(sources) {
  const URL = 'http://shouldiuse.azurewebsites.net/api/repositories';
  let request$ = Rx.Observable.just({
    url: URL,
    method: 'GET',
    query: {
      search: 'react'
    }
  });
  let props$ = sources.HTTP
    .filter(res$ => res$.request.url === URL)
    .mergeAll();

  const childSources = {
    DOM: sources.DOM,
    props$: props$
  };
  const list = List(childSources);
  const vtree$ = list.DOM;
  
  return {
    DOM: vtree$,
    HTTP: request$
  };
}

const drivers = {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver()
};

run(main, drivers);
