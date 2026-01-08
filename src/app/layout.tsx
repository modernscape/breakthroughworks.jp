import {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "breakthroughworks.jp",
  description: "breakthroughworks.jp",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}

// import type {Metadata} from "next";
// import {Geist, Geist_Mono} from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "breakthroughworks.jp",
//   description: "breakthroughworks.jp",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
//     </html>
//   );
// }
