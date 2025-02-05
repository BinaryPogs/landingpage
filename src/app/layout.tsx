import "./globals.css";
import { Background } from "@/components/ui/background/Background";
import { Cursor } from "@/components/ui/cursor/Cursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Background>
          <div className="flex flex-col items-center justify-center min-h-screen">
            {children}
          </div>
          <Cursor />
        </Background>
      </body>
    </html>
  );
}
