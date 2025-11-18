//LeftSide.jsx
import { Card, Flex, Grid, Typography ,Image} from "antd";
import React, { useEffect, useState } from "react";

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const LeftSide = () => {
  const screens = useBreakpoint();

  return (
    <Image
     
      preview={false}    
      style={{             
        minWidth: "100vh",            
        minHeight: "100vh",           
        objectFit: "cover",
        backgroundImage: "url('/imgleftdesktop.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
         }}
    />
    );
  };

export default LeftSide;
