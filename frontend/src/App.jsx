import {
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Links from "@/pages/Links";
import Analytics from "@/pages/Analytics";
import Home from "@/pages/Home";
import Create from "@/pages/Create";
import { Toaster } from "@/components/ui/sonner";
import { Helmet } from "react-helmet";
import { LinkDetail } from "./pages/LinkDetail";

function App() {
  const location = useLocation();
  const pathname = location.pathname;

  const breadcrumbLabel = {
    "/home": "Home",
    "/links": "Links",
    "/analytics": "Analytics",
    "/create": "Create",
  }[pathname] || "Home";


  return (
  <div className="overflow-hidden flex h-screen bg-gray-50 font-proximasemibold font-normal">
      <Helmet>
        <title>{breadcrumbLabel} | Snaplink</title>
      </Helmet>

      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Snaplink</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>{breadcrumbLabel}</BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-col items-center w-full mx-auto px-4 py-8 space-y-8">
            <div className="w-full overflow-auto">
              <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/links" element={<Links />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/create" element={<Create />} />
                <Route path="/link/:shorid/detail" element={<LinkDetail/>} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
              <Toaster />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
   );
}


export default App;
