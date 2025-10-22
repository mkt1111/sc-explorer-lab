import { NavLink, useLocation } from "react-router-dom";
import { BookOpen, Binary, Calculator, Cpu, Lightbulb, FlaskConical } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const modules = [
  { title: "Introduction to SC", url: "/", icon: BookOpen },
  { title: "Bit Streams & Representation", url: "/bit-streams", icon: Binary },
  { title: "Basic Operations", url: "/operations", icon: Calculator },
  { title: "Advanced Circuits", url: "/circuits", icon: Cpu },
  { title: "Applications & Limits", url: "/applications", icon: Lightbulb },
  { title: "Interactive Simulator", url: "/simulator", icon: FlaskConical },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        {state !== "collapsed" && (
          <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Stochastic Computing Explorer
          </h2>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Learning Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((module) => (
                <SidebarMenuItem key={module.title}>
                  <SidebarMenuButton asChild isActive={isActive(module.url)}>
                    <NavLink to={module.url}>
                      <module.icon className="h-4 w-4" />
                      <span>{module.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
