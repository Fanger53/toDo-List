const listsContainer = document.querySelector('[data-lists]');
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
const modal = document.getElementById('modal');
const modalEdit = document.getElementById('modal-edit');
const taskNameEdit = document.getElementById('modalname');
const taskDescriptionEdit = document.getElementById('modadescription');
const taskPriorityEdit = document.getElementById('modalpriority');
const taskTimeEdit = document.getElementById('modaldate');
const clearCompleteButton = document.querySelector('[data-clear-complete-button]');

const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
// eslint-disable-next-line import/no-mutable-exports
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

const save = () => {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
};

const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const renderList = () => {
  lists.forEach(list => {
    const listElement = document.createElement('li');
    listElement.dataset.listId = list.id;
    listElement.classList.add('list-name');
    listElement.innerText = list.name;
    if (list.id === selectedListId) {
      listElement.classList.add('active-list');
    }
    listsContainer.appendChild(listElement);
  });
};

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
    const editButton = taskElement.getElementById('edit');
    editButton.id = task.id;
    const deleteTask = taskElement.getElementById('delete-button');
    deleteTask.id = task.id;
    priorTask.append(task.prior);
    descTi.append(task.time);
    descTask.append(task.desc);
    listTasks.appendChild(taskElement);
  });
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

const projectsContainer = (e) => {
  if (e.target.tagName.toLowerCase() === 'li') {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
};

const listTodos = (e) => {
  if (e.target.tagName.toLowerCase() === 'input') {
    const selectedList = lists.find(list => list.id === selectedListId);
    const selectedTask = selectedList.tasks.find(task => task.id === e.target.id);
    selectedTask.complete = e.target.checked;
    save();
  }
};

const deleteListProjects = () => {
  lists = lists.filter(list => list.id !== selectedListId);
  selectedListId = null;
  saveAndRender();
};

const clearbuttonTasks = () => {
  const selectedList = lists.find(list => list.id === selectedListId);
  selectedList.tasks = selectedList.tasks.filter(task => !task.complete);
  saveAndRender();
};

const createList = (name) => ({ id: Date.now().toString(), name, tasks: [] });

const createTask = (name, desc, time, prior) => ({
  id: Date.now().toString(), name, desc, time, prior, completed: false,
});

const todoForm = (e) => {
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
};

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
  const projectIndex = getProjectIndex(selectedListId);
  const taskIndex = lists[projectIndex].tasks.findIndex(
    (pj) => pj.id === e.target.id,
  );
  const selectedList = lists.find((list) => list.id === selectedListId);

  lists[projectIndex].tasks.splice(taskIndex, 1);
  selectedList.tasks.push(task);
  saveAndRender();
  modalEdit.classList.add('modal-active');
};

const deleteLogic = (id) => {
  const projectIndex = getProjectIndex(selectedListId);
  const taskIndex = lists[projectIndex].tasks.findIndex(
    (task) => task.id === id,
  );
  lists[projectIndex].tasks.splice(taskIndex, 1);
  saveAndRender();
};

const deleteTask = (e) => {
  if (e.target.matches('.delete-task')) {
    deleteLogic(e.target.id);
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

const defaultProject = () => {
  const list = createList('Default Project');
  if (lists === undefined || lists.length === 0) {
    lists.push(list);
  }
  saveAndRender();
};

const defaultTask = () => {
  const task = createTask(
    'The firt task',
    'Here you need to write the description of the task',
    '2021-12-12',
    '9',
  );
  const selectedList = lists[0];
  if (selectedList.tasks === undefined || selectedList.tasks.length === 0) {
    selectedList.tasks.push(task);
  }
  saveAndRender();
};

export {
  render,
  defaultProject,
  defaultTask, listsContainer, projectsContainer,
  modal, listTasks, listTodos, deleteListButton,
  deleteListProjects, saveAndRender, clearCompleteButton,
  clearbuttonTasks, newTaskForm, todoForm,
  editTaskForm, modalEdit, deleteTask,
  clickHandler, createList, createTask, LOCAL_STORAGE_LIST_KEY, lists,
};