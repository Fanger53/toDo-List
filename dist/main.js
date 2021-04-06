/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("class toDo {\n  constructor(title, des, date, num) {\n    this.fdes = des;\n    this.ftitle = title;\n    this.fdue = date;\n    this.fnum = num;\n  }\n}\n\nvar toDos = []\nvar lol = new toDo(\"1\",\"1\",\"1\",\"1\")\ntoDos.push(lol)\nconsole.log(toDos)\n\nclass UI {\nstatic addToDolist(lol) {\n    \tconst list = document.querySelector('#list');\n    \tconst row = document.createElement('tr');\n    \trow.innerHTML = `\n      \t<td>${toDo.title}</td>\n      \t<td>${toDo.des}</td>\n      \t<td>${toDo.date}</td>\n\t<td>${toDo.num}</td>\n      \t<td class=\"has-text-centered\"><button value=\"Read\">Read</button></td>\n      \t<td><a href=\"#\" class=\"btn btn-danger btn-sm delete\">Delete</a></td>\n    \t`;\n    \tlist.appendChild(row);\n}\n}\n\ndocument.querySelector('#formToDo').addEventListener('submit', (e) => {\n  \te.preventDefault();\n  \tconst title = document.querySelector('#ftitle').value;\n  \tconst des = document.querySelector('#fdes').value;\n  \tconst date = document.querySelector('#fdue').value;\n  \tconst num = document.querySelector('#fnum').value;\n\tvar lol = new toDo(title,des,date,num)\n\ttoDos.push(lol)\n\tconsole.log(toDos)\n\n})\n\n\n//# sourceURL=webpack://toDo-List/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;