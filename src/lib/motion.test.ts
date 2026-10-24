import { describe, expect, it } from "vitest";
import { DURATION, motionFrame, normalizeTime } from "./motion";
import type { GeometryMode, MotionState } from "../types";
describe("deterministic motion geometry", () => {
  for (const mode of [0, 1, 2] as GeometryMode[])
    for (const removed of [false, true]) {
      const state: MotionState = { pull: removed ? 1 : 0, removed, mode };
      it(`has an exact mathematical seam for mode ${mode}, removed ${removed}`, () =>
        expect(motionFrame(0, state)).toEqual(motionFrame(DURATION, state)));
      it(`is seek-order independent for mode ${mode}, removed ${removed}`, () => {
        const frame = motionFrame(4.25, state);
        motionFrame(11, state);
        motionFrame(0.1, state);
        expect(motionFrame(4.25, state)).toEqual(frame);
      });
    }
  it("normalizes time without accumulated drift", () => {
    expect(normalizeTime(12)).toBe(0);
    expect(normalizeTime(-1)).toBe(11);
    expect(normalizeTime(25)).toBe(1);
  });
  it("has visible movement in the running state", () => {
    const state: MotionState = { pull: 1, removed: true, mode: 0 };
    expect(motionFrame(3, state).core).not.toBe(motionFrame(0, state).core);
  });
});
