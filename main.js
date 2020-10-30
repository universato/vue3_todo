const STORAGE_KEY = 'todos-vuejs-3.0';

const todoStorage = {
  fetch() {
    let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    todos.forEach(function(todo, index) {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

let app = Vue.createApp({
  data() {
    return {
      // todos: [{completed: true, title: 'hoge'}, ......]
      todos: todoStorage.fetch(),
      newTodo: '',
    }
  },
  methods: {
    addTodo() {
      let value = this.newTodo && this.newTodo.trim();
      if (!value) { return; }
      this.todos.push({
        id: todoStorage.uid++,
        title: value,
        completed: false
      });
      this.newTodo = '';
    },
    removeTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    },
  },
  watch: {
    todos: {
      handler(todos) {
        todoStorage.save(todos);
      },
      deep: true
    }
  },
  computed: {
    numberOfTodos() {
      return this.todos.length;
    },
    numberOfCompletions() {
      let count = 0;
      for(let i = 0; i < this.todos.length; i++){
        if(this.todos[i].completed){ count++; }
      }
      return count;
    },
  }
})

app.mount('#todoapp')
