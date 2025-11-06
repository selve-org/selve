#!/usr/bin/env python3
"""
Extract Tim LaHaye's temperament descriptions from PDF
Extracts all mentions of 4 basic temperaments and 12 blends
"""

import fitz  # PyMuPDF
import re
import os
from collections import defaultdict

# Define temperaments and their patterns
BASIC_TEMPERAMENTS = {
    'Sanguine': ['sanguine', 'sanguines', 'sparky sanguine', 'sparky'],
    'Choleric': ['choleric', 'cholerics', 'rocky choleric', 'rocky'],
    'Melancholic': ['melancholic', 'melancholy', 'melancholics', 'melancholies', 'martin melancholy', 'martin'],
    'Phlegmatic': ['phlegmatic', 'phlegmatics', 'phil phlegmatic', 'phil']
}

# 12 temperament blends (primary-secondary combinations)
TEMPERAMENT_BLENDS = {
    'SanChlor': ['sanchlor', 'sanchlors', 'sanguine-choleric', 'sanguine choleric'],
    'SanMel': ['sanmel', 'sanmels', 'sanguine-melancholic', 'sanguine melancholic', 'sanguine-melancholy', 'sanguine melancholy'],
    'SanPhleg': ['sanphleg', 'sanphlegs', 'sanguine-phlegmatic', 'sanguine phlegmatic'],
    'ChlorSan': ['chlorsan', 'chlorsans', 'choleric-sanguine', 'choleric sanguine'],
    'ChlorMel': ['chlormel', 'chlormels', 'choleric-melancholic', 'choleric melancholic', 'choleric-melancholy', 'choleric melancholy'],
    'ChlorPhleg': ['chlorphleg', 'chlorphlegs', 'choleric-phlegmatic', 'choleric phlegmatic'],
    'MelSan': ['melsan', 'melsans', 'melancholy-sanguine', 'melancholic-sanguine', 'melancholy sanguine', 'melancholic sanguine'],
    'MelChlor': ['melchlor', 'melchlors', 'melancholy-choleric', 'melancholic-choleric', 'melancholy choleric', 'melancholic choleric'],
    'MelPhleg': ['melphleg', 'melphlegs', 'melancholy-phlegmatic', 'melancholic-phlegmatic', 'melancholy phlegmatic', 'melancholic phlegmatic'],
    'PhlegSan': ['phlegsan', 'phlegsans', 'phlegmatic-sanguine', 'phlegmatic sanguine'],
    'PhlegChlor': ['phlegchlor', 'phlegchlors', 'phlegmatic-choleric', 'phlegmatic choleric'],
    'PhlegMel': ['phlegmel', 'phlegmels', 'phlegmatic-melancholic', 'phlegmatic melancholic', 'phlegmatic-melancholy', 'phlegmatic melancholy']
}

def extract_context_around_match(text, match_pos, context_chars=500):
    """Extract context around a match"""
    start = max(0, match_pos - context_chars)
    end = min(len(text), match_pos + context_chars)
    
    # Try to start and end at sentence boundaries
    context = text[start:end]
    
    # Find sentence start
    if start > 0:
        sentence_start = context.find('. ')
        if sentence_start != -1:
            context = context[sentence_start + 2:]
    
    # Find sentence end
    sentence_end = context.rfind('. ')
    if sentence_end != -1 and sentence_end < len(context) - 50:
        context = context[:sentence_end + 1]
    
    return context.strip()

def extract_paragraph(text, match_pos):
    """Extract the full paragraph containing the match"""
    # Find paragraph boundaries (double newlines or significant breaks)
    start = match_pos
    end = match_pos
    
    # Go backward to find paragraph start
    while start > 0:
        if text[start-1:start+1] == '\n\n' or start == 0:
            break
        start -= 1
    
    # Go forward to find paragraph end
    while end < len(text):
        if text[end:end+2] == '\n\n' or end == len(text) - 1:
            break
        end += 1
    
    paragraph = text[start:end].strip()
    
    # If paragraph is too short, extend it
    if len(paragraph) < 100:
        return extract_context_around_match(text, match_pos, 800)
    
    return paragraph

