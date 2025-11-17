//LeftSide.jsx
import { Card, Flex, Grid, Typography } from "antd";
import React, { useEffect, useState } from "react";

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const LeftSide = () => {
  const screens = useBreakpoint();

  return (
    <Card
      style={{
        // background,
        padding: 0,
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: 0,
        borderRadius: 0,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Flex
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          gap: "1rem",
          flexDirection: "column",
          position: "relative",
          zIndex: 1,
          flex: "1",
        }}
      >
        <div
          style={{
            width: "100%",
            height: screens.md ? "400px" : "250px",
            minHeight: screens.md ? "400px" : "250px",
            maxHeight: screens.md ? "400px" : "250px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
          }}
        >
          <h1>Image</h1>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            textAlign: screens.md ? "right" : "center",
            justifyContent: "center",
            minHeight: "auto",
            direction: "rtl",
          }}
        >
          <Title
            level={screens.xl ? 1 : 2}
            style={{
              color: "black",
              margin: 0,
              fontWeight: 800,
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              fontFamily: "'Vazir', 'Tanha', 'Iranian Sans', sans-serif",
            }}
          >
            {"Title"}
          </Title>

          <Paragraph
            style={{
              fontSize: screens.md ? "1.1rem" : "1rem",
              color: "black",
              fontFamily: "'Vazir', 'Tanha', 'Iranian Sans', sans-serif",
              fontWeight: 500,
            }}
          >
            <h1>Animation</h1>
          </Paragraph>
        </div>
      </Flex>
    </Card>
  );
};

export default LeftSide;
