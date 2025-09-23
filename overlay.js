const defaultData = {
  theme: {
    accentPrimary: "#5c7cfa",
    accentSecondary: "#91a7ff",
  },
  streamer: {
    name: "livieso",
    status: "Live aus dem Studio",
    tagline: "Creative Dev Streams",
    details: [
      { label: "Sprache", value: "Deutsch & Englisch" },
      { label: "Aktuelles Projekt", value: "Overlay Refresh" },
    ],
  },
  todos: [
    { title: "Dashboard API verfeinern", status: "In Arbeit" },
    { title: "Chat Alerts testen", status: "Ausstehend" },
    { title: "Overlay deployen", status: "Review" },
  ],
};

const config = window.streamOverlayConfig || {};
const injectedData = config.data || window.streamOverlayData || {};
let currentData = mergeDeep(defaultData, injectedData);

applyTheme(currentData.theme);
renderOverlay(currentData);

window.updateStreamOverlay = function updateStreamOverlay(partial = {}) {
  currentData = mergeDeep(currentData, partial);
  applyTheme(currentData.theme);
  renderOverlay(currentData);
};

function renderOverlay(data) {
  updateText("streamer.name", data.streamer?.name);
  updateText("streamer.status", data.streamer?.status);
  updateText("streamer.tagline", data.streamer?.tagline);
  renderList(
    "streamer.details",
    data.streamer?.details,
    createDetailItem,
    ""
  );
  renderList("todos", data.todos, createTodoItem, "Keine To-Dos offen");
}

function updateText(field, value) {
  const element = document.querySelector(`[data-field="${field}"]`);
  if (!element || value === undefined || value === null) return;
  element.textContent = value;
}

function renderList(name, items = [], factory, emptyMessage) {
  const container = document.querySelector(`[data-list="${name}"]`);
  if (!container) return;

  container.innerHTML = "";
  if (!Array.isArray(items) || items.length === 0) {
    if (emptyMessage) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = emptyMessage;
      container.appendChild(empty);
    }
    return;
  }

  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    const element = factory(item);
    if (element) {
      fragment.appendChild(element);
    }
  });
  container.appendChild(fragment);
}

function createDetailItem({ label, value }) {
  const li = document.createElement("li");
  li.className = "detail";

  const labelSpan = document.createElement("span");
  labelSpan.className = "detail__label";
  labelSpan.textContent = label;

  const valueSpan = document.createElement("span");
  valueSpan.className = "detail__value";
  valueSpan.textContent = value;

  li.append(labelSpan, valueSpan);
  return li;
}

function createTodoItem({ title, status, assignee, due }) {
  const li = document.createElement("li");
  li.className = "todo";

  const titleSpan = document.createElement("span");
  titleSpan.className = "todo__title";
  titleSpan.textContent = title;
  li.appendChild(titleSpan);

  const metaParts = [status, assignee, due].filter(Boolean);
  if (metaParts.length > 0) {
    const metaSpan = document.createElement("span");
    metaSpan.className = "todo__meta";
    metaSpan.textContent = metaParts.join(" • ");
    li.appendChild(metaSpan);
  }

  return li;
}

function mergeDeep(target, source) {
  if (!isObject(target) || !isObject(source)) {
    return Array.isArray(source) ? [...source] : source;
  }

  const output = { ...target };
  Object.keys(source).forEach((key) => {
    const sourceValue = source[key];
    const targetValue = target[key];
    if (Array.isArray(sourceValue)) {
      output[key] = [...sourceValue];
    } else if (isObject(sourceValue)) {
      output[key] = mergeDeep(
        isObject(targetValue) ? targetValue : {},
        sourceValue
      );
    } else {
      output[key] = sourceValue;
    }
  });
  return output;
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function applyTheme(theme) {
  if (!theme) return;
  const root = document.documentElement;
  if (theme.accentPrimary) {
    root.style.setProperty("--accent-primary", theme.accentPrimary);
  }
  if (theme.accentSecondary) {
    root.style.setProperty("--accent-secondary", theme.accentSecondary);
  }
}
