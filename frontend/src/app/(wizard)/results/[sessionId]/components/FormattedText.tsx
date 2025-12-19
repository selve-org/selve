/**
 * FormattedText component - Renders text with styled bullets
 *
 * Parses plain text and converts bullet points (-, •, *, 1., 2., etc.)
 * into styled list items with purple gradient dots and hover effects.
 *
 * Security: Uses DOMPurify for sanitization as an extra layer of defense,
 * though React's JSX rendering already provides XSS protection.
 */

import DOMPurify from 'dompurify';

export function FormattedText({ text }: { text: string }) {
  // Sanitize text as extra layer of security (defense in depth)
  const sanitizedText = DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [], // No HTML tags allowed, plain text only
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  });

  // Split sanitized text into lines
  const lines = sanitizedText.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let key = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${key++}`} className="space-y-3 my-6">
          {currentList.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 group">
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 mt-2 group-hover:scale-125 transition-transform" />
              <span className="flex-1 text-gray-700 dark:text-gray-300 leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    
    // Check if line starts with bullet (-, •, *, or numbers like "1.", "2.")
    const bulletMatch = trimmed.match(/^[-•*]\s+(.+)/) || trimmed.match(/^\d+\.\s+(.+)/);
    
    if (bulletMatch) {
      currentList.push(bulletMatch[1]);
    } else {
      flushList();
      if (trimmed) {
        elements.push(
          <p key={`p-${key++}`} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-lg">
            {trimmed}
          </p>
        );
      } else if (elements.length > 0) {
        // Add spacing for blank lines between paragraphs
        elements.push(<div key={`space-${key++}`} className="h-2" />);
      }
    }
  });

  flushList(); // Flush any remaining list items

  return <div className="prose prose-lg dark:prose-invert max-w-none">{elements}</div>;
}
