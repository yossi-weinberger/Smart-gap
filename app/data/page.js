"use client";
import React, { useState, useEffect } from "react";
import Loading from "@/components/loading/loading";
import "./page.css";

export default function DataPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // נניח שהטעינה תיקח מקסימום 5 שניות

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="data-container">
      {isLoading && <Loading />}

      <iframe
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTS3-UFES5pBTP9PGl81lBq2lpZF_2UuAEvadPMwCMa0B0FgLYvSFC1V5XRI_EYl_Drg4E-fSYYQfKq/pubhtml"
        width="100%"
        height="100%"
        style={{
          border: "none",
          display: isLoading ? "none" : "block",
        }}
        onLoad={() => setIsLoading(false)}
      ></iframe>
    </div>
  );
}

// // import React, { Component } from "react";
// // import Data from "@/components/dashboard/dashboard";
// import Loading from "@/components/loading/loading";
// import "./page.css";
// export default function DataPage() {
//   return (
//     <div className="data-container">
//       {/* <iframe
//         className="data"
//         src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTS3-UFES5pBTP9PGl81lBq2lpZF_2UuAEvadPMwCMa0B0FgLYvSFC1V5XRI_EYl_Drg4E-fSYYQfKq/pubhtml?widget=true&amp;headers=false"
//       ></iframe> */}

//       <iframe
//         className="data"
//         src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTS3-UFES5pBTP9PGl81lBq2lpZF_2UuAEvadPMwCMa0B0FgLYvSFC1V5XRI_EYl_Drg4E-fSYYQfKq/pubhtml?widget=true&amp;headers=false&rm=embedded"
//         width="100%"
//         height="600"
//         frameborder="0"
//         marginheight="0"
//         marginwidth="0"
//       >
//         <Loading />
//       </iframe>
//     </div>
//   );
// }
