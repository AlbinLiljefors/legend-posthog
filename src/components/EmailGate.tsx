import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "legend-user-email";

declare global {
  interface Window {
    posthog?: {
      identify: (id: string, properties?: Record<string, unknown>) => void;
    };
  }
}

function identifyUser(email: string) {
  window.posthog?.identify(email, { email });
}

export function EmailGate({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setAuthenticated(true);
      identifyUser(stored);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes("@")) return;
    localStorage.setItem(STORAGE_KEY, trimmed);
    identifyUser(trimmed);
    setAuthenticated(true);
  };

  if (authenticated) return <>{children}</>;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground font-['Space_Grotesk'] mb-2">
            Legend
          </h1>
          <p className="text-muted-foreground">
            Enter your email to explore the PostHog architecture
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@posthog.com"
            required
            autoFocus
            className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
          <Button type="submit" className="w-full py-3 gap-2">
            Continue
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Your email is only used to track your exploration sessions.
        </p>
      </motion.div>
    </div>
  );
}
