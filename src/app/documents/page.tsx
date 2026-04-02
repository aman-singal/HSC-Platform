export default function DocumentsPage() {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 mb-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-heading mb-6">Required Paperwork.</h1>
        <p className="text-xl text-body max-w-2xl mx-auto">
          Scrap smart. Have these ready for a smooth process.
        </p>
      </div>
      <div className="max-w-3xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {['Original RC', 'Aadhaar Card / ID Proof', 'Address Proof', 'Bank Account Details', 'Canceled Cheque', 'NOC (if applicable)'].map(doc => (
          <div key={doc} className="p-6 bg-pure-white border border-divider rounded-2xl flex items-center space-x-4 shadow-sm">
            <span className="text-corporate-blue text-xl">📄</span><span className="font-medium text-heading">{doc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
