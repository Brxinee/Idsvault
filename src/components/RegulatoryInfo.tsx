import React, { useState } from "react";
import { CheckCircle2, ChevronDown, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SEO } from "./SEO";

type Segment =
  | "policy-terms"
  | "policy-privacy"
  | "policy-refund"
  | "policy-dispute"
  | "policy-risk-disclosure"
  | "policy-aml-kyc"
  | "policy-sanctions"
  | "policy-cookie-policy"
  | "policy-dmca"
  | "policy-grievance"
  | "policy-accessibility"
  | "policy-imprint"
  | "faq";

interface RegulatoryInfoProps {
  segment: Segment;
}

const policyContent: Record<string, { title: string; description: string; canonical: string; bullets: string[] }> = {
  "policy-terms": {
    title: "Global Terms of Service",
    description: "Broker-assisted transfer terms for global buyers and sellers, with India arbitration and jurisdictional addenda.",
    canonical: "/policy/terms",
    bullets: [
      "IDsvault operates as a private broker-assisted desk headquartered in Hyderabad, serving clients globally.",
      "Public listings are limited to Telegram usernames (Fragment-compatible), domains, Discord communities, and selected YouTube channel opportunities.",
      "Instagram and X engagements are advisory-only and require signed platform-risk acknowledgement before work begins.",
      "Deals above USD 5,000 must use licensed third-party escrow. IDsvault does not custody cross-border funds directly.",
      "Governing law is India, with arbitration in Hyderabad, and regional consumer-rights addenda where mandatory."
    ]
  },
  "policy-privacy": {
    title: "Global Privacy Policy",
    description: "Unified privacy policy aligned with GDPR, UK GDPR, CCPA/CPRA, DPDPA, and PIPEDA.",
    canonical: "/policy/privacy",
    bullets: [
      "We process personal data under contract necessity, consent, and legitimate interests depending on the workflow stage.",
      "Data rights include access, correction, deletion, portability, and objection. Requests are handled through our privacy contact desk.",
      "Cross-border transfers use contractual safeguards, including SCC-aligned language where applicable.",
      "We maintain vendor DPAs for core processors including hosting, payments, analytics, and communications.",
      "Regional notices for EU/UK, U.S. state privacy laws, Canada, and APAC are maintained in policy addenda."
    ]
  },
  "policy-refund": {
    title: "Global Refund Policy",
    description: "Refund logic for failed transfers and jurisdiction-specific withdrawal rights.",
    canonical: "/policy/refund",
    bullets: [
      "If transfer cannot be completed, buyer funds are returned according to escrow-provider timelines.",
      "Completed transfers are final once buyer confirms control and release is authorized.",
      "EU and UK buyers receive required withdrawal disclosures, including service-commencement waiver language before execution.",
      "All fees are disclosed before commitment, including escrow and conversion costs where applicable.",
      "Disputes follow documented evidence review with named broker accountability."
    ]
  },
  "policy-dispute": {
    title: "Dispute Resolution Policy",
    description: "Escrow-first dispute handling and EU ODR compatibility.",
    canonical: "/policy/dispute",
    bullets: [
      "Primary dispute path is through licensed escrow provider procedures for payment and release conflicts.",
      "IDsvault maintains deal logs, verification checkpoints, and communication records for evidence review.",
      "EU consumers are informed of ODR-compatible channels where legally required.",
      "Claims involving IP or platform-policy breaches trigger expedited review and potential listing suspension.",
      "Final contractual disputes are resolved under India arbitration terms unless non-waivable local rights apply."
    ]
  },
  "policy-risk-disclosure": {
    title: "Platform Risk Disclosure",
    description: "Platform-level risks and transfer constraints for digital identities.",
    canonical: "/policy/risk-disclosure",
    bullets: [
      "Telegram usernames are transferred through Fragment and remain the primary low-friction category.",
      "Domain names and Discord ownership changes are standard secondary-market workflows.",
      "YouTube and certain social assets can involve gray-zone platform interpretation and require explicit acceptance.",
      "Instagram and X are not publicly listed by IDsvault and are handled only under private advisory engagement.",
      "No broker can guarantee permanent future platform status after transfer completion."
    ]
  },
  "policy-aml-kyc": {
    title: "AML / KYC Policy",
    description: "Tiered KYC thresholds, sanctions screening, and enhanced due diligence standards.",
    canonical: "/policy/aml-kyc",
    bullets: [
      "Under USD 1,000 equivalent: baseline identity profile checks.",
      "USD 1,000 to USD 10,000: government ID and liveness verification.",
      "Above USD 10,000: enhanced due diligence, source-of-funds review, and additional verification layers.",
      "Sanctions and PEP screening is required for onboarding and transaction progression.",
      "Suspicious activity monitoring and escalation procedures are maintained as part of compliance operations."
    ]
  },
  "policy-sanctions": {
    title: "Sanctions Policy",
    description: "Geofencing and screening controls for restricted jurisdictions and sanctioned parties.",
    canonical: "/policy/sanctions",
    bullets: [
      "Service is denied to sanctioned persons, entities, and embargoed regions under applicable sanctions frameworks.",
      "IP and payment-method controls are used as part of a layered screening process.",
      "Restricted-jurisdiction attempts are declined with policy-level notice.",
      "False declarations during onboarding can result in permanent account blocking.",
      "Compliance controls are periodically reviewed and updated."
    ]
  },
  "policy-cookie-policy": {
    title: "Cookie Policy",
    description: "Cookie and consent controls with region-aware user choice management.",
    canonical: "/policy/cookie-policy",
    bullets: [
      "Consent controls distinguish essential, analytics, and optional categories where required.",
      "Reject-all and accept-all options are presented with equivalent prominence in regulated jurisdictions.",
      "Preference changes are available after initial choice through policy and footer controls.",
      "Analytics configuration is privacy-conscious and avoids unnecessary personal-data collection.",
      "Retention windows and lawful basis disclosures are documented in the privacy policy."
    ]
  },
  "policy-dmca": {
    title: "DMCA Policy",
    description: "Copyright complaint and takedown process for rights holders.",
    canonical: "/policy/dmca",
    bullets: [
      "Rights holders can submit notices with required ownership and infringement details.",
      "Incomplete notices may be rejected pending additional evidence.",
      "Validated notices trigger temporary delisting during review.",
      "Counter-notice pathways are available where legally applicable.",
      "IDsvault maintains a designated copyright contact for notice intake."
    ]
  },
  "policy-grievance": {
    title: "Grievance & Complaints",
    description: "India grievance officer publication and global complaints channel.",
    canonical: "/policy/grievance",
    bullets: [
      "India grievance contact is maintained for statutory compliance.",
      "Global complaints can be filed via the primary compliance email channel.",
      "Receipt acknowledgement and expected timelines are communicated upon intake.",
      "Escalation paths are available for unresolved cases.",
      "Material service failures are documented for compliance review and process correction."
    ]
  },
  "policy-accessibility": {
    title: "Accessibility Statement",
    description: "Accessibility commitment and conformance direction for digital inclusion.",
    canonical: "/policy/accessibility",
    bullets: [
      "IDsvault targets WCAG 2.1 AA-level accessibility practices for key user flows.",
      "Core pages are designed for keyboard navigation and readable contrast in dark-first layouts.",
      "Known limitations are tracked and prioritized in ongoing releases.",
      "Users may request accommodations through our support channels.",
      "Accessibility feedback is reviewed as part of product QA and policy governance."
    ]
  },
  "policy-imprint": {
    title: "Imprint / Business Identification",
    description: "Business identity and contact disclosures for cross-border trust and legal clarity.",
    canonical: "/policy/imprint",
    bullets: [
      "IDsvault is headquartered in Hyderabad, India, and serves buyers and sellers globally.",
      "Business identifiers, registered contact details, and policy contacts are disclosed on this page.",
      "Operational jurisdiction and governing-law references are harmonized with Terms and Privacy.",
      "Regional legal notices may be added as market presence expands.",
      "For urgent legal correspondence, rights holders and regulators may contact the compliance desk."
    ]
  }
};

