import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Celebrity Vault",
	description:
		"Secure celebrity information management system for the world's most discerning hackers.",
	keywords: [
		"celebrity",
		"management",
		"security",
		"privacy",
		"hacker",
		"information",
	],
	authors: [{ name: "Anonymous Hacker" }],
	viewport: {
		width: "device-width",
		initialScale: 1,
		maximumScale: 1,
	},
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`min-w-[340px] bg-background ${inter.className}`}>
				{" "}
				{children}
			</body>
		</html>
	);
}
