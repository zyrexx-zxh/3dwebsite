import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import siteConfig from "../../config/siteConfig";
import { computeBreakdown } from "../../utils/pricing";
import { submitInvoice } from "../../utils/api";

import Step1FrontendStack from "./steps/Step1FrontendStack";
import Step2ProjectType from "./steps/Step2ProjectType";
import Step3Hosting from "./steps/Step3Hosting";
import Step4Domain from "./steps/Step4Domain";
import Step5ClientDetails from "./steps/Step5ClientDetails";
import Step6Notes from "./steps/Step6Notes";
import Step7Review from "./steps/Step7Review";
import Step8Payment from "./steps/Step8Payment";
import PriceCalculator from "./PriceCalculator";

const STEP_META = [
  { id: 1, label: "Stack" },
  { id: 2, label: "Project" },
  { id: 3, label: "Hosting" },
  { id: 4, label: "Domain" },
  { id: 5, label: "Details" },
  { id: 6, label: "Notes" },
  { id: 7, label: "Review" },
  { id: 8, label: "Payment" },
];

const INITIAL_SELECTIONS = {
  frontendStackId: null,
  projectTypeId: null,
  hostingPlanId: null,
  domainOptionId: null,
  client: { name: "", company: "", email: "" },
  notes: "",
  payment: { networkId: null, txHash: "" },
};

function isStepValid(step, selections) {
  switch (step) {
    case 1:
      return Boolean(selections.frontendStackId);
    case 2:
      return Boolean(selections.projectTypeId);
    case 3:
      return Boolean(selections.hostingPlanId);
    case 4:
      return Boolean(selections.domainOptionId);
    case 5:
      return Boolean(selections.client.name.trim()) && /\S+@\S+\.\S+/.test(selections.client.email);
    case 6:
      return true;
    case 7:
      return true;
    case 8:
      return Boolean(selections.payment.networkId) && Boolean(selections.payment.txHash.trim());
    default:
      return false;
  }
}

