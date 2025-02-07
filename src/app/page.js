import BarChart from "@/components/BarChart";
import TransactionDashboard from "@/components/TransactionDashboard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-custom-gradient">
      {/* <TransactionDashboard/> */}
      <BarChart/>
    </div>
  );
}