export const RegulatoryInfo: React.FC<RegulatoryInfoProps> = ({ segment }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const faqItems = [
    { q: "Do you run a public handle marketplace?", a: "No. IDsvault is a broker-assisted desk, not an open exchange. Listings are curated and transfer workflows are supervised." },
    { q: "Which categories are publicly listed?", a: "Telegram usernames, domains, Discord communities, and selected YouTube opportunities." },
    { q: "How are high-value deals settled?", a: "Deals above USD 5,000 are routed through licensed escrow providers." },
    { q: "What about Instagram and X?", a: "These are handled through private advisory workflows only, with signed risk acknowledgement before engagement." }
  ];

  if (segment === "faq") {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-left space-y-6">
        <SEO title="FAQ" description="Frequently asked questions about IDsvault's global broker-assisted model." canonical="/faq" />
        <h1 className="text-3xl font-semibold text-white">Frequently Asked Questions</h1>
        {faqItems.map((item, index) => (
          <div key={item.q} className="border border-white/10 rounded-xl bg-[#131316] overflow-hidden">
            <button className="w-full p-5 flex items-center justify-between text-left" onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
              <span className="text-white">{item.q}</span>
              <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${activeFaq === index ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {activeFaq === index && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-5 pb-5 text-gray-300 text-sm">{item.a}</motion.p>}
            </AnimatePresence>
          </div>
        ))}
      </div>
    );
  }

  const content = policyContent[segment];
  if (!content) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-left">
      <SEO title={content.title} description={content.description} canonical={content.canonical} />
      <section className="p-8 rounded-2xl bg-[#131316] border border-white/10 space-y-6">
        <header className="border-b border-white/10 pb-5 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#1C1C20] border border-white/10"><FileText className="h-5 w-5 text-[#C9A961]" /></div>
          <div>
            <h1 className="text-2xl text-white font-semibold">{content.title}</h1>
            <p className="text-sm text-gray-400">Hyderabad HQ · Global Service Framework</p>
          </div>
        </header>
        <p className="text-gray-300 text-sm">{content.description}</p>
        <ul className="space-y-3">
          {content.bullets.map((bullet) => (
            <li key={bullet} className="text-gray-300 text-sm flex gap-2 items-start">
              <CheckCircle2 className="h-4 w-4 text-[#C9A961] mt-0.5" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
