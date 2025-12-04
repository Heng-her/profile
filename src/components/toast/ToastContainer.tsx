// ToastContainer.tsx
import React from "react";
import { Toast } from "./types";

export const ToastContainer = ({ toasts }: { toasts: Toast[] }) => {
  return (
    <div style={containerStyle}>
      {toasts.map((t) => (
        <div key={t.id} style={{ ...toastStyle, ...typeStyles[t.type] }}>
          {t.message}
        </div>
      ))}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  position: "fixed",
  top: "20px",
  right: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  zIndex: 9999,
};

const toastStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: "6px",
  color: "white",
  fontSize: "14px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
};

const typeStyles: Record<string, React.CSSProperties> = {
  success: { backgroundColor: "#28a745" },
  error: { backgroundColor: "#dc3545" },
  warning: { backgroundColor: "#ffc107", color: "black" },
};