export default function CheckoutWizard({ isOpen, onClose, initialProjectTypeId }) {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState(INITIAL_SELECTIONS);
  const [submitState, setSubmitState] = useState({ status: "idle", result: null, error: null });

  useEffect(() => {
    if (isOpen && initialProjectTypeId) {
      setSelections((prev) => ({ ...prev, projectTypeId: initialProjectTypeId }));
    }
  }, [isOpen, initialProjectTypeId]);

  function updateSelections(partial) {
    setSelections((prev) => ({ ...prev, ...partial }));
  }

  function handleClose() {
    setStep(1);
    setSelections(INITIAL_SELECTIONS);
    setSubmitState({ status: "idle", result: null, error: null });
    onClose();
  }

  function goNext() {
    if (step < 8) setStep(step + 1);
  }

  function goBack() {
    if (step > 1) setStep(step - 1);
  }

  async function handleSubmit() {
    setSubmitState({ status: "loading", result: null, error: null });
    const breakdown = computeBreakdown(selections, siteConfig);

    const payload = {
      frontend_stack: breakdown.stack?.id,
      project_type: breakdown.project?.id,
      hosting_plan: breakdown.hosting?.id,
      domain_option: breakdown.domain?.id,
      client_name: selections.client.name,
      client_company: selections.client.company,
      client_email: selections.client.email,
      notes: selections.notes,
      payment_network: selections.payment.networkId,
      tx_hash: selections.payment.txHash,
      build_total: breakdown.buildTotal,
      hosting_monthly: breakdown.hostingMonthly,
    };

    try {
      const result = await submitInvoice(payload);
      setSubmitState({ status: "success", result, error: null });
    } catch (err) {
      setSubmitState({ status: "error", result: null, error: err.message });
    }
  }

  if (!isOpen) return null;

  const currentValid = isStepValid(step, selections);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#050609]/85 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl max-h-[88vh] rounded-2xl border border-white/10 bg-[#0b0c12] overflow-hidden flex flex-col"
        >
          {submitState.status === "success" ? (
            <SuccessScreen result={submitState.result} onClose={handleClose} />
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#7d8394]">
                    Step {step} of {STEP_META.length}
                  </span>
                  <span className="hidden sm:inline text-sm text-[#e8eaf0]">
                    {STEP_META[step - 1].label}
                  </span>
                </div>
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  className="text-[#7d8394] hover:text-[#e8eaf0] text-xl leading-none"
                >
                  &times;
                </button>
              </div>

              {/* Step rail (desktop) */}
              <div className="hidden md:flex items-center gap-1 px-6 pt-4">
                {STEP_META.map((s) => (
                  <div
                    key={s.id}
                    className={`h-1 flex-1 rounded-full ${
                      s.id <= step ? "bg-[#a3ff00]" : "bg-white/10"
                    }`}
                  />
                ))}
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                  >
                    {step === 1 && (
                      <Step1FrontendStack selections={selections} updateSelections={updateSelections} />
                    )}
                    {step === 2 && (
                      <Step2ProjectType selections={selections} updateSelections={updateSelections} />
                    )}
                    {step === 3 && (
                      <Step3Hosting selections={selections} updateSelections={updateSelections} />
                    )}
                    {step === 4 && (
                      <Step4Domain selections={selections} updateSelections={updateSelections} />
                    )}
                    {step === 5 && (
                      <Step5ClientDetails selections={selections} updateSelections={updateSelections} />
                    )}
                    {step === 6 && (
                      <Step6Notes selections={selections} updateSelections={updateSelections} />
                    )}
                    {step === 7 && <Step7Review selections={selections} />}
                    {step === 8 && (
                      <Step8Payment selections={selections} updateSelections={updateSelections} />
                    )}
                  </motion.div>
                </AnimatePresence>

                {submitState.status === "error" && (
                  <p className="mt-4 text-sm text-[#ff6b6b]">{submitState.error}</p>
                )}
              </div>

              {/* Sticky price calculator + nav */}
              <PriceCalculator selections={selections} />
              <div className="flex items-center justify-between gap-3 px-6 py-4">
                <button
                  onClick={step === 1 ? handleClose : goBack}
                  className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-[#e8eaf0] hover:bg-white/5 transition-colors"
                >
                  {step === 1 ? "Cancel" : "Back"}
                </button>

                {step < 8 ? (
                  <button
                    onClick={goNext}
                    disabled={!currentValid}
                    className="rounded-full bg-[#a3ff00] px-6 py-2.5 text-sm font-medium text-[#08090d] disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 transition-all"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!currentValid || submitState.status === "loading"}
                    className="rounded-full bg-[#a3ff00] px-6 py-2.5 text-sm font-medium text-[#08090d] disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 transition-all"
                  >
                    {submitState.status === "loading" ? "Submitting…" : "Submit order"}
                  </button>
                )}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function SuccessScreen({ result, onClose }) {
  return (
    <div className="px-8 py-14 text-center">
      <div className="mx-auto h-12 w-12 rounded-full border border-[#a3ff00]/40 bg-[#a3ff00]/[0.08] grid place-items-center text-[#a3ff00] text-xl">
        ✓
      </div>
      <h3 className="mt-5 text-xl text-[#e8eaf0]">Order received</h3>
      <p className="mt-2 text-sm text-[#9aa0b0]">
        Order ID <span className="font-mono text-[#e8eaf0]">{result?.order_id}</span> — status{" "}
        <span className="font-mono text-[#e8eaf0]">{result?.status}</span>
      </p>
      <p className="mt-2 text-sm text-[#7d8394] max-w-sm mx-auto">
        {result?.message || "We'll follow up by email once verification completes."}
      </p>
      <button
        onClick={onClose}
        className="mt-8 rounded-full border border-white/15 px-6 py-2.5 text-sm text-[#e8eaf0] hover:bg-white/5 transition-colors"
      >
        Close
      </button>
    </div>
  );
}
