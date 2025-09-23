import React from "react";
import { useOverlayData } from "../../context/ApiOverlayContext";
import { Todo } from "../../types";

const TodoPanel: React.FC = () => {
  const { data } = useOverlayData();

  const renderTodoItem = (todo: Todo, index: number) => (
    <li key={index} className="todo">
      <span className="todo__title">{todo.title}</span>
      <span className="todo__meta">
        {[todo.status, todo.assignee, todo.due].filter(Boolean).join(" • ")}
      </span>
    </li>
  );

  return (
    <section className="panel panel--todos" aria-labelledby="todos-title">
      <header className="panel__header">
        <div className="panel__controls" aria-hidden="true">
          <span className="panel__control"></span>
          <span className="panel__control"></span>
          <span className="panel__control"></span>
        </div>
        <h2 className="panel__title" id="todos-title">
          To-Dos
        </h2>
      </header>
      <div className="panel__body">
        {data.todos.length > 0 ? (
          <ul className="todos">{data.todos.map(renderTodoItem)}</ul>
        ) : (
          <p className="empty-state">Keine To-Dos offen</p>
        )}
      </div>
    </section>
  );
};

export default TodoPanel;
