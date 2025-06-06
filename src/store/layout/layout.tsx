import Header from '@/components/header/header';
import { AuthProvider } from '@/store/context/authContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <html>
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
