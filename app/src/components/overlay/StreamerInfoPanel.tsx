import React from "react";
import { useOverlayData } from "../../context/ApiOverlayContext";
import { StreamerDetail } from "../../types";

const StreamerInfoPanel: React.FC = () => {
  const { data } = useOverlayData();

  const renderDetailItem = (detail: StreamerDetail, index: number) => (
    <li key={index} className="detail">
      <span className="detail__label">{detail.label}</span>
      <span className="detail__value">{detail.value}</span>
    </li>
  );

  return (
    <section className="panel panel--info" aria-labelledby="info-title">
      <header className="panel__header">
        <div className="panel__controls" aria-hidden="true">
          <span className="panel__control"></span>
          <span className="panel__control"></span>
          <span className="panel__control"></span>
        </div>
        <h2 className="panel__title" id="info-title">
          Streamer Infos
        </h2>
      </header>
      <div className="panel__body">
        <div className="streamer">
          <span className="streamer__status">{data.streamer.status}</span>
          <h1 className="streamer__name">{data.streamer.name}</h1>
          <p className="streamer__tagline">{data.streamer.tagline}</p>
          <ul className="streamer__details">
            {data.streamer.details.map(renderDetailItem)}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default StreamerInfoPanel;
