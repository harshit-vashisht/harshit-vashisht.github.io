import { useCallback, useMemo, useRef, useState } from "react";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { Workbench } from "./components/Workbench";
import { Projects } from "./components/Projects";
import { Thinking } from "./components/Thinking";
import { DiscardDrawer } from "./components/DiscardDrawer";
import { Playground } from "./components/Playground";
import { Contact } from "./components/Contact";
import { ProjectDialog } from "./components/ProjectDialog";
import { ContactDialog } from "./components/ContactDialog";
import { useWorkbenchMotion } from "./hooks/useWorkbenchMotion";
import type {
  ActiveDialog,
  GeometryMode,
  ProjectId,
  Task,
  TrailKey,
} from "./types";
export default function App() {
  const root = useRef<HTMLDivElement>(null),
    resumeAfterDialog = useRef(false),
    nextTaskId = useRef(3);
  const [bench, setBench] = useState({ pull: 0, removed: false }),
    [mode, setMode] = useState<GeometryMode>(0),
    [depth, setDepth] = useState(0);
  const [visited, setVisited] = useState<TrailKey[]>([]),
    [dialog, setDialog] = useState<ActiveDialog>(null);
  const [theme, setTheme] = useState("#dce4cb"),
    [expression, setExpression] = useState("(12 + 8) * 3");
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Explore an idea", done: false },
    { id: 2, text: "Make something real", done: false },
  ]);
  const [name, setName] = useState(""),
    [message, setMessage] = useState("");
  const state = useMemo(() => ({ ...bench, mode }), [bench, mode]);
  const motion = useWorkbenchMotion(root, state);
  const remember = useCallback(
    (key: TrailKey) =>
      setVisited((previous) =>
        previous.includes(key) ? previous : [...previous, key],
      ),
    [],
  );
  const setPull = useCallback(
    (value: number) => {
      const pull = Math.max(0, Math.min(1, value));
      setBench((previous) => ({
        pull,
        removed: pull >= 0.9 && previous.removed,
      }));
      if (pull >= 0.9) remember("bench");
    },
    [remember],
  );
  function open(next: ActiveDialog) {
    resumeAfterDialog.current = !motion.paused;
    motion.pause();
    setDialog(next);
  }
  function openProject(id: ProjectId) {
    remember(id);
    open({ type: "project", id });
  }
  function close() {
    setDialog(null);
    if (
      resumeAfterDialog.current &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      motion.play();
  }
  return (
    <div ref={root}>
      <a className="skip" href="#work">
        Skip the experiment, see the work
      </a>
      <div className="wrap">
        <SiteHeader />
        <main>
          <Workbench
            {...bench}
            visited={visited}
            onPull={setPull}
            onRemove={() => {
              setBench((previous) => ({ ...previous, removed: true }));
              remember("bench");
            }}
            onReset={() => setBench({ pull: 0, removed: false })}
            motion={motion}
          />
          <Projects
            depth={depth}
            onDepth={setDepth}
            onOpen={openProject}
            visited={visited}
          />
          <Thinking />
          <DiscardDrawer removed={bench.removed} />
          <Playground mode={mode} onMode={setMode} motion={motion} />
          <Contact visited={visited} onOpen={() => open({ type: "contact" })} />
        </main>
        <SiteFooter />
      </div>
      {dialog?.type === "project" && (
        <ProjectDialog
          id={dialog.id}
          onClose={close}
          theme={theme}
          onTheme={setTheme}
          tasks={tasks}
          onAddTask={(text) => {
            const task: Task = { id: nextTaskId.current++, text, done: false };
            setTasks((previous) => [...previous, task]);
          }}
          onToggleTask={(id) =>
            setTasks((previous) =>
              previous.map((task) =>
                task.id === id ? { ...task, done: !task.done } : task,
              ),
            )
          }
          expression={expression}
          onExpression={setExpression}
        />
      )}
      {dialog?.type === "contact" && (
        <ContactDialog
          onClose={close}
          name={name}
          message={message}
          onName={setName}
          onMessage={setMessage}
        />
      )}
    </div>
  );
}
