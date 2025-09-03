import React from "react";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col pt-16">
      <main className="flex-grow">{children}</main>
    </div>
  );
}
