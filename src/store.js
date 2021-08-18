export function toStorage(data) {
  localStorage.setItem('todo', JSON.stringify(data));
}

export function fromStorage() {
  const todoList = localStorage.getItem('todo');
  return JSON.parse(todoList);
}

function markTodoItem(index, value) {
  const list = fromStorage();

  list.forEach((item) => {
    if (item.index === Number(index) || item.index === index.toString()) {
      item.completed = value;
    }
  });

  toStorage(list);
}

function updateTodo(todoItem) {
  const checkbox = todoItem.children[0].children[0];
  const checkboxIndex = checkbox.getAttribute('name').split('-')[1];

  if (checkbox.checked) {
    markTodoItem(checkboxIndex, true);
    checkbox.nextElementSibling.style.textDecoration = 'line-through';
  } else {
    markTodoItem(checkboxIndex, false);
    checkbox.nextElementSibling.style.textDecoration = 'none';
  }
}

export function reloadStore() {
  const todoItems = document.getElementsByClassName('todo-item');

  [...todoItems].forEach((todoItem) => {
    todoItem.children[0].children[0].addEventListener('change', () => {
      updateTodo(todoItem);
    });
  });
}
