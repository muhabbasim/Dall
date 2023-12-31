import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthContextProvider } from '@/context/authContext'
import { Toaster } from 'sonner';
import ReactQueryProvider from '@/components/providers/ReactQeuryProvider';
import ConfettiProvider from '@/components/providers/ConfettiProvider';
import { Providers } from './redux/provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dall In',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthContextProvider>
            <ReactQueryProvider>
              <ConfettiProvider/>
              <Toaster/>
              {children}
            </ReactQueryProvider>
          </AuthContextProvider>
        </Providers>
      </body>
    </html>
  )
}
