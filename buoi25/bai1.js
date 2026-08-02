const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
const countEl = document.getElementById('todo-count');

let todos = []; // { id, text, done }
let nextId = 1;

function render() {
  list.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');

    const span = document.createElement(todo.done ? 's' : 'span');
    span.textContent = todo.text;
    span.style.cursor = 'pointer';
    span.addEventListener('click', () => toggleDone(todo.id));

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Xóa';
    delBtn.addEventListener('click', () => deleteTodo(todo.id));

    li.appendChild(span);
    li.appendChild(document.createTextNode(' '));
    li.appendChild(delBtn);
    list.appendChild(li);
  });

  const remaining = todos.filter(t => !t.done).length;
  countEl.textContent = `Còn ${remaining} việc chưa xong`;
}

function addTodo() {
  const value = input.value.trim();
  if (value === '') return;

  const isDuplicate = todos.some(
    t => t.text.toLowerCase() === value.toLowerCase()
  );
  if (isDuplicate) {
    alert('Việc này đã có trong danh sách rồi!');
    return;
  }

  todos.push({ id: nextId++, text: value, done: false });
  input.value = '';
  render();
}

function toggleDone(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) todo.done = !todo.done;
  render();
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  render();
}

addBtn.addEventListener('click', addTodo);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTodo();
});

render();