def find_all_mentions(pdf_path, output_base_dir):
    """Extract all mentions of temperaments and blends from PDF"""
    
    print(f"Opening PDF: {pdf_path}")
    doc = fitz.open(pdf_path)
    
    # Storage for extracted content
    temperament_data = defaultdict(list)
    blend_data = defaultdict(list)
    
    # Process each page
    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text("text")
        text_lower = text.lower()
        
        # Search for basic temperaments
        for temp_name, patterns in BASIC_TEMPERAMENTS.items():
            for pattern in patterns:
                # Find all occurrences
                pos = 0
                while True:
                    pos = text_lower.find(pattern.lower(), pos)
                    if pos == -1:
                        break
                    
                    # Extract context
                    context = extract_paragraph(text, pos)
                    
                    if len(context) > 50:  # Only save substantial mentions
                        temperament_data[temp_name].append({
                            'page': page_num + 1,
                            'context': context
                        })
                    
                    pos += len(pattern)
        
        # Search for temperament blends
        for blend_name, patterns in TEMPERAMENT_BLENDS.items():
            for pattern in patterns:
                pos = 0
                while True:
                    pos = text_lower.find(pattern.lower(), pos)
                    if pos == -1:
                        break
                    
                    # Extract context
                    context = extract_paragraph(text, pos)
                    
                    if len(context) > 50:
                        blend_data[blend_name].append({
                            'page': page_num + 1,
                            'context': context
                        })
                    
                    pos += len(pattern)
    
    doc.close()
    
    # Save basic temperaments
    print("\nSaving basic temperaments...")
    temp_dir = os.path.join(output_base_dir, '4-temperament-groups')
    os.makedirs(temp_dir, exist_ok=True)
    
    for temp_name, mentions in temperament_data.items():
        # Remove duplicates while preserving order
        unique_mentions = []
        seen_contexts = set()
        
        for mention in mentions:
            # Create a simplified version for comparison
            simplified = re.sub(r'\s+', ' ', mention['context'][:200]).strip()
            if simplified not in seen_contexts:
                seen_contexts.add(simplified)
                unique_mentions.append(mention)
        
        filepath = os.path.join(temp_dir, f"{temp_name}.txt")
        
        with open(filepath, 'w', encoding='utf-8') as f:
            # Write metadata
            f.write(f"Temperament: {temp_name}\n")
            f.write(f"Source: Why You Act The Way You Do - Tim LaHaye\n")
            f.write(f"Total Mentions Found: {len(unique_mentions)}\n")
            f.write(f"Extracted Date: 2025-10-25\n")
            f.write("=" * 80 + "\n\n")
            
            # Write all mentions
            for i, mention in enumerate(unique_mentions, 1):
                f.write(f"\n{'─' * 80}\n")
                f.write(f"Mention #{i} (Page {mention['page']})\n")
                f.write(f"{'─' * 80}\n\n")
                f.write(mention['context'])
                f.write("\n\n")
        
        print(f"  ✓ {temp_name}: {len(unique_mentions)} unique mentions")
    
    # Save temperament blends
    print("\nSaving temperament blends...")
    blend_dir = os.path.join(output_base_dir, '12-temperament-blends')
    os.makedirs(blend_dir, exist_ok=True)
    
    for blend_name, mentions in blend_data.items():
        # Remove duplicates
        unique_mentions = []
        seen_contexts = set()
        
        for mention in mentions:
            simplified = re.sub(r'\s+', ' ', mention['context'][:200]).strip()
            if simplified not in seen_contexts:
                seen_contexts.add(simplified)
                unique_mentions.append(mention)
        
        # Create filename (replace hyphens with underscores for consistency)
        filename = blend_name.replace('-', '_') + '.txt'
        filepath = os.path.join(blend_dir, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            # Write metadata
            f.write(f"Temperament Blend: {blend_name}\n")
            f.write(f"Source: Why You Act The Way You Do - Tim LaHaye\n")
            f.write(f"Total Mentions Found: {len(unique_mentions)}\n")
            f.write(f"Extracted Date: 2025-10-25\n")
            f.write("=" * 80 + "\n\n")
            
            # Write all mentions
            for i, mention in enumerate(unique_mentions, 1):
                f.write(f"\n{'─' * 80}\n")
                f.write(f"Mention #{i} (Page {mention['page']})\n")
                f.write(f"{'─' * 80}\n\n")
                f.write(mention['context'])
                f.write("\n\n")
        
        print(f"  ✓ {blend_name}: {len(unique_mentions)} unique mentions")
    
    print(f"\n{'=' * 80}")
    print("Extraction complete!")
    print(f"Output directory: {output_base_dir}")

def main():
    pdf_path = "/home/chris/selve/Why-You-Act-The-Way-You-Do-Tim-LaHaye.pdf"
    output_dir = "/home/chris/selve/data/tim-lahaye-temperaments"
    
    if not os.path.exists(pdf_path):
        print(f"Error: PDF not found at {pdf_path}")
        return
    
    find_all_mentions(pdf_path, output_dir)

if __name__ == "__main__":
    main()
