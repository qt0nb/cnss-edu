import type { ProjectCategory } from "@/lib/types";

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  { id: "freelance", name: { ar: "خدمات حرّة", en: "Freelance Services" }, icon: "Briefcase" },
  { id: "saas", name: { ar: "منتجات SaaS وأدوات", en: "SaaS & Tools" }, icon: "Rocket" },
  { id: "content", name: { ar: "محتوى وإعلام", en: "Content & Media" }, icon: "Video" },
  { id: "templates", name: { ar: "قوالب رقمية", en: "Digital Templates" }, icon: "FileCode" },
  { id: "education", name: { ar: "تعليم وتدريب", en: "Courses & Training" }, icon: "GraduationCap" },
  { id: "consulting", name: { ar: "استشارات وتدقيق", en: "Consulting & Audits" }, icon: "ClipboardCheck" },
  { id: "ecommerce", name: { ar: "منتجات رقمية للبيع", en: "Digital Products" }, icon: "ShoppingCart" },
  { id: "lab", name: { ar: "حزم مختبرات وتمارين", en: "Lab Bundles & Exercises" }, icon: "FlaskConical" },
  { id: "community", name: { ar: "مجتمع وفعاليات", en: "Community & Events" }, icon: "Users" },
  { id: "career", name: { ar: "خدمات مهنية", en: "Career Services" }, icon: "Trophy" },
  { id: "mobile", name: { ar: "تطبيقات جوال", en: "Mobile Apps" }, icon: "Smartphone" },
  { id: "hardware", name: { ar: "مشاريع عتادية", en: "Hardware Projects" }, icon: "Cpu" },
];

export const projectCategoryById = (id: string): ProjectCategory =>
  PROJECT_CATEGORIES.find((c) => c.id === id) ?? PROJECT_CATEGORIES[0];
