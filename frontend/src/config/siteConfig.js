// ============================================================================
// siteConfig.js
// SINGLE SOURCE OF TRUTH for the digital network.
// ============================================================================

export const siteConfig = {
  brand: {
    name: "Vertex Network",
    fullName: "Vertex Digital Network",
    mark: "VX",
    tagline: "Professional platform services",
  },

  nav: [
    { id: "services", label: "Services", href: "#services" },
    { id: "faq", label: "FAQ", href: "#faq" },
    { id: "contact", label: "Contact", href: "#contact" },
  ],

  hero: {
    eyebrow: "Digital Operations",
    title: "Professional platform services handled directly.",
    subtitle: "Independent digital network providing account support, automation, and digital solutions with no ticket queues.",
    description: "Select your platform and service below to initialize the workflow.",
    ctaPrimary: { label: "Initialize Workflow", action: "start-checkout" },
    ctaSecondary: { label: "Order Status", action: "track-order" },
    stats: [
      { value: "0", label: "Passwords requested" },
      { value: "24h", label: "Initial review time" },
    ],
  },

  // Checkout Step 1 — Mapped to "Platforms"
  frontendStacks: [
    {
      id: "meta",
      name: "Instagram & Facebook",
      description: "Priority support, recovery, and audits.",
      priceModifier: 0,
    },
    {
      id: "telegram",
      name: "Telegram",
      description: "Mini-App & Bot Automation.",
      priceModifier: 0,
    },
    {
      id: "snapchat",
      name: "Snapchat",
      description: "Account Security Consulting.",
      priceModifier: 0,
    },
  ],

  // Checkout Step 2 — Mapped to "Services"
  projectTypes: [
    { id: "priority-auth", name: "Priority Authentication Support", tag: "Instagram/FB", description: "Fast-tracked support for authentication issues.", basePrice: 350, features: [] },
    { id: "recovery-consulting", name: "Account Recovery Consulting", tag: "Instagram/FB", description: "Consulting for restricted/disabled accounts.", basePrice: 200, features: [] },
    { id: "emergency-audit", name: "Emergency Platform Audit", tag: "Instagram/FB", description: "Deep-dive security audit.", basePrice: 4000, features: [] },
    { id: "adv-verification", name: "Advanced Verification Setup", tag: "Instagram/FB", description: "Proper verification configuration.", basePrice: 69, features: [] },
    { id: "manual-support", name: "Manual Account Support", tag: "Case-by-case", description: "Custom manual handling.", basePrice: 1500, features: [] },
    { id: "tg-bot", name: "Mini-App & Bot Automation", tag: "Telegram", description: "Custom Python automated bots.", basePrice: 300, features: [] },
    { id: "tg-engage", name: "Channel Engagement Strategy", tag: "Telegram", description: "Growth metrics strategy.", basePrice: 8, features: [] },
    { id: "snap-security", name: "Account Security Consulting", tag: "Snapchat", description: "Security optimization.", basePrice: 350, features: [] },
  ],

  // Checkout Step 3 — Mapped to "Packages"
  hostingPlans: [
    { id: "standard", name: "Standard Processing", description: "Normal queue.", price: 0, billingPeriod: "one-time", features: [] },
    { id: "priority", name: "Priority Queue", description: "Jump the line.", price: 50, billingPeriod: "one-time", features: [] },
  ],

  // Checkout Step 4 — Mapped to "Contact Check"
  domainOptions: [
    { id: "have-tg", label: "I HAVE TELEGRAM", description: "Fastest support channel.", fee: 0 },
    { id: "no-tg", label: "NO TELEGRAM ACCOUNT", description: "Email communication.", fee: 0 },
  ],

  // Checkout Step 8 — Payment networks
  paymentNetworks: [
    { id: "usdt-trc20", name: "USDT (TRC-20)", network: "Tron Network", address: "TYourTronAddressHere" },
    { id: "btc", name: "Bitcoin (BTC)", network: "Bitcoin Network", address: "bc1YourBtcAddressHere" },
    { id: "eth", name: "Ethereum (ERC-20)", network: "Ethereum Network", address: "0xYourEthAddressHere" },
    { id: "sol", name: "Solana (SOL)", network: "Solana Network", address: "YourSolanaAddressHere" },
  ],

  currency: { symbol: "$", code: "USD" },

  faq: [
    { question: "How does ordering work?", answer: "Pick a platform, service and package, choose whether you use Telegram, and provide the details required to review the case. Email is required for every order." },
    { question: "How do payments work?", answer: "Crypto payment is a Phase 1 checkout preview only. Secure crypto payment will be available at checkout in a later phase; nothing is charged or submitted on this site yet." },
    { question: "Are refunds available?", answer: "Yes, under the conditions set out in the refund policy. Refunds are assessed per case and depend on how far the work progressed." },
    { question: "What information do I need to provide?", answer: "Only what is genuinely needed to review the case: the account handle or link, the platform message you received, and a short description. Passwords, 2FA codes, recovery codes, keys and payment credentials are never requested." },
  ],

  contact: {
    email: "contact@example.com",
    phone: "",
    location: "Global",
    social: [
      { id: "telegram", label: "Telegram Support", href: "https://t.me/claxen" },
    ],
  },
};

export default siteConfig;
