import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "TAMAForge",
  description: "SA:MP Resource Hub & Modding Center"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
