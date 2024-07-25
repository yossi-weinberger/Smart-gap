import Link from "next/link";
import styles from "./thank-you.module.css";

export default function ThankYou() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>היי תודה!</h1>
        <p className={styles.subtitle}>ההודעה שלך נחתה אצלנו בתיבה!</p>
        <p className={styles.description}>
          אנחנו נקרא את ההודעה שלך ונחזור אליך בהקדם האפשרי. בינתיים, תוכל לחזור
          לדף הבית שלנו.
        </p>
        <Link href="/" className={styles.button}>
          חזרה לדף הבית
        </Link>
      </div>
    </div>
  );
}
