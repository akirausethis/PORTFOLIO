"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ExternalLink } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { useEffect } from "react";

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DisclaimerModal({ isOpen, onClose, onConfirm }: DisclaimerModalProps) {
  
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md bg-background border border-border p-8 shadow-2xl flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-heading font-bold tracking-tight mb-4">
              DO NOT STEAL!
            </h3>
            
            <p className="text-foreground/70 mb-8 leading-relaxed">
              This source code is provided for portfolio review purposes only. 
              <strong> GIVE CREDITS! ALL RIGHTS RESERVED.</strong> Please do not copy, redistribute, or claim this work as your own.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-6 border border-border text-foreground hover:bg-foreground/5 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="flex-1 py-3 px-6 bg-foreground text-background hover:bg-foreground/90 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <span>I Understand</span>
                <SiGithub className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
