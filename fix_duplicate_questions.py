#!/usr/bin/env python3
"""
Fix duplicate questions in item pool by rephrasing them naturally.
"""

import json
from pathlib import Path

# Map of duplicate text to variations
REPHRASINGS = {
    "I am the life of the party.": [
        "I'm usually the most energetic person in the room at parties.",
        "I'm the one who brings energy and excitement to social gatherings."
    ],
    "I don't like to draw attention to myself.": [
        "I prefer to stay in the background rather than be noticed.",
        "I'd rather not have people focusing on me."
    ],
    "I don't mind being the center of attention.": [
        "I'm comfortable when everyone's eyes are on me.",
        "Being the focus of a group doesn't bother me at all."
    ],
    "I don't talk a lot.": [
        "I tend to be quiet in most situations.",
        "I'm not much of a talker."
    ],
    "I feel comfortable around people.": [
        "I'm at ease when I'm with other people.",
        "Being around others feels natural to me."
    ],
    "I get irritated easily.": [
        "Small things can annoy me pretty quickly.",
        "It doesn't take much to frustrate me."
    ],
    "I have little to say.": [
        "I don't contribute much to conversations.",
        "I usually keep my thoughts to myself."
    ]
}


def fix_duplicates(item_pool_path: str):
    """Fix duplicate questions by rephrasing them."""
    
    with open(item_pool_path, 'r') as f:
        item_pool = json.load(f)
    
    # Track which variation to use for each duplicate
    variation_index = {}
    
    # Iterate through all dimensions and items
    for dimension, items in item_pool.items():
        for item in items:
            text = item['text']
            
            if text in REPHRASINGS:
                # Get or initialize variation index for this text
                if text not in variation_index:
                    variation_index[text] = 0
                
                # Use the variation (or keep first occurrence as-is)
                if variation_index[text] > 0:
                    variation_idx = variation_index[text] - 1
                    if variation_idx < len(REPHRASINGS[text]):
                        new_text = REPHRASINGS[text][variation_idx]
                        print(f"[{dimension}] {item['item']}: '{text}' → '{new_text}'")
                        item['text'] = new_text
                else:
                    print(f"[{dimension}] {item['item']}: '{text}' (keeping original)")
                
                variation_index[text] += 1
    
    # Save updated item pool
    with open(item_pool_path, 'w') as f:
        json.dump(item_pool, f, indent=2)
    
    print(f"\n✓ Updated {item_pool_path}")
    print(f"✓ Fixed {sum(variation_index.values()) - len(variation_index)} duplicate questions")


if __name__ == '__main__':
    item_pool_path = Path(__file__).parent / 'backend' / 'app' / 'data' / 'selve_item_pool_expanded.json'
    fix_duplicates(str(item_pool_path))
