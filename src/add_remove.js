import { fromStorage, toStorage, reloadStore } from './store';
import { dragHover } from './dragdrop';

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

const sortIndex = (list) => {
  for (let i = 0; i < list.length; i += 1) {
    list[i].index = i;
  }
  return list;
};

const refreshStore = () => {
  const resultList = generateListFromDOM();
  const sortedList = sortIndex(resultList);

  toStorage(sortedList);
};

const editHandlers = () => {
  const todoList = document.getElementsByClassName('todo-item');
  for (let i = 0; i < todoList.length; i += 1) {
    const labelElem = todoList[i].children[0].children[1];
    labelElem.addEventListener('input', () => {
      refreshStore();
    });
  }
};

const addHandlers = () => {
  const buttons = document.getElementsByClassName('remove-btn');
  for (let i = 0; i < buttons.length; i += 1) {
    buttons[i].addEventListener('click', () => {
      const index = `item-${i}`;
      const inputItem = document.getElementsByName(index)[0];
      inputItem.parentElement.parentElement.remove();
      refreshStore();
    });
  }
};

const appendToDOM = (todo) => {
  document.getElementById('list-items').insertAdjacentHTML('beforeend', `
    <div class="todo-item" draggable="true">
      <div>
        <input type="checkbox" name="item-${todo.index}" readonly="true">
        <label for="item-${todo.index}" style="text-decoration: none;" contenteditable=true>
          ${todo.description}
        </label>
      </div>
      <div class="dots-button">
        <span class="material-icons-outlined remove-btn buttons" id="item-${todo.index}">delete_outline</span>
        <span class="material-icons-outlined buttons">more_vert</span>
      </div> 
    </div>
  `);
};

const addTodo = (description) => {
  const newTodo = {
    description,
    completed: false,
  };

  const currentTodoList = fromStorage();
  const todoLength = currentTodoList.length;
  if (todoLength === 0) {
    newTodo.index = 0;
  } else {
    newTodo.index = todoLength;
  }

  currentTodoList.push(newTodo);
  toStorage(currentTodoList);
  appendToDOM(newTodo);
  dragHover();
  reloadStore();
  editHandlers();
  addHandlers();
};

document.querySelector('.todo-new > input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTodo(e.target.value);
    e.target.value = '';
  }
});

document.getElementById('clear-all').addEventListener('click', () => {
  const todoList = document.getElementsByClassName('todo-item');
  [...todoList].filter((todoItem) => todoItem.children[0].children[0].checked)
    .forEach((item) => item.remove());
  refreshStore();
});
exports.sortIndex = sortIndex;
exports.addHandlers = addHandlers;
exports.editHandlers = editHandlers;