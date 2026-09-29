import type { ToolCategory } from "@/lib/types";

export const TOOL_CATEGORIES: ToolCategory[] = [
  { id: "scan", name: { ar: "المسح والاستكشاف", en: "Scanning & Enumeration" }, icon: "Radar" },
  { id: "sniff", name: { ar: "الالتقاط والتحليل", en: "Sniffing & Analysis" }, icon: "FileSearch" },
  { id: "monitor", name: { ar: "المراقبة والرصد", en: "Monitoring & Observability" }, icon: "Activity" },
  { id: "wireless", name: { ar: "أدوات لاسلكية", en: "Wireless Tools" }, icon: "Wifi" },
  { id: "pentest", name: { ar: "اختبار الاختراق", en: "Penetration Testing" }, icon: "Swords" },
  { id: "webproxy", name: { ar: "الوكلاء والاعتراض", en: "Proxies & Interception" }, icon: "Waypoints" },
  { id: "utility", name: { ar: "أدوات النظام المدمجة", en: "Built-in Utilities" }, icon: "Terminal" },
  { id: "speed", name: { ar: "الأداء والسرعة", en: "Performance & Speed" }, icon: "Gauge" },
  { id: "simulate", name: { ar: "المحاكاة والمختبرات", en: "Simulators & Labs" }, icon: "FlaskConical" },
  { id: "ipcalc", name: { ar: "حاسبات IP والشبكات", en: "IP & Subnet Calculators" }, icon: "Calculator" },
  { id: "transfer", name: { ar: "نقل الملفات", en: "File Transfer" }, icon: "Share2" },
  { id: "remote", name: { ar: "الوصول البعيد", en: "Remote Access" }, icon: "MonitorSmartphone" },
  { id: "traffic", name: { ar: "توليد الحركة والاختبار", en: "Traffic Generation" }, icon: "Zap" },
  { id: "firewall", name: { ar: "الجدران النارية", en: "Firewalls & Appliances" }, icon: "BrickWall" },
  { id: "vpn", name: { ar: "VPN والأنفاق", en: "VPN & Tunneling" }, icon: "Lock" },
  { id: "dns", name: { ar: "أدوات DNS", en: "DNS Tools" }, icon: "Server" },
  { id: "automation", name: { ar: "الأتمتة والبنية ككود", en: "Automation & IaC" }, icon: "Bot" },
  { id: "crypto", name: { ar: "الشهادات والتشفير", en: "Certificates & Crypto" }, icon: "KeyRound" },
  { id: "craft", name: { ar: "صناعة الحزم", en: "Packet Crafting" }, icon: "Package" },
  { id: "mgmt", name: { ar: "منصات الإدارة", en: "Management Platforms" }, icon: "LayoutDashboard" },
  { id: "inventory", name: { ar: "الرسم والجرد", en: "Mapping & Inventory" }, icon: "Map" },
  { id: "log", name: { ar: "السجلات و SIEM", en: "Logs & SIEM" }, icon: "ScrollText" },
  { id: "cloud", name: { ar: "شبكات السحابة", en: "Cloud Networking" }, icon: "Cloud" },
  { id: "windows", name: { ar: "شبكات ويندوز", en: "Windows Networking" }, icon: "AppWindow" },
  { id: "hardware", name: { ar: "العتاد والفحص", en: "Hardware & Testing" }, icon: "HardDrive" },
];

export const toolCategoryById = (id: string): ToolCategory =>
  TOOL_CATEGORIES.find((c) => c.id === id) ?? TOOL_CATEGORIES[0];
