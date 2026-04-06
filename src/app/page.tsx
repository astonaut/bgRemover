import styles from "./page.module.css";
import { UploadPanel } from "@/components/upload-panel";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { ScrollReveal } from "@/components/scroll-reveal";

const features = [
  {
    icon: "AI",
    title: "Instant results",
    description:
      "Upload any JPG, PNG, or WEBP and get a clean transparent background in seconds with a single, focused workflow.",
  },
  {
    icon: "EDGE",
    title: "Pixel-perfect edges",
    description:
      "The product is designed for fine details like hair, fur, and complex object boundaries once the live provider is connected.",
  },
  {
    icon: "PNG",
    title: "One-click download",
    description:
      "Preview the result side-by-side with your original, then download the transparent PNG immediately.",
  },
];

const steps = [
  {
    number: "01",
    title: "Upload",
    text: "Drag and drop or click to select your image.",
  },
  {
    number: "02",
    title: "Process",
    text: "The demo route validates your upload in memory while the live removal provider is still being wired.",
  },
  {
    number: "03",
    title: "Download",
    text: "Return a transparent PNG as soon as the background removal provider is connected.",
  },
];

const faqs = [
  {
    question: "What image formats are supported?",
    answer:
      "We support JPG, PNG, and WEBP formats up to 10 MB. The intended output format is a transparent PNG.",
  },
  {
    question: "How are uploads handled in this demo?",
    answer:
      "The current demo route validates uploaded files in request memory only and does not write them to local disk. If you later connect a third-party provider, update this copy to match that provider's storage policy.",
  },
  {
    question: "Can I use it for commercial purposes?",
    answer:
      "Yes. The goal of this site is to support product images, ecommerce assets, social posts, and other commercial use cases once the live cutout pipeline is connected.",
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <a className={styles.brand} href="#top" aria-label="CutoutLab home">
          <svg
            className={styles.logoIcon}
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="14"
              cy="14"
              r="13"
              stroke="var(--accent)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M9 10C9 10 11 14 14 14C17 14 19 10 19 10"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 17C10 19 12 20 14 20C16 20 18 19 20 17"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="10" cy="10" r="1.5" fill="var(--accent)" />
            <circle cx="18" cy="10" r="1.5" fill="var(--accent)" />
          </svg>
          <span>CutoutLab</span>
        </a>
        <nav className={styles.nav} aria-label="Main navigation">
          <a href="#examples">Examples</a>
          <a href="#features">Features</a>
          <a href="#workflow">How it works</a>
          <a href="#faq">FAQ</a>
        </nav>
      </header>

      <section className={styles.hero} id="top">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>AI Background Remover</p>
          <h1>
            Remove image backgrounds{" "}
            <span className={styles.accentHighlight}>in one click</span>.
          </h1>
          <p className={styles.lead}>
            Clean, transparent backgrounds for product photos, portraits, and
            more. The current demo already validates uploads transiently and is
            ready for a live cutout API.
          </p>
          <div className={styles.heroMeta}>
            <span>No signup required</span>
            <span>Transient upload handling</span>
            <span>Ready for provider wiring</span>
          </div>
        </div>

        <UploadPanel />
      </section>

      <ScrollReveal>
        <section className={styles.exampleSection} id="examples">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>See it in action</p>
            <h2>Before and after.</h2>
          </div>
          <div className={styles.sliderWrap}>
            <BeforeAfterSlider
              beforeSrc="/demo/demo-before.svg"
              afterSrc="/demo/demo-after.svg"
              alt="Background removal demo"
            />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.featureSection} id="features">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>Why CutoutLab</p>
            <h2>Built for speed and quality.</h2>
          </div>
          <div className={styles.featureGrid}>
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 100}>
                <article className={styles.featureCard}>
                  <span className={styles.featureIcon}>{feature.icon}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.workflowSection} id="workflow">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>How it works</p>
            <h2>Three steps. That&apos;s it.</h2>
          </div>
          <div className={styles.workflowTimeline}>
            {steps.map((step, index) => (
              <ScrollReveal key={step.number} delay={index * 120}>
                <article className={styles.stepCard}>
                  <span className={styles.stepNumber}>{step.number}</span>
                  <div className={styles.stepContent}>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={styles.stepConnector} aria-hidden="true">
                      <svg width="40" height="2" viewBox="0 0 40 2">
                        <line
                          x1="0"
                          y1="1"
                          x2="40"
                          y2="1"
                          stroke="var(--accent-soft)"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                        />
                      </svg>
                    </div>
                  )}
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.faqSection} id="faq">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>FAQ</p>
            <h2>Common questions.</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <ScrollReveal key={faq.question} delay={i * 80}>
                <details className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>
                    {faq.question}
                    <svg
                      className={styles.faqChevron}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 8L10 13L15 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </summary>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <footer className={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()} CutoutLab. AI-powered background
          removal.
        </p>
        <p>Built with Next.js</p>
      </footer>
    </main>
  );
}
