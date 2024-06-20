import "./footer.css";

const FacebookIcon = () => (
  <img src="/icons/facebook.svg" alt="Facebook" className="icon social-icon" />
);

const YoutubeIcon = () => (
  <img src="/icons/youtube.svg" alt="YouTube" className="icon social-icon" />
);

const LinkedinIcon = () => (
  <img src="/icons/linkedin.svg" alt="LinkedIn" className="icon social-icon" />
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <ul className="footer-menu">
          <li>© 2024 MAX Impact Israel</li>
          <li>
            <a className="accessibility" href="/accessibility">
              הצהרת נגישות
            </a>
          </li>
        </ul>
        <div className="social-icons">
          <a
            href="https://www.facebook.com/maximpacthub"
            title="Facebook"
            className="social-icon facebook"
          >
            <FacebookIcon />
          </a>
          <a
            href="https://www.youtube.com/channel/UCq96gPjZReYBq4RTKixNy4A"
            title="YouTube"
            className="social-icon youtube"
          >
            <YoutubeIcon />
          </a>
          <a
            href="https://www.linkedin.com/company/max-initiative/"
            title="LinkedIn"
            className="social-icon linkedin"
          >
            <LinkedinIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
