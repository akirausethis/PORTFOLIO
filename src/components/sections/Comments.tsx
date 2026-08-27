"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type Comment = {
  id: string;
  name: string;
  email: string | null;
  content: string;
  createdAt: string;
};

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Fetch comments
  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/comments');
      if (!res.ok) throw new Error("Failed to fetch comments");
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load comments.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(false);

      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim() || null,
          content: content.trim()
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to post comment");
      }

      const newComment = await res.json();
      
      // Update state locally so we don't need a full reload
      setComments([newComment, ...comments]);
      
      // Reset form
      setName("");
      setEmail("");
      setContent("");
      setSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);

    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <section id="comments" className="relative py-32 w-full border-t border-border bg-background">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Side: Form */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-32">
            <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight mb-8">Leave a Comment</h2>
            <p className="text-lg text-foreground/70 font-light mb-12">
              Have thoughts on my work? Drop a comment below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-xs font-semibold tracking-[0.1em] text-foreground/50 uppercase mb-3">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-foreground transition-colors placeholder:text-foreground/20 text-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-[0.1em] text-foreground/50 uppercase mb-3">
                  Email <span className="text-foreground/40 normal-case tracking-normal font-normal ml-2">(Optional, not displayed)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-foreground transition-colors placeholder:text-foreground/20 text-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-[0.1em] text-foreground/50 uppercase mb-3">
                  Your Comment <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Your thoughts..."
                  rows={4}
                  maxLength={500}
                  className="w-full bg-transparent border-b border-border py-3 px-0 focus:outline-none focus:border-foreground transition-colors placeholder:text-foreground/20 text-lg resize-none"
                />
                <div className="text-right text-xs text-foreground/40 mt-2">
                  {content.length}/500
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center space-x-2 text-red-500 text-sm p-4 bg-red-500/10 rounded-lg"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </motion.div>
                )}
                
                {success && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center space-x-2 text-green-500 text-sm p-4 bg-green-500/10 rounded-lg"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Comment posted successfully!</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={!name.trim() || !content.trim() || isSubmitting}
                  className="group w-full md:w-auto inline-flex justify-center items-center space-x-2 px-8 py-4 bg-foreground text-background rounded-full font-medium tracking-wide hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Post Comment</span>
                      <Send className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side: Comments Feed */}
        <div className="lg:col-span-7 lg:pl-16 lg:border-l lg:border-border mt-16 lg:mt-0">
          <div className="space-y-12">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-foreground/40 space-y-4">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p>Loading comments...</p>
              </div>
            ) : comments.length === 0 ? (
              <p className="text-xl text-foreground/40 font-light italic">No comments yet. Be the first to break the ice.</p>
            ) : (
              comments.map((comment) => (
                <motion.div 
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-b border-border/50 pb-12 last:border-0 last:pb-0"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <h3 className="font-heading font-medium text-xl">{comment.name}</h3>
                    <span className="text-xs font-semibold tracking-widest text-foreground/40 uppercase">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-lg text-foreground/80 leading-relaxed font-light whitespace-pre-wrap break-words">
                    {/* The API safely escaped HTML, but React also safely renders strings by default */}
                    {comment.content}
                  </p>
                </motion.div>
              ))
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
