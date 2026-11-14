"use client";

/* ============================================================================
   PanoViewer — 360° equirectangular panorama viewer (plan §6).
   Viewer: Pannellum 2.5.7 (MIT), vendored under /public/vendor/pannellum/
   (its npm build is a window-global classic script, so it is loaded via a
   <script> tag rather than a bundler import — provenance and license are
   kept in the package + COPYING alongside).
   Behavior required by the plan and implemented here:
   - drag / touch look-around; wheel or pinch zoom
   - visible navigation hotspots between scenes
   - a scene selector list (navigation never depends on tiny hotspots alone)
   - no automatic spinning
   - lazy: Pannellum + the panorama load only when the visitor opens the tour
   - keyboard-accessible controls (Pannellum built-in)
   - loading state + graceful fallback when a panorama fails
   - drag is user-driven, so reduced-motion visitors lose nothing essential
   ============================================================================ */

import { useEffect, useRef, useState } from "react";
import { getScene, type TourScene } from "@/lib/tour";

/* Minimal typing for the vendored window-global. */
interface PannellumHotspot {
  id: string;
  pitch: number;
  yaw: number;
  type: "scene";
  text: string;
  sceneId: string;
}
interface PannellumSceneConfig {
  type: "equirectangular";
  panorama: string;
  pitch: number;
  yaw: number;
  hfov: number;
  autoRotate: false;
  showControls: boolean;
  keyboardZoom: boolean;
  mouseZoom: boolean;
  doubleClickZoomOut: boolean;
  hotSpots: PannellumHotspot[];
}
interface PannellumViewer {
  on(event: string, cb: (arg?: unknown) => void): void;
  loadScene(id: string): void;
  destroy(): void;
}
interface PannellumGlobal {
  viewer(
    el: HTMLElement,
    config: {
      default: { firstScene: string; sceneFadeDuration: number; autoLoad: boolean };
      scenes: Record<string, PannellumSceneConfig>;
    },
  ): PannellumViewer;
}
declare global {
  interface Window {
    pannellum?: PannellumGlobal;
  }
}

const SCRIPT_ID = "vendor-pannellum-js";
const STYLE_HREF = "/vendor/pannellum/pannellum.css";

/** Load the vendored viewer exactly once per page; resolves when ready. */
function loadPannellum(): Promise<PannellumGlobal> {
  return new Promise((resolve, reject) => {
    if (window.pannellum) return resolve(window.pannellum);

    if (!document.querySelector(`link[href="${STYLE_HREF}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = STYLE_HREF;
      document.head.appendChild(link);
    }

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => {
        window.pannellum ? resolve(window.pannellum) : reject(new Error("Pannellum missing"));
      });
      existing.addEventListener("error", () => reject(new Error("Pannellum failed to load")));
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = "/vendor/pannellum/pannellum.js";
    script.async = true;
    script.onload = () => {
      window.pannellum ? resolve(window.pannellum) : reject(new Error("Pannellum missing"));
    };
    script.onerror = () => reject(new Error("Pannellum failed to load"));
    document.head.appendChild(script);
  });
}

interface PanoViewerProps {
  scenes: readonly TourScene[];
  initialSceneId: string;
  onSceneChange?: (sceneId: string) => void;
}

export function PanoViewer({ scenes, initialSceneId, onSceneChange }: PanoViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PannellumViewer | null>(null);
  const [activeId, setActiveId] = useState(initialSceneId);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || scenes.length === 0) return;

    let disposed = false;
    let viewer: PannellumViewer | null = null;

    loadPannellum()
      .then((pannellum) => {
        if (disposed) return;
        viewer = pannellum.viewer(el, {
          default: {
            firstScene: scenes[0].id,
            sceneFadeDuration: 350,
            autoLoad: true,
          },
          scenes: Object.fromEntries(
            scenes.map((s) => [
              s.id,
              {
                type: "equirectangular" as const,
                panorama: s.panorama,
                pitch: s.initialPitch,
                yaw: s.initialYaw,
                hfov: s.hfov,
                autoRotate: false as const, // plan: never auto-spin
                showControls: true,
                keyboardZoom: true,
                mouseZoom: true,
                doubleClickZoomOut: true,
                hotSpots: s.hotspots.map((h) => ({
                  id: h.id,
                  pitch: h.pitch,
                  yaw: h.yaw,
                  type: "scene" as const,
                  text: `${h.label} — open scene`,
                  sceneId: h.targetSceneId,
                })),
              },
            ]),
          ),
        });
        viewerRef.current = viewer;

        viewer.on("load", () => setFailed(false));
        viewer.on("error", () => setFailed(true));
        viewer.on("scenechange", (id) => {
          const sceneId = String(id);
          setActiveId(sceneId);
          onSceneChange?.(sceneId);
        });
      })
      .catch(() => setFailed(true));

    return () => {
      disposed = true;
      try {
        viewer?.destroy();
      } catch {
        /* already gone */
      }
      viewerRef.current = null;
      el.replaceChildren(); // Pannellum mutates the container
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenes]);

  const active = getScene(activeId) ?? scenes[0];

  if (failed) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-sm border border-line bg-surface text-center">
        <div className="max-w-sm px-6">
          <p className="text-sm font-semibold text-bone">
            This panorama could not be loaded.
          </p>
          <p className="mt-2 text-sm text-muted">
            Sample scenes are stand-ins while the gym's approved 360°
            photography is pending.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-sm border border-line bg-ink">
      {/* Viewer */}
      <div
        ref={containerRef}
        className="aspect-video w-full touch-pan-y [&_.pnlm-hotspot-base]:cursor-pointer"
        aria-label={`360° panorama — ${active?.name ?? "scene"}`}
      />

      {/* Scene selector + status — navigation does not rely on hotspots alone */}
      <div className="flex flex-col gap-3 border-t border-line bg-surface px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Tour scenes">
          {scenes.map((s) => {
            const isActive = s.id === activeId;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => viewerRef.current?.loadScene(s.id)}
                className={`rounded-xs px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors duration-micro ${
                  isActive
                    ? "bg-bone text-ink"
                    : "border border-line text-muted hover:border-line-strong hover:text-bone"
                }`}
              >
                {s.name}
              </button>
            );
          })}
        </div>
        {active?.sample ? (
          <p className="tag-unconfirmed rounded-xs px-3 py-1.5 text-[11px]">
            Sample scene — awaiting gym photography
          </p>
        ) : null}
      </div>
    </div>
  );
}
