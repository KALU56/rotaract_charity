import { Gift, HeartHandshake } from 'lucide-react';
import { BRAND_ASSETS } from '@/config/event.config';
import { PALETTE } from '@/config/theme.config';

export function AboutSection() {
  return (
    <section
      id="about-section"
      aria-labelledby="about-heading"
      className="py-20 sm:py-24 border-t"
      style={{
        backgroundColor: PALETTE.espresso,
        borderColor: 'rgba(153, 88, 42, 0.2)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-xl">
              <div
                aria-hidden="true"
                className="hidden sm:block absolute -inset-3 -translate-x-3 translate-y-3 rounded-[28px] border-2"
                style={{
                  borderColor: PALETTE.camel,
                  backgroundColor: PALETTE.surfaceCard,
                }}
              />

              <div
                className="relative rounded-[26px] overflow-hidden border shadow-xl aspect-4/3"
                style={{ borderColor: PALETTE.surfaceCard }}
              >
                <img
                  src={BRAND_ASSETS.aboutGroupPhotoUrl}
                  alt="Rotaract Club of Debre Berhan members standing together on campus"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://placehold.co/900x675/99582A/FFFBF0?text=Rotaract+Debre+Berhan';
                  }}
                />
              </div>

              <div
                className="mt-4 sm:mt-0 sm:absolute sm:-bottom-7 sm:-right-5 max-w-xs rounded-2xl p-5 border shadow-xl"
                style={{
                  backgroundColor: PALETTE.surfaceCard,
                  borderColor: PALETTE.camel,
                }}
              >
                <span
                  className="inline-block text-[10px] font-extrabold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full mb-2"
                  style={{
                    backgroundColor: PALETTE.darkWine,
                    color: PALETTE.creamText,
                  }}
                >
                  SERVICE ABOVE SELF
                </span>
                <p
                  className="font-display text-lg font-extrabold leading-snug"
                  style={{ color: PALETTE.darkCoffee }}
                >
                  100% Financial Accountability
                </p>
                <p
                  className="text-xs mt-1.5 leading-relaxed"
                  style={{ color: PALETTE.chocolate }}
                >
                  Every Telebirr and CBE receipt is audited by Rotaract Debre
                  Berhan’s treasurer and posted publicly.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-6 space-y-6">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-[0.16em]"
              style={{
                backgroundColor: PALETTE.surfaceCard,
                borderColor: PALETTE.camel,
                color: PALETTE.chocolate,
              }}
            >
              <span>ABOUT THE CHARITY MOVIE NIGHT</span>
            </div>

            <h2
              id="about-heading"
              className="font-display text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-[1.14]"
              style={{ color: PALETTE.darkCoffee }}
            >
              DBU Students Giving Back to{' '}
              <span style={{ color: PALETTE.darkWine }}>Debre Berhan.</span>
            </h2>

            <p
              className="text-base leading-[1.75]"
              style={{ color: 'rgba(67, 40, 24, 0.9)' }}
            >
              The <strong>Rotaract Club of Debre Berhan</strong> brings Debre
              Berhan University students together at <strong>PR Hall</strong>{' '}
              for a Saturday cinema night dedicated entirely to serving our host
              city. While DBU students enjoy the screening, 100% of proceeds go
              directly to vulnerable families, underprivileged school children,
              and elderly residents in Debre Berhan town.
            </p>

            <p
              className="text-base leading-[1.75]"
              style={{ color: 'rgba(67, 40, 24, 0.86)' }}
            >
              Whether you purchase a{' '}
              <strong>150 ETB Individual Student Pass</strong>, bring three
              friends with a <strong>500 ETB Group Squad Pass</strong>, or{' '}
              <strong>Gift a Ticket</strong> to a fellow DBU student, every Birr
              directly funds local community relief toward our 45,000 ETB
              target.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div
                className="p-4 rounded-2xl border"
                style={{
                  backgroundColor: PALETTE.surfaceCard,
                  borderColor: PALETTE.camel,
                }}
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <HeartHandshake
                    className="w-5 h-5"
                    style={{ color: PALETTE.darkWine }}
                  />
                  <h3
                    className="font-display text-sm font-extrabold"
                    style={{ color: PALETTE.darkCoffee }}
                  >
                    For Local Community Relief
                  </h3>
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: PALETTE.chocolate }}
                >
                  100% of ticket revenue funds food packages, children’s school
                  kits, and winter blankets in Debre Berhan.
                </p>
              </div>

              <div
                className="p-4 rounded-2xl border"
                style={{
                  backgroundColor: PALETTE.surfaceCard,
                  borderColor: PALETTE.camel,
                }}
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <Gift
                    className="w-5 h-5"
                    style={{ color: PALETTE.darkWine }}
                  />
                  <h3
                    className="font-display text-sm font-extrabold"
                    style={{ color: PALETTE.darkCoffee }}
                  >
                    DBU Students Buy &amp; Gift
                  </h3>
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: PALETTE.chocolate }}
                >
                  Students attend at PR Hall or gift a pass to a
                  friend—multiplying support for local families.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
