Object.defineProperty(exports, '__esModule', {
  value: true,
});

function toStorage(data) {
  localStorage.setItem('todo', JSON.stringify(data));
}

function fromStorage() {
  const todoList = localStorage.getItem('todo');
  return JSON.parse(todoList);
}

exports.toStorage = toStorage;
exports.fromStorage = fromStorage;