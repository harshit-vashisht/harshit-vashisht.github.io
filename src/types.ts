import type { gsap } from "gsap";
export type ProjectId = "forma" | "orbit" | "syntax";
export type TrailKey = "bench" | ProjectId;
export type GeometryMode = 0 | 1 | 2;
export interface MotionState {
  pull: number;
  removed: boolean;
  mode: GeometryMode;
}
export interface AnimationAPI {
  tl: ReturnType<typeof gsap.timeline>;
  duration: number;
  seek: (time: number) => void;
  play: (from?: number) => void;
  pause: () => void;
}
export interface MotionControls {
  paused: boolean;
  seek: (time: number) => void;
  play: () => void;
  pause: () => void;
  toggle: () => void;
}
export type ActiveDialog =
  { type: "project"; id: ProjectId } | { type: "contact" } | null;
export interface Task {
  id: number;
  text: string;
  done: boolean;
}
declare global {
  interface Window {
    anim?: AnimationAPI;
  }
}
