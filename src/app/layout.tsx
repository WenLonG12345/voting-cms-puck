import { Toaster } from "sonner";
import "./styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
          <Toaster position="top-right" />
        </main>
      </body>
    </html>
  );
}
