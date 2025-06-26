import type { ReactNode } from 'react';
import { AppSidebar } from '@/components/dsr/layout/app-sidebar';
import { AppHeader } from '@/components/dsr/layout/app-header';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <AppHeader />
          <main className="flex-1 overflow-y-auto p-4 pt-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
