/* ============================================================================
   360° tour data — AV Fitness Gym (Phase 1 framework)
   ----------------------------------------------------------------------------
   The viewer, scene model, hotspots, and fallbacks are real. The panoramas
   are NEUTRAL SAMPLE placeholders (clearly marked), because the gym has not
   yet supplied equirectangular photography. When real panoramas arrive:

     1. Drop the equirectangular image into /public/tour/<branch>/
     2. Point each scene's `panorama` at it and set `sample: false`
     3. Adjust initial pitch/yaw and hotspot positions to the real photo

   Model follows the plan §6.2 (scene structure).
   ============================================================================ */

export type BranchSlug = "branch-one" | "branch-two";

export interface TourHotspot {
  readonly id: string;
  readonly pitch: number; // degrees, -90..90
  readonly yaw: number; // degrees, 0..360
  readonly targetSceneId: string;
  readonly label: string;
}

export interface TourScene {
  readonly id: string;
  readonly branch: BranchSlug;
  readonly name: string;
  readonly description: string;
  readonly panorama: string; // equirectangular image path
  readonly initialPitch: number;
  readonly initialYaw: number;
  readonly hfov: number; // initial field of view
  readonly hotspots: readonly TourHotspot[];
  readonly sample: boolean; // true = neutral placeholder, not a gym photo
}

/** Neutral charcoal-gradient equirectangular placeholders (1024×512). */
const SAMPLE_ENTRANCE = "/tour/sample-entrance.jpg";
const SAMPLE_FLOOR = "/tour/sample-floor.jpg";
const SAMPLE_CARDIO = "/tour/sample-cardio.jpg";

export const tourScenes: readonly TourScene[] = [
  /* ---------------- Branch 1 ---------------- */
  {
    id: "b1-entrance",
    branch: "branch-one",
    name: "Entrance",
    description: "Sample scene — awaiting approved photography of the branch entrance.",
    panorama: SAMPLE_ENTRANCE,
    initialPitch: 0,
    initialYaw: 0,
    hfov: 105,
    hotspots: [{ id: "b1e-floor", pitch: -2, yaw: 60, targetSceneId: "b1-floor", label: "Training floor" }],
    sample: true,
  },
  {
    id: "b1-floor",
    branch: "branch-one",
    name: "Main training floor",
    description: "Sample scene — awaiting approved photography of the training floor.",
    panorama: SAMPLE_FLOOR,
    initialPitch: 0,
    initialYaw: 20,
    hfov: 105,
    hotspots: [
      { id: "b1f-entrance", pitch: 0, yaw: 180, targetSceneId: "b1-entrance", label: "Entrance" },
      { id: "b1f-cardio", pitch: -3, yaw: 300, targetSceneId: "b1-cardio", label: "Cardio area" },
    ],
    sample: true,
  },
  {
    id: "b1-cardio",
    branch: "branch-one",
    name: "Cardio area",
    description: "Sample scene — awaiting approved photography of the cardio area.",
    panorama: SAMPLE_CARDIO,
    initialPitch: 0,
    initialYaw: 0,
    hfov: 105,
    hotspots: [{ id: "b1c-floor", pitch: 0, yaw: 120, targetSceneId: "b1-floor", label: "Training floor" }],
    sample: true,
  },

  /* ---------------- Branch 2 ---------------- */
  {
    id: "b2-entrance",
    branch: "branch-two",
    name: "Entrance",
    description: "Sample scene — awaiting approved photography of the branch entrance.",
    panorama: SAMPLE_ENTRANCE,
    initialPitch: 0,
    initialYaw: 0,
    hfov: 105,
    hotspots: [{ id: "b2e-floor", pitch: -2, yaw: 60, targetSceneId: "b2-floor", label: "Training floor" }],
    sample: true,
  },
  {
    id: "b2-floor",
    branch: "branch-two",
    name: "Main training floor",
    description: "Sample scene — awaiting approved photography of the training floor.",
    panorama: SAMPLE_FLOOR,
    initialPitch: 0,
    initialYaw: 20,
    hfov: 105,
    hotspots: [
      { id: "b2f-entrance", pitch: 0, yaw: 180, targetSceneId: "b2-entrance", label: "Entrance" },
      { id: "b2f-cardio", pitch: -3, yaw: 300, targetSceneId: "b2-cardio", label: "Cardio area" },
    ],
    sample: true,
  },
  {
    id: "b2-cardio",
    branch: "branch-two",
    name: "Cardio area",
    description: "Sample scene — awaiting approved photography of the cardio area.",
    panorama: SAMPLE_CARDIO,
    initialPitch: 0,
    initialYaw: 0,
    hfov: 105,
    hotspots: [{ id: "b2c-floor", pitch: 0, yaw: 120, targetSceneId: "b2-floor", label: "Training floor" }],
    sample: true,
  },
];

export function scenesForBranch(slug: BranchSlug): readonly TourScene[] {
  return tourScenes.filter((s) => s.branch === slug);
}

export function getScene(id: string): TourScene | undefined {
  return tourScenes.find((s) => s.id === id);
}
