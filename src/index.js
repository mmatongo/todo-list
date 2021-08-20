import './styles.css';
import { dragHover } from './dragdrop';
import { toStorage, fromStorage, reloadStore } from './store';
import { sortIndex } from './status';
import { addHandlers, editHandlers } from './add_remove';

const todoItems = [];

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
        <input type="checkbox" name="item-${sortedTodo[i].index}" ${checkbox}>
        <label for="item-${sortedTodo[i].index}" style="${style}" contenteditable=true> 
          ${sortedTodo[i].description}
        </label>
      </div>
      <div>
        <span class="material-icons-outlined remove-btn buttons" id="item-${sortedTodo[i].index}">delete_outline</span>
        <span class="material-icons-outlined buttons move-button">more_vert</span>
      </div>
  </div>
    `);
  }
};

window.addEventListener('load', () => {
  const localStore = fromStorage();
  if (localStore == null) {
    toStorage(todoItems, true);
    populateItems(todoItems);
  } else {
    const sortedItems = sortIndex(localStore);
    populateItems(sortedItems, false);
  }
  dragHover();
  reloadStore();
  addHandlers();
  editHandlers();
});