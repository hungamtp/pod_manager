import DashBoard from "@/components/common/dash-board";
import Footer from "@/components/common/footer";
import { MainLayout } from "@/components/layouts";
import { NextPageWithLayout } from "../models";

const Home: NextPageWithLayout = () => {
  return (
    <main>
      <DashBoard />
    </main>
  );
};

export default Home;
Home.Layout = MainLayout;
