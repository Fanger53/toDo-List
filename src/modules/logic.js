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
const taskPriority = document.querySelector('[data-task-priority]');
const buttonModal = document.getElementById('button-modal');
const modal = document.getElementById('modal');
const buttonCancel = document.querySelector('.cancel-button');
const editTask = document.querySelector(['data-task-edit']);
const modalEdit = document.getElementById('modal-edit');
const formEdit = document.querySelector(['data-new-task-form-edit']);
const taskNameEdit = document.querySelector(['data-edit-task-name']);
const taskDescriptionEdit = document.querySelector(['data-edit-task-desc']);
const taskPriorityEdit = document.querySelector(['data-edit-task-priority']);
const taskTimeEdit = document.querySelector(['data-edit-task-time']);
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

buttonModal.addEventListener('click', () => {
  modal.classList.remove('modal-active');
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
  const selectedList = lists.find(list => list.id === selectedListId);
  selectedList.tasks.push(task);
  modal.classList.add('modal-active');
  saveAndRender();
});

buttonCancel.addEventListener('click', () => {
  modal.classList.add('modal-active');
});



const getProjectIndex = (id) => lists.findIndex((pj) => pj.id === id);

const editTaskForm = (e) => {
  e.preventDefault();
  const taskTitle = taskNameEdit.value;
  if (taskTitle === null || taskTitle === '') return;
  const taskDescription = taskDescriptionEdit.value;
  if (taskDescription === null || taskDescription === '') return;
  const taskPriority = taskPriorityEdit.value;
  if (taskPriority === null || taskPriority === '') return;
  const taskDate = taskTimeEdit.value;
  if (taskDate === null || taskDate === '') return;
  const task = createTask(taskTitle, taskDescription, taskDate, taskPriority);
  taskNameEdit.value = null;
  taskDescriptionEdit.value = null;
  taskTimeEdit.value = null;
  taskPriorityEdit.value = null;
  modalEdit.classList.remove('modal-active');
  const projectIndex = getProjectIndex(selectedListId);
  const taskIndex = lists[projectIndex].tasks.findIndex(
    (pj) => pj.id === e.target.id,
  );
  const selectedList = lists.find((list) => list.id === selectedListId);

  lists[projectIndex].tasks.splice(taskIndex, 1);
  selectedList.tasks.push(task);

  saveAndRender();
};



document.addEventListener('keydown', ({ key }) => {
  if (key === 'Escape') {
    modal.classList.add('modal-active');
  }
});




function createList(name) {
  return ({ id: Date.now().toString(), name, tasks: [] });
}


function renderTasks(selectedList) {
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
    const editButton = taskElement.getElementById('edit');
    editButton.id = task.id;
    priorTask.append(task.prior);
    descTi.append(task.time);
    descTask.append(task.desc);
    listTasks.appendChild(taskElement);
  });
}


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

const clickHandler = (e) => {
  if (e.target.matches('.tryYes')) {
    modalEdit.classList.remove('modal-active');
    const projectIndex = getProjectIndex(selectedListId);
    const task = lists[projectIndex].tasks.find(
      (task) => task.id === e.target.id,
    );
    const title = document.getElementById('modalname');
    const description = document.getElementById('modadescription');
    title.value = task.name;
    description.value = task.desc;
    const date = document.getElementById('modaldate');
    date.value = task.time;
    const priority = document.getElementById('modalpriority');
    priority.value = task.prior;
  }
};

document.addEventListener('click', clickHandler);

export {
  render,
};