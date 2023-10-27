import { NavBar } from '@components'
import './globals.css'
import { Cabin } from 'next/font/google'

const inter = Cabin({ subsets: ['latin'] })

export const metadata = {
  title: 'Better Call AI',
  description: 'Get the answer for any legal query',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='md:h-screen h-full p-6 gradient-background flex flex-col flex-grow'>
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  )
}
