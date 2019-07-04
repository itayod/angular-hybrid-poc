import {AngularJsRoutes} from '../../common.config';
import PostMessage from '../../services/post-message'

export default class TodoListCtrl {
  static $inject = ['log', 'postMessage']

  todos = []
  id = 0
  todo: string
  todoTypes = ['All', 'Todo', 'Done']
  visibleType = 'All'

  constructor(private log, private postMessage: PostMessage) {
    this.postMessage.send({route: AngularJsRoutes.TodoList})
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
