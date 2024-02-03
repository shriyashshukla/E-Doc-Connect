import Head from 'next/head'
import styles from  './layout.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js Homepage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav>
        <ul className={styles.navbar}>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to My Next.js Homepage
        </h1>

        <div className={styles.slider}>
          {/* Slider content goes here */}
          {/* You can use a library like react-slick for the slider */}
        </div>
      </main>

      <footer className={styles.footer}>
        {/* Footer content goes here */}
      </footer>
    </div>
  )
}
