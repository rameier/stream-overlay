import React, { useState } from "react";
import { Todo } from "../../types";
import { TodoItem, NewTodoInput } from "./TodoItem";

interface TodoSettingsProps {
  todos: Todo[];
  onUpdateTodo: (index: number, updates: Partial<Todo>) => void;
  onRemoveTodo: (index: number) => void;
  onAddTodo: (todo: { title: string; status: string }) => void;
}

const TodoSettings: React.FC<TodoSettingsProps> = ({
  todos,
  onUpdateTodo,
  onRemoveTodo,
  onAddTodo,
}) => {
  const [newTodo, setNewTodo] = useState({ title: "", status: "" });

  const handleAddTodo = () => {
    if (newTodo.title.trim() && newTodo.status.trim()) {
      onAddTodo(newTodo);
      setNewTodo({ title: "", status: "" });
    }
  };

  return (
    <>
      <h2>To-Dos</h2>
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          index={index}
          onUpdate={onUpdateTodo}
          onRemove={onRemoveTodo}
        />
      ))}
      <NewTodoInput
        newTodo={newTodo}
        onChange={setNewTodo}
        onAdd={handleAddTodo}
      />
    </>
  );
};

export default TodoSettings;