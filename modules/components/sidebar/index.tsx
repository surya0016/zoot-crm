import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { AppSidebar } from "./main-section"

const HomeSidebar = () => {
  return (
    <Sidebar collapsible="offcanvas" className="pt-16 z-40">
      <SidebarContent className="bg-background">
        <AppSidebar/>
      </SidebarContent>
    </Sidebar>
  )
}

export default HomeSidebar