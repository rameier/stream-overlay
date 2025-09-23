import React from "react";
import FacecamPanel from "../overlay/FacecamPanel";
import StreamerInfoPanel from "../overlay/StreamerInfoPanel";
import TodoPanel from "../overlay/TodoPanel";

const LivePreview: React.FC = () => {
  return (
    <div className="dashboard__preview">
      <div className="preview__overlay-wrapper">
        <div className="preview__panels">
          <FacecamPanel />
          <StreamerInfoPanel />
          <TodoPanel />
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
