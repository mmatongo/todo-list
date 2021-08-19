import { toStorage } from './store';

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

export { sortIndex };
export { generateListFromDOM };
export { refreshStore };