import './styles.css';

const todoItems = [
  {
    description: "Learn JavaScript",
    completed: false,
    index: 0
  },
  {
    description: "Count to 3000",
    completed: false,
    index: 1
  },
  {
    description: "Write a book",
    completed: false,
    index: 2
  }
]

const populateItems = () => {
  const sortedList = todoItems.sort((a, b) => a.index - b.index)

  for (let i = 0; i < sortedList.length; i += 1) {
    document.getElementById('list-items').insertAdjacentHTML('beforeend', `
        <div>
          <div>
            <input type="checkbox" name="item-${sortedList[i].index}">
            <label for="item-${sortedList[i].index}">${sortedList[i].description}</label>
          </div>
        </div>
      `)
  }
}

window.onload = populateItems()