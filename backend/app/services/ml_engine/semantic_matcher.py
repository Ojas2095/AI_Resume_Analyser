from sentence_transformers import SentenceTransformer, util
import logging

logger = logging.getLogger(__name__)

# Load the lightweight model globally so it's only loaded once per worker.
# all-MiniLM-L6-v2 is a fast and efficient sentence transformer around 80MB.
try:
    semantic_model = SentenceTransformer('all-MiniLM-L6-v2') 
except Exception as e:
    logger.error(f"Error loading Semantic Model: {str(e)}")
    semantic_model = None

def calculate_semantic_match(resume_text: str, jd_text: str) -> dict:
    """
    Calculates the semantic similarity between the entire resume and the Job Description.
    This goes beyond keyword matching to track context alignment.
    Returns a score out of 100.
    """
    if not jd_text:
        return {
            "score": 0,
            "feedback": ["No Job Description provided. Provide a JD to calculate semantic alignment."]
        }
        
    if not semantic_model:
        return {
            "score": 0,
            "feedback": ["Semantic model unavailable on the server."]
        }
        
    try:
        # Compute embeddings
        resume_embedding = semantic_model.encode(resume_text, convert_to_tensor=True)
        jd_embedding = semantic_model.encode(jd_text, convert_to_tensor=True)
        
        # Compute cosine similarity
        cosine_score = util.cos_sim(resume_embedding, jd_embedding).item()
        
        # Normalize and scale to 100. Cosine similarity ranges from -1 to 1, but for text it's mostly 0 to 1.
        score = max(0, min(100, cosine_score * 100))
        
        feedback = []
        if score > 75:
            feedback.append("Excellent semantic alignment with the job description.")
        elif score > 45:
            feedback.append("Good semantic alignment, but consider tailoring specific phrasing closer to the JD.")
        else:
            feedback.append("Low semantic match. Make sure your experience actually reflects the core duties of the target role.")
            
        return {
            "score": round(score, 2),
            "feedback": feedback
        }
        
    except Exception as e:
        logger.error(f"Error during semantic matching: {str(e)}")
        return {"score": 0, "feedback": ["Error analyzing semantic match."]}
