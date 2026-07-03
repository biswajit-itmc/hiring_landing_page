import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OyeNaukri — Strategic Workforce Planning & Hiring Platform" },
      {
        name: "description",
        content:
          "Empower your hiring team with data-driven tools to attract, assess, and retain top talent efficiently.",
      },
      { property: "og:title", content: "OyeNaukri — Hiring Platform" },
      {
        property: "og:description",
        content: "Streamline your hiring workflow from start to finish.",
      },
    ],
  }),
  component: Landing,
});

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="grid size-7 place-items-center rounded-md bg-brand text-brand-foreground">
        <Sparkles className="size-4" strokeWidth={2.5} />
      </div>
      <span className="font-display text-lg font-bold">OyeNaukri</span>
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-4 z-50 mx-auto flex w-[min(1100px,94%)] items-center justify-between rounded-full border border-border bg-card/80 px-5 py-2.5 shadow-sm backdrop-blur">
      <Logo />
      <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
        <a href="#home" className="font-medium text-foreground">Home</a>
        <a href="#features" className="hover:text-foreground">Features</a>
        <a href="#pricing" className="hover:text-foreground">Pricing</a>
        <a href="#blog" className="hover:text-foreground">Blog</a>
        <a href="#testimonials" className="hover:text-foreground">Testimonials</a>
      </nav>
      <a
        href="#login"
        className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
      >
        Log in
      </a>
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
      className={`flex items-center gap-3 rounded-2xl border border-border px-3 py-2 shadow-sm backdrop-blur ${
        dark ? "bg-foreground text-background" : "bg-card/90"
      } ${align === "right" ? "flex-row-reverse text-right" : ""}`}
    >
      <div className="size-9 shrink-0 rounded-full bg-muted" />
      <div className="text-xs">
        <div className="font-semibold">{name}</div>
        <div className={dark ? "text-background/60" : "text-muted-foreground"}>{role}</div>
        {date && <div className={`mt-0.5 ${dark ? "text-background/40" : "text-muted-foreground/70"}`}>{date}</div>}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative mx-auto mt-10 w-[min(1200px,94%)] overflow-hidden rounded-[2rem] border border-border bg-card px-6 pb-20 pt-14 md:px-12">
      {/* Radial green glow */}
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand/25 blur-3xl" />

      {/* Floating cards */}
      <div className="absolute left-4 top-20 hidden md:block">
        <PersonCard name="Martin Angelica M" role="Product Designer" date="Starting Mar 11, 2026" />
      </div>
      <div className="absolute right-4 top-20 hidden md:block">
        <PersonCard name="Marisa Alexandra" role="Project Manager" date="Mar 12, 2026" align="right" />
      </div>
      <div className="absolute left-2 top-[280px] hidden md:block">
        <PersonCard name="Vinco Marcanus" role="Human Resources" dark />
      </div>
      <div className="absolute right-2 top-[300px] hidden md:block">
        <PersonCard name="Robert Williamson" role="Product Owner" align="right" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <h1 className="text-balance font-display text-5xl font-bold leading-[1.05] md:text-6xl">
          Find Your <br />
          Strategic <span className="relative inline-block align-middle">
            <span className="inline-block rounded-xl bg-brand-dark px-3 py-1 text-2xl text-background shadow-lg md:text-3xl">
              <span className="block leading-tight">Senior Product</span>
              <span className="block leading-tight">Designer</span>
              <span className="mt-1 block text-[10px] font-normal text-background/70">$8,000/Month</span>
            </span>
          </span>{" "}
          Workforce <br />
          <span className="text-muted-foreground/60">Planning</span> Partners <br />
          From Today
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground">
          Empower your hiring team with data-driven tools to attract, assess, and retain top talent efficiently.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#start" className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-md hover:brightness-95">
            Get Started <ArrowRight className="size-4" />
          </a>
          <a href="#demo" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:opacity-90">
            <Play className="size-4 fill-current" /> Watch Demo
          </a>
        </div>
      </div>
    </section>
  );
}

function Logos() {
  const items = ["ACK", "miro", "stripe", "Google", "Adobe", "Spotify"];
  return (
    <section className="mx-auto mt-12 w-[min(1100px,94%)]">
      <div className="flex flex-wrap items-center justify-around gap-x-10 gap-y-4 opacity-60">
        {items.map((i) => (
          <span key={i} className="font-display text-2xl font-semibold text-muted-foreground">
            {i}
          </span>
        ))}
      </div>
    </section>
  );
}

