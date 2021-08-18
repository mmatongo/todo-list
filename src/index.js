import './styles.css';
import { dragHover } from './dragdrop.js';
import { toStorage, fromStorage, reloadStore } from './store.js';

const todoItems = [
  {
    description: 'Learn JavaScript',
    completed: false,
    index: 0,
  },
  {
    description: 'Count to 3000',
    completed: false,
    index: 1,
  },
  {
    description: 'Write a book',
    completed: false,
    index: 2,
  },
];

const populateItems = (todoItems, sort) => {
  let sortedTodo = [];
  if (sort) {
    sortedTodo = todoItems.sort((a, b) => a.index - b.index);
  } else {
    sortedTodo = todoItems;
  }

  for (let i = 0; i < sortedTodo.length; i += 1) {
    let style = '';
    let checkbox = '';
    if (sortedTodo[i].completed) {
      style = 'text-decoration: line-through;';
      checkbox = 'checked';
    } else {
      style = 'text-decoration: none;';
      checkbox = '';
    }

    document.getElementById('list-items').insertAdjacentHTML('beforeend', `
    <div class="todo-item" draggable="true">
      <div>
        <input type="checkbox" name="item-${sortedTodo[i].index}"  ${checkbox}>
        <label for="item-${sortedTodo[i].index}" style="${style}"}> 
          ${sortedTodo[i].description}</label>
      </div>
      <div class="move-button">
        <span class="material-icons-outlined buttons">more_vert</span>
      </div>
  </div>
    `);
  }
};

window.addEventListener('load', () => {
  const localStore = fromStorage('todo');
  if (localStore == null) {
    toStorage(todoItems, true);
    populateItems(todoItems);
  } else {
    populateItems(localStore, false);
  }
  dragHover();
  reloadStore();
});