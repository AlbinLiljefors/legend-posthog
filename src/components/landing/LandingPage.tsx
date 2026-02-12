import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Layers, GitBranch, Zap, ChevronDown, Network, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "./HeroBackground";
import { TrustSection } from "./TrustSection";

export function LandingPage() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  const handleExplore = () => {
    navigate("/signin");
  };

  return (
    <div ref={containerRef} className="relative bg-background">
      {/* Top bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg">
            <Layers className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">Legend</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleExplore}
          className="text-muted-foreground hover:text-foreground"
        >
          Sign in
        </Button>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background pointer-events-none" />

        <motion.div
          className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border/50 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-[#F54E00] animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">PostHog codebase — fully mapped</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]"
          >
            Explore PostHog's
            <br />
            <span className="text-primary">architecture, visually</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Interactive architecture diagrams of the PostHog codebase.
            See how Django, React, ClickHouse, Celery, and 50+ modules connect — from system level down to individual files.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={handleExplore}
              className="gap-2.5 text-base px-8 h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Network className="w-5 h-5" />
              Explore the map
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <TrustSection />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6 text-muted-foreground/50" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* What's mapped Section */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" />

        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What's inside
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The full PostHog monorepo — analyzed and visualized across four zoom levels
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              index={0}
              icon={<Layers className="w-6 h-6" />}
              title="8 system groups"
              description="Django backend, React frontend, Node.js event engine, Celery workers, Temporal, Rust services, Go livestream, and infrastructure."
            />
            <FeatureCard
              index={1}
              icon={<Workflow className="w-6 h-6" />}
              title="4 zoom levels"
              description="Context → System → Module → File. Start with the big picture and drill down to individual files and their connections."
            />
            <FeatureCard
              index={2}
              icon={<Zap className="w-6 h-6" />}
              title="Imports, calls & data flows"
              description="Toggle between edge types to trace how data moves through the event pipeline, from ingestion to ClickHouse to the dashboard."
            />
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <ValueProp
            index={0}
            icon={<Workflow className="w-8 h-8" />}
            title="See how PostHog fits together"
            description="From the Django API to the React frontend, from the plugin server to ClickHouse — see every dependency and data flow at a glance."
            features={["System → Module → File zoom", "Color-coded by component type", "Animated data flow edges"]}
            imageSrc="/Module_level.jpg"
          />

          <ValueProp
            index={1}
            icon={<GitBranch className="w-8 h-8" />}
            title="Drill into any module"
            description="Click any node to see its technical specs, implementation details, and connections. Understand how the event pipeline, feature flags, or session recording actually work."
            features={["Technical specifications per module", "Input/output connections", "Architecture descriptions"]}
            reversed
            imageSrc="/Info_page.jpg"
          />

          <ValueProp
            index={2}
            icon={<Zap className="w-8 h-8" />}
            title="Focus on what you're working on"
            description="Use focus mode to highlight a module and its neighbors. Filter by edge type to see only imports, data flows, or function calls — cut through the noise."
            features={["Edge type filtering", "Focus mode with adjustable depth", "Search across all modules"]}
            imageSrc="/File_level.jpg"
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center relative"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to explore?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            See the PostHog architecture like never before. Takes 10 seconds to get started.
          </p>
          <Button
            size="lg"
            onClick={handleExplore}
            className="gap-2.5 text-base px-10 h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Network className="w-5 h-5" />
            Explore the map
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Layers className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-medium text-foreground">Legend</span>
          </div>
          <p>© 2026 Legend. Built for developers who ship.</p>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  index: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ index, icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

interface ValuePropProps {
  index: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  reversed?: boolean;
  imageSrc?: string;
}

function ValueProp({ index, icon, title, description, features, reversed, imageSrc }: ValuePropProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-32 last:mb-0"
    >
      <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-16`}>
        <div className="flex-1">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
            {icon}
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">{title}</h3>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">{description}</p>
          <ul className="space-y-3">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 w-full">
          <div className="aspect-[4/3] rounded-2xl border border-border/50 shadow-lg overflow-hidden">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={title}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-secondary via-secondary/80 to-secondary/50 flex items-center justify-center">
                <div className="text-muted-foreground/40 text-sm">Preview</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
