import model from './model.js';

export default class controller {
    constructor(elementID) {
        this.model = new model('todo');
        this.element = document.getElementById(elementID);
    }
    addTodo() {
        this.model.add("Finish Class");
    }
}