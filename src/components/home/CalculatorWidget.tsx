"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CalculatorWidget() {
  const [vehicleType, setVehicleType] = useState("car");
  const [condition, setCondition] = useState("running");
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);

  const calculateValue = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy logic for the demo calculator
    let base = vehicleType === "car" ? 15000 : vehicleType === "bike" ? 4000 : 25000;
    if (condition !== "running") base *= 0.7; // 30% penalty for non-running status
    setEstimatedValue(base);
  };

  return (
    <section className="py-24 bg-pure-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-layer-light/50 to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl tracking-tight font-bold text-heading">Instant Scrap Value</h2>
          <p className="text-lg text-body">Calculate the transparent, government-approved value of your vehicle in seconds.</p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-divider">
          <form onSubmit={calculateValue} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-heading uppercase tracking-wider">Vehicle Type</label>
                <select 
                  className="w-full h-14 bg-layer-light border border-divider rounded-xl px-4 text-heading focus:outline-none focus:ring-2 focus:ring-corporate-blue/50 transition-all appearance-none"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option value="car">Hatchback / Sedan</option>
                  <option value="suv">SUV / MUV</option>
                  <option value="bike">Two Wheeler</option>
                  <option value="commercial">Commercial Vehicle</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-heading uppercase tracking-wider">Condition</label>
                <select 
                  className="w-full h-14 bg-layer-light border border-divider rounded-xl px-4 text-heading focus:outline-none focus:ring-2 focus:ring-corporate-blue/50 transition-all appearance-none"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                >
                  <option value="running">Running Condition</option>
                  <option value="dead">Dead / Accidental</option>
                  <option value="shell">Used Shell / Scrap</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center justify-between pt-6 border-t border-divider">
              <div className="w-full md:w-auto">
                <Button type="submit" size="lg" variant="premium" className="w-full md:w-auto">Calculate Value</Button>
              </div>
              
              <div className="w-full md:w-auto text-left md:text-right bg-layer-light rounded-2xl p-6 min-w-[280px]">
                <p className="text-sm text-subheading mb-1 font-medium">Estimated Range</p>
                {estimatedValue !== null ? (
                  <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-corporate-blue to-sub-accent tracking-tight">
                    ₹{estimatedValue.toLocaleString()} - ₹{(estimatedValue * 1.2).toLocaleString()}
                  </div>
                ) : (
                  <div className="text-4xl font-bold text-divider tracking-tight">
                    ₹ ---
                  </div>
                )}
                <p className="text-xs text-body mt-2">Subject to physical inspection and weight verification.</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
