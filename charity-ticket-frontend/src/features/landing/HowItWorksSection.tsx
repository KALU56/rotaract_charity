import { CheckCircle2 } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '@/config/event.config';
import { PALETTE } from '@/config/theme.config';

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works-section"
      aria-labelledby="how-heading"
      className="py-20 sm:py-24 border-t"
      style={{
        backgroundColor: PALETTE.surfaceCard,
        borderColor: 'rgba(187, 148, 87, 0.35)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-[0.16em]"
            style={{
              backgroundColor: PALETTE.surfaceSoft,
              borderColor: PALETTE.camel,
              color: PALETTE.chocolate,
            }}
          >
            <span>HOW IT WORKS</span>
          </div>
          <h2
            id="how-heading"
            className="font-display text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-[-0.025em] leading-[1.12]"
            style={{ color: PALETTE.darkCoffee }}
          >
            Four Simple Steps to{' '}
            <span style={{ color: PALETTE.darkWine }}>PR Hall Entry.</span>
          </h2>
        </header>

        <div className="relative">
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-11 left-[12.5%] right-[12.5%] h-0.5"
            style={{ backgroundColor: PALETTE.camel }}
          />

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {HOW_IT_WORKS_STEPS.map((step) => {
              const StepIcon = step.icon;
              return (
                <li
                  key={step.num}
                  className="card-lift rounded-3xl p-6 border flex flex-col justify-between"
                  style={{
                    backgroundColor: PALETTE.surfaceSoft,
                    borderColor: 'rgba(187, 148, 87, 0.55)',
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                        style={{
                          backgroundColor: PALETTE.surfaceCard,
                          borderColor: PALETTE.camel,
                        }}
                      >
                        <StepIcon
                          className="w-5 h-5"
                          style={{ color: PALETTE.darkWine }}
                        />
                      </div>
                      <span
                        className="font-display text-3xl font-extrabold tabular-nums"
                        style={{ color: PALETTE.darkWine }}
                      >
                        {step.num}
                      </span>
                    </div>

                    <h3
                      className="font-display text-lg font-extrabold mb-3"
                      style={{ color: PALETTE.darkCoffee }}
                    >
                      {step.title}
                    </h3>

                    <ul className="space-y-2">
                      {step.points.map((pt, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs leading-relaxed"
                          style={{ color: 'rgba(67, 40, 24, 0.86)' }}
                        >
                          <CheckCircle2
                            className="w-3.5 h-3.5 shrink-0 mt-0.5"
                            style={{ color: PALETTE.darkWine }}
                          />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className="mt-6 pt-3 border-t text-[11px] font-bold uppercase tracking-wider"
                    style={{
                      borderColor: 'rgba(187, 148, 87, 0.3)',
                      color: PALETTE.chocolate,
                    }}
                  >
                    Step {step.num} of 04
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
