const STORAGE_KEY = 'todos-vuejs-3.0';

const todoStorage = {
  fetch() {
    let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    todos.forEach((todo, index) => { todo.id = index; });
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
      return this.todos.filter((todo) => todo.completed).length
    },
  }
})

app.mount('#todoapp')
