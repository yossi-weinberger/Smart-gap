// About.js
import "./page.css";

import Image from "next/image";

export default function About() {
  return (
    <div className="main-about">
      <div className="about-container">
        <h1 className="about-title">,נעים להכיר</h1>
        <p className="description">
          אנחנו צוות 2 ממחזור 7 של max impact
          <br /> חברנו לעמותת “בקהילה” ולאחר הגדרת האתגר וזיקוק הבעיה, יצרנו את
          smart-gap <br />
          פלטפורמה המאפשרת ניתוח נתונים בצורה מהירה, קלה ללמידה וידידותית
          למשתמש.
          <br /> אנחנו מאמינים כי יכולת ניתוח הנתונים בפלטפורמה שלנו מאפשרת
          לעמותות לתחקר <br />
          את ההצלחות, לאתר את נקודות התורפה, להשתפר ובכך להגדיל את האימפקט
          החברתי שלהן.
        </p>
        <div className="team">
          {" "}
          <div className="team-member">
            <Image
              className="member-image"
              src="/avi.png"
              width={100}
              height={100}
              alt="member-image"
            ></Image>
            <p className="member-name">אבי ליאור</p>
            <p className="member-title">מנטור</p>
          </div>
          <div className="team-member">
            <Image
              className="member-image"
              src="/hagar.png"
              width={100}
              height={100}
              alt="member-image"
            ></Image>
            <p className="member-name">הגר טבת</p>
            <p className="member-title">UX/UI</p>
          </div>
          <div className="team-member">
            <Image
              className="member-image"
              src="/yossi.png"
              width={100}
              height={100}
              alt="member-image"
            ></Image>
            <p className="member-name">יוסי וינברגר</p>
            <p className="member-title">פיתוח טכנולוגי </p>
          </div>
          <div className="team-member">
            <Image
              className="member-image"
              src="/viki.png"
              width={100}
              height={100}
              alt="member-image"
            ></Image>
            <p className="member-name">ויקטוריה גובנוב</p>
            <p className="member-title">מנהלת מוצר</p>
          </div>
        </div>
      </div>
    </div>
  );
}
