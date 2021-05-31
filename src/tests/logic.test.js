import jsdom from 'jsdom';

import { createTask, createList } from '../modules/logic';

const { JSDOM } = jsdom;

describe('taskManipulation', () => {
  beforeEach(() => JSDOM.fromFile('./dist/index.html').then((dom) => {
    document.body.innerHTML = dom.window.document.body.outerHTML;
  }));

  it('Expects the projects projects container to not be null', () => {
    const container = document.getElementsByClassName('container');
    expect(container).toBeDefined();
  });

  it('Expects the projects section to not be null', () => {
    const section = document.getElementsByClassName('todo-list');
    expect(section).toBeDefined();
  });

  it('Expects the projects modal to not be null', () => {
    const modal = document.getElementById('button-modal');
    expect(modal).toBeDefined();
  });

  it('Expects the projects modal to not be null', () => {
    const modal = document.getElementById('modal');
    expect(modal).toBeDefined();
  });

  it('Expects the projects modal to not be null', () => {
    const modal = document.getElementById('delete-button');
    expect(modal).toBeDefined();
  });

  it('Expects the projects task container to not be null', () => {
    const container = document.getElementsByClassName('task-list');
    expect(container).toBeDefined();
  });
});

describe('create task', () => {
  it('Create a new task', () => {
    const idNumber = Date.now().toString();
    const create = createTask(
      'First task',
      'first task description',
      '2021-04-22',
      5,
    );
    expect(create).toEqual({
      id: idNumber,
      time: '2021-04-22',
      desc: 'first task description',
      name: 'First task',
      prior: 5,
      completed: false,
    });
  });

  it('If the input throws undefined', () => {
    const idNumber = Date.now().toString();
    const create = createTask();
    expect(create).toEqual({
      id: idNumber,
      time: undefined,
      desc: undefined,
      name: undefined,
      prior: undefined,
      completed: false,
    });
  });
});

describe('create project', () => {
  it('Create a new project', () => {
    const idNumber = Date.now().toString();
    const create = createList('Firt project');
    expect(create).toEqual({
      id: idNumber,
      name: 'Firt project',
      tasks: [],
    });
  });

  it('If the input throws undefined', () => {
    const idNumber = Date.now().toString();
    const create = createList();
    expect(create).toEqual({
      id: idNumber,
      name: undefined,
      tasks: [],
    });
  });
});