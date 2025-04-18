import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Praveen Nair",
  description: "Full Stack Corporate Trainer",
};
import Header from "./Header";
import Footer from "./Footer";
import { AppContextProvider } from "@/context/appContext";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppContextProvider>
          <Header />
          <div className="App-Container">{children}</div>
          <Footer />
        </AppContextProvider>
      </body>
    </html>
  );
}
