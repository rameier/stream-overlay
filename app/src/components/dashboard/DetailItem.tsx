import React from "react";
import { StreamerDetail } from "../../types";

interface DetailItemProps {
  detail: StreamerDetail;
  index: number;
  onUpdate: (index: number, field: keyof StreamerDetail, value: string) => void;
  onRemove: (index: number) => void;
}

const DetailItem: React.FC<DetailItemProps> = ({
  detail,
  index,
  onUpdate,
  onRemove,
}) => {
  return (
    <div className="detail-item">
      <input
        type="text"
        value={detail.label}
        onChange={(e) => onUpdate(index, "label", e.target.value)}
        placeholder="Label"
      />
      <input
        type="text"
        value={detail.value}
        onChange={(e) => onUpdate(index, "value", e.target.value)}
        placeholder="Value"
      />
      <button
        onClick={() => onRemove(index)}
        className="btn btn--danger btn--small"
      >
        Remove
      </button>
    </div>
  );
};

interface NewDetailInputProps {
  newDetail: { label: string; value: string };
  onChange: (detail: { label: string; value: string }) => void;
  onAdd: () => void;
}

const NewDetailInput: React.FC<NewDetailInputProps> = ({
  newDetail,
  onChange,
  onAdd,
}) => {
  return (
    <div className="detail-item">
      <input
        type="text"
        value={newDetail.label}
        onChange={(e) =>
          onChange({ ...newDetail, label: e.target.value })
        }
        placeholder="New Label"
      />
      <input
        type="text"
        value={newDetail.value}
        onChange={(e) =>
          onChange({ ...newDetail, value: e.target.value })
        }
        placeholder="New Value"
      />
      <button onClick={onAdd} className="btn btn--secondary btn--small">
        Add Detail
      </button>
    </div>
  );
};

export { DetailItem, NewDetailInput };