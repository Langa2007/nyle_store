import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Providers from "../providers";
import Navbar from "../components/Navbar";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <Providers>
          <Navbar />
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
