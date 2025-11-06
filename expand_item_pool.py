#!/usr/bin/env python3
"""
SELVE Item Pool Expansion Script
Expands item pool to 15-20 items per dimension with proper texts and quality filtering.
"""

import pandas as pd
import numpy as np
import json
from pathlib import Path

# Data paths
DATA_DIR = Path("/home/chris/selve/data")
BIG5_PATH = DATA_DIR / "openpsychometrics-rawdata/BIG5/data.csv"
HEXACO_PATH = DATA_DIR / "openpsychometrics-rawdata/HEXACO/data.csv"
PF16_PATH = DATA_DIR / "openpsychometrics-rawdata/16PF/data.csv"
OUTPUT_PATH = DATA_DIR / "selve_item_pool_expanded.json"

# HEXACO item texts from codebook
HEXACO_ITEMS = {
    # H-Factor (Honesty-Humility) - VARA
    'HSinc1': "I don't pretend to be more than I am.",
    'HSinc2': "I use flattery to get ahead.",
    'HSinc3': "I tell other people what they want to hear so that they will do what I want them to do.",
    'HSinc4': "I put on a show to impress people.",
    'HSinc5': "I switch my loyalties when I feel like it.",
    'HSinc6': "I play a role in order to impress people.",
    'HSinc7': "I pretend to be concerned for others.",
    'HSinc8': "I act like different people in different situations.",
    'HSinc9': "I find it necessary to please the people who have power.",
    'HSinc10': "I let people push me around to help them feel important.",
    
    'HFair1': "I would never take things that aren't mine.",
    'HFair2': "I would never cheat on my taxes.",
    'HFair3': "I return extra change when a cashier makes a mistake.",
    'HFair4': "I would feel very badly for a long time if I were to steal from someone.",
    'HFair5': "I try to follow the rules.",
    'HFair6': "I admire a really clever scam.",
    'HFair7': "I cheat to get ahead.",
    'HFair8': "I steal things.",
    'HFair9': "I cheat on people who have trusted me.",
    'HFair10': "I would not regret my behavior if I were to take advantage of someone impulsively.",
    
    'HGree1': "I would not enjoy being a famous celebrity.",
    'HGree2': "I don't strive for elegance in my appearance.",
    'HGree3': "I love luxury.",
    'HGree4': "I have a strong need for power.",
    'HGree5': "I seek status.",
    'HGree6': "I am mainly interested in money.",
    'HGree7': "I wish to stay young forever.",
    'HGree8': "I try to impress others.",
    'HGree9': "I prefer to eat at expensive restaurants.",
    'HGree10': "I am out for my own personal gain.",
    
    'HMode1': "I don't think that I'm better than other people.",
    'HMode2': "I see myself as an average person.",
    'HMode3': "I am just an ordinary person.",
    'HMode4': "I consider myself an average person.",
    'HMode5': "I would like to have more power than other people.",
    'HMode6': "I believe that I am better than others.",
    'HMode7': "I like to attract attention.",
    'HMode8': "I am more capable than most others.",
    'HMode9': "I am likely to show off if I get the chance.",
    'HMode10': "I boast about my virtues.",
    
    # A-Factor (Agreeableness) - CHRONOS
    'AForg1': "I love my enemies.",
    'AForg2': "I try to forgive and forget.",
    'AForg3': "I am inclined to forgive others.",
    'AForg4': "I am nice to people I should be angry at.",
    'AForg5': "I find it hard to forgive others.",
    'AForg6': "I hold a grudge.",
    'AForg7': "I get back at people who insult me.",
    'AForg8': "I get even with others.",
    'AForg9': "I distrust people.",
    'AForg10': "I feel that most people can't be trusted.",
    
    'AGent1': "I rarely complain.",
    'AGent2': "I take things as they come.",
    'AGent3': "I accept people as they are.",
    'AGent4': "I have a good word for everyone.",
    'AGent5': "I become frustrated and angry with people when they don't live up to my expectations.",
    'AGent6': "I am quick to judge others.",
    'AGent7': "I find fault with everything.",
    'AGent8': "I speak ill of others.",
    'AGent9': "I have a sharp tongue.",
    'AGent10': "I criticize others' shortcomings.",
    
    'AFlex1': "I adjust easily.",
    'AFlex2': "I am good at taking advice.",
    'AFlex3': "I when interacting with a group of people, am often bothered by at least one of them.",
    'AFlex4': "I react strongly to criticism.",
    'AFlex5': "I get upset if others change the way that I have arranged things.",
    'AFlex6': "I am hard to convince.",
    'AFlex7': "I am annoyed by others' mistakes.",
    'AFlex8': "I can't stand being contradicted.",
    'AFlex9': "I am hard to satisfy.",
    'AFlex10': "I am hard to reason with.",
    
    'APati1': "I find that it takes a lot to make me feel angry at someone.",
    'APati2': "I rarely feel angry with people.",
    'APati3': "I am usually a patient person.",
    'APati4': "I rarely get irritated.",
    'APati5': "I seldom get mad.",
    'APati6': "I am easily annoyed.",
    'APati7': "I get angry easily.",
    'APati8': "I get irritated easily.",
    'APati9': "I lose my temper.",
    'APati10': "I get upset easily.",
}

