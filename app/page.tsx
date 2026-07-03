"use client";

import {
  Check,
  Play,
  ArrowRight,
  Briefcase,
  Users,
  MessageCircle,
  Video,
  Linkedin,
  Calendar,
  Cloud,
  Sparkles,
} from "lucide-react";
import { FooterVideo } from "./footer-video";
import { Hero3DScene } from "@/components/three/hero-scene";
import { OrbitingIntegrations } from "@/components/three/orbiting-integrations";
import { Reveal, Parallax, staggerContainer } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { motion } from "framer-motion";
import { useRef } from "react";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="grid size-7 place-items-center rounded-md bg-brand text-brand-foreground shadow-[0_0_18px_rgba(46,230,166,0.6)]">
        <Sparkles className="size-4" strokeWidth={2.5} />
      </div>
      <span className="font-display text-lg font-bold">OyeNaukri</span>
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-4 z-50 mx-auto flex w-[min(1100px,94%)] items-center justify-between rounded-full border border-border bg-card/70 px-5 py-2.5 shadow-lg shadow-brand/5 backdrop-blur-xl">
      <Logo />
      <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
        <a href="#home" className="font-medium text-foreground">Home</a>
        <a href="#features" className="hover:text-foreground transition-colors">Features</a>
        <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        <a href="#blog" className="hover:text-foreground transition-colors">Blog</a>
        <a href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</a>
      </nav>
      <div className="flex items-center gap-3">
        <a
          href="/login"
          className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline"
        >
          Log in
        </a>
        <a
          href="/signup"
          className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.03] active:scale-95"
        >
          Get Started
        </a>
      </div>
    </header>
  );
}

function PersonCard({
  name,
  role,
  date,
  align = "left",
  dark = false,
}: {
  name: string;
  role: string;
  date?: string;
  align?: "left" | "right";
  dark?: boolean;
}) {
  return (
    <div
      style={{ transform: "translateZ(60px)" }}
      className={`flex items-center gap-3 rounded-2xl border border-border px-3 py-2 shadow-xl backdrop-blur ${
        dark ? "bg-foreground text-background" : "bg-card/90"
      } ${align === "right" ? "flex-row-reverse text-right" : ""}`}
    >
      <div className="size-9 shrink-0 rounded-full bg-gradient-to-br from-brand/70 to-muted" />
      <div className="text-xs">
        <div className="font-semibold">{name}</div>
        <div className={dark ? "text-background/60" : "text-muted-foreground"}>{role}</div>
        {date && <div className={`mt-0.5 ${dark ? "text-background/40" : "text-muted-foreground/70"}`}>{date}</div>}
      </div>
    </div>
  );
}

