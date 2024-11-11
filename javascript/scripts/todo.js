import { getLocalStorageItem, setLocalStorageItem } from "./localStorage.js";
import {
  LOCAL_STORAGE_KEY,
  TODO_LIST_CONTAINER,
  FILTER_TYPE,
  TODO_TYPE,
} from "./constant.js";
import { getCurrentFilter } from "./filter.js";

export const addTodo = (text) => {
  const todos = getTodos();

  let newTodoId;
  if (todos && todos.length) {
    newTodoId =
      todos.reduce((maxTodo, currentTodo) => {
        return currentTodo.id > maxTodo.id ? currentTodo : maxTodo;
      }, todos[0]).id + 1;
  } else {
    newTodoId = 1;
  }
  const todoObj = {
    id: newTodoId,
    type: TODO_TYPE.todo,
    text: text,
  };

  if (todos && todos.length) {
    todos.push(todoObj);
    setTodos(todos);
  } else {
    setTodos([todoObj]);
  }

  const currentFilter = getCurrentFilter();
  if (currentFilter !== FILTER_TYPE.done) {
    const todoListEl = document.getElementById(TODO_LIST_CONTAINER);
    todoListEl.appendChild(createTodoEl(todoObj));
  }
};

export const removeTodo = (e) => {
  const todos = getTodos();
  if (todos) {
    const newTodos = [...todos];
    const todoEl = e.target.parentElement;
    const todoId = getTodoId(todoEl.id);
    const todoIndex = newTodos.findIndex((item) => item.id === todoId);
    if (todoIndex !== -1) {
      newTodos.splice(todoIndex, 1);
    }
    setTodos(newTodos);
    todoEl.remove();
  }
};

export const createTodoEl = (todo) => {
  const containerEl = document.createElement("div");
  containerEl.style.display = "flex";
  containerEl.style.alignItems = "center";
  containerEl.style.gap = "4px";
  containerEl.id = `todo-${todo.id}`;

  const checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  checkboxEl.addEventListener("change", (e) => {
    const todos = getTodos();
    if (todos.length) {
      const newTodos = [...todos];
      const targetTodoIndex = newTodos.findIndex((v) => v.id === todo.id);
      if (e.target.checked) {
        textEl.style.textDecoration = "line-through";
        newTodos[targetTodoIndex].type = TODO_TYPE.done;
        setTodos(newTodos);
      } else {
        textEl.style.textDecoration = "none";
        newTodos[targetTodoIndex].type = TODO_TYPE.todo;
        setTodos(newTodos);
      }
    }
  });

  const textEl = document.createElement("span");
  textEl.innerHTML = todo.text;

  if (todo.type === FILTER_TYPE.done) {
    textEl.style.textDecoration = "line-through";
    checkboxEl.checked = true;
  }

  const deleteBtnEl = document.createElement("button");
  deleteBtnEl.innerHTML = "삭제";
  deleteBtnEl.addEventListener("click", removeTodo);

  containerEl.appendChild(checkboxEl);
  containerEl.appendChild(textEl);
  containerEl.appendChild(deleteBtnEl);

  return containerEl;
};

export const renderTodos = (todos) => {
  const todoListEl = document.getElementById(TODO_LIST_CONTAINER);

  todos.forEach((todo) => {
    const todoEl = createTodoEl(todo);
    todoListEl.appendChild(todoEl);
  });
};

export const getTodos = () => {
  const todos = getLocalStorageItem(LOCAL_STORAGE_KEY);
  if (!todos) return;
  return JSON.parse(todos);
};

export const setTodos = (todos) =>
  setLocalStorageItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));

const getTodoId = (idWithText) => Number(idWithText.split("-")[1]);
