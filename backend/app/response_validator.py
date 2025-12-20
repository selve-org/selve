"""
Response validation and consistency tracking.
Detects random clicking, attention issues, and response patterns.
"""

from typing import Dict, List, Optional, Any
import statistics


class ResponseValidator:
    """
    Validates user responses for consistency and attention patterns.
    """
    
    # Question pairs that test the same concept (for consistency checking)
    CONSISTENCY_PAIRS = {
        # Anger/Irritability cluster
        "anger_irritability": [
            {"items": ["APati7", "APati6"], "concept": "Gets angry/annoyed easily"},
            {"items": ["APati8", "N9"], "concept": "Gets irritated easily"},
        ],
        # Extraversion cluster  
        "extraversion": [
            {"items": ["E1", "XExpr3"], "concept": "Life of the party"},
            {"items": ["E8", "XExpr7"], "concept": "Don't like attention"},
            {"items": ["D2", "D9"], "concept": "Being center of attention"},
        ],
        # Conscientiousness cluster
        "conscientiousness": [
            {"items": ["C1", "ORIN_SC3"], "concept": "Being prepared/organized"},
        ]
    }
    
    def __init__(self):
        self.consistency_scores: Dict[str, float] = {}
        self.attention_flags: List[str] = []
    
    def validate_responses(
        self, 
        responses: Dict[str, int]
    ) -> Dict[str, Any]:
        """
        Analyze response patterns for consistency and attention.
        
        Returns:
            Dictionary with validation results including:
            - consistency_score: 0-100 (100 = perfectly consistent)
            - attention_score: 0-100 (100 = clearly paying attention)
            - flags: List of issues detected
            - details: Detailed breakdown
        """
        result: Dict[str, Any] = {
            "consistency_score": 100.0,
            "attention_score": 100.0,
            "flags": [],
            "details": {
                "consistency_checks": [],
                "pattern_checks": [],
            }
        }
        
        if len(responses) < 5:
            return result  # Not enough data yet
        
        # Check consistency across similar questions
        consistency_checks = self._check_consistency_pairs(responses)
        result["details"]["consistency_checks"] = consistency_checks
        
        # Check for suspicious response patterns
        pattern_checks = self._check_response_patterns(responses)
        result["details"]["pattern_checks"] = pattern_checks
        
        # Calculate overall scores
        if consistency_checks:
            consistency_scores = [c["consistency_pct"] for c in consistency_checks]
            result["consistency_score"] = statistics.mean(consistency_scores)
            
            # Flag low consistency
            if result["consistency_score"] < 70:
                result["flags"].append("Low consistency on similar questions")
        
        if pattern_checks["suspicious_patterns"]:
            result["attention_score"] -= len(pattern_checks["suspicious_patterns"]) * 20
            result["attention_score"] = max(0, result["attention_score"])
            result["flags"].extend(pattern_checks["suspicious_patterns"])
        
        return result
    
    def _check_consistency_pairs(
        self, 
        responses: Dict[str, int]
    ) -> List[Dict[str, Any]]:
        """
        Check how consistently user answered similar questions.
        """
        checks: List[Dict[str, Any]] = []
        
        for cluster_name, pairs in self.CONSISTENCY_PAIRS.items():
            for pair_info in pairs:
                items = pair_info["items"]
                concept = pair_info["concept"]
                
                # Check if both items were answered
                answered_items = [item for item in items if item in responses]
                
                if len(answered_items) >= 2:
                    # Get responses (first 2 answered)
                    item1, item2 = answered_items[0], answered_items[1]
                    response1 = responses[item1]
                    response2 = responses[item2]
                    
                    # Calculate difference (on 1-5 scale)
                    diff = abs(response1 - response2)
                    
                    # Consistency percentage (0 diff = 100%, 4 diff = 0%)
                    consistency_pct = max(0, 100 - (diff * 25))
                    
                    checks.append({
                        "concept": concept,
                        "items": [item1, item2],
                        "responses": [response1, response2],
                        "difference": diff,
                        "consistency_pct": consistency_pct,
                        "is_consistent": diff <= 1  # Allow 1 point difference
                    })
        
        return checks
    
    def _check_response_patterns(
        self, 
        responses: Dict[str, int]
    ) -> Dict[str, Any]:
        """
        Check for suspicious response patterns that suggest random clicking.
        """
        values = list(responses.values())
        
        suspicious_patterns: List[str] = []
        
        # 1. All same value (e.g., all 3s)
        if len(set(values)) == 1:
            suspicious_patterns.append(f"All responses are {values[0]} - possible straight-lining")
        
        # 2. Extreme straight-lining (90%+ same value)
        if len(values) >= 10:
            most_common = max(set(values), key=values.count)
            frequency = values.count(most_common) / len(values)
            if frequency >= 0.9:
                suspicious_patterns.append(
                    f"{int(frequency*100)}% responses are {most_common} - possible inattention"
                )
        
        # 3. Perfect zigzag pattern (1,5,1,5,1,5...)
        if len(values) >= 6:
            is_zigzag = all(
                abs(values[i] - values[i+1]) >= 3 
                for i in range(len(values)-1)
            )
            if is_zigzag:
                suspicious_patterns.append("Perfect alternating pattern - possible random clicking")
        
        # 4. No variance at all in last 10 responses
        if len(values) >= 10:
            recent_10 = values[-10:]
            if len(set(recent_10)) == 1:
                suspicious_patterns.append("Last 10 responses identical - possible bot/fatigue")
        
        return {
            "suspicious_patterns": suspicious_patterns,
            "response_variance": statistics.variance(values) if len(values) > 1 else 0,
            "unique_values_used": len(set(values)),
            "total_responses": len(values)
        }
    
    def should_show_consistency_question(
        self,
        responses: Dict[str, int],
        pending_questions: set
    ) -> Optional[str]:
        """
        Determine if we should show a consistency-check question.
        
        Returns item code of consistency question to show, or None.
        """
        # Only show consistency questions after 10+ responses
        if len(responses) < 10:
            return None
        
        # Check which consistency pairs we haven't tested yet
        for cluster_name, pairs in self.CONSISTENCY_PAIRS.items():
            for pair_info in pairs:
                items = pair_info["items"]
                
                # Find if first item was answered but second wasn't
                answered_items = [item for item in items if item in responses or item in pending_questions]
                
                if len(answered_items) == 1:
                    # First item answered, second not - return second for consistency check
                    for item in items:
                        if item not in responses and item not in pending_questions:
                            return item
        
        return None
    
    def get_consistency_report(
        self,
        responses: Dict[str, int]
    ) -> Dict[str, Any]:
        """
        Generate consistency report for results page.
        
        Returns:
            Dictionary with consistency analysis including:
            - message: Human-readable summary
            - consistency_score: Numeric score (0-100)
            - status: 'high', 'medium', or 'low'
            - details: Full validation details
        """
        validation = self.validate_responses(responses)
        consistency_score = validation["consistency_score"]
        
        if consistency_score >= 90:
            message = "✅ Highly consistent responses - you paid close attention!"
            status = "high"
        elif consistency_score >= 70:
            message = "⚠️ Mostly consistent - minor variations on similar questions"
            status = "medium"
        else:
            message = "❌ Inconsistent responses detected - results may be less accurate"
            status = "low"
        
        return {
            "message": message,
            "consistency_score": consistency_score,
            "attention_score": validation["attention_score"],
            "status": status,
            "flags": validation["flags"],
            "details": validation["details"]
        }
