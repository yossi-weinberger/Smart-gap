"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./heroSection.css";

function HeroSection() {
  const router = useRouter();
  return (
    <div className="hero-section">
      <div className="logo-wrapper">
        <Image
          src="/sg-logo.svg"
          alt="logo"
          width={200}
          height={200}
          className="logo"
          style={{
            maxWidth: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>
      <h1 className="site-title">
        פלטפורמת ניתוח נתונים <br></br>להגדלת האימפקט החברתי
      </h1>
      <div className="hero-content">
        <div className="image-column">
          <div className="image-wrapper">
            <Image
              src="/screens.png"
              alt="Screens"
              width={1200}
              height={1200}
              className="screen-image"
              style={{
                // maxWidth: "100%",
                // height: "auto",
                objectFit: "contain",
              }}
            />
            <Image
              src="/circle.svg"
              alt="purple-circle"
              width={1200}
              height={1200}
              className="purple-circle"
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
        <div className="content-column">
          <div className="content-wrapper">
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
                    width={440}
                    height={440}
                    className="feature-icon"
                  />
                </div>
              ))}
            </div>
            <button
              className="cta-button"
              onClick={() => router.push("/auth/login")}
            >
              התחברות
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
