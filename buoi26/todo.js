const todoInput = document.querySelector('#todo-input');
const addBtn = document.querySelector('#add-btn');
const errorMsg = document.querySelector('#error-msg');
const todoList = document.querySelector('#todo-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const todoCount = document.querySelector('#todo-count');
const clearCompletedBtn = document.querySelector('#clear-completed');

let todos = [];
let currentFilter = 'all';

// Thêm Todo
function addTodo() {
    const text = todoInput.value.trim();
    if (!text) {
        errorMsg.classList.remove('hidden');
        return;
    }
    errorMsg.classList.add('hidden');
    todos.push({ id: Date.now(), text, completed: false, isDeleted: false });
    todoInput.value = '';
    todoInput.focus();
    renderTodos();
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTodo();
});

// Event Delegation cho danh sách
todoList.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
        const id = Number(e.target.closest('li').dataset.id);
        const todo = todos.find(t => t.id === id);
        if (todo) {
            todo.completed = e.target.checked;
            renderTodos();
        }
    }
});

todoList.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    const id = Number(li.dataset.id);
    
    if (e.target.closest('.delete-btn')) {
        if (confirm('Bạn có chắc chắn muốn xoá todo này?')) {
            const todo = todos.find(t => t.id === id);
            if (todo) todo.isDeleted = true;
            renderTodos();
        }
    }
});

// Chỉnh sửa (Double Click)
todoList.addEventListener('dblclick', (e) => {
    const span = e.target.closest('.todo-text');
    if (!span) return;
    const li = span.closest('li');
    const id = Number(li.dataset.id);
    const todo = todos.find(t => t.id === id);
    
    if (todo && !todo.completed) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = todo.text;
        input.className = 'flex-1 border-b border-blue-500 focus:outline-none px-2 py-1';
        
        li.replaceChild(input, span);
        input.focus();

        const saveEdit = () => {
            const newText = input.value.trim();
            if (newText) {
                todo.text = newText;
            } else {
                alert('Vui lòng nhập nội dung todo!');
            }
            renderTodos();
        };

        input.addEventListener('blur', saveEdit);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') saveEdit();
            if (e.key === 'Escape') renderTodos();
        });
    }
});

// Lọc Todo
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => {
            b.classList.remove('active', 'bg-blue-100', 'text-blue-700');
            b.classList.add('text-gray-600');
        });
        const target = e.target;
        target.classList.add('active', 'bg-blue-100', 'text-blue-700');
        target.classList.remove('text-gray-600');
        currentFilter = target.dataset.filter;
        renderTodos();
    });
});

// Xoá tất cả hoàn thành
clearCompletedBtn.addEventListener('click', () => {
    if (confirm('Xoá toàn bộ todo đã hoàn thành?')) {
        todos.forEach(t => {
            if (t.completed) t.isDeleted = true;
        });
        renderTodos();
    }
});

// Render
function renderTodos() {
    const activeTodos = todos.filter(t => !t.isDeleted);
    let filteredTodos = activeTodos;
    
    if (currentFilter === 'completed') filteredTodos = activeTodos.filter(t => t.completed);
    if (currentFilter === 'uncompleted') filteredTodos = activeTodos.filter(t => !t.completed);

    todoList.innerHTML = '';
    
    if (filteredTodos.length === 0) {
        todoList.innerHTML = `<li class="text-center text-gray-400 italic py-4">Không có todo nào</li>`;
    } else {
        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'todo-item flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-gray-50';
            li.dataset.id = todo.id;
            
            const textClass = todo.completed ? 'line-through text-gray-400' : 'text-gray-800';
            
            li.innerHTML = `
                <div class="flex items-center gap-3 flex-1 overflow-hidden">
                    <input type="checkbox" class="w-5 h-5 cursor-pointer accent-blue-500" ${todo.completed ? 'checked' : ''}>
                    <span class="todo-text flex-1 cursor-pointer truncate select-none ${textClass}" title="Click đúp để sửa">${todo.text}</span>
                </div>
                <button class="delete-btn text-gray-400 hover:text-red-500 transition p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                </button>
            `;
            todoList.appendChild(li);
        });
    }

    const completedCount = activeTodos.filter(t => t.completed).length;
    todoCount.textContent = `${completedCount}/${activeTodos.length} mục đã hoàn thành`;
    
    if (completedCount > 0) {
        clearCompletedBtn.classList.remove('hidden');
    } else {
        clearCompletedBtn.classList.add('hidden');
    }
}