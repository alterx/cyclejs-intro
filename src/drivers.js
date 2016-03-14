function h(tagName, children) {
  return {
    tagName: tagName,
    children: children
  };
}

function div(children) {
  return {
    tagName: 'DIV',
    children: children
  };
}

function span(children) {
  return {
    tagName: 'SPAN',
    children: children
  };
}

function button(children) {
  return {
    tagName: 'BUTTON',
    children: children
  };
}

function DOMDriver(obj$) {
  function createElement(obj) {
    const element = document.createElement(obj.tagName);
    obj.children
      .filter(c => typeof c === 'object')
      .map(createElement)
      .forEach(c => element.appendChild(c));
    obj.children
      .filter(c => typeof c === 'string')
      .forEach(c => element.innerHTML += c);
    return element;
  }

  obj$.subscribe(obj => {
    const container = document.querySelector('#app');
    container.innerHTML = '';
    const element = createElement(obj);
    container.appendChild(element);
  });

  const DOMSource = {
    selectEvents: function(tagName, eventType) {
      return Rx.Observable.fromEvent(document, eventType)
        .filter(ev => ev.target.tagName === tagName.toUpperCase());
    }
  }
  return DOMSource;
}

export {
  DOMDriver,
  h,
  div,
  span,
  button
}
