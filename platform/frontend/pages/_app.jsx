import '../styles/globals.css'
import { useState } from 'react'

export default function MyApp({ Component, pageProps }) {
  const [user] = useState({ id: 'mock-user-id', name: 'Jane Patient', email: 'jane@example.com' });
  return (
    <div>
      <Component {...pageProps} user={user} />
    </div>
  )
}
