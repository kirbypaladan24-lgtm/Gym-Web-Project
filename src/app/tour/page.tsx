import type { Metadata } from "next";
import TourExperience from "./tour-experience";

export const metadata: Metadata = {
  title: "360° Virtual Tour",
  description:
    "Explore AV Fitness Gym's branches indoors with a 360° virtual tour — drag to look around and move between viewpoints.",
};

export default function TourPage() {
  return <TourExperience />;
}
