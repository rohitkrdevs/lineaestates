import { CinematicPage } from "@/components/CinematicPage";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <CinematicPage />
    </SmoothScrollProvider>
  );
}