function CornerBracket({ className = "" }: { className?: string }) {
  return <span className={`absolute size-3 border-brand ${className}`} />;
}

function StatCard({ value, label, desc }: { value: string; label: string; desc: string }) {
  return (
    <div className="relative rounded-xl border border-dashed border-brand/50 bg-brand/5 p-6">
      <CornerBracket className="left-0 top-0 border-l-2 border-t-2" />
      <CornerBracket className="right-0 top-0 border-r-2 border-t-2" />
      <CornerBracket className="bottom-0 left-0 border-b-2 border-l-2" />
      <CornerBracket className="bottom-0 right-0 border-b-2 border-r-2" />
      <div className="font-display text-3xl font-bold">
        {value} <span className="text-muted-foreground">{label}</span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function About() {
  return (
    <section className="mx-auto mt-24 grid w-[min(1100px,94%)] gap-12 md:grid-cols-2">
      <div>
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
      </div>
      <div className="space-y-5">
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
      </div>
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
    dark: "bg-brand-dark text-background",
    mid: "bg-brand/30",
    light: "bg-brand/10",
  }[variant];
  return (
    <div className={`flex flex-col gap-4 rounded-2xl p-6 ${styles}`}>
      <h3 className="font-display text-xl font-bold">{title}</h3>
      <p className={`text-sm ${variant === "dark" ? "text-background/70" : "text-muted-foreground"}`}>{desc}</p>
      <div className="mt-auto flex min-h-44 items-center justify-center">{children}</div>
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="mx-auto mt-24 w-[min(1200px,94%)] rounded-[2rem] bg-muted p-8 md:p-12">
      <div className="text-center">
        <div className="text-xs font-semibold tracking-wide text-brand-dark">// Our Features //</div>
        <h2 className="mt-3 font-display text-4xl font-bold">
          Streamline Your Hiring Workflow <br /> From Start To Finish
        </h2>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <FeatureCard
          variant="dark"
          title="Easy To Post Hiring"
          desc="Create and publish job listings in minutes. Helps you reach the right talent."
        >
          <div className="w-full rounded-xl bg-background/10 p-4 backdrop-blur">
            <div className="text-xs text-background/60">Senior Product</div>
            <div className="font-semibold">Manager</div>
            <div className="mt-3 flex gap-2 text-[10px]">
              <span className="rounded-full bg-brand px-2 py-0.5 text-brand-foreground">Full Time</span>
              <span className="rounded-full bg-background/10 px-2 py-0.5">Senior Level</span>
            </div>
            <div className="mt-3 font-display text-lg font-bold">$8,000/Month</div>
          </div>
        </FeatureCard>
        <FeatureCard
          variant="mid"
          title="Manage Candidates"
          desc="Track, review, and organize. Gain full visibility into every stage of the pipeline."
        >
          <div className="w-full space-y-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg bg-card px-3 py-2 shadow-sm">
                <div className="size-7 rounded-full bg-muted" />
                <div className="flex-1">
                  <div className="h-2 w-20 rounded bg-muted" />
                  <div className="mt-1 h-1.5 w-32 rounded bg-muted/60" />
                </div>
              </div>
            ))}
          </div>
        </FeatureCard>
        <FeatureCard
          variant="light"
          title="Chat With Applicants"
          desc="Communicate instantly with candidates, move talent forward all in one place."
        >
          <div className="w-full">
            <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-brand-dark px-3 py-2 text-xs text-background">
              Congrats! you have been accepted to the next stage 🎉
            </div>
            <div className="mt-3 flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="size-8 rounded-full border-2 border-card bg-muted-foreground/30" />
              ))}
            </div>
          </div>
        </FeatureCard>
      </div>
    </section>
  );
}

