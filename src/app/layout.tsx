import { font } from './fonts'
import "./globals.css";
import { Background } from "@/components/ui/background/Background";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={font.variable}>
      <body>
        <Background>
          <div className="flex flex-col items-center justify-center min-h-screen">
            {children}
          </div>
        </Background>
      </body>
    </html>
  );
}
