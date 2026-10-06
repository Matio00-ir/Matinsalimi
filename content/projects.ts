import type { Project } from "./types";

/**
 * Project registry. Every scene in the Work section is generated from this list.
 *
 * To add a project: append an object, give it an `order`, and (optionally) drop
 * screenshots into /public/work/<slug>/ and list them in `media`. Until media
 * exists, an interface schematic of the chosen `schematic` kind is drawn.
 *
 * Content rule: only real facts. `result` stays empty until there is a
 * verifiable outcome to state.
 */
const projects: Project[] = [
  {
    slug: "ravand",
    order: 1,
    featured: true,
    wordmark: "RAVAND",
    title: { fa: "روند", en: "RAVAND" },
    category: { fa: "پلتفرم ERP / CRM و گردش کار", en: "ERP / CRM & workflow platform" },
    summary: {
      fa: "پلتفرم ماژولار مدیریت کسب‌وکار و گردش کار، به همراه وبسایت محصول دوزبانه.",
      en: "A modular business-management and workflow platform, with its bilingual product website.",
    },
    problem: {
      fa: "فرایندهای کسب‌وکار پراکنده و بی‌ارتباط؛ فروش، اسناد و گزارش‌ها هرکدام در یک ابزار جدا.",
      en: "Disconnected business processes — sales, documents and reporting each living in a separate tool.",
    },
    solution: {
      fa: "یک پلتفرم ماژولار که ماژول‌ها، گردش کار و گزارش‌ها را در یک سیستم واحد جمع می‌کند.",
      en: "A modular platform that brings modules, workflows and reporting into one system.",
    },
    highlights: [
      { fa: "وبسایت محصول فارسی‌محور و دوزبانه با SSG", en: "Persian-first, bilingual product site with SSG" },
      { fa: "پیکربندی‌کننده تعاملی: انتخاب مدل کسب‌وکار، بازچینی سطح محصول", en: "Interactive configurator: choose a business model, the product surface reconfigures" },
      { fa: "داده ساختاریافته و ساختار آماده SEO", en: "Structured data and SEO-ready architecture" },
      { fa: "ویدئوهای محصول با Remotion", en: "Product videos rendered with Remotion" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "next-intl", "PostgreSQL", "Remotion"],
    capabilities: ["erp-crm", "business-systems", "saas", "dashboards"],
    schematic: "erp",
    media: [
      { src: "/work/ravand/home.webp", alt: { fa: "وبسایت روند", en: "RAVAND website" }, width: 2400, height: 1500 },
      { src: "/work/ravand/dashboard.webp", alt: { fa: "داشبورد نمای کلی کسب‌وکار", en: "Business overview dashboard" }, width: 2400, height: 1500 },
      { src: "/work/ravand/finance.webp", alt: { fa: "ماژول مالی", en: "Finance module" }, width: 2400, height: 1500 },
      { src: "/work/ravand/sales.webp", alt: { fa: "ماژول فروش", en: "Sales module" }, width: 2400, height: 1500 },
    ],
  },
  {
    slug: "rang-goonagoon",
    order: 2,
    featured: true,
    wordmark: "GOONAGOON",
    title: { fa: "رنگ گوناگون", en: "Rang Goonagoon" },
    category: { fa: "سیستم مدیریت کسب‌وکار تولیدی و تجاری", en: "Business system for manufacturing & trade" },
    summary: {
      fa: "سیستم جامع مدیریت مالی، موجودی و تولید برای کسب‌وکارهای تولیدی و تجاری.",
      en: "An end-to-end finance, inventory and production system for manufacturing and trading businesses.",
    },
    problem: {
      fa: "وقتی اطلاعات مالی، انبار و تولید جدا از هم باشد، سود واقعی هر محصول مشخص نیست.",
      en: "When finance, stock and production data live apart, the true profitability of each product stays unclear.",
    },
    solution: {
      fa: "یک سیستم یکپارچه با گزارش‌های مالی، محاسبه خودکار بهای تمام‌شده و برنامه‌ریزی تولید.",
      en: "One integrated system with financial reports, automatic cost-of-goods calculation and production planning.",
    },
    highlights: [
      { fa: "صورت سود و زیان، جریان نقدی و داشبورد مالی", en: "Income statement, cash flow and a financial overview dashboard" },
      { fa: "مدیریت موجودی با محاسبه خودکار COGS", en: "Inventory with automatic COGS valuation" },
      { fa: "محاسبه حداکثر ظرفیت تولید", en: "Maximum-production capacity planning" },
      { fa: "دریافتنی‌ها و پرداختنی‌ها، RBAC و Audit Log", en: "Receivables & payables, RBAC and audit logging" },
    ],
    stack: ["Next.js", "NestJS", "Prisma", "TypeScript", "Docker", "Monorepo"],
    capabilities: ["business-systems", "erp-crm", "dashboards", "automation"],
    schematic: "erp",
    media: [
      { src: "/work/rang-goonagoon/dashboard.webp", alt: { fa: "داشبورد مدیریتی", en: "Management dashboard" }, width: 2400, height: 1500 },
      { src: "/work/rang-goonagoon/finance.webp", alt: { fa: "نمای کلی مالی", en: "Financial overview" }, width: 2400, height: 1500 },
      { src: "/work/rang-goonagoon/production.webp", alt: { fa: "محاسبه بهای تمام‌شده تولید", en: "Production cost calculation" }, width: 2400, height: 1500 },
      { src: "/work/rang-goonagoon/warehouse.webp", alt: { fa: "انبار و قیمت‌ها (FIFO)", en: "Warehouse & pricing (FIFO)" }, width: 2400, height: 1500 },
      { src: "/work/rang-goonagoon/invoices.webp", alt: { fa: "فاکتورها و وضعیت پرداخت", en: "Invoices & payment status" }, width: 2400, height: 1500 },
    ],
  },
  {
    slug: "coachly",
    order: 3,
    featured: true,
    wordmark: "COACHLY",
    title: { fa: "کوچلی", en: "Coachly" },
    category: { fa: "SaaS مدیریت مربیگری", en: "Coaching-management SaaS" },
    status: "beta",
    summary: {
      fa: "پلتفرم مدیریت مربیگری با پنل مربی، پنل ورزشکار و سایت معرفی.",
      en: "A coaching-management platform with a coach panel, athlete panel and marketing site.",
    },
    problem: {
      fa: "برنامه‌ها، ورزشکاران و پیگیری‌های مربی به جای پیام‌رسان و فایل‌های پراکنده، به یک فضای واحد نیاز دارند.",
      en: "A coach's programs, athletes and follow-ups need one home instead of chats and scattered files.",
    },
    solution: {
      fa: "یک SaaS نقش‌محور: مربی ورزشکار می‌سازد، کتابخانه تمرین دارد و برنامه طراحی می‌کند.",
      en: "A role-based SaaS: coaches provision athletes, keep an exercise library and build programs.",
    },
    highlights: [
      { fa: "احراز هویت و داشبورد وابسته به نقش", en: "Authentication with a role-aware dashboard" },
      { fa: "مدیریت ورزشکاران و کتابخانه تمرین (عمومی + اختصاصی)", en: "Athlete management and an exercise library (global + custom)" },
      { fa: "Monorepo با Turborepo؛ استقرار خودکار روی Vercel", en: "Turborepo monorepo with automatic Vercel deployments" },
      { fa: "در حال اجرا به صورت بتای خصوصی", en: "Running as a live private beta" },
    ],
    stack: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "Turborepo", "Vercel"],
    capabilities: ["saas", "web-apps", "dashboards"],
    schematic: "coaching",
    media: [
      { src: "/work/coachly/site.webp", alt: { fa: "وبسایت کوچلی", en: "Coachly website" }, width: 2400, height: 1500 },
      { src: "/work/coachly/coach.webp", alt: { fa: "داشبورد مربی", en: "Coach dashboard" }, width: 2400, height: 1500 },
      { src: "/work/coachly/athlete.webp", alt: { fa: "داشبورد ورزشکار", en: "Athlete dashboard" }, width: 2400, height: 1500 },
    ],
  },
  {
    slug: "ava-exir",
    order: 4,
    featured: true,
    wordmark: "AVA EXIR",
    title: { fa: "آوا اکسیر", en: "Ava Exir" },
    category: { fa: "سیستم عملیات داخلی تولید", en: "Internal operations system for manufacturing" },
    status: "internal",
    summary: {
      fa: "سیستم داخلی برای مدیریت فرمول ساخت، مواد اولیه، انبار، سفارش و پیش‌فاکتور.",
      en: "An internal system for production formulas, raw materials, warehouse, orders and invoicing.",
    },
    problem: {
      fa: "فرمول ساخت، موجودی مواد اولیه و سفارش‌ها باید به هم متصل باشند، نه در دفترهای جدا.",
      en: "Production formulas, raw-material stock and orders need to be connected, not kept in separate ledgers.",
    },
    solution: {
      fa: "یک سیستم با دسترسی نقش‌محور که فرمول محصول را به انبار، سفارش و فاکتور وصل می‌کند.",
      en: "A role-based system linking each product formula to stock movements, orders and invoices.",
    },
    highlights: [
      { fa: "فرمول ساخت (BOM) برای هر محصول", en: "Bill-of-materials formula per product" },
      { fa: "رسید و حواله انبار و تردد موجودی", en: "Warehouse receipts, dispatches and stock movements" },
      { fa: "سفارش، مشتری و صدور پیش‌فاکتور", en: "Orders, customers and pro-forma invoicing" },
      { fa: "۴ نقش با RBAC، Audit Log و اعلان‌ها", en: "Four roles with RBAC, audit log and notifications" },
    ],
    stack: ["Next.js", "NestJS", "Prisma", "TypeScript", "Docker"],
    capabilities: ["business-systems", "erp-crm", "web-apps"],
    schematic: "erp",
    media: [
      { src: "/work/ava-exir/dashboard.webp", alt: { fa: "داشبورد", en: "Dashboard" }, width: 2400, height: 1500 },
      { src: "/work/ava-exir/warehouse.webp", alt: { fa: "موجودی و تردد انبار", en: "Stock & warehouse movements" }, width: 2400, height: 1500 },
      { src: "/work/ava-exir/orders.webp", alt: { fa: "سفارش‌ها", en: "Orders" }, width: 2400, height: 1500 },
      { src: "/work/ava-exir/invoices.webp", alt: { fa: "فاکتور و پیش‌فاکتور", en: "Invoices & pro-formas" }, width: 2400, height: 1500 },
      { src: "/work/ava-exir/prices.webp", alt: { fa: "نرخ مواد اولیه", en: "Raw-material prices" }, width: 2400, height: 1500 },
    ],
  },
  {
    slug: "chasb-market",
    order: 5,
    featured: true,
    wordmark: "CHASB",
    title: { fa: "چسب‌مارکت", en: "Chasb Market" },
    category: { fa: "فروشگاه اینترنتی B2C + B2B", en: "B2C + B2B e-commerce" },
    status: "prototype",
    summary: {
      fa: "فروشگاه تخصصی چسب صنعتی و محصولات مراقبت خودرو برای مشتری عادی و عمده.",
      en: "A specialist store for industrial adhesives and car-care products, for retail and wholesale buyers.",
    },
    problem: {
      fa: "فروش هم‌زمان به مصرف‌کننده و خریدار عمده با قیمت‌گذاری و مسیر خرید متفاوت.",
      en: "Selling to consumers and wholesale buyers at once, with different pricing and purchase paths.",
    },
    solution: {
      fa: "پروتوتایپ قابل ارائه با کد Production-oriented تا اتصال به بک‌اند واقعی ساده باشد.",
      en: "A presentable prototype on production-oriented code, so wiring a real backend stays simple.",
    },
    highlights: [
      { fa: "مسیر خرید جدا برای B2C و B2B", en: "Separate B2C and B2B purchase flows" },
      { fa: "TypeScript در حالت strict، بدون UI-kit", en: "Strict TypeScript, no UI kit" },
      { fa: "داده Mock با ساختار آماده انتقال به API", en: "Mock data shaped for a drop-in API" },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    capabilities: ["ecommerce", "web-apps"],
    schematic: "commerce",
    media: [
      { src: "/work/chasb-market/home.webp", alt: { fa: "صفحه اصلی", en: "Home page" }, width: 2400, height: 1367 },
      { src: "/work/chasb-market/shop.webp", alt: { fa: "فروشگاه و فیلترها", en: "Shop & filters" }, width: 2400, height: 1367 },
      { src: "/work/chasb-market/product.webp", alt: { fa: "صفحه محصول با قیمت پلکانی", en: "Product page with tiered pricing" }, width: 2400, height: 1367 },
      { src: "/work/chasb-market/wholesale.webp", alt: { fa: "خرید عمده (B2B)", en: "Wholesale (B2B)" }, width: 2400, height: 1367 },
    ],
  },
  {
    slug: "darookhane-mosbat",
    order: 6,
    featured: true,
    wordmark: "MOSBAT",
    title: { fa: "داروخانه مثبت", en: "Darookhane Mosbat" },
    category: { fa: "فروشگاه مکمل و محصولات داروخانه‌ای", en: "Pharmacy & supplements e-commerce" },
    status: "prototype",
    summary: {
      fa: "فروشگاه تخصصی مکمل ورزشی، ویتامین و محصولات داروخانه‌ای، RTL و فارسی.",
      en: "A specialist store for supplements, vitamins and pharmacy products — RTL, Persian-first.",
    },
    problem: {
      fa: "کاتالوگ بزرگ و چندسطحی که بدون معماری اطلاعات دقیق، پیدا کردن محصول را سخت می‌کند.",
      en: "A large, multi-level catalogue where finding a product fails without precise information architecture.",
    },
    solution: {
      fa: "معماری اطلاعات، ناوبری، جستجو و تجربه خرید؛ آماده اضافه شدن PostgreSQL و API بدون بازنویسی.",
      en: "Information architecture, navigation, search and checkout UX — ready for PostgreSQL + API without a rewrite.",
    },
    highlights: [
      { fa: "دسته‌بندی چندسطحی و صفحه محصول", en: "Multi-level categories and product pages" },
      { fa: "سبد خرید با Context + useReducer", en: "Cart built on Context + useReducer" },
      { fa: "Design tokens در Tailwind v4", en: "Design tokens on Tailwind v4" },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    capabilities: ["ecommerce", "web-apps"],
    schematic: "commerce",
    media: [
      { src: "/work/darookhane-mosbat/home.webp", alt: { fa: "صفحه اصلی", en: "Home page" }, width: 2400, height: 1367 },
      { src: "/work/darookhane-mosbat/category.webp", alt: { fa: "دسته‌بندی و فیلترها", en: "Category & filters" }, width: 2400, height: 1367 },
      { src: "/work/darookhane-mosbat/product.webp", alt: { fa: "صفحه محصول", en: "Product page" }, width: 2400, height: 1367 },
    ],
  },
  {
    slug: "aramesh-clinic",
    order: 9,
    featured: true,
    wordmark: "ARAMESH",
    title: { fa: "کلینیک آرامش", en: "Aramesh Clinic" },
    category: { fa: "سایت کلینیک و نوبت‌دهی آنلاین", en: "Clinic website & online booking" },
    summary: {
      fa: "سایت کلینیک روان‌پزشکی با نوبت‌دهی، پرداخت آنلاین و مقالات.",
      en: "A psychiatry clinic website with appointment booking, online payment and articles.",
    },
    problem: {
      fa: "بیماران باید بتوانند زمان‌های خالی پزشک را ببینند و آنلاین نوبت بگیرند و پرداخت کنند.",
      en: "Patients need to see doctors' open slots, then book and pay online.",
    },
    solution: {
      fa: "فرانت‌اند Mobile-First و بک‌اند سبک با زمان‌بندی پزشکان و اتصال آماده به درگاه پرداخت.",
      en: "A mobile-first frontend and a lightweight backend with doctor schedules and a payment gateway integration.",
    },
    highlights: [
      { fa: "نوبت‌دهی بر اساس زمان‌های خالی پزشک", en: "Booking against doctors' available slots" },
      { fa: "اتصال درگاه پرداخت زرین‌پال", en: "Zarinpal payment gateway integration" },
      { fa: "دیتابیس فایلی SQLite؛ بدون نیاز به سرور دیتابیس", en: "File-based SQLite — no database server to run" },
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "SQLite"],
    capabilities: ["web-apps", "business-systems"],
    schematic: "booking",
    media: [
      { src: "/work/aramesh-clinic/home.webp", alt: { fa: "صفحه اصلی", en: "Home page" }, width: 2400, height: 1500 },
      { src: "/work/aramesh-clinic/booking.webp", alt: { fa: "رزرو نوبت مرحله‌به‌مرحله", en: "Step-by-step booking" }, width: 2400, height: 1500 },
      { src: "/work/aramesh-clinic/blog.webp", alt: { fa: "مجله سلامت روان", en: "Mental-health journal" }, width: 2400, height: 1500 },
    ],
  },
  {
    slug: "yadak-mart",
    order: 7,
    featured: true,
    wordmark: "YADAK MART",
    title: { fa: "یدک‌مارت", en: "Yadak Mart" },
    category: { fa: "فروشگاه اینترنتی لوازم یدکی خودرو", en: "Auto-parts e-commerce" },
    status: "prototype",
    summary: {
      fa: "فروشگاه لوازم یدکی با جستجوی قطعه بر اساس خودرو، فیلتر برند و دسته‌بندی، و مسیر خرید کامل.",
      en: "An auto-parts store with vehicle-based part search, brand and category filters, and a full checkout flow.",
    },
    problem: {
      fa: "خریدار لوازم یدکی باید مطمئن باشد قطعه دقیقاً با خودروی او سازگار است.",
      en: "A parts buyer needs certainty that the part actually fits their car.",
    },
    solution: {
      fa: "انتخاب برند، مدل، سال و نوع موتور خودرو و نمایش فقط قطعات سازگار؛ همراه با سازگاری در صفحه هر محصول.",
      en: "Pick brand, model, year and engine to see only compatible parts — with fitment shown on every product page.",
    },
    highlights: [
      { fa: "جستجوی قطعه بر اساس خودرو", en: "Shop-by-vehicle part finder" },
      { fa: "فیلتر دسته‌بندی و برند، سبد خرید و علاقه‌مندی‌ها", en: "Category and brand filters, cart and wishlist" },
      { fa: "صفحه محصول با کد فنی و خودروهای سازگار", en: "Product pages with part numbers and compatible vehicles" },
      { fa: "مسیر تسویه حساب و حساب کاربری", en: "Checkout flow and user account" },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    capabilities: ["ecommerce", "web-apps"],
    schematic: "commerce",
    media: [
      { src: "/work/yadak-mart/home.webp", alt: { fa: "صفحه اصلی", en: "Home page" }, width: 2400, height: 1367 },
      { src: "/work/yadak-mart/products.webp", alt: { fa: "کاتالوگ و فیلترها", en: "Catalogue & filters" }, width: 2400, height: 1367 },
      { src: "/work/yadak-mart/vehicle.webp", alt: { fa: "انتخاب خودرو", en: "Vehicle selector" }, width: 2400, height: 1367 },
      { src: "/work/yadak-mart/product.webp", alt: { fa: "صفحه محصول", en: "Product page" }, width: 2400, height: 1367 },
    ],
  },
  {
    slug: "pars-thermal",
    order: 8,
    featured: true,
    wordmark: "PARS THERMAL",
    title: { fa: "صنایع حرارتی پارس", en: "Pars Thermal Industries" },
    category: { fa: "سایت شرکتی دوزبانه + پنل مدیریت محتوا", en: "Bilingual corporate site + CMS" },
    status: "prototype",
    summary: {
      fa: "سایت شرکتی تجهیزات گرمایشی و سنجش حرارت صنعتی، با پنل مدیریت محتوا و ثبت درخواست مشاوره.",
      en: "A corporate site for industrial heating and thermal-measurement equipment, with a content admin and consultation requests.",
    },
    problem: {
      fa: "شرکت صنعتی به کاتالوگ محصولات، تولید محتوا و جذب درخواست مشاوره نیاز دارد؛ بدون وابستگی به برنامه‌نویس برای هر تغییر.",
      en: "An industrial company needs a product catalogue, content and consultation leads — without a developer for every change.",
    },
    solution: {
      fa: "برنامه‌ریزی کامل پیش از کد (نقشه سایت، مدل داده، معماری CMS و سئو) و سپس سایت دوزبانه با پنل مدیریت.",
      en: "Full planning before code (sitemap, data model, CMS architecture, SEO), then a bilingual site with its own admin panel.",
    },
    highlights: [
      { fa: "فارسی و انگلیسی؛ sitemap و robots", en: "Persian and English; sitemap and robots" },
      { fa: "محصولات، خدمات، مقالات و صفحات قابل مدیریت", en: "Manageable products, services, articles and pages" },
      { fa: "فرم مشاوره که درخواست‌ها را به‌عنوان Lead ذخیره می‌کند", en: "Consultation form that stores requests as leads" },
      { fa: "پنل مدیریت محافظت‌شده با اعتبارسنجی Zod", en: "Protected admin panel with Zod validation" },
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "Zod"],
    capabilities: ["web-apps", "business-systems"],
    schematic: "marketing",
    media: [
      { src: "/work/pars-thermal/home.webp", alt: { fa: "وبسایت", en: "Website" }, width: 2400, height: 1500 },
      { src: "/work/pars-thermal/products.webp", alt: { fa: "کاتالوگ محصولات", en: "Product catalogue" }, width: 2400, height: 1500 },
      { src: "/work/pars-thermal/admin-products.webp", alt: { fa: "پنل مدیریت: محصولات", en: "Admin: products" }, width: 2400, height: 1500 },
      { src: "/work/pars-thermal/admin-dashboard.webp", alt: { fa: "پنل مدیریت: داشبورد", en: "Admin: dashboard" }, width: 2400, height: 1500 },
    ],
  },
  {
    slug: "laneh",
    order: 10,
    featured: true,
    wordmark: "LANEH",
    title: { fa: "لانه", en: "Laneh" },
    category: { fa: "فروشگاه دکوراسیون و اشیای خانه", en: "Home-decor storefront" },
    status: "prototype",
    summary: {
      fa: "فروشگاه روشنایی، دکور، گلدان، آینه و مبلمان کوچک با طراحی آرام و ادیتوریال.",
      en: "A storefront for lighting, decor, vases, mirrors and small furniture, with a calm, editorial design.",
    },
    problem: {
      fa: "برندی با محصولات گزیده به ویترینی نیاز دارد که حس محصول را منتقل کند، نه یک قالب شلوغ فروشگاهی.",
      en: "A curated brand needs a storefront that conveys the feel of its products, not a crowded shop template.",
    },
    solution: {
      fa: "ویترین سبک بدون فریم‌ورک: صفحه اصلی، فروشگاه با فیلتر، صفحه محصول با رنگ‌بندی، سبد خرید و تسویه.",
      en: "A framework-free storefront: home, filterable shop, product pages with colour options, basket and checkout.",
    },
    highlights: [
      { fa: "فیلتر دسته‌بندی و مرتب‌سازی", en: "Category filters and sorting" },
      { fa: "انتخاب رنگ و تعداد در صفحه محصول", en: "Colour and quantity selection on product pages" },
      { fa: "سبد خرید و تسویه سمت کاربر", en: "Client-side basket and checkout" },
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    capabilities: ["ecommerce"],
    schematic: "commerce",
    media: [
      { src: "/work/laneh/home.webp", alt: { fa: "صفحه اصلی", en: "Home page" }, width: 2400, height: 1500 },
      { src: "/work/laneh/shop.webp", alt: { fa: "همه محصولات", en: "All products" }, width: 2400, height: 1500 },
      { src: "/work/laneh/product.webp", alt: { fa: "صفحه محصول", en: "Product page" }, width: 2400, height: 1500 },
    ],
  },
];

export const allProjects = [...projects].sort((a, b) => a.order - b.order);
export const featuredProjects = allProjects.filter((p) => p.featured);
