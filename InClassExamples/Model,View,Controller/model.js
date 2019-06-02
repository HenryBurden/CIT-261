
export default class model{
    constructor (key) {
        this.key = key;
        this.toDos = readLS(this.key) || [];
    }

    add(data) {
        const newToDo = {
            id: new Date(),
            content: data,
            completed: false
        };
        this.toDos.push(newToDo);
        writeLS(this.key, this.toDos);
        
    }
    
    delete(id) {

    }

    getItems() {

    }

    getFilteredItems(query) {

    }

    complete(id) {

    }
}

function readLS(key) {
    return JSON.parse(window.localStorage.getItem(key));
}

function writeLS(key, toDos) {
    window.localStorage.setItem(key, JSON.stringify(toDos));
}