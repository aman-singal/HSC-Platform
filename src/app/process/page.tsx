export default function ProcessPage() {
  return (
    <div className="pt-24 pb-32 bg-pure-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 mb-16 md:mb-20 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-heading mb-6">The HSC Process.</h1>
        <p className="text-lg md:text-xl text-body max-w-2xl mx-auto">
          Complete transparency from pickup to melting. Here is how your vehicle contributes directly to the circular economy.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-12 space-y-16 relative before:absolute before:inset-0 before:ml-[50%] md:before:ml-[28px] before:-translate-x-px md:before:translate-x-0 before:w-0.5 before:bg-divider">
        {[
          { step: "01", title: "Inspection & Valuation", desc: "Vehicle weight, type, and condition are verified physically. Fair market value is presented instantly." },
          { step: "02", title: "Depollution", desc: "Battery, airbags, liquids, and hazardous materials are safely extracted in our controlled environment." },
          { step: "03", title: "Dismantling", desc: "High-value reusable parts like engines, gearboxes, and electronics are separated for secondary markets." },
          { step: "04", title: "Recycling & Crushing", desc: "The bare shell is compacted entirely down into industrial materials for future manufacturing." },
        ].map((phase, i) => (
          <div key={i} className="relative flex items-center md:items-start md:space-x-8 text-center md:text-left flex-col md:flex-row">
            <div className="w-14 h-14 bg-pure-white border-4 border-corporate-blue rounded-full flex items-center justify-center text-corporate-blue font-bold text-lg relative z-10 mx-auto md:mx-0 mb-4 md:mb-0">
              {phase.step}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-heading mb-2">{phase.title}</h3>
              <p className="text-body text-lg">{phase.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
