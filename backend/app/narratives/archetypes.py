"""
SELVE Personality Archetypes - Matching Algorithm

Archetype definitions are in the archetype_definitions/ directory.
This module contains only the matching logic.
"""

from typing import Dict, List
import logging

from .archetype_definitions import ARCHETYPES, BALANCED_ARCHETYPE, Archetype

logger = logging.getLogger(__name__)


def get_all_archetypes() -> List[Archetype]:
    """Return all defined archetypes."""
    return ARCHETYPES


def match_archetype(dimension_scores: Dict[str, float]) -> Archetype:
    """Match user's dimension scores to best-fitting archetype."""
    def score_to_level(score: float) -> str:
        if score >= 75:
            return 'very_high'
        elif score >= 60:
            return 'high'
        elif score >= 40:
            return 'moderate'
        elif score >= 25:
            return 'low'
        else:
            return 'very_low'
    
    logger.info("=" * 60)
    logger.info("🎯 ARCHETYPE MATCHING")
    logger.info("=" * 60)
    logger.info("Dimension Scores:")
    for dim, score in sorted(dimension_scores.items()):
        level = score_to_level(score)
        logger.info(f"  {dim:8} = {score:5.1f} ({level})")
    
    best_archetype = None
    best_score = 0
    all_scores = []
    
    for archetype in ARCHETYPES:
        match_score = 0
        matches_detail = []
        
        for dim, expected_level in archetype.pattern.items():
            if dim not in dimension_scores:
                logger.warning(f"  ⚠️  Dimension {dim} not found in scores for {archetype.name}")
                continue
                
            actual_score = dimension_scores[dim]
            actual_level = score_to_level(actual_score)
            
            if actual_level == expected_level:
                match_score += 5
                matches_detail.append(f"{dim}={actual_score:.0f}✓ (perfect {expected_level})")
            elif (expected_level in ['high', 'very_high'] and actual_level in ['high', 'very_high']) or \
                 (expected_level in ['low', 'very_low'] and actual_level in ['low', 'very_low']):
                match_score += 3
                matches_detail.append(f"{dim}={actual_score:.0f}≈ (close to {expected_level})")
            elif actual_level == 'moderate':
                match_score += 0.5
                matches_detail.append(f"{dim}={actual_score:.0f}~ (moderate, expected {expected_level})")
            else:
                matches_detail.append(f"{dim}={actual_score:.0f}✗ (mismatch: {actual_level} vs {expected_level})")
        
        all_scores.append((archetype.name, match_score, matches_detail))
        
        if match_score > best_score:
            best_score = match_score
            best_archetype = archetype
    
    logger.info("\nArchetype Match Scores:")
    for name, score, details in sorted(all_scores, key=lambda x: x[1], reverse=True):
        logger.info(f"  {score:5.1f} points - {name}")
        if score == best_score:
            for detail in details:
                logger.info(f"         {detail}")
    
    MIN_MATCH_THRESHOLD = 8.0
    
    if best_score < MIN_MATCH_THRESHOLD:
        logger.warning(f"\n⚠️  Best match score ({best_score:.1f}) below threshold ({MIN_MATCH_THRESHOLD})")
        logger.info(f"✨ Using fallback: {BALANCED_ARCHETYPE.name}")
        logger.info("=" * 60)
        return BALANCED_ARCHETYPE
    
    logger.info(f"\n✅ Best Match: {best_archetype.name} (score: {best_score:.1f})")
    logger.info("=" * 60)
    return best_archetype
