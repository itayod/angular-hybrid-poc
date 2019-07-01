import PostMessage from '../../services/post-message'

export default class TodoListCtrl {
  static $inject = ['log', 'postMessage']

  todos = []
  id = 0
  todo: string
  todoTypes = ['All', 'Todo', 'Done']
  visibleType = 'All'

  constructor(private log, private postMessage: PostMessage) {
    this.log.info('Hello World!')
    this.postMessage.send({data: 'hello from angular js'})
  }

  handleSubmit(e): void {
    if (e.keyCode !== 13) {
      return
    }

    this.todos.push({
      id: ++this.id,
      text: this.todo,
      complete: false
    })
    this.todo = ''
  }

  toggleTodo(curTodo): void {
    this.todos.forEach(todo => {
      if (curTodo.id === todo.id) {
        todo.complete = !todo.complete
      }
    })
  }

  toggleType(type: string): void {
    this.visibleType = type
  }
}