function Hero() {
  const words = ["Find", "Your", "Strategic", "Workforce", "Planning", "Partners", "Today"];
  return (
    <section id="home" className="relative mx-auto mt-10 w-[min(1200px,94%)] overflow-hidden rounded-[2rem] border border-border bg-gradient-to-b from-[#04130c] via-[#06201460] to-card px-6 pb-28 pt-16 md:px-12">
      {/* grid floor */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(rgba(124,255,178,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(124,255,178,0.07)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      {/* glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-brand/25 blur-[120px]" />

      {/* 3D scene */}
      <Hero3DScene className="pointer-events-auto absolute inset-0 z-0" />

      {/* Floating person cards */}
      <Parallax amount={-30} className="absolute left-4 top-24 hidden md:block">
        <PersonCard name="Martin Angelica M" role="Product Designer" date="Starting Mar 11, 2026" />
      </Parallax>
      <Parallax amount={30} className="absolute right-4 top-24 hidden md:block">
        <PersonCard name="Marisa Alexandra" role="Project Manager" date="Mar 12, 2026" align="right" />
      </Parallax>
      <Parallax amount={-18} className="absolute left-2 top-[300px] hidden md:block">
        <PersonCard name="Vinco Marcanus" role="Human Resources" dark />
      </Parallax>
      <Parallax amount={18} className="absolute right-2 top-[320px] hidden md:block">
        <PersonCard name="Robert Williamson" role="Product Owner" align="right" />
      </Parallax>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-wrap justify-center gap-x-3 gap-y-1 font-display text-5xl font-bold leading-[1.05] md:text-6xl"
        >
          {words.map((w, i) =>
            w === "Strategic" ? (
              <motion.span
                key={w}
                variants={{
                  hidden: { opacity: 0, y: 20, rotateX: -60 },
                  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative inline-block align-middle"
              >
                <span className="inline-block rounded-xl bg-gradient-to-br from-brand to-brand-dark px-4 py-1 text-2xl text-background shadow-[0_18px_40px_-12px_rgba(46,230,166,0.7)] md:text-3xl">
                  <span className="block leading-tight">Senior Product</span>
                  <span className="block leading-tight">Designer</span>
                  <span className="mt-1 block text-[10px] font-normal text-background/80">$8,000/Month</span>
                </span>
              </motion.span>
            ) : (
              <motion.span
                key={w}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                }}
                className={i === 5 || i === 6 ? "text-muted-foreground/70" : ""}
              >
                {w}
              </motion.span>
            )
          )}
        </motion.div>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground">
            Empower your hiring team with data-driven tools to attract, assess, and retain top talent efficiently.
          </p>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#start" className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-[0_12px_30px_-8px_rgba(46,230,166,0.6)] transition-transform hover:scale-[1.04]">
              Get Started <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#demo" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold backdrop-blur transition-colors hover:bg-card">
              <Play className="size-4 fill-current" /> Watch Demo
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MarqueeRow({ items }: { items: string[] }) {
  const ref = useRef(null);
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <motion.div
        ref={ref}
        className="flex w-max gap-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items].map((i, idx) => (
          <span key={idx} className="font-display text-2xl font-semibold text-muted-foreground/70">
            {i}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Logos() {
  const items = ["ACK", "miro", "stripe", "Google", "Adobe", "Spotify"];
  return (
    <section className="mx-auto mt-14 w-[min(1100px,94%)]">
      <MarqueeRow items={items} />
    </section>
  );
}

function CornerBracket({ className = "" }: { className?: string }) {
  return <span className={`absolute size-3 border-brand ${className}`} />;
}

function StatCard({ value, label, desc }: { value: string; label: string; desc: string }) {
  return (
    <TiltCard intensity={8} className="relative rounded-xl border border-dashed border-brand/50 bg-brand/5 p-6">
      <CornerBracket className="left-0 top-0 border-l-2 border-t-2" />
      <CornerBracket className="right-0 top-0 border-r-2 border-t-2" />
      <CornerBracket className="bottom-0 left-0 border-b-2 border-l-2" />
      <CornerBracket className="bottom-0 right-0 border-b-2 border-r-2" />
      <div className="font-display text-3xl font-bold [transform:translateZ(30px)]">
        {value} <span className="text-muted-foreground">{label}</span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
    </TiltCard>
  );
}

function About() {
  return (
    <section className="mx-auto mt-28 grid w-[min(1100px,94%)] gap-12 md:grid-cols-2">
      <Reveal>
        <div className="text-xs font-semibold tracking-wide text-brand-dark">// About Our Platform //</div>
        <h2 className="mt-3 font-display text-4xl font-bold leading-tight">
          Transform Your Hiring <br />
          Process With <span className="text-muted-foreground">Smarter, Faster,</span>{" "}
          <span className="text-muted-foreground">Data-Driven Technology</span>
        </h2>
        <p className="mt-10 max-w-md text-sm text-muted-foreground">
          From sourcing to onboarding, our platform streamlines every step. Hire confidently with tools built to reduce bias and boost efficiency.
        </p>
        <a href="#about" className="mt-6 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground">
          About Us
        </a>
      </Reveal>
      <Reveal delay={0.15} className="space-y-5">
        <StatCard
          value="120k"
          label="Users"
          desc="Recruiters and hiring managers trust our tools to simplify decision-making and reduce time-to-hire."
        />
        <StatCard
          value="120+"
          label="Companies"
          desc="Join forward-thinking companies building better teams through structured, data-driven recruitment."
        />
      </Reveal>
    </section>
  );
}

function FeatureCard({
  title,
  desc,
  variant,
  children,
}: {
  title: string;
  desc: string;
  variant: "dark" | "mid" | "light";
  children?: React.ReactNode;
}) {
  const styles = {
    dark: "bg-gradient-to-br from-brand-dark to-[#03150e] text-background",
    mid: "bg-brand/30",
    light: "bg-brand/10",
  }[variant];
  return (
    <TiltCard intensity={10} className={`group flex h-full flex-col gap-4 rounded-2xl p-6 ${styles}`}>
      <h3 className="font-display text-xl font-bold [transform:translateZ(40px)]">{title}</h3>
      <p className={`text-sm [transform:translateZ(20px)] ${variant === "dark" ? "text-background/70" : "text-muted-foreground"}`}>{desc}</p>
      <div className="mt-auto flex min-h-44 items-center justify-center [transform:translateZ(35px)]">{children}</div>
    </TiltCard>
  );
}

function Features() {
  return (
    <section id="features" className="mx-auto mt-28 w-[min(1200px,94%)] rounded-[2rem] bg-gradient-to-b from-muted to-card p-8 md:p-12">
      <Reveal className="text-center">
        <div className="text-xs font-semibold tracking-wide text-brand-dark">// Our Features //</div>
        <h2 className="mt-3 font-display text-4xl font-bold">
          Streamline Your Hiring Workflow <br /> From Start To Finish
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <Reveal>
          <FeatureCard
            variant="dark"
            title="Easy To Post Hiring"
            desc="Create and publish job listings in minutes. Helps you reach the right talent."
          >
            <div className="w-full rounded-xl bg-background/10 p-4 backdrop-blur ring-1 ring-white/10">
              <div className="text-xs text-background/60">Senior Product</div>
              <div className="font-semibold">Manager</div>
              <div className="mt-3 flex gap-2 text-[10px]">
                <span className="rounded-full bg-brand px-2 py-0.5 text-brand-foreground">Full Time</span>
                <span className="rounded-full bg-background/10 px-2 py-0.5">Senior Level</span>
              </div>
              <div className="mt-3 font-display text-lg font-bold">$8,000/Month</div>
            </div>
          </FeatureCard>
        </Reveal>
        <Reveal delay={0.12}>
          <FeatureCard
            variant="mid"
            title="Manage Candidates"
            desc="Track, review, and organize. Gain full visibility into every stage of the pipeline."
          >
            <div className="w-full space-y-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-center gap-2 rounded-lg bg-card px-3 py-2 shadow-sm"
                >
                  <div className="size-7 rounded-full bg-muted" />
                  <div className="flex-1">
                    <div className="h-2 w-20 rounded bg-muted" />
                    <div className="mt-1 h-1.5 w-32 rounded bg-muted/60" />
                  </div>
                </motion.div>
              ))}
            </div>
          </FeatureCard>
        </Reveal>
        <Reveal delay={0.24}>
          <FeatureCard
            variant="light"
            title="Chat With Applicants"
            desc="Communicate instantly with candidates, move talent forward all in one place."
          >
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-brand-dark px-3 py-2 text-xs text-background"
              >
                Congrats! you have been accepted to the next stage 🎉
              </motion.div>
              <div className="mt-3 flex -space-x-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="size-8 rounded-full border-2 border-card bg-muted-foreground/30" />
                ))}
              </div>
            </div>
          </FeatureCard>
        </Reveal>
      </div>
    </section>
  );
}

