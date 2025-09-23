import React, { useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="tab-navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-button ${activeTab === tab.id ? "tab-button--active" : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

interface TabPanelProps {
  id: string;
  activeTab: string;
  children: React.ReactNode;
}

const TabPanel: React.FC<TabPanelProps> = ({ id, activeTab, children }) => {
  if (id !== activeTab) return null;
  
  return (
    <div className="tab-panel" role="tabpanel" aria-labelledby={`tab-${id}`}>
      {children}
    </div>
  );
};

interface TabbedContainerProps {
  tabs: Tab[];
  defaultTab?: string;
}

const TabbedContainer: React.FC<TabbedContainerProps> = ({
  tabs,
  defaultTab,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "");

  return (
    <div className="tabbed-container">
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="tab-content">
        {tabs.map((tab) => (
          <TabPanel key={tab.id} id={tab.id} activeTab={activeTab}>
            {tab.content}
          </TabPanel>
        ))}
      </div>
    </div>
  );
};

export { TabNavigation, TabPanel, TabbedContainer };
export type { Tab };