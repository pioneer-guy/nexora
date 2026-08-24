import "./globals.css";
import "./learning-links.css";
import "./ui-overrides.css";
import "./market.css";
import "./trend-actions.css";
import Link from "next/link";
export const metadata={title:"NEXORA — Know the path. Prove the skill.",description:"Career intelligence and evidence-based skill assessment."};
export default function Layout({children}){return <html lang="en"><body><Link className="globalAbout" href="/about">About</Link>{children}</body></html>}