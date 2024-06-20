"use client";
import { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import "./dashboard.css";

export default function Dashboard() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const scaleX = window.innerWidth / 1366;
      const scaleY = window.innerHeight / 768;
      const scale = Math.min(scaleX, scaleY);
      setScale(scale);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="dashboard-page">
      <Container className="dashboard-container">
        <div
          className="dashboard-wrapper"
          style={{ transform: `scale(${scale})` }}
        >
          <iframe
            className="dashboard"
            src="https://lookerstudio.google.com/embed/reporting/820184df-1d30-4f94-8a6b-0a3fe4f57366/page/p_kf9sel82hd"
            frameBorder="0"
            // style={{ width: "100%", height: "100%" }}
            allowFullScreen
            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          ></iframe>
        </div>
      </Container>
    </div>
  );
}

// import { Container } from "@chakra-ui/react";
// import "./dashboard.css";
// export default function Dashboard() {
//   return (
//     <div className="dashboard-div">
//       <Container className="dashboard-container">
//         <iframe
//           className="dashboard"
//           src="https://lookerstudio.google.com/embed/reporting/820184df-1d30-4f94-8a6b-0a3fe4f57366/page/p_kf9sel82hd"
//           // frameBorder="0"
//           // style="border:0"
//           // allowFullScreen
//           // sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
//         ></iframe>
//       </Container>
//     </div>
//   );
// }
