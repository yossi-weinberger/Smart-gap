import { Container } from "@chakra-ui/react";
import "./dashboard.css";
export default function Dashboard() {
  return (
    <div>
      <Container className="dashboard-container">
        <iframe
          className="dashboard"
          src="https://lookerstudio.google.com/embed/reporting/820184df-1d30-4f94-8a6b-0a3fe4f57366/page/p_af9nosvhhd"
          // frameBorder="0"
          // style="border:0"
          // allowFullScreen
          // sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        ></iframe>
      </Container>
    </div>
  );
}
