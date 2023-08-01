import "../styles/app.scss";
import { Inter } from "next/font/google";
import Header from "./Header";
import { ContextProvider } from "@/componets/Clients";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo App",
  description: "Created By Farrukh Adeel Full Stack Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <>
            <Header />
            {children}
          </>
        </ContextProvider>
      </body>
    </html>
  );
}
