import Link from 'next/link'
import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>E-Doc Platform</title>
      </Head>
      <header className="p-6 bg-white shadow">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">E-Doc Platform</h1>
          <nav>
            <Link href="/doctors"><a className="ml-4 text-blue-600">Doctors</a></Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <section className="text-center py-12">
          <h2 className="text-3xl font-semibold">Find and Book Doctors</h2>
          <p className="mt-4 text-gray-600">Modern healthcare appointment system demo</p>
          <div className="mt-6">
            <Link href="/doctors"><a className="px-4 py-2 bg-blue-600 text-white rounded">Search Doctors</a></Link>
          </div>
        </section>
      </main>
    </div>
  )
}
