import "./footer.css";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <ul className="footer-menu">
          <li>© 2024 MAX Impact Israel</li>
          <a href="/accessibility">הצהרת נגישות</a>
        </ul>
        <div className="social-icons">
          <a
            rel="noopener noreferrer"
            href="/accessibility"
            title="Twitter"
            className="social-icon twitter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              //   x="0px"
              //   y="0px"
              fill="currentColor"
              //   width="100"
              //   height="100"
              viewBox="0 0 32 32"
            >
              <path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749 c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995 l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z"></path>
            </svg>
          </a>
          <a
            rel="noopener noreferrer"
            href="#"
            title="Facebook"
            className="social-icon facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 32 32"
              className="w-4 h-4"
            >
              <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z"></path>
            </svg>
          </a>
          <a
            rel="noopener noreferrer"
            href="#"
            title="Gmail"
            className="social-icon gmail"
          >
            {/* הוסף קוד SVG עבור האייקון של Gmail כאן */}
          </a>
        </div>
      </div>
    </footer>
  );
}
