import styles from "./page.module.css";
import { UploadPanel } from "@/components/upload-panel";

const features = [
  {
    title: "Fast first release",
    description:
      "The skeleton already separates UI, API, and content so you can wire a real segmentation provider without reshaping the site later.",
  },
  {
    title: "SEO-ready landing page",
    description:
      "The homepage copy is built around image background remover intent instead of a generic SaaS shell.",
  },
  {
    title: "Conversion-first layout",
    description:
      "Users land, upload, preview, and download from one page with minimal friction and clear trust signals.",
  },
];

const steps = [
  "Upload a JPG, PNG, or WEBP image.",
  "Send the file to your background removal API.",
  "Return a transparent PNG and surface download immediately.",
];

const faqs = [
  {
    question: "What does this website skeleton include?",
    answer:
      "It includes a homepage, upload interaction, placeholder API route, responsive layout, and product copy aligned to the image background remover use case.",
  },
  {
    question: "Does the current version remove backgrounds already?",
    answer:
      "Not yet. The frontend is wired to a stub API route so you can connect remove.bg, Clipdrop, or your own model service next.",
  },
  {
    question: "Why start with a single landing page?",
    answer:
      "For this type of tool, the shortest path to value is a focused SEO landing page with one clear job: upload image, remove background, download result.",
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <a className={styles.brand} href="#top">
          CutoutLab
        </a>
        <nav className={styles.nav}>
          <a href="#features">Features</a>
          <a href="#workflow">Workflow</a>
          <a href="#faq">FAQ</a>
        </nav>
      </header>

      <section className={styles.hero} id="top">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Image Background Remover</p>
          <h1>Remove image backgrounds with a homepage built to convert.</h1>
          <p className={styles.lead}>
            This first-pass website skeleton gives you the structure for a fast,
            SEO-friendly background remover tool: upload on the first screen,
            visible preview states, and a clean handoff to your future API.
          </p>

          <div className={styles.heroMeta}>
            <span>Single-tool landing page</span>
            <span>Responsive by default</span>
            <span>Ready for API wiring</span>
          </div>
        </div>

        <UploadPanel />
      </section>

      <section className={styles.featureSection} id="features">
        <div className={styles.sectionHeading}>
          <p className={styles.sectionLabel}>Why this structure</p>
          <h2>Built for the first version you can actually ship.</h2>
        </div>
        <div className={styles.featureGrid}>
          {features.map((feature) => (
            <article className={styles.featureCard} key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.workflowSection} id="workflow">
        <div className={styles.sectionHeading}>
          <p className={styles.sectionLabel}>Workflow</p>
          <h2>Simple user flow, clear technical boundary.</h2>
        </div>
        <div className={styles.workflowGrid}>
          {steps.map((step, index) => (
            <article className={styles.stepCard} key={step}>
              <span className={styles.stepNumber}>0{index + 1}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.faqSection} id="faq">
        <div className={styles.sectionHeading}>
          <p className={styles.sectionLabel}>FAQ</p>
          <h2>Questions you will want answered on day one.</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <article className={styles.faqCard} key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <p>CutoutLab skeleton for the image background remover use case.</p>
        <p>Next step: connect a real background removal provider to the API route.</p>
      </footer>
    </main>
  );
}
