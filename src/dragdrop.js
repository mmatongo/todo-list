// eslint-disable-next-line import/no-cycle
import { addHandlers, editHandlers } from './add_remove';
import { reloadStore, toStorage } from './store';

let dragElemStart = null;

const sortIndex = (list) => {
  for (let i = 0; i < list.length; i += 1) {
    list[i].index = i;
  }
  return list;
};

const generateListFromDOM = () => {
  const list = document.getElementsByClassName('todo-item');
  const resultList = [];
  for (let i = 0; i < list.length; i += 1) {
    const description = list[i].children[0].children[1].innerText;
    const completed = list[i].children[0].children[0].checked;
    const index = list[i].children[0].children[0].name.split('-')[1];

    resultList.push({
      description,
      completed,
      index,
    });
  }
  return resultList;
};

const refreshStore = () => {
  const resultList = generateListFromDOM();
  const sortedList = sortIndex(resultList);

  toStorage(sortedList);
};

const dragStart = (e) => {
  e.target.style.opacity = '0.4';
  dragElemStart = e.currentTarget;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', dragElemStart.innerHTML);
};

const dragEnd = (e) => {
  e.target.style.opacity = '1';
  return e;
};

const dragOver = (e) => {
  e.preventDefault();
};

const drop = (e) => {
  e.stopPropagation();
  const dropElemEnd = e.currentTarget;

  if (dragElemStart !== dropElemEnd) {
    dragElemStart.innerHTML = dropElemEnd.innerHTML;
    dropElemEnd.innerHTML = e.dataTransfer.getData('text/html');
  }
  addHandlers();
  editHandlers();
  reloadStore();
  refreshStore();
  return false;
};

const dragHover = () => {
  const todoItems = document.getElementsByClassName('todo-item');
  [...todoItems].forEach((todoItem) => {
    todoItem.addEventListener('dragstart', dragStart, false);
    todoItem.addEventListener('dragend', dragEnd, false);
    todoItem.addEventListener('drop', drop, false);
    todoItem.addEventListener('dragover', dragOver, false);
  });
};
export { dragHover };
export { refreshStore };