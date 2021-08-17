Object.defineProperty(exports, '__esModule', {
  value: true,
});

let dragElemStart = null;

function dragStart(e) {
  this.style.opacity = '0.4';
  dragElemStart = e.currentTarget;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', dragElemStart.innerHTML);
}

function dragEnd(e) {
  this.style.opacity = '1';
  return e;
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.stopPropagation();
  const dropElemEnd = e.currentTarget;

  if (dragElemStart !== dropElemEnd) {
    const startId = dragElemStart.children[0].children[0]
      .getAttribute('name')
      .split('-')[1];
    const endId = dropElemEnd.children[0].children[0]
      .getAttribute('name')
      .split('-')[1];
    dragElemStart.innerHTML = dropElemEnd.innerHTML;
    dropElemEnd.innerHTML = e.dataTransfer.getData('text/html');

    dragElemStart.children[0].children[0].setAttribute(
      'name',
      `item-${endId}`,
    );
    dragElemStart.children[0].children[1].setAttribute(
      'for',
      `item-${endId}`,
    );
    dropElemEnd.children[0].children[0].setAttribute(
      'name',
      `item-${startId}`,
    );
    dropElemEnd.children[0].children[1].setAttribute(
      'for',
      `item-${startId}`,
    );
  }
}

function dragHover() {
  const todoItems = document.getElementsByClassName('todo-item');
  [...todoItems].forEach((todoItem) => {
    todoItem.addEventListener('dragstart', dragStart, false);
    todoItem.addEventListener('dragend', dragEnd, false);
    todoItem.addEventListener('drop', drop, false);
    todoItem.addEventListener('dragover', dragOver, false);
  });
}
exports.dragHover = dragHover;