import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>אופס! הדף לא נמצא</p>
        <p className={styles.description}>אנא פנה למנהל המערכת</p>
        <Link href="/" className={styles.button}>
          חזרה לדף הבית
        </Link>
      </div>
    </div>
  );
}
