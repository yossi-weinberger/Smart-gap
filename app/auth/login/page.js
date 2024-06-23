"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./Login.module.css";
import GoogleIcon from "./google-icon";

export default function Login() {
  const { data: session, error } = useSession();
  const renderButton = (text, onClick) => (
    <button onClick={onClick} className={styles.button}>
      <GoogleIcon />
      {text}
    </button>
  );

  if (error) {
    console.error("Session error:", error);
    return <div>An error occurred: {error.message}</div>;
  }
  if (session) {
    return (
      <div className={styles.container}>
        <div className={styles.buttonContainer}>
          <p className={styles.title}>Welcome,{session.user.name}</p>
          {/* <button onClick={() => signOut()} className={styles.button}>
              Sign out
            </button> */}
          {renderButton("Sign out", () => signOut("google"))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <p className={styles.title}></p>
        {renderButton("Sign in with Google", () => signIn("google"))}
      </div>
    </div>
  );
}
