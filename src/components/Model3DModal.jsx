"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";

// подгружаем тяжёлый контент только внутри модалки
const Model3DContent = dynamic(() => import("./Model3DContent"), {
  ssr: false,
});

export default function Model3DModal({ open, onClose, model }) {
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => setMounted(true), []);

  // Esc для закрытия
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Блокируем прокрутку body
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="modal-3d"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        // клик по фону — закрыть
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="modal-3d__dialog" role="document">
        <button
          type="button"
          className="modal-3d__close"
          aria-label="Закрыть 3D-просмотр"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              d="M18 6L6 18M6 6l12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="visually-hidden">Закрыть</span>
        </button>
        <Model3DContent model={model} />
      </div>
    </div>,
    document.body
  );
}
