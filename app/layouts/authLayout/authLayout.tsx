//authlayout.jsx
import { Layout, Grid } from "antd";
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
        padding: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
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
