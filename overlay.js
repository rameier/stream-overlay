const defaultData = {
  theme: {
    accentOne: "#4dabff",
    accentTwo: "#768bff",
  },
  streamer: {
    name: "livieso",
    status: "Live aus dem Studio",
    tagline: "Creative Dev Streams",
    tag: "LIVE",
    avatarUrl: "",
    info: [
      { label: "Sprache", value: "Deutsch & Englisch" },
      { label: "Zeitplan", value: "Mo, Mi & Fr • 19:30 CET" },
      { label: "Setup", value: "VS Code • Ableton • Stream Deck" },
    ],
    links: [
      { label: "twitch.tv/livieso", url: "https://twitch.tv/livieso" },
      { label: "discord.gg/livieso", url: "https://discord.gg/example" },
    ],
  },
  nowPlaying: {
    label: "Aktuell",
    title: "Building a shiny overlay inside VS Code",
    category: "Creative Coding & UI Design",
    startedAt: "Seit 45 Min live",
  },
  latestSubscriptions: [
    { name: "pixelpilot", time: "vor 2 Min" },
    { name: "codecraft", time: "vor 5 Min" },
    { name: "lunarbiscuit", time: "vor 9 Min" },
  ],
  supporters: [
    { name: "sarah.codes", message: "5 € Tip", time: "vor 7 Min" },
    { name: "techven", message: "Tier 1 Sub", time: "vor 18 Min" },
  ],
  goals: [
    { label: "Follower", current: 74, target: 100 },
    { label: "Twitch Subs", current: 18, target: 25 },
  ],
  callout: {
    title: "Freitag • 19:30 CET",
    subtitle: "Chill Q&A & Live Coding",
    socials: [
      { label: "twitch.tv/livieso", url: "https://twitch.tv/livieso" },
      { label: "@livieso", url: "https://instagram.com/livieso" },
    ],
  },
  tasks: [
    { title: "Dashboard API verfeinern", status: "In Arbeit", assignee: "livieso", due: "Heute" },
    { title: "Chat Alerts testen", status: "Ausstehend" },
    { title: "Overlay deployen", status: "Review", due: "Bis Freitag" },
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

if (config.dashboardUrl) {
  startDashboardSync(config.dashboardUrl, config.pollIntervalMs);
}

function renderOverlay(data) {
  updateText("streamer.name", data.streamer?.name);
  updateText("streamer.status", data.streamer?.status);
  updateText("streamer.tagline", data.streamer?.tagline);
  updateText("streamer.tag", data.streamer?.tag);
  updateText("nowPlaying.label", data.nowPlaying?.label);
  updateText("nowPlaying.title", data.nowPlaying?.title);
  updateText("nowPlaying.category", data.nowPlaying?.category);
  updateText("nowPlaying.startedAt", data.nowPlaying?.startedAt);
  updateText("callout.title", data.callout?.title);
  updateText("callout.subtitle", data.callout?.subtitle);

  renderAvatar(data.streamer);
  renderList("streamer.info", data.streamer?.info, createInfoItem);
  renderList("streamer.links", data.streamer?.links, createProfileLink);
  renderList("latestSubscriptions", data.latestSubscriptions, createSubscriptionItem);
  renderList("supporters", data.supporters, createSupportItem);
  renderList("goals", data.goals, createGoalItem);
  renderList("socials", data.callout?.socials, createSocialLink);
  renderList("tasks", data.tasks, createTaskItem);
}

function updateText(field, value) {
  const el = document.querySelector(`[data-field="${field}"]`);
  if (!el || value === undefined || value === null) return;
  el.textContent = value;
}

function renderAvatar(streamer = {}) {
  const avatar = document.querySelector("[data-avatar]");
  if (!avatar) return;

  const initialSpan = avatar.querySelector("span");
  if (streamer.avatarUrl) {
    avatar.style.setProperty("background-image", `url("${streamer.avatarUrl}")`);
    avatar.classList.add("avatar--image");
    if (initialSpan) initialSpan.textContent = "";
  } else {
    avatar.style.removeProperty("background-image");
    avatar.classList.remove("avatar--image");
    if (initialSpan) {
      const initial = (streamer.name || "").trim().charAt(0).toUpperCase() || "?";
      initialSpan.textContent = initial;
    }
  }
}

function renderList(listName, items = [], factory) {
  const container = document.querySelector(`[data-list="${listName}"]`);
  if (!container) return;

  container.innerHTML = "";
  if (!Array.isArray(items) || items.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Noch nichts eingetroffen";
    container.appendChild(empty);
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

function createInfoItem({ label, value }) {
  const li = document.createElement("li");
  li.className = "profile__info-item";

  const labelSpan = document.createElement("span");
  labelSpan.className = "profile__info-label";
  labelSpan.textContent = label;

  const valueSpan = document.createElement("span");
  valueSpan.className = "profile__info-value";
  valueSpan.textContent = value;

  li.append(labelSpan, valueSpan);
  return li;
}

function createProfileLink({ label, url }) {
  const link = document.createElement("a");
  link.className = "profile__link";
  link.textContent = label || url;
  if (url) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noreferrer";
  } else {
    link.href = "#";
  }
  return link;
}

function createSubscriptionItem({ name, time }) {
  const li = document.createElement("li");
  li.className = "list__item";

  const nameSpan = document.createElement("span");
  nameSpan.className = "list__item-name";
  nameSpan.textContent = name;

  const timeElement = document.createElement("time");
  timeElement.className = "list__item-meta";
  timeElement.textContent = time;

  li.append(nameSpan, timeElement);
  return li;
}

function createSupportItem({ name, message, time }) {
  const li = document.createElement("li");
  li.className = "list__item list__item--support";

  const wrapper = document.createElement("div");
  wrapper.className = "support__content";

  const nameSpan = document.createElement("span");
  nameSpan.className = "list__item-name";
  nameSpan.textContent = name;

  const messageSpan = document.createElement("span");
  messageSpan.className = "support__message";
  messageSpan.textContent = message;

  const timeElement = document.createElement("time");
  timeElement.className = "list__item-meta";
  timeElement.textContent = time;

  wrapper.append(nameSpan, messageSpan);
  li.append(wrapper, timeElement);
  return li;
}

function createGoalItem({ label, current, target }) {
  const goal = document.createElement("div");
  goal.className = "goal";

  const meta = document.createElement("div");
  meta.className = "goal__meta";

  const labelSpan = document.createElement("span");
  labelSpan.className = "goal__label";
  labelSpan.textContent = label;

  const valueSpan = document.createElement("span");
  valueSpan.className = "goal__value";
  const total = Number(target) || 0;
  const currentValue = Math.min(Number(current) || 0, total || Number(current) || 0);
  valueSpan.textContent = `${current ?? 0} / ${target ?? 0}`;

  const bar = document.createElement("div");
  bar.className = "goal__bar";

  const fill = document.createElement("div");
  fill.className = "goal__bar-fill";
  const percentage = total > 0 ? Math.min((currentValue / total) * 100, 100) : 0;
  fill.style.width = `${percentage}%`;

  meta.append(labelSpan, valueSpan);
  bar.append(fill);
  goal.append(meta, bar);
  return goal;
}

function createSocialLink({ label, url }) {
  const link = document.createElement("a");
  link.className = "social";
  link.textContent = label || url;
  if (url) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noreferrer";
  } else {
    link.href = "#";
  }
  return link;
}

function createTaskItem({ title, status, assignee, due }) {
  const li = document.createElement("li");
  li.className = "task";

  const titleSpan = document.createElement("span");
  titleSpan.className = "task__title";
  titleSpan.textContent = title;
  li.appendChild(titleSpan);

  const meta = document.createElement("div");
  meta.className = "task__meta";

  if (status) {
    const statusSpan = document.createElement("span");
    statusSpan.className = "task__status";
    statusSpan.textContent = status;
    meta.appendChild(statusSpan);
  }

  const details = [assignee, due].filter(Boolean);
  if (details.length) {
    const detailsSpan = document.createElement("span");
    detailsSpan.className = "task__details";
    detailsSpan.textContent = details.join(" • ");
    meta.appendChild(detailsSpan);
  }

  if (meta.childElementCount > 0) {
    li.appendChild(meta);
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
      output[key] = mergeDeep(isObject(targetValue) ? targetValue : {}, sourceValue);
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
  if (theme.accentOne) {
    root.style.setProperty("--accent-1", theme.accentOne);
  }
  if (theme.accentTwo) {
    root.style.setProperty("--accent-2", theme.accentTwo);
  }
}

function startDashboardSync(url, intervalMs = 10000) {
  const pollInterval = Number.isFinite(intervalMs) && intervalMs > 0 ? intervalMs : 10000;
  let timerId;

  const fetchData = async () => {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Dashboard request failed with status ${response.status}`);
      }
      const payload = await response.json();
      if (payload && typeof payload === "object") {
        window.updateStreamOverlay(payload);
      }
    } catch (error) {
      console.warn("Stream overlay: Dashboard Sync fehlgeschlagen", error);
    } finally {
      scheduleNext();
    }
  };

  const scheduleNext = () => {
    if (pollInterval > 0) {
      timerId = window.setTimeout(fetchData, pollInterval);
    }
  };

  fetchData();

  return () => {
    if (timerId) {
      window.clearTimeout(timerId);
    }
  };
}
