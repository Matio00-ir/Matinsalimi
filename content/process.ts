import type { ProcessStep } from "./types";

/** The nine stages of the "From idea to product" scene. Order matters: the visual is keyed to it. */
export const processSteps: ProcessStep[] = [
  {
    key: "idea",
    word: "IDEA",
    title: { fa: "ایده", en: "Idea" },
    body: { fa: "اول مسئله را می‌فهمم: چه کسی، چه کاری و چرا الان سخت است.", en: "First, the problem: who, doing what, and why it's hard today." },
    tools: ["Research", "Domain analysis"],
  },
  {
    key: "ux",
    word: "UX / UI",
    title: { fa: "تجربه و رابط کاربری", en: "UX / UI" },
    body: { fa: "جریان‌ها و صفحه‌ها پیش از هر خط کد طراحی می‌شوند.", en: "Flows and screens are shaped before a line of code exists." },
    tools: ["Wireframes", "Design systems", "RTL"],
  },
  {
    key: "architecture",
    word: "ARCHITECTURE",
    title: { fa: "معماری", en: "Architecture" },
    body: { fa: "مرز ماژول‌ها، سرویس‌ها و دسترسی‌ها مشخص می‌شود.", en: "Module boundaries, services and permissions get defined." },
    tools: ["Modular design", "Monorepo", "RBAC"],
  },
  {
    key: "database",
    word: "DATABASE",
    title: { fa: "دیتابیس", en: "Database" },
    body: { fa: "مدل داده‌ای که منطق کسب‌وکار را دقیق نگه دارد.", en: "A data model that keeps the business logic honest." },
    tools: ["PostgreSQL", "Prisma", "SQLite"],
  },
  {
    key: "backend",
    word: "BACKEND",
    title: { fa: "بک‌اند", en: "Backend" },
    body: { fa: "APIهای قابل اعتماد، اعتبارسنجی و قوانین کسب‌وکار.", en: "Reliable APIs, validation and business rules." },
    tools: ["NestJS", "Node.js", "Express", "REST"],
  },
  {
    key: "frontend",
    word: "FRONTEND",
    title: { fa: "فرانت‌اند", en: "Frontend" },
    body: { fa: "رابطی سریع، دوزبانه و دقیق تا آخرین پیکسل.", en: "A fast, bilingual interface, precise to the last pixel." },
    tools: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    key: "automation",
    word: "AUTOMATION",
    title: { fa: "اتوماسیون", en: "Automation" },
    body: { fa: "کارهای تکراری به سیستم سپرده می‌شوند.", en: "Repetitive work gets handed to the system." },
    tools: ["Webhooks", "Cron", "Notifications"],
  },
  {
    key: "deployment",
    word: "DEPLOYMENT",
    title: { fa: "استقرار", en: "Deployment" },
    body: { fa: "ساخت، تست و انتشار؛ تکرارپذیر و خودکار.", en: "Build, test, release — repeatable and automatic." },
    tools: ["Docker", "Vercel", "CI/CD"],
  },
  {
    key: "product",
    word: "PRODUCT",
    title: { fa: "محصول زنده", en: "Live product" },
    body: { fa: "همه لایه‌ها یک محصول می‌شوند؛ و کار تازه شروع شده است.", en: "Every layer becomes one product — and the real work begins." },
    tools: ["Monitoring", "Iteration"],
  },
];
