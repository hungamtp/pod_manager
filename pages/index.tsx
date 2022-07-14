import DashBoard from "@/components/common/dash-board";
import DashBoardFactory from "@/pages/factory/dash-board";
import Footer from "@/components/common/footer";
import { useAppSelector } from "@/components/hooks/reduxHook";
import { MainLayout } from "@/components/layouts";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../models";

const Home: NextPageWithLayout = () => {
  const auth = useAppSelector((state) => state.auth);
  // const router = useRouter();
  // if (!auth.isAuth) {
  //   router.push("/login");
  // }
  return (
    <main>
      {auth.roleName === "ADMIN" ? <DashBoard /> : <DashBoardFactory />}
    </main>
  );
};

export default Home;
Home.Layout = MainLayout;
