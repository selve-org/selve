import { Header } from "./header/Header";
import { Hero } from "@/app/(marketing)/hero/Hero";
import { Footer } from "./Footer";
import { MainContent } from "./MainContent";

// Placeholder for future sections
const PlaceholderSection = ({ title, height = 'h-screen' }: { title: string, height?: string }) => (
  <div className={`container mx-auto px-4 py-20 flex items-center justify-center ${height}`}>
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-4">{title}</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        This is a placeholder section. As you scroll past it, the progress bar will grow. You can add any content here.
      </p>
    </div>
  </div>
);

export default function LandingPage() {
  return (
    <div className="bg-black/10 text-foreground font-sans">
      <Header />
      <main>
        <Hero />
        
        {/* The MainContent wrapper is correctly placed around the content
            that the progress bar should measure. */}
        <MainContent>
          <PlaceholderSection title="Feature Section 1" />
          <PlaceholderSection title="Feature Section 2" />
          <PlaceholderSection title="Feature Section 2" />
          <PlaceholderSection title="Feature Section 2" />
          
          <PlaceholderSection title="Testimonials" height="h-[50vh]" />
          <PlaceholderSection title="Testimonials" height="h-[50vh]" />
          <Footer />
        </MainContent>
        
      </main>
    </div>
  );
}