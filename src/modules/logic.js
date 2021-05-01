const listsContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');
const deleteListButton = document.querySelector('[data-delete-list-button]');
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]');
const listTasks = document.querySelector('[data-tasks]');
const taskTemplate = document.getElementById('task-template');
const newTaskForm = document.querySelector('[data-new-task-form]');
const taskInput = document.querySelector('[data-new-task-name]');
const taskDescription = document.querySelector('[data-new-task-desc]');
const taskTime = document.querySelector('[data-task-time]');
const taskPriority = document.querySelector('[data-task-priority]')
const clearCompleteButton = document.querySelector('[data-clear-complete-button]');

const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

const save = () => {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
};

const render = () => {
  clearElement(listsContainer);
  renderList();
  const selectedList = lists.find(list => list.id === selectedListId);
  if (selectedListId == null) {
    listDisplayContainer.style.display = 'none';
  } else {
    listDisplayContainer.style.display = '';
    listTitleElement.innerText = selectedList.name;
    clearElement(listTasks);
    renderTasks(selectedList);
  }
};

const saveAndRender = () => {
  save();
  render();
};

listsContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'li') {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});

listTasks.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'input') {
    const selectedList = lists.find(list => list.id === selectedListId);
    const selectedTask = selectedList.tasks.find(task => task.id === e.target.id);
    selectedTask.complete = e.target.checked;
    save();
  }
});

deleteListButton.addEventListener('click', () => {
  lists = lists.filter(list => list.id !== selectedListId);
  selectedListId = null;
  saveAndRender();
});


clearCompleteButton.addEventListener('click', () => {
  const selectedList = lists.find(list => list.id === selectedListId);
  selectedList.tasks = selectedList.tasks.filter(task => !task.complete);
  saveAndRender();
});

newListForm.addEventListener('submit', e => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName == null || listName === '') return;
  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  saveAndRender();
});

const createTask = (name, desc, time, prior) => ({
  id: Date.now().toString(), name, desc, time, prior, completed: false,
});

newTaskForm.addEventListener('submit', e => {
  e.preventDefault();
  const taskName = taskInput.value;
  if (taskName == null || taskName === '') return;
  const taskDesc = taskDescription.value;
  if (taskDesc == null || taskDesc === '') return;
  const taskT = taskTime.value;
  if (taskT == null || taskT === '') return;
  const taskP = taskPriority.value;
  if (taskP == null || taskP === '') return;
  const task = createTask(taskName, taskDesc, taskT, taskP);
  taskInput.value = null;
  // taskT.value = null;
  // taskDesc.value = null;
  const selectedList = lists.find(list => list.id === selectedListId);
  selectedList.tasks.push(task);
  saveAndRender();
});

const createList = (name) => ({ id: Date.now().toString(), name, tasks: [] });


const renderTasks = (selectedList) => {
  selectedList.tasks.forEach(task => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector('input');
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector('label');
    label.htmlFor = task.id;
    label.append(task.name);
    const descTask = taskElement.getElementById('description-p');
    const descTi = taskElement.getElementById('task-time');
    const priorTask = taskElement.getElementById('task-prior');
    priorTask.append(task.prior);
    descTi.append(task.time);
    descTask.append(task.desc);
    listTasks.appendChild(taskElement);
  });
};


const renderList = () => {
  lists.forEach(list => {
    const listElement = document.createElement('li');
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-name");
    listElement.innerText = list.name;
    if (list.id === selectedListId) {
      listElement.classList.add('active-list');
    }
    listsContainer.appendChild(listElement);
  });
};

const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

export {
  render
};