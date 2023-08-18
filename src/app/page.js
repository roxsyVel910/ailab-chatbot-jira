import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Bienvenido al Chatbot de Jira</h1>
        <p className={styles.description}>
          ¡Conoce cómo nuestro chatbot puede mejorar tu experiencia con Jira!
        </p>
        <Link href="/login" className={styles.button} passHref> Iniciar sesión
        </Link> 
        <Link href="/register" className={styles.button} passHref> Registrarse
        </Link>
      </main>
    </div>
  );
}
