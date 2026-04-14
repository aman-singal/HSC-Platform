import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-layer-light border-t border-divider py-12 px-6 lg:px-12 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 border-r border-divider/50 pr-8">
          <img src="/logo.png" alt="HSC Logo" className="h-16 w-auto object-contain mb-8 group-hover:scale-105 transition-transform" />
          <p className="text-sm font-medium text-body leading-relaxed max-w-sm">
            Government-authorized vehicle scrapping facility (RVSF) dedicated to absolute transparency, legal compliance, and industrial-scale sustainability across India.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-heading mb-6 tracking-tight uppercase text-xs">Services</h3>
          <ul className="space-y-4 text-sm text-body font-medium">
            <li><Link href="/services" className="hover:text-corporate-blue transition-colors">Vehicle Scrapping</Link></li>
            <li><Link href="/services" className="hover:text-corporate-blue transition-colors">RC Deregistration</Link></li>
            <li><Link href="/services" className="hover:text-corporate-blue transition-colors">Doorstep Pickup</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-heading mb-6 tracking-tight uppercase text-xs">Legal</h3>
          <ul className="space-y-4 text-sm text-body font-medium">
            <li><Link href="/compliance" className="hover:text-corporate-blue transition-colors">RVSF Authorization</Link></li>
            <li><Link href="/compliance" className="hover:text-corporate-blue transition-colors">CVS & COD Issuance</Link></li>
            <li><Link href="/compliance" className="hover:text-corporate-blue transition-colors">Scrappage Policy</Link></li>
            <li><Link href="/faq" className="hover:text-corporate-blue transition-colors">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-heading mb-6 tracking-tight uppercase text-xs">Get in Touch</h3>
          <ul className="space-y-4 text-sm text-heading font-bold">
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-corporate-blue shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <a href="mailto:hindustanscrapcorporation@gmail.com" className="hover:text-corporate-blue transition-colors">hindustanscrapcorporation@gmail.com</a>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-corporate-blue shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <a href="tel:+919315573237" className="hover:text-corporate-blue transition-colors">+91 93155 73237</a>
            </li>
            <li className="flex items-start gap-2 leading-relaxed">
              <svg className="w-4 h-4 text-corporate-blue shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span>Khatoni No 42-43, Bhupnia,<br/>Bahadurgarh, Haryana - 124507</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-divider text-sm text-body flex flex-col md:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} Hindustan Scrap Corporation. All rights reserved.</p>
        <div className="mt-4 md:mt-0 flex space-x-4">
          <Link href="#" className="hover:text-heading">LinkedIn</Link>
          <Link href="#" className="hover:text-heading">Twitter</Link>
        </div>
      </div>
    </footer>
  );
}
