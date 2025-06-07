
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { FolderSidebar } from "@/components/FolderSidebar";
import { TopBar } from "@/components/TopBar";
import { MainContent } from "@/components/MainContent";

const Index = () => {
  const [selectedProfile, setSelectedProfile] = useState("Work");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-slate-50 flex w-full">
      <SidebarProvider>
        <AppSidebar 
          selectedProfile={selectedProfile} 
          setSelectedProfile={setSelectedProfile} 
        />
        <FolderSidebar />
        <div className="flex-1 flex flex-col">
          <TopBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          <MainContent 
            searchQuery={searchQuery}
            viewMode={viewMode}
          />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
