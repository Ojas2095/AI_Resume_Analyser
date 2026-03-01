import textstat
import spacy
from typing import List

# Load spacy model globally
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    # Fallback to download at runtime if needed, though Docker build should handle this
    import spacy.cli
    spacy.cli.download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

# Common resume clichés and empty buzzwords
BUZZWORDS = {
    "synergy", "go-getter", "think outside the box", "dynamic", "thought leadership",
    "results-driven", "detail-oriented", "team player", "hard worker", "proactive",
    "self-starter", "innovative", "visionary", "bottom line", "value-add",
    "strategic thinker", "proven track record", "results oriented", "fast-paced"
}

def analyze_readability_and_cliches(text: str) -> dict:
    """
    Analyzes reading complexity using textstat and flags overused clichés.
    Returns a readability score (0-100) and actionable feedback.
    """
    score = 100
    feedback = []
    
    # 1. Readability (Flesch Reading Ease)
    # 60-70 ranking is standard/ideal for easy skimming
    flesch_score = textstat.flesch_reading_ease(text)
    
    if flesch_score < 30:
        score -= 20
        feedback.append("Text is extremely dense (academic level). Simplify sentences for hurried recruiters.")
    elif flesch_score > 85:
        score -= 10
        feedback.append("Text is very simplistic. Ensure you aren't omitting critical technical details.")
    else:
        feedback.append("Excellent readability. Professional and easy to skim.")
        
    # 2. Buzzword Detection
    doc = nlp(text.lower())
    found_buzzwords = set()
    
    # Single token match
    for token in doc:
        if token.text in BUZZWORDS:
            found_buzzwords.add(token.text)
            
    # Multi-word phrase match
    text_lower = text.lower()
    for phrase in BUZZWORDS:
        if " " in phrase and phrase in text_lower:
            found_buzzwords.add(phrase)
            
    if found_buzzwords:
        penalty = min(30, len(found_buzzwords) * 5)
        score -= penalty
        feedback.append(f"Flagged {len(found_buzzwords)} overused clichés: {', '.join(found_buzzwords)}. Replace them with specific, quantifiable achievements.")
    else:
        feedback.append("No common buzzwords detected. Good use of specific language.")
        
    # 3. Action Verb Density (Heuristic)
    verb_count = sum(1 for token in doc if token.pos_ == "VERB")
    noun_count = sum(1 for token in doc if token.pos_ == "NOUN")
    
    if noun_count > 0:
        verb_to_noun_ratio = verb_count / noun_count
        if verb_to_noun_ratio < 0.15:
            score -= 10
            feedback.append("Passive language detected. Start your bullet points with strong Action Verbs.")
            
    return {
        "score": max(0, round(score, 2)),
        "feedback": feedback,
        "metrics": {
            "flesch_reading_ease": flesch_score,
            "buzzwords_found": list(found_buzzwords)
        }
    }
