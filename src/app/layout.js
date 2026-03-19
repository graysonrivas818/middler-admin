import "./globals.css"
import Script from "next/script";
import { Inter, DM_Sans } from "next/font/google";
import { ApolloWrapper } from "@/app/_libs/apolloWrapper"
import { ReduxProvider } from '@/app/_redux/provider'
import SessionWrapper from "@/app/_components/sessionWrapper"

const inter             = Inter({ subsets: ["latin"], weight: ['200', '300', '400', '500', '600', '700'], variable: '--font-inter'})
const dm_sans           = DM_Sans({ subsets: ['latin'],  weight: ['200', '300', '400', '500', '600', '700'], variable: '--font-dm-sans'})

export const metadata = {
  title: "Middler Admin",
  description: "Middler admin dashboard",
}

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
    <html lang="en">
      <Script>
        <script src="https://unpkg.com/@lottiefiles/lottie-player@0.4.0/dist/lottie-player.js"></script>
      </Script>
      <body className={`${inter.variable} ${dm_sans.variable}`}>
        <ReduxProvider>
          <ApolloWrapper>
            {children}
          </ApolloWrapper>
        </ReduxProvider>
      </body>
    </html>
    </SessionWrapper>
  )
}
