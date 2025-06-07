
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
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bookmark, Pin, Share, Folder } from "lucide-react";

// Navigation items
const navigationItems = [
  {
    title: "All Bookmarks",
    icon: Bookmark,
    count: 324,
    active: true,
  },
  {
    title: "Pinned",
    icon: Pin,
    count: 12,
  },
  {
    title: "Shared",
    icon: Share,
    count: 8,
  },
  {
    title: "Trash",
    icon: Folder,
    count: 3,
  },
];

interface AppSidebarProps {
  selectedProfile: string;
  setSelectedProfile: (profile: string) => void;
}

export function AppSidebar({ selectedProfile, setSelectedProfile }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-slate-200 bg-white">
      <SidebarHeader className="border-b border-slate-200 p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <Bookmark className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">Resorcify</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    className={`w-full justify-between p-3 rounded-lg transition-all duration-200 ${
                      item.active 
                        ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-slate-200">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Profile
          </label>
          <Select value={selectedProfile} onValueChange={setSelectedProfile}>
            <SelectTrigger className="w-full bg-slate-50 border-slate-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Work">🏢 Work</SelectItem>
              <SelectItem value="Personal">🏠 Personal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
