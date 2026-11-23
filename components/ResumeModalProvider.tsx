"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { Eye, FileText } from "lucide-react";
import { ResumeViewer } from "./ResumeViewer";
import { setSmoothScrollLocked } from "./SmoothScroll";

interface ResumeModalContextValue {
  isOpen: boolean;
  openResume: () => void;
  closeResume: () => void;
}

const ResumeModalContext = createContext<ResumeModalContextValue>({
  isOpen: false,
  openResume: () => {},
  closeResume: () => {},
});

export function ResumeModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openResume = useCallback(() => setIsOpen(true), []);
  const closeResume = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    setSmoothScrollLocked(isOpen);
    if (typeof document !== "undefined") {
      document.body.style.overflow = isOpen ? "hidden" : "";
    }
    return () => {
      setSmoothScrollLocked(false);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [isOpen]);

  return (
    <ResumeModalContext.Provider value={{ isOpen, openResume, closeResume }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="resume-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={closeResume}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/75 p-2 backdrop-blur-md sm:p-5"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="In-app Resume PDF Reviewer"
              initial={{ opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex w-full justify-center"
            >
              <ResumeViewer onClose={closeResume} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ResumeModalContext.Provider>
  );
}

export function useResumeModal() {
  return useContext(ResumeModalContext);
}

/**
 * Drop-in client button for Server Components to open the in-app Resume PDF Reviewer.
 */
export function ResumePreviewButton({
  label = "Preview Resume",
  variant = "secondary",
  className = "",
  icon = "eye",
}: {
  label?: string;
  variant?: "primary" | "secondary" | "link";
  className?: string;
  icon?: "eye" | "file";
}) {
  const { openResume } = useResumeModal();
  const Icon = icon === "file" ? FileText : Eye;

  if (variant === "link") {
    return (
      <button
        type="button"
        onClick={openResume}
        className={`inline-flex items-center gap-1.5 font-medium text-sky-400 transition hover:text-sky-300 ${className}`}
      >
        <Icon className="h-3.5 w-3.5" />
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openResume}
      className={`${
        variant === "primary" ? "btn-cool-primary" : "btn-cool-secondary"
      } inline-flex min-h-[46px] items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold ${className}`}
    >
      <Icon className="h-4 w-4 text-sky-400" />
      {label}
    </button>
  );
}
