const toStorage = (data) => {
  localStorage.setItem('todo', JSON.stringify(data));
};

const fromStorage = () => {
  const todoList = localStorage.getItem('todo');
  return JSON.parse(todoList);
};

const markTodoItem = (index, value) => {
  const list = fromStorage();

  list.forEach((item) => {
    if (item.index === Number(index) || item.index === index.toString()) {
      item.completed = value;
    }
  });

  toStorage(list);
};

const updateTodo = (todoItem) => {
  const checkbox = todoItem.children[0].children[0];
  const checkboxIndex = checkbox.getAttribute('name').split('-')[1];

  if (checkbox.checked) {
    markTodoItem(checkboxIndex, true);
    checkbox.nextElementSibling.style.textDecoration = 'line-through';
  } else {
    markTodoItem(checkboxIndex, false);
    checkbox.nextElementSibling.style.textDecoration = 'none';
  }
};

const reloadStore = () => {
  const todoItems = document.getElementsByClassName('todo-item');

  [...todoItems].forEach((todoItem) => {
    todoItem.children[0].children[0].addEventListener('change', () => {
      updateTodo(todoItem);
    });
  });
};
exports.reloadStore = reloadStore;
exports.toStorage = toStorage;
exports.fromStorage = fromStorage;