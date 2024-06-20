// import React, { Component } from "react";
// import Data from "@/components/dashboard/dashboard";
import "./page.css";
export default function DataPage() {
  return (
    <div className="data-container">
      {/* <iframe
        className="data"
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTS3-UFES5pBTP9PGl81lBq2lpZF_2UuAEvadPMwCMa0B0FgLYvSFC1V5XRI_EYl_Drg4E-fSYYQfKq/pubhtml?widget=true&amp;headers=false"
      ></iframe> */}

      <iframe
        className="data"
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTS3-UFES5pBTP9PGl81lBq2lpZF_2UuAEvadPMwCMa0B0FgLYvSFC1V5XRI_EYl_Drg4E-fSYYQfKq/pubhtml?widget=true&amp;headers=false&rm=embedded"
      ></iframe>
    </div>
  );
}
