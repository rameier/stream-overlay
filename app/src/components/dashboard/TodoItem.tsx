import React from "react";
import { Todo } from "../../types";

interface TodoItemProps {
  todo: Todo;
  index: number;
  onUpdate: (index: number, updates: Partial<Todo>) => void;
  onRemove: (index: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  index,
  onUpdate,
  onRemove,
}) => {
  return (
    <div className="todo-item">
      <input
        type="text"
        value={todo.title}
        onChange={(e) => onUpdate(index, { title: e.target.value })}
        placeholder="Todo title"
      />
      <input
        type="text"
        value={todo.status}
        onChange={(e) => onUpdate(index, { status: e.target.value })}
        placeholder="Status"
      />
      <button
        onClick={() => onRemove(index)}
        className="btn btn--danger btn--small"
      >
        Remove
      </button>
    </div>
  );
};

interface NewTodoInputProps {
  newTodo: { title: string; status: string };
  onChange: (todo: { title: string; status: string }) => void;
  onAdd: () => void;
}

const NewTodoInput: React.FC<NewTodoInputProps> = ({
  newTodo,
  onChange,
  onAdd,
}) => {
  return (
    <div className="todo-item">
      <input
        type="text"
        value={newTodo.title}
        onChange={(e) => onChange({ ...newTodo, title: e.target.value })}
        placeholder="New todo title"
      />
      <input
        type="text"
        value={newTodo.status}
        onChange={(e) => onChange({ ...newTodo, status: e.target.value })}
        placeholder="Status"
      />
      <button onClick={onAdd} className="btn btn--secondary btn--small">
        Add Todo
      </button>
    </div>
  );
};

export { TodoItem, NewTodoInput };