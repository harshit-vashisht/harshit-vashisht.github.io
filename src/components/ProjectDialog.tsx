import { useRef, useState } from "react";
import { projectById } from "../data/projects";
import { evaluateExpression } from "../lib/expression";
import { Modal } from "./Modal";
import type { ProjectId, Task } from "../types";
interface Props {
  id: ProjectId;
  onClose: () => void;
  theme: string;
  onTheme: (theme: string) => void;
  tasks: Task[];
  onAddTask: (text: string) => void;
  onToggleTask: (id: number) => void;
  expression: string;
  onExpression: (value: string) => void;
}
const themes = [
  { name: "Sage", color: "#dce4cb", swatch: "#81956b" },
  { name: "Lilac", color: "#dcd5e9", swatch: "#a08bbd" },
  { name: "Clay", color: "#e9c6c1", swatch: "#d28f84" },
];
function Forma({ theme, onTheme }: Pick<Props, "theme" | "onTheme">) {
  return (
    <div className="demo" id="forma-demo" style={{ background: theme }}>
      <div className="demo-header">
        <h3>One system. Three moods.</h3>
        <div className="swatches" aria-label="Color theme">
          {themes.map((item) => (
            <button
              key={item.name}
              type="button"
              className="swatch"
              data-color={item.color}
              style={{ background: item.swatch }}
              aria-label={`${item.name} theme`}
              aria-pressed={theme === item.color}
              onClick={() => onTheme(item.color)}
            />
          ))}
        </div>
      </div>
      <div className="demo-forma">
        <div>
          <span className="demo-large">Aa</span>Type with personality.
        </div>
        <div>
          <span className="demo-large">↗</span>A clear next step.
        </div>
      </div>
    </div>
  );
}
function Orbit({
  tasks,
  onAddTask,
  onToggleTask,
}: Pick<Props, "tasks" | "onAddTask" | "onToggleTask">) {
  const [text, setText] = useState("");
  const input = useRef<HTMLInputElement>(null);
  return (
    <div className="demo" style={{ background: "var(--lavender)" }}>
      <div className="demo-header">
        <h3>Your small orbit</h3>
        <span id="task-count" className="mono">
          {tasks.filter((task) => task.done).length} / {tasks.length} complete
        </span>
      </div>
      <form
        className="task-form"
        id="task-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (!text.trim()) return;
          onAddTask(text.trim());
          setText("");
          input.current?.focus();
        }}
      >
        <input
          ref={input}
          id="task-input"
          aria-label="New task"
          maxLength={100}
          required
          placeholder="One thing to focus on…"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button type="submit">Add +</button>
      </form>
      <ul className="task-list" id="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              aria-label={"Complete " + task.text}
              checked={task.done}
              onChange={() => onToggleTask(task.id)}
            />
            <span>{task.text}</span>
          </li>
        ))}
      </ul>
      <p className="form-note">
        A scratchpad for this visit. Tasks aren’t saved.
      </p>
    </div>
  );
}
function Syntax({
  expression,
  onExpression,
}: Pick<Props, "expression" | "onExpression">) {
  let result: string;
  try {
    const value = evaluateExpression(expression);
    result = `> tokenize\n  ${value.tokens.join("  ·  ")}\n\n> evaluate\n  ${Number(value.result.toPrecision(12))}`;
  } catch (error) {
    result =
      "> waiting for a valid expression\n\n  " +
      (error instanceof Error ? error.message : "Invalid expression.");
  }
  return (
    <div className="demo" style={{ background: "var(--pink)" }}>
      <label htmlFor="expression" className="mono">
        Give it something to think about
      </label>
      <input
        id="expression"
        className="syntax-input"
        value={expression}
        onChange={(event) => onExpression(event.target.value)}
        maxLength={120}
        autoComplete="off"
        spellCheck={false}
      />
      <div
        id="expression-result"
        className="terminal-demo"
        role="status"
        aria-live="polite"
      >
        {result}
      </div>
      <p className="form-note">
        Supports numbers, decimals, parentheses, + − * / and unary signs.
      </p>
    </div>
  );
}
export function ProjectDialog(props: Props) {
  const project = projectById[props.id];
  return (
    <Modal
      id="project-dialog"
      titleId="project-dialog-title"
      label={project.category}
      closeLabel="Close project"
      onClose={props.onClose}
    >
      <h2 id="project-dialog-title">{project.title}</h2>
      <p id="project-intro">{project.intro}</p>
      <div className="detail-meta">
        <div>
          <span className="mono">The challenge</span>
          <p>{project.challenge}</p>
        </div>
        <div>
          <span className="mono">The approach</span>
          <p>{project.approach}</p>
        </div>
      </div>
      <div id="project-demo">
        {props.id === "forma" ? (
          <Forma theme={props.theme} onTheme={props.onTheme} />
        ) : props.id === "orbit" ? (
          <Orbit
            tasks={props.tasks}
            onAddTask={props.onAddTask}
            onToggleTask={props.onToggleTask}
          />
        ) : (
          <Syntax
            expression={props.expression}
            onExpression={props.onExpression}
          />
        )}
      </div>
      <p className="form-note">
        An independent concept and working micro-prototype, not a commissioned
        client project.
      </p>
    </Modal>
  );
}
