import React from "react";

const FacecamPanel: React.FC = () => {
  return (
    <section className="panel panel--facecam" aria-labelledby="facecam-title">
      <header className="panel__header">
        <div className="panel__controls" aria-hidden="true">
          <span className="panel__control"></span>
          <span className="panel__control"></span>
          <span className="panel__control"></span>
        </div>
        <h2 className="panel__title" id="facecam-title">
          Facecam
        </h2>
      </header>
      <div className="panel__body">
        <div className="facecam">
          <div className="facecam__frame"></div>
          <p className="facecam__hint">Platziere hier deine Webcam in OBS.</p>
        </div>
      </div>
    </section>
  );
};

export default FacecamPanel;