function Integrations() {
  return (
    <section className="mx-auto mt-28 w-[min(1100px,94%)] text-center">
      <Reveal className="relative mx-auto h-72 max-w-3xl md:h-80">
        <OrbitingIntegrations className="absolute inset-0" />
      </Reveal>
      <Reveal>
        <h2 className="mt-10 font-display text-4xl font-bold">
          Connect With The <br />
          Tools <span className="text-muted-foreground">You Already Use Daily</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          Effortlessly integrate with your favorite platforms with all in one unified hiring experience.
        </p>
        <a href="#start" className="mt-6 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-transform hover:scale-[1.04]">
          Get Started
        </a>
      </Reveal>
    </section>
  );
}

function PricingCard({
  name,
  price,
  desc,
  features,
  highlighted,
}: {
  name: string;
  price: string;
  desc: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <TiltCard
      intensity={highlighted ? 8 : 6}
      className={`h-full rounded-2xl border border-border p-6 ${highlighted ? "bg-gradient-to-br from-brand-dark to-[#03150e] text-background shadow-[0_30px_60px_-20px_rgba(46,230,166,0.5)]" : "bg-card"}`}
    >
      <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${highlighted ? "bg-background/10" : "bg-brand/15 text-brand-dark"}`}>
        <span className="size-1.5 rounded-full bg-brand" /> {name}
      </div>
      <div className="mt-4 font-display text-3xl font-bold [transform:translateZ(30px)]">
        {price} <span className={`text-base font-normal ${highlighted ? "text-background/60" : "text-muted-foreground"}`}>/Month</span>
      </div>
      <p className={`mt-2 text-sm ${highlighted ? "text-background/60" : "text-muted-foreground"}`}>{desc}</p>
      <button className={`mt-5 w-full rounded-full py-2.5 text-sm font-semibold transition-transform hover:scale-[1.03] ${highlighted ? "bg-brand text-brand-foreground" : "bg-foreground text-background"}`}>
        Sign Up Now
      </button>
      <ul className="mt-5 space-y-2.5 text-sm">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 [transform:translateZ(15px)]">
            <Check className={`size-4 ${highlighted ? "text-brand" : "text-brand-dark"}`} />
            <span className={highlighted ? "text-background/85" : ""}>{f}</span>
          </li>
        ))}
      </ul>
    </TiltCard>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="mx-auto mt-28 w-[min(1100px,94%)]">
      <Reveal className="text-center">
        <div className="text-xs font-semibold tracking-wide text-brand-dark">// Our Pricing //</div>
        <h2 className="mt-3 font-display text-4xl font-bold">
          Flexible Plans That Scale <br />
          With <span className="text-muted-foreground">Your Hiring Goals</span>
        </h2>
      </Reveal>
      <div className="mx-auto mt-10 grid max-w-3xl gap-5 md:grid-cols-2">
        <Reveal>
          <PricingCard
            name="Starting Plan"
            price="$250 USD"
            desc="For small teams who want to streamline their hiring with essential tools & simple automation."
            features={[
              "Unlimited job postings",
              "Basic candidate tracking",
              "Integrated calendar sync",
              "In-app messaging",
              "Email support",
            ]}
          />
        </Reveal>
        <Reveal delay={0.15}>
          <PricingCard
            highlighted
            name="Enterprise Plan"
            price="$1,000 USD"
            desc="Growing organizations needing full control, advanced analytics, seamless collaboration."
            features={[
              "Everything in Starting Plan",
              "Custom workflow builder",
              "Advanced reporting dashboard",
              "Priority support & onboarding",
              "Integration with HRIS & ATS",
            ]}
          />
        </Reveal>
      </div>

      <Reveal className="mt-8 grid items-center gap-6 rounded-2xl bg-gradient-to-br from-brand/15 to-brand-dark/10 p-6 md:grid-cols-[1fr_auto]">
        <div>
          <h3 className="font-display text-xl font-bold">
            Simplify Your Recruitment <br />
            And <span className="text-muted-foreground">Maximize Results</span>
          </h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Streamline your entire hiring process with intelligent tools designed to help you make better decisions.
          </p>
          <a href="#start" className="mt-4 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground">
            Get Started
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <PersonCard name="Maria Angelica M" role="Graphic Designer" />
          <div className="rounded-2xl bg-brand-dark p-2">
            <PersonCard name="Robert Williamson" role="Product Manager" dark />
          </div>
          <PersonCard name="Marcus Alexander" role="Project Designer" />
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  const cols = [
    { title: "Navigation", links: ["Home", "Pricing", "Use Cases", "Security", "Testimonials"] },
    { title: "Features", links: ["Hiring Post", "Manage Candidates", "Communication", "Integrations", "Others"] },
    { title: "Support", links: ["FAQ", "Articles", "Community", "Help Center"] },
  ];
  return (
    <footer className="mx-auto mt-28 w-[min(1100px,94%)] pb-10">
      <div className="grid gap-10 border-t border-border pt-12 md:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            3131 Rosemoor St, Richardson, California United States Of America 92889
          </p>
          <form className="mt-5 flex max-w-xs items-center gap-2 rounded-full border border-border bg-card p-1 pl-4">
            <Briefcase className="size-4 text-muted-foreground" />
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button type="button" className="rounded-full bg-brand px-4 py-1.5 text-sm font-semibold text-brand-foreground">
              Subscribe
            </button>
          </form>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-sm font-semibold">{c.title}</div>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {c.links.map((l) => (
                <li key={l}><a href="#" className="hover:text-foreground transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 border-t border-border pt-5 text-center text-xs text-muted-foreground">
        ©2026 OyeNaukri, All Right Reserved | Terms of Use
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background pt-4">
      <div className="pointer-events-none fixed inset-0 -z-20 [background:radial-gradient(900px_500px_at_50%_-5%,rgba(46,230,166,0.10),transparent_60%)]" />
      <Nav />
      <Hero />
      <Logos />
      <About />
      <Features />
      <Integrations />
      <Pricing />
      <FooterVideo />
      <Footer />
    </main>
  );
}