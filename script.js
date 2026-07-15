const TODO_Submit = document.getElementById("submit");
const List_Container = document.querySelector(".todo_List");

function AddTodo(NewTodo) {
  if (!NewTodo) return;

  const Oldtodo = JSON.parse(localStorage.getItem("todo") || "[]");

  const ObjTodo = {
    value: NewTodo,
    completed: false,
  };
  Oldtodo.push(ObjTodo);

  localStorage.setItem("todo", JSON.stringify(Oldtodo));

  ShowTodos();
}

function SubmitClick() {
  const Input = document.getElementById("todo");
  const Input_Value = Input.value.trim();

  AddTodo(Input_Value);
  Input.value = "";
}

function CheckBox(e, textTodo) {
  const isChecked = e.target.checked;
  const Todos = JSON.parse(localStorage.getItem("todo") || "[]");

  const updatedTodos = Todos.map((Todo) => {
    const currentText = typeof Todo === "object" ? Todo.value : Todo;

    if (currentText === textTodo) {
      return { value: currentText, completed: isChecked };
    }
    return Todo;
  });

  localStorage.setItem("todo", JSON.stringify(updatedTodos));
}

function RemoveTodo(textTodo) {
  const Todos = JSON.parse(localStorage.getItem("todo") || "[]");

  const updatedTodos = Todos.filter((Todo) => {
    const currentText = typeof Todo === "object" ? Todo.value : Todo;
    return currentText !== textTodo;
  });

  localStorage.setItem("todo", JSON.stringify(updatedTodos));
  ShowTodos();
}

function ShowTodos() {
  const Todos = JSON.parse(localStorage.getItem("todo") || "[]");

  Todos.forEach((Todo) => {
    const textTodo = typeof Todo === "object" ? Todo.value : Todo;
    const isChecked =
      typeof Todo === "object" && Todo.completed ? "checked" : "";

    List_Container.innerHTML += `
    <div class="todo_Container">
      <input type="checkbox" class="completedInput" ${isChecked} onclick="CheckBox(event, '${textTodo}')">
      <p class="todo_Text">${textTodo}</p>
      <button type="button" class="removeBtn" onclick="RemoveTodo('${textTodo}')">Remove</button>
    </div>
    `;
  });
}

ShowTodos();
