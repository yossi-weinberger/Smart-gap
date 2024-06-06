// HeroSection.jsx
import React from "react";
import Image from "next/image";
import "./HeroSection.css";

function HeroSection() {
  cache: "no-cache";
  return (
    <div className="hero-section">
      <div className="hero-content">
        <div className="image-column">
          <div className="image-wrapper">
            <Image
              src="/screens.png"
              alt="Screens"
              width={1200}
              height={1200}
              objectFit="contain"
              className="screen-image"
            />
            <Image
              src="/circle.svg"
              alt="purple-circle"
              width={1200}
              height={1200}
              objectFit="contain"
              className="purple-circle"
            />
          </div>
        </div>
        <div className="content-column">
          <div className="content-wrapper">
            <h1 className="title">
              פלטפורמת ניתוח נתונים להגדלת האימפקט החברתי
            </h1>
            <div className="features-grid">
              {[
                "ידידותית למשתמש",
                "קלה ללמידה",
                "מותאמת לצרכי העמותה",
                "ניתוח נתונים חכם",
                "מעקב לאורך זמן",
              ].map((text, index) => (
                <div key={index} className="feature">
                  <div className="feature-text">{text}</div>
                  <Image
                    src="/icons/V-icon.svg"
                    alt="Feature Icon"
                    width={44}
                    height={44}
                    className="feature-icon"
                  />
                </div>
              ))}
            </div>
            <button className="cta-button">התחברות</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
