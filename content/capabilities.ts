import type { Capability } from "./types";

export const capabilities: Capability[] = [
  {
    id: "business-systems",
    title: { fa: "سیستم‌های کسب‌وکار", en: "Business systems" },
    description: {
      fa: "ابزارهای داخلی که فرایند واقعی یک شرکت را مدل می‌کنند: نقش‌ها، اسناد، تأییدها و گزارش.",
      en: "Internal tools that model how a company actually works — roles, documents, approvals and reporting.",
    },
    stack: ["NestJS", "Prisma", "PostgreSQL", "RBAC"],
  },
  {
    id: "ecommerce",
    title: { fa: "فروشگاه اینترنتی", en: "E-commerce" },
    description: {
      fa: "کاتالوگ، جستجو، سبد خرید و پرداخت؛ برای خرده‌فروشی و فروش عمده.",
      en: "Catalogue, search, cart and checkout — for retail and wholesale.",
    },
    stack: ["Next.js", "Payment gateways", "SEO"],
  },
  {
    id: "saas",
    title: { fa: "محصولات SaaS", en: "SaaS products" },
    description: {
      fa: "محصولات چندکاربره با احراز هویت، نقش‌ها و استقرار پیوسته.",
      en: "Multi-user products with authentication, roles and continuous deployment.",
    },
    stack: ["Next.js", "Supabase", "Turborepo", "Vercel"],
  },
  {
    id: "erp-crm",
    title: { fa: "ERP / CRM", en: "ERP / CRM" },
    description: {
      fa: "مالی، انبار، تولید، فروش و مشتری در یک مدل داده یکپارچه.",
      en: "Finance, inventory, production, sales and customers on one coherent data model.",
    },
    stack: ["Domain modelling", "Prisma", "Audit logs"],
  },
  {
    id: "automation",
    title: { fa: "اتوماسیون", en: "Automation" },
    description: {
      fa: "حذف کار تکراری: محاسبات خودکار، اعلان‌ها، زمان‌بندی‌ها و اتصال سرویس‌ها.",
      en: "Removing repetitive work — automatic calculations, notifications, schedules and integrations.",
    },
    stack: ["Webhooks", "Cron jobs", "Queues", "APIs"],
  },
  {
    id: "ai",
    title: { fa: "محصولات مبتنی بر AI", en: "AI products" },
    description: {
      fa: "اضافه کردن مدل‌های زبانی به جریان کار واقعی؛ جایی که واقعاً زمان صرفه‌جویی می‌کند.",
      en: "Putting language models into real workflows — where they actually save time.",
    },
    stack: ["LLM APIs", "Tool use", "RAG"],
  },
  {
    id: "dashboards",
    title: { fa: "داشبوردها", en: "Dashboards" },
    description: {
      fa: "داده خام را به تصمیم تبدیل می‌کنم: KPI، نمودار و جدول‌هایی که خوانا می‌مانند.",
      en: "Turning raw data into decisions — KPIs, charts and tables that stay readable.",
    },
    stack: ["React", "Charts", "SQL"],
  },
  {
    id: "web-apps",
    title: { fa: "وب‌اپلیکیشن سفارشی", en: "Custom web applications" },
    description: {
      fa: "وقتی هیچ محصول آماده‌ای مسئله را حل نمی‌کند: از مدل داده تا رابط کاربری.",
      en: "When no off-the-shelf product fits — from the data model to the interface.",
    },
    stack: ["TypeScript", "React", "Node.js"],
  },
];
