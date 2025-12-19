from fastapi import FastAPI, HTTPException
import pickle
from typing import Optional
from engine import search_by_description, get_recommendations
# 1. SETUP: Create App and Load the Brain
app = FastAPI(title="Recommender API")

# Load the saved model (The Factory's output)
with open('recommender_model.pkl', 'rb') as f:
    model_data = pickle.load(f)

# Extract the parts we need
df = model_data['df'] 
tfidf = model_data['tfidf']
knn = model_data['knn']    
indices = model_data['indices']
matrix = model_data['matrix']



@app.get("/search")
def search_endpoint(q: str, type: Optional[str] = "All", limit: Optional[int] = 15):
    if limit <= 0 or limit >= 50:
        return {"success": False,
                "message": "Please provide valid limit"}
    # This calls the logic function above
    results = search_by_description(
        query=q,
        knn = knn,
        vectorizer=tfidf,
        df=df,
        content_type=type,
        k=limit
        )
    if results:
        return {"success": True, "message": "Search titles","results_count": len(results),"results": results}
    return {"success": False, "message": "Not Found",}

@app.get("/recommend")
def search_endpoint(title: str, type: Optional[str] = "All", limit: Optional[int] = 15):
    # This calls the logic function above
    if limit <= 0 or limit >= 50:
        return {"success": False,
                "message": "Please provide valid limit"}
    results = get_recommendations(
        title=title,
        knn = knn,
        matrix=matrix,
        df=df,
        indices= indices,
        content_type=type,
        k=limit
        )
    if results:
        return {"success": True, "message": "Recommend by title","results_count": len(results),"results": results}
    return {"success": False, "message": "Not Found",}
