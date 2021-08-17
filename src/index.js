import './styles.css';
import { dragHover } from './dragdrop.js';

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

const populateItems = () => {
  const sortedList = todoItems.sort((a, b) => a.index - b.index);

  for (let i = 0; i < sortedList.length; i += 1) {
    document.getElementById('list-items').insertAdjacentHTML('beforeend', `
        <div class="todo-item" draggable="true">
          <div>
            <input type="checkbox" name="item-${sortedList[i].index}">
            <label for="item-${sortedList[i].index}">${sortedList[i].description}</label>
          </div>
          <div class="move-button">
            <span class="material-icons-outlined buttons">more_vert</span>
          </div>
        </div>
      `);
  }
};

window.addEventListener('load', () => {
  populateItems();
  dragHover();
});