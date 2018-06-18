// 用一个 todo 参数返回一个 todo cell 的 HTML 字符串
var templateTodo = function(todo, status, className) {
    var t = `
        <div class="todo-cell ${className}">
            <button class="todo-done ${status}">
                <svg class="icon todo-done" aria-hidden="true">
                    <use xlink:href="#icon-done" class="todo-done"></use>
                </svg>
            </button>
            <button class="todo-edit">
                <svg class="icon todo-edit" aria-hidden="true">
                    <use xlink:href="#icon-edit" class="todo-edit"></use>
                </svg>
            </button>
            <button class="todo-delete">
                <svg class="icon todo-delete" aria-hidden="true">
                    <use xlink:href="#icon-delete" class="todo-delete"></use>
                </svg>
            </button>
            <span class="todo-task">${todo}</span>
        </div>
    `
    return t
}
var loadTodos = function() {
    var s = localStorage.savedTodos
    if (s == undefined) {
        return []
    } else {
        var ts = JSON.parse(s)
        return ts
    }
}

var saveTodo = function(todo, status) {
    var todos = loadTodos()
    var o = {
        'todo': todo,
        'status': status,
    }
    todos.push(o)
    var s = JSON.stringify(todos)
    localStorage.savedTodos = s
}

var insertTodos = function() {
    var todos = loadTodos()
    var todoBox = e('#id-todo-box')
    for (var i = 0; i < todos.length; i++) {
        var t = todos[i]
        var todo = t.todo
        var status = t.status
        if (t.status == 'unfinished') {
            var className = ''
        } else if (t.status == 'finished') {
            var className = 'done'
        }
        var html = templateTodo(todo, status, className)
        todoBox.insertAdjacentHTML('beforeend', html)
    }
}

var deleteTodo = function(box, todoCell) {
    for (var i = 0; i < box.children.length; i++) {
        var cell = box.children[i]
        var todos = loadTodos()
        if (todoCell == cell) {
            todoCell.remove()
            todos.splice(i, 1)
            var s = JSON.stringify(todos)
            localStorage.savedTodos = s
        }
    }
}

var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

var toggleTodo = function(element, className) {
    if (element.classList.contains(className)) {
        var status = 'finished'
    } else {
        var status = 'unfinished'
    }
    return status
}

var finishTodo = function(box, todoCell, status) {
    for (var i = 0; i < box.children.length; i++) {
        var cell = box.children[i]
        var todos = loadTodos()
        if (todoCell == cell) {
            var t = todos[i]
            t.status = status
            var s = JSON.stringify(todos)
            localStorage.savedTodos = s
        }
    }
}

var updateTodo = function(box, todoCell, value) {
    for (var i = 0; i < box.children.length; i++) {
        var cell = box.children[i]
        var todos = loadTodos()
        if (todoCell == cell) {
            var t = todos[i]
            t.todo = value
            var s = JSON.stringify(todos)
            localStorage.savedTodos = s
        }
    }
}

var bindEventAdd = function() {
    var addButton = e('#id-button-add')
    bindEvent(addButton, 'click', function() {
        var todoInput = e('#id-input-todo')
        var todo = todoInput.value
        var status = 'unfinished'
        saveTodo(todo, status)
        var todoBox = e('#id-todo-box')
        var t = templateTodo(todo, status)
        appendHtml(todoBox, t)
    })
}

var bindEventDelete = function() {
    var todoBox = e('#id-todo-box')
    bindEvent(todoBox, 'click', function(event) {
        var self = event.target
        if (self.classList.contains('todo-delete')) {
            var todoDiv = self.closest('.todo-cell')
            var container = todoDiv.parentElement
            deleteTodo(container, todoDiv)
        }
    })
}

var bindEventDone = function() {
    var todoBox = e('#id-todo-box')
    bindEvent(todoBox, 'click', function(event) {
        var self = event.target
        if (self.classList.contains('todo-done')) {
            var todoDiv = self.closest('.todo-cell')
            var container = todoDiv.parentElement
            var className = 'done'
            toggleClass(todoDiv, className)
            var status = toggleTodo(todoDiv, className)
            finishTodo(container, todoDiv, status)
        }
    })
}

var bindEventEdit = function() {
    var todoBox = e('#id-todo-box')
    bindEvent(todoBox, 'click', function(event) {
        var self = event.target
        if (self.classList.contains('todo-edit')) {
            var todoCell = self.closest('.todo-cell')
            var task = todoCell.querySelector('.todo-task')
            task.contentEditable = true
            task.focus()
        }
    })
}

var bindEventUpdate = function() {
    var todoBox = e('#id-todo-box')
    bindEvent(todoBox, 'keydown', function(event) {
        var self = event.target
        if (self.classList.contains('todo-task')) {
            if (event.key == 'Enter') {
                event.preventDefault()
                self.contentEditable = false
                var todoCell = self.closest('.todo-cell')
                var value = self.innerHTML
                var box = todoCell.parentElement
                updateTodo(box, todoCell, value)
            }
        }
    })
}

var bindEvents = function() {
    bindEventAdd()
    bindEventDelete()
    bindEventDone()
    bindEventEdit()
    bindEventUpdate()
}
var __main = function() {
    height()
    insertTodos()
    bindEvents()
}
__main()
