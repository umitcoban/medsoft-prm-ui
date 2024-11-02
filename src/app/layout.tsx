import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App } from "antd";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MedSoft",
  description: "Umit Coban MedSoft Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <App>
            {children}
          </App>
        </AntdRegistry>
      </body>
    </html>
  );
}
