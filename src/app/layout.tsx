import { Toaster } from "sonner";
import "./styles.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <SidebarProvider>
            <SidebarTrigger />
            {children}
            <Toaster />
          </SidebarProvider>
        </main>
      </body>
    </html>
  );
}
