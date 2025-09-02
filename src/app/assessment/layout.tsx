import React from "react";

export default function AssessmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>
    </div>
  );
}
