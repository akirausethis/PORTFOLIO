"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2, MessageSquare, User } from "lucide-react";

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
      if (!res.ok) {
        // Just set error silently without console.error to avoid Next.js dev overlay
        setError("Database not connected. Please add POSTGRES_URL to your .env file.");
        setComments([]);
        return;
      }
      const data = await res.json();
      setComments(data);
    } catch (err) {
      setError("Failed to connect to the server.");
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
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
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-foreground/5 text-foreground/60 text-sm tracking-widest uppercase font-medium">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Community</span>
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-heading font-medium tracking-tight leading-[1.05]"
          >
            Leave a Comment
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-lg text-foreground/60 font-light max-w-xl"
          >
            Have thoughts on my work? Drop a comment below — I&apos;d love to hear from you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left Side: Form */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <form onSubmit={handleSubmit} className="space-y-8">

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-xs font-semibold tracking-[0.12em] text-foreground/40 uppercase mb-3 group-focus-within:text-foreground transition-colors duration-300">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground/60 transition-colors duration-300 placeholder:text-foreground/25 text-base"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-xs font-semibold tracking-[0.12em] text-foreground/40 uppercase mb-3 group-focus-within:text-foreground transition-colors duration-300">
                      Email <span className="text-foreground/30 normal-case tracking-normal font-normal">(optional)</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Hidden from public"
                      className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground/60 transition-colors duration-300 placeholder:text-foreground/25 text-base"
                    />
                  </div>
                </div>

                {/* Comment textarea */}
                <div className="group">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-semibold tracking-[0.12em] text-foreground/40 uppercase group-focus-within:text-foreground transition-colors duration-300">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <span className={`text-xs font-mono transition-colors ${content.length > 450 ? 'text-red-400' : 'text-foreground/30'}`}>
                      {content.length}/500
                    </span>
                  </div>
                  <textarea
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    rows={5}
                    maxLength={500}
                    className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground/60 transition-colors duration-300 placeholder:text-foreground/25 text-base resize-none"
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="flex items-start gap-3 text-red-500 text-sm p-4 bg-red-500/8 rounded-2xl border border-red-500/15"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{error}</span>
                    </motion.div>
                  )}
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="flex items-start gap-3 text-emerald-600 text-sm p-4 bg-emerald-500/8 rounded-2xl border border-emerald-500/15"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">Comment posted! Thanks for sharing your thoughts.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={!name.trim() || !content.trim() || isSubmitting}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium tracking-wide hover:bg-foreground/85 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /><span>Posting...</span></>
                  ) : (
                    <><span>Post Comment</span><Send className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Side: Comments Feed */}
          <div className="lg:col-span-7 lg:pl-12 mt-12 lg:mt-0">

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-32 text-foreground/30 space-y-4">
                <Loader2 className="w-7 h-7 animate-spin" />
                <p className="text-sm tracking-widest uppercase font-medium">Loading...</p>
              </div>
            ) : comments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-foreground/30 space-y-5 border border-dashed border-border rounded-3xl">
                <MessageSquare className="w-10 h-10 opacity-40" />
                <div className="text-center">
                  <p className="text-lg font-light">No comments yet.</p>
                  <p className="text-sm mt-1 opacity-70">Be the first to leave a message.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <p className="text-xs tracking-widest uppercase text-foreground/40 font-medium mb-8">
                  {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
                </p>
                {comments.map((comment, i) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="group p-7 rounded-2xl border border-border/60 hover:border-border bg-foreground/[0.015] hover:bg-foreground/[0.03] transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-full bg-foreground/10 flex items-center justify-center shrink-0 text-foreground/50 font-semibold text-sm">
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-medium text-base leading-tight">{comment.name}</h3>
                        <span className="text-xs text-foreground/40 font-mono">{formatDate(comment.createdAt)}</span>
                      </div>
                    </div>
                    <p className="text-base text-foreground/75 leading-relaxed font-light whitespace-pre-wrap break-words pl-12">
                      {comment.content}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
