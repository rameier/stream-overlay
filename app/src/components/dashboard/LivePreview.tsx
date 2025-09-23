import React from "react";
import FacecamPanel from "../overlay/FacecamPanel";
import StreamerInfoPanel from "../overlay/StreamerInfoPanel";
import TodoPanel from "../overlay/TodoPanel";

const LivePreview: React.FC = () => {
  return (
    <div className="dashboard__preview">
      <div className="preview__header">
        <h2>Live Preview</h2>
        <p>See how your overlay panels look in real-time</p>
      </div>
      <div className="preview__panels">
        <FacecamPanel />
        <StreamerInfoPanel />
        <TodoPanel />
      </div>
    </div>
  );
};

export default LivePreview;