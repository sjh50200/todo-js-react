import {
  TODO_TYPE,
  FILTER_TYPE,
  FILTER_INPUT_FLAG,
  TODO_INPUT_ID,
  ADD_TODO_BTN_ID,
  TODO_LIST_CONTAINER,
} from "./scripts/constant.js";
import { getTodos, addTodo, renderTodos } from "./scripts/todo.js";

const init = () => {
  const todos = getTodos() ?? [];
  renderTodos(todos);
  initTodoInput();

  const inputEl = document.getElementById(TODO_INPUT_ID);
  inputEl.addEventListener("input", () => {
    const inputText = inputEl.value.trim();
    buttonEl.disabled = !inputText;
  });

  const buttonEl = document.getElementById(ADD_TODO_BTN_ID);
  buttonEl.addEventListener("click", () => {
    addTodo(inputEl.value);
    initTodoInput();
  });

  const radioEls = document.querySelectorAll(FILTER_INPUT_FLAG);
  radioEls.forEach((el) =>
    el.addEventListener("change", (e) => {
      const todos = getTodos();
      if (todos && todos.length) {
        let newTodos = [...todos];
        switch (e.target.value) {
          case FILTER_TYPE.all:
            break;
          case FILTER_TYPE.done:
            newTodos = newTodos.filter((v) => v.type === TODO_TYPE.done);
            break;
          case FILTER_TYPE.todo:
            newTodos = newTodos.filter((v) => v.type === TODO_TYPE.todo);
            break;
          default:
            return;
        }
        const todosEl = document.getElementById(TODO_LIST_CONTAINER);
        todosEl.innerHTML = "";
        renderTodos(newTodos);
      }
    })
  );
};

const initTodoInput = () => {
  const inputEl = document.getElementById(TODO_INPUT_ID);
  inputEl.value = "";

  const buttonEl = document.getElementById(ADD_TODO_BTN_ID);
  buttonEl.disabled = true;
};

window.addEventListener("DOMContentLoaded", init);
