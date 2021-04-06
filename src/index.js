class toDo {
  constructor(title, des, date, num) {
    this.fdes = des;
    this.ftitle = title;
    this.fdue = date;
    this.fnum = num;
  }
}

var toDos = []
var lol = new toDo("1","1","1","1")
toDos.push(lol)
console.log(toDos)

class UI {
static addToDolist(lol) {
    	const list = document.querySelector('#list');
    	const row = document.createElement('tr');
    	row.innerHTML = `
      	<td>${toDo.title}</td>
      	<td>${toDo.des}</td>
      	<td>${toDo.date}</td>
	<td>${toDo.num}</td>
      	<td class="has-text-centered"><button value="Read">Read</button></td>
      	<td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
    	`;
    	list.appendChild(row);
}
}

document.querySelector('#formToDo').addEventListener('submit', (e) => {
  	e.preventDefault();
  	const title = document.querySelector('#ftitle').value;
  	const des = document.querySelector('#fdes').value;
  	const date = document.querySelector('#fdue').value;
  	const num = document.querySelector('#fnum').value;
	var lol = new toDo(title,des,date,num)
	toDos.push(lol)
	console.log(toDos)

})
