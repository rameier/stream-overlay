import React, { useRef, useEffect, useLayoutEffect } from "react";
import { useOverlayData } from "../../context/ApiOverlayContext";
import { StreamerDetail } from "../../types";

const StreamerInfoPanel: React.FC = () => {
  const { data } = useOverlayData();
  const nameRef = useRef<HTMLHeadingElement>(null);

  const adjustFontSize = () => {
    if (nameRef.current) {
      const element = nameRef.current;
      const container = element.parentElement;
      if (container) {
        // Reset to maximum font size
        element.style.fontSize = "2.5rem";

        // Get container width (accounting for padding)
        const containerWidth = container.clientWidth - 48; // 24px padding on each side

        // If text is wider than container, scale it down
        if (element.scrollWidth > containerWidth) {
          const scale = containerWidth / element.scrollWidth;
          const newSize = Math.max(1.0, 2.5 * scale);
          element.style.fontSize = `${newSize}rem`;
        }
      }
    }
  };

  useLayoutEffect(() => {
    adjustFontSize();
  }, [data.streamer.name]);

  useEffect(() => {
    // Also adjust on window resize
    const handleResize = () => adjustFontSize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          <h1 className="streamer__name" ref={nameRef}>
            {data.streamer.name}
          </h1>
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
