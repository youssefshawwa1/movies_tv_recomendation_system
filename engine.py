# engine.py
from utils import clean_description  # <--- Import the tool

def search_by_description(query,  df, vectorizer, knn,content_type = "All", k=15):

    # cleaning the user_query
    cleaned_text = clean_description(query)
    # transform the text to numeric (vectors)
    query_vector = vectorizer.transform([cleaned_text])
    

    # firstly get 50 neighbors then filter them baased on the content_type
    buffer_size = 50 

    # getting nearest neighbors using k-NN algorithm.
    # .kneighbors() finds closest items to provided vector.
    # it returns two arrays, distances, and neighbor_indicies indicies in the original dataset.
    distances, neighbor_indices = knn.kneighbors(query_vector, n_neighbors=buffer_size)

    # extracts the candidates from the dataframe,
    # neighbors_indices[0] takes the first  row of the neighbor indicies since we have only one query
    candidates = df.iloc[neighbor_indices[0]].copy()
    
    # creating a simularity score for each candidate
    # distance[0] takesthe first row of distances since we have only one query
    # converting the distance to percentage.
    candidates['similarity'] = (1 - distances[0]) * 100
    
    # here filter the content_type
    if content_type == 'Movie':
        results = candidates[candidates['type'] == 'Movie']
    elif content_type == 'TV Show':
        results = candidates[candidates['type'] == 'TV Show']
    else:
        results = candidates # 'All' or 'Both'
        
        # return, result.head(k) takes the first k rows, and select specific columns from them
        # show_id,type,title,director,cast,country,date_added,release_year,rating,duration,listed_in,description

    return results.head(k)[['title', 'type', 'description', 'similarity', 'director', 'cast', 'country', 'release_year', 'duration', 'listed_in']]




def get_recommendations(title, df, matrix, knn, indices,  k=15, content_type="All",):
    try:
        search_term = title.lower()
        idx = indices[search_term]
        
        query_vector = matrix[idx]
        
        distances, neighbor_indices = knn.kneighbors(query_vector, n_neighbors=50)
        
        candidates = df.iloc[neighbor_indices[0]].copy()
        candidates['similarity'] = (1 - distances[0]) * 100
        
        if content_type == 'Movie':
            results = candidates[candidates['type'] == 'Movie']
        elif content_type == 'TV Show':
            results = candidates[candidates['type'] == 'TV Show']
        else:
            results = candidates
            
        results = results[results['title'].str.lower() != search_term]
        
        return results.head(k)[['title', 'type', 'description', 'similarity']]

    except KeyError:
        return f"Movie '{title}' not found in database. Try using the search_by_description function instead!"
    









# def get_recommendations(title, content_type='All', k=15):
#     try:
#         search_term = title.lower()
#         idx = indices[search_term]
        
#         query_vector = tfidf_matrix[idx]
        
#         distances, neighbor_indices = knn.kneighbors(query_vector, n_neighbors=50)
        
#         candidates = all_titles_clean.iloc[neighbor_indices[0]].copy()
#         candidates['similarity'] = (1 - distances[0]) * 100
        
#         if content_type == 'Movie':
#             results = candidates[candidates['type'] == 'Movie']
#         elif content_type == 'TV Show':
#             results = candidates[candidates['type'] == 'TV Show']
#         else:
#             results = candidates
            
#         results = results[results['title'].str.lower() != search_term]
        
#         return results.head(k)[['title', 'type', 'description', 'similarity']]

#     except KeyError:
#         return f"Movie '{title}' not found in database. Try using the search_by_description function instead!"