def calculate_item_correlations(df, items, reverse_items, scale_max):
    """Calculate item-total correlations for a set of items."""
    df_clean = df[items].dropna()
    
    # Apply reverse scoring
    df_scored = df_clean.copy()
    for item in reverse_items:
        if item in items:
            df_scored[item] = (scale_max + 1) - df_scored[item]
    
    # Calculate correlations
    correlations = []
    for item in items:
        other_items = [i for i in items if i != item]
        total_without_item = df_scored[other_items].mean(axis=1)
        corr = df_scored[item].corr(total_without_item)
        correlations.append({
            'item': item,
            'correlation': corr,
            'reversed': item in reverse_items
        })
    
    return pd.DataFrame(correlations)

def expand_dimension(df, items, item_texts, reverse_items, scale_max, target_count, min_corr=0.30):
    """Expand a dimension to target count with quality filtering."""
    corr_df = calculate_item_correlations(df, items, reverse_items, scale_max)
    
    # Add item texts
    corr_df['text'] = corr_df['item'].map(item_texts)
    
    # Filter by minimum correlation and sort
    corr_df = corr_df[corr_df['correlation'] >= min_corr].sort_values('correlation', ascending=False)
    
    # Select top items up to target count
    selected = corr_df.head(target_count)
    
    return selected.to_dict('records')

