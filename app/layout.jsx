import './globals.css';

export const metadata = {
  title: 'Daffa Zubair Rabbani - Portofolio',
  description: 'Portofolio Daffa Zubair Rabbani, Web & IoT Developer.',
  icons: {
    icon: '/images/favicon.svg',
    shortcut: '/images/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        {children}
      </body>
    </html>
  );
}
