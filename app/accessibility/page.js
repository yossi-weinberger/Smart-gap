import "./page.css";
import { accessibilityContent } from "./accessibilityContent";

export default function Accessibility() {
  return (
    <div className="accessibility-page">
      <div className="content">
        {accessibilityContent.map((item, index) => (
          <div key={index}>
            <h2>{item.title}</h2>
            {item.content.includes("<ul>") ? (
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            ) : (
              <p>{item.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
