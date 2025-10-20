// use-toast.tsx
"use client";

import { useState, useCallback } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: number;
  title?: string;
  description?: string;
  message?: string;
  type: ToastType;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (
      options:
        | { title?: string; description?: string; type?: ToastType }
        | string
    ) => {
      const id = new Date().getTime();

      let toast: Toast;
      if (typeof options === "string") {
        // Backward compatibility for simple string messages
        toast = { id, message: options, type: "info" };
      } else {
        // New object-based API
        toast = {
          id,
          title: options.title,
          description: options.description,
          type: options.type || "info",
        };
      }

      setToasts((prev) => [...prev, toast]);

      // Auto remove toast after 3 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    []
  );

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = addToast; // Alias for compatibility

  const ToastContainer = () => {
    if (toasts.length === 0) return null;

    return (
      <div className="fixed top-5 right-5 flex flex-col gap-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded shadow text-white animate-slide-in min-w-[300px] ${
              toast.type === "success"
                ? "bg-green-500"
                : toast.type === "error"
                ? "bg-red-500"
                : toast.type === "warning"
                ? "bg-yellow-500 text-black"
                : "bg-blue-500"
            }`}
          >
            {toast.title && (
              <div className="font-semibold mb-1">{toast.title}</div>
            )}
            {toast.description && (
              <div className="text-sm opacity-90">{toast.description}</div>
            )}
            {toast.message && <div>{toast.message}</div>}
          </div>
        ))}
      </div>
    );
  };

  return { addToast, toast, removeToast, ToastContainer };
}
