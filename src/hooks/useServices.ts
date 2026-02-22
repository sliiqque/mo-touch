import { useState } from "react";
import type { Service } from "../types/services";

const servicesData: Service[] = [
  {
    id: "01",
    title: "BRIDAL MAKEUP",
    desc: "Bridal Perfection, Unforgettable Moments. Flawless, camera-ready looks that enhance your natural beauty and withstand tears of joy, dancing, and countless photos.",
    tags: [
      "Pre-wedding Consultation",
      "Makeup Trial",
      "Waterproof Formula",
      "Photography-ready Finish",
      "Touch-up Kit",
      "False Lashes",
    ],
  },
  {
    id: "02",
    title: "PROFESSIONAL MAKEUP",
    desc: "Everyday Elegance, Special Occasion Glamour. Professional makeup services that enhance your natural features with precision and artistry for any event.",
    tags: [
      "Special Events",
      "Photoshoot Makeup",
      "Red Carpet Looks",
      "Natural Enhancement",
      "Custom Color Matching",
      "Skin Preparation",
    ],
  },
  {
    id: "03",
    title: "MAKEUP TRAINING",
    desc: "Master the Art: Professional Makeup Instruction. Personalized training from beginner techniques to professional certification with hands-on experience.",
    tags: [
      "One-on-one Lessons",
      "Group Workshops",
      "Professional Certification",
      "Bridal Specialization",
      "Advanced Techniques",
      "Industry Insights",
    ],
  },
  {
    id: "04",
    title: "COLLABORATIVE PACKAGES",
    desc: "Complete beauty experiences through strategic partnerships. From costume to makeup, and makeup to photography - comprehensive solutions for your special moments.",
    tags: [
      "Costume by Mo Partnership",
      "Uncle Mo Studio Photography",
      "Complete Look Packages",
      "Themed Events",
      "Creative Projects",
      "Professional Coordination",
    ],
  },
];

export const useServices = () => {
  const [activeService, setActiveService] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setActiveService(index);
  };

  const handleMouseLeave = () => {
    setActiveService(null);
  };

  const isServiceActive = (index: number) => activeService === index;
  const isServiceDimmed = (index: number) =>
    activeService !== null && activeService !== index;

  return {
    services: servicesData,
    activeService,
    handleMouseEnter,
    handleMouseLeave,
    isServiceActive,
    isServiceDimmed,
  };
};
