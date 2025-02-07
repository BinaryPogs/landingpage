import localFont from 'next/font/local'

export const font = localFont({
  src: [
    {
      path: '../assets/fonts/CabinetGrotesk-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/CabinetGrotesk-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/CabinetGrotesk-Bold.woff2',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-cabinet'
})