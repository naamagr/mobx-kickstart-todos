const {observable, action,autorun,toJS} = mobx;

const todos = observable([]);

const setNewTask = action(newTask => {
    todos.push({title: newTask.title, completed: false});
})

const removeTask = action(taskName => {
    const index = todos.findIndex((task) => task.title === taskName);
    todos.splice(index, 1);
})

const toggleCompleteTask = action(function (taskName) {
  const index = todos.findIndex((task) => task.title === taskName);
  todos[index].completed = !todos[index].completed;
});

const toggleAllTasks = action(function (){
    todos.forEach(function(task){
        console.log('toggle');
        task.completed=!task.completed;
    })
});


autorun(() => {
  console.log('in autorun');
console.log(toJS(todos));
});

autorun(() => {
    if(todos.length>0){ //length is a method of the array so it can be observed. [0] cannot be observed because when the array is created it doesn't exist, so mobx is not tracking it!!
        console.log('change in first task');
        console.log(todos[0].completed);
}});


setNewTask({title: 'Walk the cat'});
setNewTask({title: 'Walk the dog'});
setNewTask({title: 'Walk the mouse'});


removeTask('Walk the dog');

toggleCompleteTask('Walk the cat');

toggleAllTasks();

