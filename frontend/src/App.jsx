import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate
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
import Create from "@/pages/create";
import { Toaster } from "@/components/ui/sonner";
import { Helmet } from "react-helmet";

function Layout() {
  const location = useLocation(); // ✅ Now inside Router context
  const pathname = location.pathname;

  const breadcrumbLabel =
    pathname === "/home"
      ? "Home"
      : pathname === "/links"
      ? "Links"
      : pathname === "/analytics"
      ? "Analytics"
      : pathname === "/create"
      ? "Create"
      : "Home";

 

  return (
    <div className="overflow-hidden flex h-screen bg-gray-50">
      <Helmet>
        <title>{breadcrumbLabel} | snaplink</title>
      </Helmet>
      
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1 " />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">snaplink</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>{breadcrumbLabel}</BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-col items-center w-full mx-auto px-4 py-8 space-y-8">
            <div className="w-full overflow-scroll">
              <Routes>
                <Route path="/" element={<Navigate to="/home"/>}  />
                <Route path="/*" element={<Navigate to="/home"/>} />
                <Route path="/home" element={<Home />} />
                <Route path="/links" element={<Links />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/create" element={<Create />} />
              </Routes>
              <Toaster />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
