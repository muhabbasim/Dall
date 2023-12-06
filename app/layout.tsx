import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthContextProvider } from '@/context/authContext'
import { Toaster } from 'sonner';
import ReactQueryProvider from '@/components/providers/ReactQeuryProvider';
import ConfettiProvider from '@/components/providers/ConfettiProvider';


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

  // function setToken(token) {
  //   const expirationTime = token.expires_in; // Assuming expires_in is in milliseconds
  //   const expirationDate = new Date().getTime() + expirationTime;
  
  //   localStorage.setItem('accessToken', JSON.stringify({
  //     token: token.access_token,
  //     expiration: expirationDate,
  //   }));
  
  //   // Schedule removal of the token after expiration
  //   setTimeout(() => {
  //     localStorage.removeItem('accessToken');
  //   }, expirationTime);
  // }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <ReactQueryProvider>
            <ConfettiProvider/>
            <Toaster/>
            {children}
          </ReactQueryProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
