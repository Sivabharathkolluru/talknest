import "./globals.css";

export const metadata = {
  title: "TalkNest",
  description: "Anonymous voice chat for India",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
