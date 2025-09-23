import React from "react";

const TestDashboard: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "red",
        color: "white",
        padding: "2rem",
        fontSize: "2rem",
      }}
    >
      <h1>TEST DASHBOARD - This should be visible!</h1>
      <p>If you can see this, routing is working</p>
    </div>
  );
};

export default TestDashboard;
