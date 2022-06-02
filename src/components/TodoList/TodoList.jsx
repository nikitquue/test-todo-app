import React, { useState } from "react";

import ActionsBar from "../ActionsBar";
import TodosTable from "../TodosTable";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodoIndex, setSelectedTodoIndex] = useState(0);
  return (
    <div>
      {!!todos.length && (
        <TodosTable
          todos={todos}
          setTodos={setTodos}
          selectedTodoIndex={selectedTodoIndex}
          setSelectedTodoIndex={setSelectedTodoIndex}
        />
      )}
      <ActionsBar
        todos={todos}
        setTodos={setTodos}
        selectedTodoIndex={selectedTodoIndex}
      />
    </div>
  );
};

export default TodoList;
