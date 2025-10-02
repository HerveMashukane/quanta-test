import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.content}>
      <h1 className={styles.title}>
        Hello, I am Herve Mashukane
      </h1>
      <p className={styles.paragraph}>Welcome to My Quanta Test!</p>
    </main>
  )
}
