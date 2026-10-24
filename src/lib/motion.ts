import type { MotionState } from "../types";
export const DURATION = 12;
export function normalizeTime(time: number): number {
  return (((Number(time) || 0) % DURATION) + DURATION) % DURATION;
}
export function motionFrame(time: number, state: MotionState) {
  const t = normalizeTime(time),
    phase = (t / DURATION) * Math.PI * 2;
  const wheelAngle = state.removed ? t * 30 : (1 - Math.cos(phase)) * 2.5;
  const threadEnd = 970 + state.pull * 56;
  return {
    time: t,
    input: `translate(${600 - state.pull * 220} 244) rotate(${-wheelAngle})`,
    core: `translate(600 244) rotate(${wheelAngle})`,
    extra: `translate(${600 + state.pull * 220 + (state.removed ? 130 : 0)} ${244 - (state.removed ? 136 : 0)}) rotate(${state.removed ? -18 : (1 - Math.cos(phase)) * 2.5}) scale(${state.removed ? 0.31 : 1})`,
    thread: state.removed
      ? `M600 244 C720 244 740 373 825 355 S950 337 ${threadEnd} 332`
      : `M${600 + state.pull * 220} 244 C${720 + state.pull * 120} 244 700 375 810 363 S900 324 ${threadEnd} 332`,
    outputRadius: state.removed ? 4.5 + Math.sin(phase * 2) * 0.7 : 4,
    ellipses: Array.from({ length: 18 }, (_, i) => ({
      rx:
        state.mode === 2
          ? 102
          : state.mode === 1
            ? 70 + 28 * Math.sin(phase + i * 0.2)
            : 98,
      ry:
        state.mode === 2
          ? 18 + 12 * (1 + Math.sin(phase + i * 0.25))
          : state.mode === 1
            ? 35
            : 24 + 8 * Math.cos(phase),
      cx: state.mode === 1 ? 24 : 0,
      transform: `rotate(${i * 20 + 18 * Math.sin(phase)})`,
      stroke:
        state.mode === 1 ? "#dce4cb" : state.mode === 2 ? "#d3c4e4" : "#f5a178",
    })),
  };
}
export function createMotionRenderer(root: HTMLElement) {
  function find<T extends Element>(selector: string) {
    const node = root.querySelector<T>(selector);
    if (!node) throw Error(`Missing motion target: ${selector}`);
    return node;
  }
  const input = find<SVGGElement>("#input-wheel"),
    core = find<SVGGElement>("#core-wheel"),
    extra = find<SVGGElement>("#extra-wheel");
  const shaft = find<SVGPathElement>("#drive-shaft"),
    highlight = find<SVGPathElement>("#drive-shaft-highlight"),
    labels = find<SVGGElement>("#component-labels");
  const removedLabel = find<SVGGElement>("#removed-label"),
    output = find<SVGCircleElement>("#output-dot"),
    thread = find<SVGPathElement>("#loose-thread");
  const grip = find<HTMLButtonElement>("#thread-grip"),
    timeline = find<HTMLInputElement>("#timeline"),
    timeOutput = find<HTMLOutputElement>("#time-output");
  const ellipses = Array.from(
    root.querySelectorAll<SVGEllipseElement>("#lab-shapes ellipse"),
  );
  return (time: number, state: MotionState) => {
    const f = motionFrame(time, state);
    input.setAttribute("transform", f.input);
    core.setAttribute("transform", f.core);
    extra.setAttribute("transform", f.extra);
    extra.setAttribute("opacity", state.removed ? ".65" : "1");
    shaft.setAttribute(
      "d",
      `M${500 - state.pull * 170} 244H${700 + state.pull * 170}`,
    );
    highlight.setAttribute(
      "d",
      `M${500 - state.pull * 170} 241H${700 + state.pull * 170}`,
    );
    labels.setAttribute("opacity", String(state.pull));
    removedLabel.setAttribute("opacity", state.removed ? "1" : "0");
    output.setAttribute("fill", state.removed ? "#718852" : "#a6ae98");
    output.setAttribute("r", String(f.outputRadius));
    thread.setAttribute("d", f.thread);
    grip.style.setProperty("--pull", String(state.pull));
    ellipses.forEach((node, i) => {
      const ellipse = f.ellipses[i];
      if (!ellipse) return;
      Object.entries(ellipse).forEach(([key, value]) =>
        node.setAttribute(key, String(value)),
      );
    });
    timeline.value = String(f.time);
    timeOutput.value = f.time.toFixed(2).padStart(5, "0") + "s";
  };
}
