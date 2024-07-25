"use client";

import { useRouter } from "next/navigation"; // השתמש ב-next/navigation במקום next/router
import { useState } from "react";
import "./contact.css";

export default function Contact() {
  const router = useRouter();
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const data = new FormData(form);
    const json = Object.fromEntries(data.entries());

    try {
      const response = await fetch("https://formspree.io/f/xnnajwkr", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });

      if (response.ok) {
        setStatus("SUCCESS");
        router.push("/thank-you");
      } else {
        setStatus("ERROR");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("ERROR");
    }
  };

  return (
    <div className="contact">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">שם מלא</label>
            <input type="text" id="email" name="email" required />
            <label htmlFor="email">מספר טלפון</label>
            <input type="text" id="email" name="email" required />
            <label htmlFor="email">כתובת אימייל</label>
            <input type="text" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="textarea">מה נוכל לעזור?</label>
            <textarea
              name="textarea"
              id="textarea"
              // rows="5"
              // cols="20"
              required
            />
          </div>
          <button className="form-submit-btn" type="submit">
            שלח
          </button>
        </form>
        {status === "ERROR" && <p>שגיאה בשליחת הטופס. אנא נסה שוב.</p>}
      </div>
    </div>
  );
}