function Integrations() {
  const icons = [
    { Icon: Video, color: "bg-blue-500" },
    { Icon: Linkedin, color: "bg-blue-600" },
    { Icon: MessageCircle, color: "bg-green-500" },
    { Icon: Calendar, color: "bg-purple-500" },
    { Icon: Users, color: "bg-violet-500" },
    { Icon: Cloud, color: "bg-sky-400" },
  ];
  return (
    <section className="mx-auto mt-24 w-[min(1100px,94%)] text-center">
      <div className="relative mx-auto h-56 max-w-3xl">
        <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
        <div className="absolute left-1/2 top-1/2 size-[460px] -translate-x-1/2 -translate-y-full rounded-full border border-dashed border-border" />
        {icons.map(({ Icon, color }, i) => {
          const angle = (Math.PI * i) / (icons.length - 1);
          const x = 50 - 45 * Math.cos(angle);
          const y = 100 - 90 * Math.sin(angle);
          return (
            <div
              key={i}
              className={`absolute grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-white shadow-lg ${color}`}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <Icon className="size-5" />
            </div>
          );
        })}
        <div className="absolute left-1/2 top-full grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-brand text-brand-foreground shadow-xl">
          <Sparkles className="size-7" />
        </div>
      </div>
      <h2 className="mt-10 font-display text-4xl font-bold">
        Connect With The <br />
        Tools <span className="text-muted-foreground">You Already Use Daily</span>
      </h2>
      <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
        Effortlessly integrate with your favorite platforms with all in one unified hiring experience.
      </p>
      <a href="#start" className="mt-6 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground">
        Get Started
      </a>
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
    <div className={`rounded-2xl border border-border p-6 ${highlighted ? "bg-brand-dark text-background" : "bg-card"}`}>
      <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${highlighted ? "bg-background/10" : "bg-brand/15 text-brand-dark"}`}>
        <span className="size-1.5 rounded-full bg-brand" /> {name}
      </div>
      <div className="mt-4 font-display text-3xl font-bold">
        {price} <span className={`text-base font-normal ${highlighted ? "text-background/60" : "text-muted-foreground"}`}>/Month</span>
      </div>
      <p className={`mt-2 text-sm ${highlighted ? "text-background/60" : "text-muted-foreground"}`}>{desc}</p>
      <button className={`mt-5 w-full rounded-full py-2.5 text-sm font-semibold ${highlighted ? "bg-brand text-brand-foreground" : "bg-foreground text-background"}`}>
        Sign Up Now
      </button>
      <ul className="mt-5 space-y-2.5 text-sm">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <Check className={`size-4 ${highlighted ? "text-brand" : "text-brand-dark"}`} />
            <span className={highlighted ? "text-background/85" : ""}>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="mx-auto mt-24 w-[min(1100px,94%)]">
      <div className="text-center">
        <div className="text-xs font-semibold tracking-wide text-brand-dark">// Our Pricing //</div>
        <h2 className="mt-3 font-display text-4xl font-bold">
          Flexible Plans That Scale <br />
          With <span className="text-muted-foreground">Your Hiring Goals</span>
        </h2>
      </div>
      <div className="mx-auto mt-10 grid max-w-3xl gap-5 md:grid-cols-2">
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
      </div>

      <div className="mt-8 grid items-center gap-6 rounded-2xl bg-brand/15 p-6 md:grid-cols-[1fr_auto]">
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
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    {
      title: "Navigation",
      links: ["Home", "Pricing", "Use Cases", "Security", "Testimonials"],
    },
    {
      title: "Features",
      links: ["Hiring Post", "Manage Candidates", "Communication", "Integrations", "Others"],
    },
    { title: "Support", links: ["FAQ", "Articles", "Community", "Help Center"] },
  ];
  return (
    <footer className="mx-auto mt-24 w-[min(1100px,94%)] pb-10">
      <div className="grid gap-10 border-t border-border pt-12 md:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            3131 Rosemoore St, Richardson, California United States Of America 92889
          </p>
          <form className="mt-5 flex max-w-xs items-center gap-2 rounded-full border border-border bg-card p-1 pl-4">
            <Briefcase className="size-4 text-muted-foreground" />
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button className="rounded-full bg-brand px-4 py-1.5 text-sm font-semibold text-brand-foreground">
              Subscribe
            </button>
          </form>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-sm font-semibold">{c.title}</div>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {c.links.map((l) => (
                <li key={l}><a href="#" className="hover:text-foreground">{l}</a></li>
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

function Landing() {
  return (
    <main className="min-h-screen bg-background pt-4">
      <Nav />
      <Hero />
      <Logos />
      <About />
      <Features />
      <Integrations />
      <Pricing />
      <Footer />
    </main>
  );
}
