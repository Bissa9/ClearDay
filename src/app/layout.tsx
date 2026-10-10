import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "ClearDay — Make today count",
  description: "A gentler productivity planner that matches your tasks to your energy, not just your calendar.",
  applicationName: "ClearDay",
  keywords: ["focus planner", "task manager", "energy-aware productivity", "daily planner"],
};
export const viewport: Viewport = { themeColor: "#f5f7f3", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
