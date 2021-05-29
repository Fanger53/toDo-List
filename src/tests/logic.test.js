import createTask from '../modules/logic';
import createList from '../modules/logic';
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

describe('taskManipulation', () => {
  beforeEach(() => JSDOM.fromFile('./dist/index.html').then((dom) => {
    document.body.innerHTML = dom.window.document.body.outerHTML;
  }));

  it('Expects the projects projects container to not be null', () => {
    const container = document.getElementsByClassName('g-container');
    expect(container).toBeDefined();
  });

  it('Expects the projects section to not be null', () => {
    const section = document.getElementsByClassName('section');
    expect(section).toBeDefined();
  });

  it('Expects the projects modal to not be null', () => {
    const modal = document.getElementById('launch-modal');
    expect(modal).toBeDefined();
  });

  it('Expects the projects modal to not be null', () => {
    const modal = document.getElementById('task-modal');
    expect(modal).toBeDefined();
  });

  it('Expects the projects modal to not be null', () => {
    const modal = document.getElementById('delete-modal');
    expect(modal).toBeDefined();
  });

  it('Expects the projects task container to not be null', () => {
    const container = document.getElementsByClassName('task-container');
    expect(container).toBeDefined();
  });
});

describe('create task', () => {
  it('Create a new task', () => {
    const idNumber = Date.now().toString();
    const create = createTask(
      'Firt task',
      'first task description',
      '2021-04-22',
      5,
    );
    expect(create).toEqual({
      id: idNumber,
      date: '2021-04-22',
      description: 'first task description',
      name: 'Firt task',
      priority: 5,
    });
  });

  it('If no input throws undefined', () => {
    const idNumber = Date.now().toString();
    const create = createTask();
    expect(create).toEqual({
      id: idNumber,
      date: undefined,
      description: undefined,
      name: undefined,
      priority: undefined,
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

  it('If no input throws undefined', () => {
    const idNumber = Date.now().toString();
    const create = createList();
    expect(create).toEqual({
      id: idNumber,
      name: undefined,
      tasks: [],
    });
  });
});