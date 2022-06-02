export const addTodo = (newTodo, todos, setTodos) => {
  const newTodos = [...todos, newTodo];
  setTodos(newTodos);
};
export const editTodo = (newTodo, index, todos, setTodos) => {
  const newTodos = [...todos];
  newTodos[index] = newTodo;
  setTodos(newTodos);
};

export const changeTodoStatus = (index, todos, isDone, setTodos) => {
  const newTodos = [...todos];
  newTodos[index].isDone = isDone;
  setTodos(newTodos);
};

export const removeTodo = (index, todos, setTodos) => {
  const newTodos = [...todos];
  newTodos.splice(index, 1);
  setTodos(newTodos);
};
