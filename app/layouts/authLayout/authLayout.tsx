//authlayout.jsx
import { Layout, Grid, Radio } from "antd";
import LeftSide from "./leftSide";
import RightSide from "./rightSide";
const { useBreakpoint } = Grid;

const AuthLayout = () => {
  const screens = useBreakpoint();

  return (
    <Layout
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e7dedeff",
        padding: window.innerWidth < 768 ? "0px" : "5% 10%",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          backgroundColor: "#ffffffff",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.23)",
          aspectRatio: "1/1",
          objectFit: "cover",
          borderRadius: window.innerWidth < 768 ? "0px" : "50px",
        }}
      >
        {screens.md && (
          <div
            style={{
              flex: 5,
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <LeftSide />
          </div>
        )}
        <div
          style={{
            flex: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <RightSide />
        </div>
      </div>
    </Layout>
  );
};

export default AuthLayout;
