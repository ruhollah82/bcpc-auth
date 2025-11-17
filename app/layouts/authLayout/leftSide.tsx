//LeftSide.jsx
import { Card, Flex, Grid, Typography ,Image} from "antd";
import React, { useEffect, useState } from "react";

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const LeftSide = () => {
  const screens = useBreakpoint();

  return (
    <Image
      src="/imgleftdesktop.png"   
      preview={false}    
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
    );
  };

export default LeftSide;
