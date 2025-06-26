'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  ClipboardPlus,
  FileText,
  CreditCard,
  BrainCircuit,
  LogOut,
  Package,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/delivery-entry', label: 'Delivery Entry', icon: ClipboardPlus },
  { href: '/pod-view', label: 'POD View', icon: FileText },
  { href: '/payments', label: 'Payments', icon: CreditCard },
  { href: '/ai-suggestor', label: 'AI Service Suggestor', icon: BrainCircuit },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    }
    router.push('/login');
  };

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Package className="h-8 w-8 text-sidebar-primary" />
          <h1 className="font-headline text-xl font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            DSR Hub
          </h1>
        </Link>
      </SidebarHeader>
      
      <Separator className="bg-sidebar-border group-data-[collapsible=icon]:hidden" />

      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
                tooltip={{ children: item.label, side: 'right', className: "bg-popover text-popover-foreground" }}
                className={cn(
                  "justify-start",
                  pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
                    ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <Separator className="bg-sidebar-border group-data-[collapsible=icon]:hidden" />

      <SidebarFooter className="p-2">
        <SidebarMenu>
            <SidebarMenuItem>
                 <SidebarMenuButton 
                     asChild
                     isActive={pathname === '/settings'}
                     tooltip={{ children: "Settings", side: 'right', className: "bg-popover text-popover-foreground" }}
                     className={cn(
                         "justify-start",
                         pathname === '/settings'
                         ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                         : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                     )}
                 >
                    <Link href="/settings">
                        <Settings className="h-5 w-5" />
                        <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                    </Link>
                 </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton 
                    onClick={handleLogout}
                    className="justify-start hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer"
                    tooltip={{ children: "Logout", side: 'right', className: "bg-popover text-popover-foreground"}}
                >
                    <LogOut className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
