import { useEffect, useState } from "react"; //useState stores dashboard data and useEffect runs the APPI request when dashboard loads
import {
  Package,
  Boxes,
  AlertTriangle,
  CircleOff,
} from "lucide-react";

import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import StatCard from "./StatCard";
import InventoryList from "./InventoryList";
import Inventory from "../Inventory";
import Sales from "../Sales";
import Customers from "../Customers";
import Intelligence from "../Intelligence";

function DashboardLayout({ role }) {

  const [activeSection, setActiveSection] = useState("Overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] = useState(null);
  const [inventoryDetails, setInventoryDetails] = useState(null);

  useEffect(() => { //run the code after component is rendered

  const fetchInventory = async () => {

    try {

        //summary card
      const response = await fetch( //await means wait for the server to respond before continuing
        "http://127.0.0.1:8000/dashboard/inventory"
      );

      const data = await response.json(); //FastAPI returns JSON

      if (!response.ok) {
        console.error("Inventory API error:", data);
        return;
      }

      setInventory(data); //saves data
      
      //inevntory details
     const detailsResponse = await fetch(
        "http://127.0.0.1:8000/dashboard/inventory/details"
        );

        const detailsData = await detailsResponse.json();

        if (detailsResponse.ok) {
        setInventoryDetails(detailsData);
        }

    } catch (error) {

      console.error("Failed to fetch inventory:", error);

    }

  };

  fetchInventory();

}, []); //empty array [] is called dependency array

  return (
    <div className="flex min-h-screen bg-slate-50">

      <DashboardSidebar
        role={role}
        activeSection={activeSection}
        onSectionChange={setActiveSection} //sidebar send info backup through
      />

      <div className="flex-1">

        <DashboardHeader
         role={role}
        onLogout={() => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("customer_id");
          localStorage.removeItem("customer_name");
          localStorage.removeItem("customer_email");
          localStorage.removeItem("customer_role");

          window.location.reload();
        }}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        />

        <main className="min-w-0 p-6 lg:p-8">

          {activeSection === "Overview" && (
            <div className="pt-1">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                  Overview
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  A high-level view of your store's current performance and operations.
                </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 pt-8" >

            <StatCard
              title="Total Products"
              value={inventory ? inventory.total_products : "—"}
              description="Products in catalog"
              icon={Package}
            />
              <StatCard
                title="Total Stock"
                value={inventory ? inventory.total_stock : "—"}
                description="Units currently available"
                icon={Boxes}
              />

              <StatCard
                title="Low Stock"
                value={inventory ? inventory.low_stock : "—"}
                description="Products needing attention"
                icon={AlertTriangle}
              />
            <StatCard
              title="Out of Stock"
              value={inventory ? inventory.out_of_stock : "—"}
              description="Products currently unavailable"
              icon={CircleOff}
            />
              </div >
              </div> 
          )}

        {activeSection === "Inventory" && (
             <Inventory />
        )}

        {activeSection === "Sales" && (
            <Sales />
        )}

        {activeSection === "Customers" && (
            <Customers />
        )}

        {activeSection === "Intelligence" && (
            <Intelligence />
        )}

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;