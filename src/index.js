import './style.scss';

const listsContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const deleteListButton = document.querySelector('[data-delete-list-button]')
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title]')
const listTasks = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')
const newTaskForm = document.querySelector('[data-new-task-form]')
const taskInput = document.querySelector('[data-new-task-input]')
const clearCompleteButton = document.querySelector('[data-clear-complete-button]')

const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)

listsContainer.addEventListener('click', e =>{
	if(e.target.tagName.toLowerCase() === 'li') {
		selectedListId = e.target.dataset.listId
		saveAndRender()
	}
})

listTasks.addEventListener('click', e =>{
	if(e.target.tagName.toLowerCase() === 'input') {
		const selectedList = lists.find(list => list.id === selectedListId)
		const selectedTask = selectedList.tasks.find(task => task.id === e.target.id)
		selectedTask.complete = e.target.checked
		save()
	}
})

deleteListButton.addEventListener('click', e => {
	lists = lists.filter(list => list.id !== selectedListId)
	selectedListId = null
	saveAndRender()
})

clearCompleteButton.addEventListener('click', e => {
	const selectedList = lists.find(list => list.id === selectedListId)
	selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
	saveAndRender()
})

newListForm.addEventListener('submit', e => {
	e.preventDefault()
	const listName = newListInput.value
	if (listName == null || listName === '') return
	const list = createList(listName)
	newListInput.value = null
	lists.push(list)
	saveAndRender()
})

newTaskForm.addEventListener('submit', e => {
	e.preventDefault()
	const taskName = taskInput.value
	if (taskName == null || taskName === '') return
	const task = createTask(taskName)
	taskInput.value = null
	const selectedList = lists.find(list => list.id === selectedListId)
	selectedList.tasks.push(task)
	saveAndRender()
})

function createList(name) {
	return { id:Date.now().toString(), name: name, tasks:[]}
	
}

function createTask(name) {
	return { id:Date.now().toString(), name: name, completed: false}
}

function saveAndRender() {
	save()
	render()
}

function save() {
	localStorage.setItem(LOCAL_STORAGE_LIST_KEY,JSON.stringify(lists))
	localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
}

function render()	{
	clearElement(listsContainer)
	renderList()
	const selectedList = lists.find(list => list.id === selectedListId)
	if (selectedListId == null) {
		listDisplayContainer.style.display = 'none'
	} else 
	 {
		listDisplayContainer.style.display = ''
		listTitleElement.innerText = selectedList.name
		clearElement(listTasks)
		renderTasks(selectedList)
	 }
}

function renderTasks(selectedList) {
	selectedList.tasks.forEach(task =>{
		const taskElement = document.importNode(taskTemplate.content, true)
		const checkbox = taskElement.querySelector('input')
		checkbox.id = task.id
		checkbox.checked = task.complete
		const label = taskElement.querySelector('label')
		label.htmlFor = task.id
		label.append(task.name)
		listTasks.appendChild(taskElement)
	})
}


function renderList() {
	lists.forEach(list => {
		const listElement = document.createElement('li')
		listElement.dataset.listId = list.id
		listElement.classList.add("list-name")
		listElement.innerText = list.name
		if (list.id === selectedListId) {
			listElement.classList.add('active-list')
		}
		listsContainer.appendChild(listElement)
	})
}

function clearElement(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild)
	}
}

render()