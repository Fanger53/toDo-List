import {
  listsContainer, projectsContainer, modal,
  listTasks, listTodos, deleteListButton,
  deleteListProjects, clearCompleteButton,
  clearbuttonTasks, newTaskForm, todoForm,
  editTaskForm, modalEdit, deleteTask, clickHandler, createList, saveAndRender,
  lists,
} from './logic';

const buttonModal = document.getElementById('button-modal');
const buttonCancel = document.querySelector('.cancel-button');
const buttonCancelEdit = document.getElementById('cancel-button');
const editTask = document.getElementById('form-edit');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');

const listeners = () => {
  buttonModal.addEventListener('click', () => {
    modal.classList.remove('modal-active');
  });

  listsContainer.addEventListener('click', projectsContainer);

  listTasks.addEventListener('click', listTodos);

  newListForm.addEventListener('submit', e => {
    e.preventDefault();
    const listName = newListInput.value;
    if (listName == null || listName === '') return;
    const list = createList(listName);
    newListInput.value = null;
    lists.push(list);
    saveAndRender();
  });

  deleteListButton.addEventListener('click', deleteListProjects);

  clearCompleteButton.addEventListener('click', clearbuttonTasks);

  newTaskForm.addEventListener('submit', todoForm);

  buttonCancel.addEventListener('click', () => {
    modal.classList.add('modal-active');
  });

  buttonCancelEdit.addEventListener('click', () => {
    modalEdit.classList.add('modal-active');
  });

  editTask.addEventListener('click', editTaskForm);

  document.addEventListener('keydown', ({ key }) => {
    if (key === 'Escape') {
      modal.classList.add('modal-active');
    }
  });

  document.addEventListener('click', deleteTask);

  document.addEventListener('click', clickHandler);
};

// eslint-disable-next-line import/prefer-default-export
export { listeners };