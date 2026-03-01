from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import logging

logger = logging.getLogger(__name__)

def calculate_semantic_match(resume_text: str, jd_text: str) -> dict:
    """
    Calculates semantic similarity between the resume and the Job Description
    using TF-IDF vectorization and cosine similarity.
    This is a lightweight CPU-only approach that works on Railway's free tier.
    Returns a score out of 100.
    """
    if not jd_text or not jd_text.strip():
        return {
            "score": 0,
            "feedback": ["No Job Description provided. Paste a JD to get a Semantic Match score."]
        }

    if not resume_text or not resume_text.strip():
        return {
            "score": 0,
            "feedback": ["Resume text is empty."]
        }

    try:
        vectorizer = TfidfVectorizer(
            stop_words='english',
            ngram_range=(1, 2),  # unigrams and bigrams gives better semantic context
            max_features=5000
        )
        tfidf_matrix = vectorizer.fit_transform([resume_text, jd_text])
        cosine_score = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]

        # Scale to 100
        score = round(float(cosine_score) * 100, 2)

        feedback = []
        if score > 65:
            feedback.append("Strong lexical alignment with the job description.")
        elif score > 35:
            feedback.append("Moderate alignment. Consider mirroring more of the JD's key phrases and terminology.")
        else:
            feedback.append("Low keyword overlap with the job description. Tailor your resume language to match the role more closely.")

        return {"score": score, "feedback": feedback}

    except Exception as e:
        logger.error(f"Error during semantic matching: {str(e)}")
        return {"score": 0, "feedback": ["Error analyzing semantic match."]}

