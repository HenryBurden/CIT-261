import controller from './controller.js';

window.addEventListener('load', () => {
    const myController = new controller('todoList');
    myController.addTodo();
    console.log(myController);
});