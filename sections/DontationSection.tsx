"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  Download,
  RotateCcw,
} from "lucide-react";
import siteData from "@/data/site.json";
import { DonationData } from "@/types";

interface DonationSectionProps {
  data?: DonationData;
}

export default function DonationSection({
  data = (siteData as unknown as { donation: DonationData }).donation,
}: DonationSectionProps) {
  // Selected cause
  const [selectedCause, setSelectedCause] = useState<string>(
    data?.causes?.[0]?.name || "Where Most Needed (Emergency Rapid Response)"
  );

  // Form Details
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [receiptNumber, setReceiptNumber] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setReceiptNumber(`HA-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <section
      id="donation-section"
      aria-label="HopeAlive Foundation Donation Portal"
      className="relative w-full bg-[#f8f6f0] text-[#1a2614] px-4 md:px-12 py-10 md:py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* UPPER ROW: Left Column (Badge) | Right Column (Headline & Narrative) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Organic Badge */}
          <div className="lg:col-span-4 flex flex-col justify-start self-stretch">
            <div className="inline-flex items-center w-fit select-none">
              <span className="text-sm lg:text-lg font-poppins font-medium text-[#1b2715]">
                {data.badge.text}
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Massive Headline & Narrative Paragraph */}
          <div className="lg:col-span-8 flex flex-col">
            <h2 className="font-poppins font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[52px] xl:text-[62px] text-[#1b2715] tracking-tight leading-[1.12] select-none">
              <span className="block">{data.headline.line1}</span>
              {data.headline.line2 && (
                <span className="block">{data.headline.line2}</span>
              )}
            </h2>

            <p className="mt-3 sm:mt-4 max-w-3xl font-poppins text-sm sm:text-base text-[#556350] leading-relaxed select-none">
              {data.description}
            </p>
          </div>
        </div>

        {/* MAIN DONATION WORKSPACE GRID */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT / CENTER: Clean Interactive Donation Form Card */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 lg:p-12 rounded-tl-[54px] sm:rounded-tl-[64px] rounded-br-[54px] sm:rounded-br-[64px] rounded-tr-3xl rounded-bl-3xl shadow-xl border border-[#1b2715]/10 flex flex-col justify-between">
            {isSubmitted ? (
              /* CELEBRATION / SUCCESS SCREEN */
              <div className="p-4 sm:p-6 text-center flex flex-col items-center justify-center animate-fadeIn">
                <div className="w-20 h-20 rounded-full bg-[#1f2c16] text-[#feff02] flex items-center justify-center mb-6 shadow-xl shadow-[#1f2c16]/20">
                  <CheckCircle2 size={42} strokeWidth={2.4} />
                </div>

                <span className="text-xs font-poppins font-bold uppercase tracking-[0.2em] text-[#2d5a27] bg-[#f8f6f0] px-4 py-1.5 rounded-full mb-3">
                  Support Registered
                </span>

                <h3 className="font-poppins font-bold text-2xl sm:text-4xl text-[#1b2715] tracking-tight">
                  Thank You For Your Support!
                </h3>

                <p className="mt-3 text-sm sm:text-base text-[#556350] font-poppins max-w-lg leading-relaxed">
                  Your compassionate donation pledge has been registered for{" "}
                  <strong className="text-[#1b2715]">{selectedCause}</strong>. Our coordination office will follow up with complete transfer and tax details.
                </p>

                {/* Receipt Details Box */}
                <div className="mt-6 w-full max-w-md bg-[#f8f6f0] rounded-2xl p-5 border border-[#1b2715]/10 text-left font-poppins">
                  <div className="flex items-center justify-between text-xs text-[#556350] pb-2 border-b border-[#1b2715]/10">
                    <span>Reference ID:</span>
                    <span className="font-mono font-bold text-[#1b2715]">
                      {receiptNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#556350] pt-2">
                    <span>Supporter:</span>
                    <span className="font-semibold text-[#1b2715]">
                      {`${formData.firstName || "Generous"} ${formData.lastName || "Donor"}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#556350] pt-2">
                    <span>Designation:</span>
                    <span className="font-semibold text-[#2d5a27] flex items-center gap-1">
                      <ShieldCheck size={14} /> {selectedCause}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                  <button
                    type="button"
                    onClick={() => alert(`Official Donation Reference ${receiptNumber} saved.`)}
                    className="w-full sm:w-1/2 py-3 px-5 rounded-full bg-[#1f2c16] text-[#feff02] font-poppins font-semibold text-xs tracking-wide flex items-center justify-center gap-2 hover:bg-[#2a3c20] transition-colors cursor-pointer"
                  >
                    <Download size={15} />
                    <span>Download Summary</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-1/2 py-3 px-5 rounded-full bg-white border border-[#1b2715]/20 text-[#1b2715] font-poppins font-semibold text-xs tracking-wide flex items-center justify-center gap-2 hover:bg-[#f8f6f0] transition-colors cursor-pointer"
                  >
                    <RotateCcw size={15} />
                    <span>Submit Another Inquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              /* CLEAN DONATION FORM */
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
                {/* 1. DESIGNATED PROGRAM SELECT */}
                <div>
                  <label className="block text-xs font-poppins font-bold uppercase tracking-wider text-[#1b2715] mb-2">
                    Direct Your Contribution To
                  </label>
                  <select
                    value={selectedCause}
                    onChange={(e) => setSelectedCause(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#f8f6f0] border border-[#1b2715]/15 text-[#1b2715] font-poppins text-xs sm:text-sm font-medium focus:outline-none focus:border-[#1f2c16] focus:ring-1 focus:ring-[#1f2c16] transition-all cursor-pointer"
                  >
                    {data.causes.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. DONOR INFORMATION */}
                <div>
                  <label className="block text-xs font-poppins font-bold uppercase tracking-wider text-[#1b2715] mb-2.5">
                    Donor Details
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <input
                      type="text"
                      placeholder="First Name *"
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#f8f6f0] border border-[#1b2715]/15 text-[#1b2715] placeholder:text-[#556350]/60 text-xs sm:text-sm font-poppins focus:outline-none focus:border-[#1f2c16] focus:ring-1 focus:ring-[#1f2c16] transition-all"
                    />

                    <input
                      type="text"
                      placeholder="Last Name *"
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#f8f6f0] border border-[#1b2715]/15 text-[#1b2715] placeholder:text-[#556350]/60 text-xs sm:text-sm font-poppins focus:outline-none focus:border-[#1f2c16] focus:ring-1 focus:ring-[#1f2c16] transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-3.5">
                    <input
                      type="email"
                      placeholder="Email Address *"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#f8f6f0] border border-[#1b2715]/15 text-[#1b2715] placeholder:text-[#556350]/60 text-xs sm:text-sm font-poppins focus:outline-none focus:border-[#1f2c16] focus:ring-1 focus:ring-[#1f2c16] transition-all"
                    />

                    <input
                      type="tel"
                      placeholder="Phone (optional)"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#f8f6f0] border border-[#1b2715]/15 text-[#1b2715] placeholder:text-[#556350]/60 text-xs sm:text-sm font-poppins focus:outline-none focus:border-[#1f2c16] focus:ring-1 focus:ring-[#1f2c16] transition-all"
                    />
                  </div>

                  <div className="mt-3.5">
                    <textarea
                      rows={3}
                      placeholder="Additional Note or Message (optional)..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#f8f6f0] border border-[#1b2715]/15 text-[#1b2715] placeholder:text-[#556350]/60 text-xs sm:text-sm font-poppins focus:outline-none focus:border-[#1f2c16] focus:ring-1 focus:ring-[#1f2c16] transition-all resize-none"
                    />
                  </div>
                </div>

                {/* 4. SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 sm:py-5 px-8 rounded-full bg-[#1f2c16] hover:bg-[#25361c] text-[#feff02] font-poppins font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-xl shadow-[#1f2c16]/20 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-[#feff02] border-t-transparent rounded-full animate-spin" />
                      Registering Your Contribution...
                    </span>
                  ) : (
                    <>
                      <Heart size={18} className="text-[#feff02] fill-[#feff02]" />
                      <span>
                        Donate
                      </span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT COLUMN: Field Story & Assistance Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28 self-start">
            {/* 1. AUTHENTIC NGO IMPACT IMAGE CARD */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#1b2715]/10 group">
              <div className="relative h-60 sm:h-68 w-full">
                <Image
                  src="/images/ngo-clean-water.jpg"
                  alt="HopeAlive clean water humanitarian well in rural community"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#162211] via-[#162211]/60 to-transparent" />
              </div>

              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white font-poppins">
                <div className="inline-flex items-center gap-1.5 bg-[#feff02] text-[#121a0d] px-2.5 py-0.5 rounded-full text-[11px] font-bold mb-2">
                  <span>Verified Field Result</span>
                </div>
                <h4 className="font-bold text-base sm:text-lg leading-snug">
                  120+ Safe Water Wells Built Across 14 Underprivileged Regions
                </h4>
                <p className="mt-1 text-xs text-[#d8e2d6] line-clamp-2">
                  Direct donor funds allow our field teams to install solar-powered boreholes, eliminating waterborne sickness for over 70,000 children.
                </p>
              </div>
            </div>

            {/* 2. DEDICATED DONOR ASSISTANCE DESK */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-[#1b2715]/10 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-poppins font-bold text-base text-[#1b2715]">
                  Need Assistance or Corporate Sponsorship?
                </h4>
                <p className="mt-1 text-xs text-[#556350] font-poppins leading-relaxed">
                  Our donor relations desk is available to answer questions regarding wire transfers, crypto donations, or institutional philanthropy.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-[#1b2715]/10 flex flex-wrap items-center gap-4 text-xs font-poppins">
                <a
                  href="tel:+18004673254"
                  className="flex items-center gap-2 text-[#1b2715] font-semibold hover:text-[#2d5a27] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#f8f6f0] flex items-center justify-center text-[#1b2715]">
                    <Phone size={14} />
                  </div>
                  <span>+1 (800) 467-3254</span>
                </a>

                <a
                  href="mailto:info@xyz.com"
                  className="flex items-center gap-2 text-[#1b2715] font-semibold hover:text-[#2d5a27] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#f8f6f0] flex items-center justify-center text-[#1b2715]">
                    <Mail size={14} />
                  </div>
                  <span>info@xyz.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}