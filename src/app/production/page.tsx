import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import Footer from "@/components/common/Footer";
import ProductionDashboard from "@/components/production/ProductionDashboard";

export default function ProductionPage() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6">
            <ProductionDashboard />
          </main>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
