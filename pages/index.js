import Head from 'next/head'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <>
      <Head>
        <title>Learning tailwind</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-100 h-screen">
        <Layout />
      </main>
    </>
  )
}
