"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  User,
  MessageSquare,
} from "lucide-react";
import siteData from "@/data/site.json";
import { ContactData } from "@/types";

interface ContactSectionProps {
  data?: ContactData;
}

export default function ContactSection({
  data = (siteData as unknown as { contact: ContactData }).contact,
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
    }, 700);
  };

  return (
    <section
      id="contact"
      aria-label="Contact HopeAlive Foundation"
      className="relative w-full bg-[#f8f6f0] text-[#1a2614] px-4 md:px-12 py-10 md:py-16 lg:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* UPPER ROW: Left Column (Badge) | Right Column (Headline & Narrative) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Organic Pill Badge */}
          <div className="lg:col-span-4 flex flex-col justify-start self-stretch">
            <div className="inline-flex items-center w-fit select-none">
              <span className="text-sm lg:text-lg font-poppins font-medium text-[#1b2715]">
                {data.badge.text}
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Massive Headline & Narrative Paragraph */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Massive Bold Headline */}
            <h2 className="font-poppins font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[52px] xl:text-[62px] text-[#1b2715] tracking-tight leading-[1.12] select-none">
              <span className="block">{data.headline.line1}</span>
              {data.headline.line2 && (
                <span className="block">{data.headline.line2}</span>
              )}
            </h2>

            {/* Narrative Paragraph */}
            <p className="mt-3 sm:mt-4 max-w-3xl font-poppins text-sm sm:text-base text-[#556350] leading-relaxed select-none">
              {data.description}
            </p>
          </div>
        </div>

        {/* MAIN ROW: Contact Info Cards (Left) | Interactive Form (Right) */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* LEFT: 4 Contact Information Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 sm:gap-5">
            {/* 1. Address Card */}
            <div className="group bg-[#1f2c16] text-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/10 hover:border-white/25 transition-all duration-300 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-[#2a3c20] text-[#feff02] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                  <MapPin size={22} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-lg text-white">
                    {data.info.address.title}
                  </h3>
                  <div className="mt-1 text-sm text-[#b0bfae] font-poppins leading-relaxed">
                    {data.info.address.lines.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Phone Card */}
            <div className="group bg-[#1f2c16] text-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/10 hover:border-white/25 transition-all duration-300 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-[#2a3c20] text-[#feff02] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Phone size={22} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-lg text-white">
                    {data.info.phone.title}
                  </h3>
                  <div className="mt-1 text-sm text-[#b0bfae] font-poppins leading-relaxed">
                    {data.info.phone.numbers.map((phone, idx) => (
                      <a
                        key={idx}
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        className="block hover:text-[#feff02] transition-colors"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Email Card */}
            <div className="group bg-[#1f2c16] text-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/10 hover:border-white/25 transition-all duration-300 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-[#2a3c20] text-[#feff02] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Mail size={22} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-lg text-white">
                    {data.info.email.title}
                  </h3>
                  <div className="mt-1 text-sm text-[#b0bfae] font-poppins leading-relaxed">
                    <a
                      href={`mailto:${data.info.email.address}`}
                      className="hover:text-[#feff02] transition-colors"
                    >
                      {data.info.email.address}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Hours Card */}
            <div className="group bg-[#1f2c16] text-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/10 hover:border-white/25 transition-all duration-300 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-[#2a3c20] text-[#feff02] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Clock size={22} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-lg text-white">
                    {data.info.hours.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#b0bfae] font-poppins leading-relaxed">
                    {data.info.hours.text}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Interactive Contact Form Card with signature Leaf-Cut silhouette */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 lg:p-12 rounded-tl-[54px] sm:rounded-tl-[64px] rounded-br-[54px] sm:rounded-br-[64px] rounded-tr-3xl rounded-bl-3xl shadow-xl border border-[#1b2715]/10 flex flex-col justify-between">
            <div>
              <h3 className="font-poppins font-bold text-2xl sm:text-3xl text-[#1b2715] tracking-tight">
                Leave Us A Note
              </h3>
              <p className="mt-1.5 text-sm text-[#556350] font-poppins leading-relaxed">
                Fill out the details below and a team coordinator will get in touch with you shortly.
              </p>

              {submitted ? (
                <div className="mt-8 p-8 rounded-2xl bg-[#1f2c16] text-white text-center flex flex-col items-center justify-center animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#feff02] text-[#121a0d] flex items-center justify-center mb-4 shadow-lg shadow-[#feff02]/20">
                    <CheckCircle2 size={32} strokeWidth={2.4} />
                  </div>
                  <h4 className="font-poppins font-bold text-2xl text-white">
                    Thank You! Message Received
                  </h4>
                  <p className="mt-2 text-sm text-[#b0bfae] font-poppins max-w-md">
                    Your message has been sent directly to the HopeAlive humanitarian coordination office. We will reply to your email within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-[#2a3c20] text-[#feff02] hover:bg-white hover:text-[#121a0d] font-poppins font-semibold text-xs tracking-wide transition-all cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-7 space-y-4 sm:space-y-5">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-poppins font-bold uppercase tracking-wider text-[#1b2715] mb-1.5">
                        Your Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="e.g. Sarah Jenkins"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f8f6f0] border border-[#1b2715]/10 text-sm text-[#1b2715] placeholder:text-[#556350]/60 focus:outline-none focus:border-[#1f2c16] focus:bg-white transition-colors font-poppins"
                        />
                        <User
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#556350]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-poppins font-bold uppercase tracking-wider text-[#1b2715] mb-1.5">
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="sarah@example.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f8f6f0] border border-[#1b2715]/10 text-sm text-[#1b2715] placeholder:text-[#556350]/60 focus:outline-none focus:border-[#1f2c16] focus:bg-white transition-colors font-poppins"
                        />
                        <Mail
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#556350]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone & Subject Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-poppins font-bold uppercase tracking-wider text-[#1b2715] mb-1.5">
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+1 (555) 000-0000"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f8f6f0] border border-[#1b2715]/10 text-sm text-[#1b2715] placeholder:text-[#556350]/60 focus:outline-none focus:border-[#1f2c16] focus:bg-white transition-colors font-poppins"
                        />
                        <Phone
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#556350]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-poppins font-bold uppercase tracking-wider text-[#1b2715] mb-1.5">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-[#f8f6f0] border border-[#1b2715]/10 text-sm text-[#1b2715] focus:outline-none focus:border-[#1f2c16] focus:bg-white transition-colors font-poppins cursor-pointer"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Donation & Sponsorship">Donation & Sponsorship</option>
                        <option value="Volunteer Programs">Volunteer Programs</option>
                        <option value="Corporate Partnership">Corporate Partnership</option>
                        <option value="Media & Press">Media & Press</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-poppins font-bold uppercase tracking-wider text-[#1b2715] mb-1.5">
                      Your Message *
                    </label>
                    <div className="relative">
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell us how we can help or how you'd like to support our humanitarian programs..."
                        className="w-full p-4 pl-10 rounded-xl bg-[#f8f6f0] border border-[#1b2715]/10 text-sm text-[#1b2715] placeholder:text-[#556350]/60 focus:outline-none focus:border-[#1f2c16] focus:bg-white transition-colors font-poppins resize-none"
                      />
                      <MessageSquare
                        size={16}
                        className="absolute left-3.5 top-4 text-[#556350]"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-leaf w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 bg-[#1f2c16] text-[#feff02] font-poppins font-bold text-sm sm:text-base tracking-wide rounded-xl shadow-xl hover:bg-[#162211] active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-50"
                    >
                      <span>{submitting ? "Sending Message..." : "Send Message"}</span>
                      <Send size={16} strokeWidth={2.4} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}