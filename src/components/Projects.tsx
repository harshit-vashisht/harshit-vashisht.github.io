import { projects } from "../data/projects";
import { ProjectArtwork } from "./ProjectArtwork";
import type { ProjectId, TrailKey } from "../types";
export function Projects({
  depth,
  onDepth,
  onOpen,
  visited,
}: {
  depth: number;
  onDepth: (value: number) => void;
  onOpen: (id: ProjectId) => void;
  visited: TrailKey[];
}) {
  const engineering = depth >= 0.5;
  return (
    <section id="work" aria-labelledby="work-title">
      <div className="section-intro">
        <div>
          <div className="section-kicker mono">
            <b>01 /</b> The work, with the thinking left in
          </div>
          <h2 id="work-title">
            Every good answer
            <br />
            started as a question.
          </h2>
        </div>
        <div className="depth-control">
          <span className="depth-title mono">
            Same idea. A different depth.
          </span>
          <label htmlFor="depth">Experience</label>
          <input
            id="depth"
            type="range"
            min="0"
            max="100"
            value={depth * 100}
            onChange={(event) => onDepth(Number(event.target.value) / 100)}
            aria-label="View depth, experience to engineering"
            aria-valuetext={
              engineering ? "Engineering view" : "Experience view"
            }
          />
          <span>Engineering</span>
        </div>
      </div>
      {projects.map((project) => (
        <article
          className="project-sheet"
          id={`${project.id}-sheet`}
          key={project.id}
        >
          <div className="project-art">
            <span className="art-label mono">
              {project.number} / {project.artLabel}
            </span>
            <ProjectArtwork id={project.id} depth={depth} />
            <div className="art-bottom mono">
              <span data-art-state={project.id}>
                {engineering ? "Blueprint" : "Interface"} / 0{project.number}
              </span>
              <span>Independent study ↗</span>
            </div>
          </div>
          <div className="project-content">
            <div className="project-heading">
              <span className="num mono">{project.number}</span>
              <h3>{project.name}</h3>
            </div>
            <p className="project-tagline">{project.tagline}</p>
            <p className="project-copy" data-copy={project.id}>
              {engineering ? project.engineeringCopy : project.copy}
            </p>
            <div className="decision">
              <span className="mono">The decision that matters</span>
              <p data-decision={project.id}>
                {engineering ? project.engineeringDecision : project.decision}
              </p>
            </div>
            <div className="project-actions">
              <button
                className="project-button"
                type="button"
                data-project={project.id}
                aria-label={project.accessibleLabel}
                onClick={() => onOpen(project.id)}
              >
                Open the experiment <span>↗</span>
              </button>
              <span
                className={`project-status mono${visited.includes(project.id) ? " seen" : ""}`}
                data-visited={project.id}
              >
                {visited.includes(project.id)
                  ? "Unfolded · open again"
                  : "Not yet unfolded"}
              </span>
            </div>
          </div>
        </article>
      ))}
      <p className="concept-note mono">
        Three independent concept studies with working prototypes. No invented
        clients, metrics, or origin stories.
      </p>
    </section>
  );
}
