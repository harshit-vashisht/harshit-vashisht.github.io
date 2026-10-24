import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { createMotionRenderer, DURATION, normalizeTime } from "../lib/motion";
import type { AnimationAPI, MotionControls, MotionState } from "../types";
gsap.registerPlugin(useGSAP);
export function useWorkbenchMotion(
  root: RefObject<HTMLDivElement | null>,
  state: MotionState,
): MotionControls {
  const stateRef = useRef(state),
    apiRef = useRef<AnimationAPI | null>(null),
    drawRef = useRef<ReturnType<typeof createMotionRenderer> | null>(null),
    timeRef = useRef(0);
  const [paused, setPaused] = useState(true);
  useLayoutEffect(() => {
    stateRef.current = state;
    drawRef.current?.(timeRef.current, state);
  }, [state]);
  useGSAP(
    () => {
      if (!root.current) return;
      let alive = true;
      const draw = createMotionRenderer(root.current);
      drawRef.current = draw;
      const clock = { t: 0 };
      const media = matchMedia("(prefers-reduced-motion: reduce)");
      const render = (t: number) => {
        timeRef.current = normalizeTime(t);
        draw(t, stateRef.current);
      };
      const tl = gsap.timeline({ paused: true, repeat: -1 });
      tl.fromTo(
        clock,
        { t: 0 },
        {
          t: DURATION,
          duration: DURATION,
          ease: "none",
          onUpdate: () => render(clock.t),
        },
      );
      const api: AnimationAPI = {
        tl,
        duration: DURATION,
        seek(t) {
          const v = Math.min(DURATION, Math.max(0, Number(t) || 0));
          tl.pause();
          tl.time(v, true);
          render(v);
          setPaused(true);
        },
        play(from = timeRef.current) {
          tl.time(normalizeTime(from), true);
          tl.play();
          setPaused(false);
        },
        pause() {
          tl.pause();
          setPaused(true);
        },
      };
      apiRef.current = api;
      window.anim = api;
      render(0);
      const onPreference = () => {
        if (media.matches) api.pause();
      };
      media.addEventListener("change", onPreference);
      const query = new URLSearchParams(location.search);
      void document.fonts.ready.then(() => {
        if (!alive) return;
        if (query.has("t")) api.seek(Number(query.get("t")));
        else if (!query.has("external") && !media.matches) api.play(0);
        else api.seek(0);
        document.documentElement.dataset.ready = "1";
      });
      return () => {
        alive = false;
        media.removeEventListener("change", onPreference);
        tl.kill();
        drawRef.current = null;
        apiRef.current = null;
        if (window.anim === api) delete window.anim;
        delete document.documentElement.dataset.ready;
      };
    },
    { scope: root },
  );
  const seek = useCallback((time: number) => apiRef.current?.seek(time), []);
  const play = useCallback(() => apiRef.current?.play(), []);
  const pause = useCallback(() => apiRef.current?.pause(), []);
  const toggle = useCallback(() => {
    const api = apiRef.current;
    if (api) api.tl.paused() ? api.play() : api.pause();
  }, []);
  return { paused, seek, play, pause, toggle };
}
