import React from "react";
import FacecamPanel from "./overlay/FacecamPanel";
import StreamerInfoPanel from "./overlay/StreamerInfoPanel";
import TodoPanel from "./overlay/TodoPanel";
import ThemeApplier from "./shared/ThemeApplier";
import "./Overlay.css";

const Overlay: React.FC = () => {
  return (
    <>
      <ThemeApplier isOverlay={true} />
      <main className="overlay" role="presentation">
        <div className="overlay__workspace" aria-hidden="true"></div>
        <aside className="overlay__panels">
          <FacecamPanel />
          <StreamerInfoPanel />
          <TodoPanel />
        </aside>
      </main>
    </>
  );
};

export default Overlay;