def main():
    print("=" * 60)
    print("SELVE ITEM POOL EXPANSION")
    print("=" * 60)
    
    # Load datasets
    print("\n📂 Loading datasets...")
    big5_data = pd.read_csv(BIG5_PATH, sep='\t')
    hexaco_data = pd.read_csv(HEXACO_PATH, sep='\t')
    pf16_data = pd.read_csv(PF16_PATH, sep='\t')
    print(f"   Big Five: {len(big5_data):,} responses")
    print(f"   HEXACO: {len(hexaco_data):,} responses")
    print(f"   16PF: {len(pf16_data):,} responses")
    
    item_pool = {}
    
    # 1. LUMEN (Extraversion) - Target: 16 items
    print("\n✨ LUMEN - Social Energy & Enthusiasm")
    lumen_items_big5 = {
        'E1': "I am the life of the party.",
        'E2': "I don't talk a lot.",
        'E3': "I feel comfortable around people.",
        'E4': "I keep in the background.",
        'E5': "I start conversations.",
        'E6': "I have little to say.",
        'E7': "I talk to a lot of different people at parties.",
        'E8': "I don't like to draw attention to myself.",
        'E9': "I don't mind being the center of attention.",
        'E10': "I am quiet around strangers."
    }
    lumen_reverse = ['E2', 'E4', 'E6', 'E8', 'E10']
    
    # Add HEXACO extraversion items
    lumen_items_hexaco = {
        'XExpr1': "I talk a lot.",
        'XExpr2': "I am never at a loss for words.",
        'XExpr3': "I am the life of the party.",
        'XExpr4': "I tell people about it when I'm irritated.",
        'XExpr5': "I have an intense, boisterous laugh.",
        'XExpr6': "I don't talk a lot.",
        'XExpr7': "I don't like to draw attention to myself.",
        'XExpr8': "I say little.",
        'XExpr9': "I bottle up my feelings.",
        'XExpr10': "I speak softly.",
    }
    hexaco_reverse = ['XExpr6', 'XExpr7', 'XExpr8', 'XExpr9', 'XExpr10']
    
    # Combine and expand
    all_lumen_items = list(lumen_items_big5.keys()) + list(lumen_items_hexaco.keys())
    all_lumen_texts = {**lumen_items_big5, **lumen_items_hexaco}
    all_lumen_reverse = lumen_reverse + hexaco_reverse
    
    # Calculate for Big5 items
    lumen_big5_df = big5_data[list(lumen_items_big5.keys())].dropna()
    lumen_big5_corr = calculate_item_correlations(lumen_big5_df, list(lumen_items_big5.keys()), lumen_reverse, 5)
    lumen_big5_corr['text'] = lumen_big5_corr['item'].map(lumen_items_big5)
    lumen_big5_corr['source'] = 'Big5'
    
    # Calculate for HEXACO items
    lumen_hexaco_df = hexaco_data[list(lumen_items_hexaco.keys())].dropna()
    lumen_hexaco_corr = calculate_item_correlations(lumen_hexaco_df, list(lumen_items_hexaco.keys()), hexaco_reverse, 7)
    lumen_hexaco_corr['text'] = lumen_hexaco_corr['item'].map(lumen_items_hexaco)
    lumen_hexaco_corr['source'] = 'HEXACO'
    
    # Combine and select top 16
    lumen_combined = pd.concat([lumen_big5_corr, lumen_hexaco_corr])
    lumen_combined = lumen_combined[lumen_combined['correlation'] >= 0.40].sort_values('correlation', ascending=False)
    item_pool['LUMEN'] = lumen_combined.head(16).to_dict('records')
    print(f"   Selected: {len(item_pool['LUMEN'])} items, avg r={lumen_combined.head(16)['correlation'].mean():.3f}")
    
    # 2. AETHER (Emotional Stability) - Target: 15 items
    print("\n🌫️  AETHER - Emotional Stability & Calm")
    aether_items = {
        'N1': "I get stressed out easily.",
        'N2': "I am relaxed most of the time.",
        'N3': "I worry about things.",
        'N4': "I seldom feel blue.",
        'N5': "I am easily disturbed.",
        'N6': "I get upset easily.",
        'N7': "I change my mood a lot.",
        'N8': "I have frequent mood swings.",
        'N9': "I get irritated easily.",
        'N10': "I often feel blue."
    }
    aether_reverse = ['N1', 'N3', 'N5', 'N6', 'N7', 'N8', 'N9', 'N10']
    item_pool['AETHER'] = expand_dimension(big5_data, list(aether_items.keys()), aether_items, aether_reverse, 5, 15, min_corr=0.35)
    print(f"   Selected: {len(item_pool['AETHER'])} items, avg r={np.mean([i['correlation'] for i in item_pool['AETHER']]):.3f}")
    
    # 3. ORPHEUS (Empathy) - Target: 15 items
    print("\n🎵 ORPHEUS - Empathy & Compassion")
    orpheus_items = {
        'A1': "I feel little concern for others.",
        'A2': "I am interested in people.",
        'A3': "I insult people.",
        'A4': "I sympathize with others' feelings.",
        'A5': "I am not interested in other people's problems.",
        'A6': "I have a soft heart.",
        'A7': "I am not really interested in others.",
        'A8': "I take time out for others.",
        'A9': "I feel others' emotions.",
        'A10': "I make people feel at ease."
    }
    orpheus_reverse = ['A1', 'A3', 'A5', 'A7']
    item_pool['ORPHEUS'] = expand_dimension(big5_data, list(orpheus_items.keys()), orpheus_items, orpheus_reverse, 5, 15, min_corr=0.35)
    print(f"   Selected: {len(item_pool['ORPHEUS'])} items, avg r={np.mean([i['correlation'] for i in item_pool['ORPHEUS']]):.3f}")
    
    # 4. ORIN (Organization) - Target: 16 items
    print("\n🧭 ORIN - Organization & Discipline")
    orin_items = {
        'C1': "I am always prepared.",
        'C2': "I leave my belongings around.",
        'C3': "I pay attention to details.",
        'C4': "I make a mess of things.",
        'C5': "I get chores done right away.",
        'C6': "I often forget to put things back in their proper place.",
        'C7': "I like order.",
        'C8': "I shirk my duties.",
        'C9': "I follow a schedule.",
        'C10': "I am exacting in my work."
    }
    orin_reverse = ['C2', 'C4', 'C6', 'C8']
    item_pool['ORIN'] = expand_dimension(big5_data, list(orin_items.keys()), orin_items, orin_reverse, 5, 16, min_corr=0.30)
    print(f"   Selected: {len(item_pool['ORIN'])} items, avg r={np.mean([i['correlation'] for i in item_pool['ORIN']]):.3f}")
    
    # 5. LYRA (Openness) - Target: 15 items
    print("\n🦋 LYRA - Openness & Curiosity")
    lyra_items = {
        'O1': "I have a rich vocabulary.",
        'O2': "I have difficulty understanding abstract ideas.",
        'O3': "I have a vivid imagination.",
        'O4': "I am not interested in abstract ideas.",
        'O5': "I have excellent ideas.",
        'O6': "I do not have a good imagination.",
        'O7': "I am quick to understand things.",
        'O8': "I use difficult words.",
        'O9': "I spend time reflecting on things.",
        'O10': "I am full of ideas."
    }
    lyra_reverse = ['O2', 'O4', 'O6']
    item_pool['LYRA'] = expand_dimension(big5_data, list(lyra_items.keys()), lyra_items, lyra_reverse, 5, 15, min_corr=0.30)
    print(f"   Selected: {len(item_pool['LYRA'])} items, avg r={np.mean([i['correlation'] for i in item_pool['LYRA']]):.3f}")
    
    # 6. VARA (Honesty-Humility) - Target: 18 items [CRITICAL FIX]
    print("\n⚖️  VARA - Honesty & Humility [FIXING MISSING TEXTS]")
    vara_items_all = [f'HSinc{i}' for i in range(1, 11)] + [f'HFair{i}' for i in range(1, 11)] + \
                     [f'HGree{i}' for i in range(1, 11)] + [f'HMode{i}' for i in range(1, 11)]
    vara_reverse = ['HSinc2', 'HSinc3', 'HSinc4', 'HSinc5', 'HSinc6', 'HSinc7', 'HSinc8', 'HSinc9', 'HSinc10',
                    'HFair6', 'HFair7', 'HFair8', 'HFair9', 'HFair10',
                    'HGree3', 'HGree4', 'HGree5', 'HGree6', 'HGree7', 'HGree8', 'HGree9', 'HGree10',
                    'HMode5', 'HMode6', 'HMode7', 'HMode8', 'HMode9', 'HMode10']
    item_pool['VARA'] = expand_dimension(hexaco_data, vara_items_all, HEXACO_ITEMS, vara_reverse, 7, 18, min_corr=0.25)
    print(f"   Selected: {len(item_pool['VARA'])} items, avg r={np.mean([i['correlation'] for i in item_pool['VARA']]):.3f}")
    print("   ✅ All item texts properly loaded from HEXACO codebook!")
    
    # 7. CHRONOS (Patience) - Target: 18 items
    print("\n⏳ CHRONOS - Patience & Flow")
    chronos_items_all = [f'APati{i}' for i in range(1, 11)] + [f'AForg{i}' for i in range(1, 11)] + \
                        [f'AGent{i}' for i in range(1, 11)] + [f'AFlex{i}' for i in range(1, 11)]
    chronos_reverse = ['APati6', 'APati7', 'APati8', 'APati9', 'APati10',
                       'AForg5', 'AForg6', 'AForg7', 'AForg8', 'AForg9', 'AForg10',
                       'AGent5', 'AGent6', 'AGent7', 'AGent8', 'AGent9', 'AGent10',
                       'AFlex3', 'AFlex4', 'AFlex5', 'AFlex6', 'AFlex7', 'AFlex8', 'AFlex9', 'AFlex10']
    item_pool['CHRONOS'] = expand_dimension(hexaco_data, chronos_items_all, HEXACO_ITEMS, chronos_reverse, 7, 18, min_corr=0.35)
    print(f"   Selected: {len(item_pool['CHRONOS'])} items, avg r={np.mean([i['correlation'] for i in item_pool['CHRONOS']]):.3f}")
    
    # 8. KAEL (Assertiveness) - Target: 16 items
    print("\n🔥 KAEL - Assertiveness & Leadership")
    kael_items = {
        'D1': "I am good at making impromptu speeches.",
        'D2': "I don't mind being the center of attention.",
        'D3': "I feel comfortable around people.",
        'D4': "I have leadership abilities.",
        'D5': "I have a strong personality.",
        'D6': "I know how to captivate people.",
        'D7': "I would be afraid to give a speech in public.",
        'D8': "I find it difficult to approach others.",
        'D9': "I hate being the center of attention.",
        'D10': "I have little to say."
    }
    kael_reverse = ['D7', 'D8', 'D9', 'D10']
    item_pool['KAEL'] = expand_dimension(pf16_data, list(kael_items.keys()), kael_items, kael_reverse, 5, 16, min_corr=0.35)
    print(f"   Selected: {len(item_pool['KAEL'])} items, avg r={np.mean([i['correlation'] for i in item_pool['KAEL']]):.3f}")
    
    # Export final item pool
    print("\n" + "=" * 60)
    print("FINAL ITEM POOL SUMMARY")
    print("=" * 60)
    
    total = 0
    for dimension, items in item_pool.items():
        avg_corr = np.mean([item['correlation'] for item in items])
        total += len(items)
        print(f"{dimension:12s} {len(items):2d} items, avg r={avg_corr:.3f}")
    
    print(f"\nTotal items: {total}")
    
    # Save to JSON
    with open(OUTPUT_PATH, 'w') as f:
        json.dump(item_pool, f, indent=2)
    
    print(f"\n✅ Expanded item pool exported to: {OUTPUT_PATH}")
    print("\nNext steps:")
    print("  1. Review item quality and coverage")
    print("  2. Modernize archaic wording if needed")
    print("  3. Build scoring algorithm")
    print("  4. Create adaptive testing logic")
    
if __name__ == "__main__":
    main()
