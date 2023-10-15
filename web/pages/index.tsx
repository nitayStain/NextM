import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={inter.className}>
      <section className='flex flex-wrap justify-center items-center content-center w-screen h-screen bg-slate-600'>
        <div className='flex flex-wrap flex-col items-center text-center text-white gap-y-4'>
          <h1 className='text-8xl font-bold'>Hello From Next.js!</h1>
          <Image src="/next.svg" alt="logo" width={360} height={360} />
        </div>
      </section>
    </main>
  )
}
