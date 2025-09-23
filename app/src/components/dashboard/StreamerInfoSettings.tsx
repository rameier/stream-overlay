import React, { useState } from "react";
import { StreamerDetail } from "../../types";
import { DetailItem, NewDetailInput } from "./DetailItem";

interface StreamerInfo {
  name: string;
  status: string;
  tagline: string;
  details: StreamerDetail[];
}

interface StreamerInfoSettingsProps {
  streamer: StreamerInfo;
  onStreamerChange: (field: keyof StreamerInfo, value: string | StreamerDetail[]) => void;
  onUpdateDetail: (index: number, field: keyof StreamerDetail, value: string) => void;
  onRemoveDetail: (index: number) => void;
  onAddDetail: () => void;
}

const StreamerInfoSettings: React.FC<StreamerInfoSettingsProps> = ({
  streamer,
  onStreamerChange,
  onUpdateDetail,
  onRemoveDetail,
  onAddDetail,
}) => {
  const [newDetail, setNewDetail] = useState({ label: "", value: "" });

  const handleAddDetail = () => {
    if (newDetail.label.trim() && newDetail.value.trim()) {
      const updatedDetails = [...streamer.details, newDetail];
      onStreamerChange("details", updatedDetails);
      setNewDetail({ label: "", value: "" });
      onAddDetail();
    }
  };

  return (
    <>
      <h2>Streamer Information</h2>
      <div className="form-group">
        <label htmlFor="streamerName">Name</label>
        <input
          type="text"
          id="streamerName"
          value={streamer.name}
          onChange={(e) => onStreamerChange("name", e.target.value)}
          placeholder="Streamer Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="streamerStatus">Status</label>
        <input
          type="text"
          id="streamerStatus"
          value={streamer.status}
          onChange={(e) => onStreamerChange("status", e.target.value)}
          placeholder="Live aus dem Studio"
        />
      </div>
      <div className="form-group">
        <label htmlFor="streamerTagline">Tagline</label>
        <input
          type="text"
          id="streamerTagline"
          value={streamer.tagline}
          onChange={(e) => onStreamerChange("tagline", e.target.value)}
          placeholder="Creative Dev Streams"
        />
      </div>

      <div className="subsection">
        <h3>Details</h3>
        {streamer.details.map((detail, index) => (
          <DetailItem
            key={index}
            detail={detail}
            index={index}
            onUpdate={onUpdateDetail}
            onRemove={onRemoveDetail}
          />
        ))}
        <NewDetailInput
          newDetail={newDetail}
          onChange={setNewDetail}
          onAdd={handleAddDetail}
        />
      </div>
    </>
  );
};

export default StreamerInfoSettings;