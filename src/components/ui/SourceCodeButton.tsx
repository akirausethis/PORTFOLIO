"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import DisclaimerModal from "@/components/ui/DisclaimerModal";

interface Props {
  url: string;
}

export default function SourceCodeButton({ url }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleConfirmRedirect = () => {
    window.open(url, "_blank");
  };

  return (
    <>
      <DisclaimerModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onConfirm={handleConfirmRedirect} 
      />
      <button 
        onClick={() => setModalOpen(true)}
        className="group text-lg font-medium hover:text-foreground/70 transition-colors inline-flex items-center space-x-2 tracking-tight"
      >
        <SiGithub className="w-4 h-4" />
        <span>Source Code</span>
        <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </>
  );
}
