const { observable, action, autorun } = mobx;

function createTodo(title) {
    return observable({
        title,
        completed: false
    });
}

const todoList = observable({
    todos: [],

    get total() {
        return this.todos.length;
    },

    get completed() {
        return this.todos.filter(todo => todo.completed).length;
    },

    add: action(function(title) {
        this.todos.push(createTodo(title))
    }),

    remove: action(function(todo) {
        const todoIndex = this.todos.indexOf(todo);
        if (todoIndex > -1) {
            this.todos.splice(todoIndex, 1);
        }
    }),

    toggleCompleted: action(function(todo) {
        todo.completed = !todo.completed;
    }),

    toggleAll: action(function() {
        this.todos.forEach(function(todo) {
            this.toggleCompleted(todo);
        }.bind(this));
    })
});

autorun(() => {
    if (!todoList.todos.length) {
        console.log('Empty Todo list');
        return;
    }
    todoList.todos.forEach(todo => {
        console.log(todo.completed ? '[v] ' : '[ ] ', todo.title);
    });
});

autorun(() => {
    console.log('total', todoList.total);
});

autorun(() => {
    console.log('completed', todoList.completed);
});