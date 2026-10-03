import "./globals.css";

export const metadata = {
  title: "SMASHED — Smash burgers, Bahria Enclave Islamabad",
  description: "Smash burgers, crispy chicken, loaded fries and deals. Order online from SMASHED, Bahria Enclave Sector A, Islamabad.",
};
export const viewport = { width: "device-width", initialScale: 1, themeColor: "#FFFDF9", colorScheme: "light" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="only light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,600&family=Poppins:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
