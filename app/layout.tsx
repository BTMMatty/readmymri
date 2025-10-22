import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'ReadMyMRI - World\'s First ZIP-Native Medical AI',
  description: 'Revolutionary ZIP-based DICOM processing with automated HIPAA compliance. Upload entire MRI series in one ZIP file.',
  keywords: 'ZIP DICOM, medical AI, MRI analysis, HIPAA compliance, revolutionary medical imaging',
  authors: [{ name: 'ReadMyMRI' }],
  openGraph: {
    title: 'ReadMyMRI - Revolutionary ZIP-Native Medical AI',
    description: 'World\'s first ZIP-based DICOM processor. $500M+ IP value.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
