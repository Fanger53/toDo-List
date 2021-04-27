import './style.scss';

const listsContainer = document.querySelector('[data-lists]')
// class toDo {
//   constructor(title, des, date, num) {
//     this.fdes = des;
//     this.ftitle = title;
//     this.fdue = date;
//     this.fnum = num;
//   }
// }

let lists =[{
	id: 1,
	name: 'name'
}]

function render()	{
	clearElement(listsContainer)
	lists.forEach(list => {
		const listElement = document.createElement('li')
		listElement.dataset.listId = list.id
		listElement.classList.add("list-name")
		listElement.innerText = list.name
		listsContainer.appendChild(listElement)
	})
}

function clearElement(element) {
	
}

render()