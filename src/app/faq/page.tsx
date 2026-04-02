export default function FAQPage() {
  return (
    <div className="pt-24 pb-32 max-w-4xl mx-auto px-6">
      <h1 className="text-5xl font-bold mb-12 text-center text-heading">Answers to Common Questions.</h1>
      <div className="space-y-6">
        {[
          { q: "Is HSC authorized by the government?", a: "Yes, we are a fully authorized Registered Vehicle Scrapping Facility (RVSF)." },
          { q: "How long does deregistration take?", a: "Typically, RC deregistration through the RTO takes 3-4 weeks. We handle the entire process for you." },
          { q: "When do I get paid?", a: "Payment is processed instantly via bank transfer as soon as the vehicle is inspected and picked up." }
        ].map((item, i) => (
          <div key={i} className="pb-6 border-b border-divider">
            <h3 className="text-xl font-semibold text-heading mb-2">{item.q}</h3>
            <p className="text-body">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
