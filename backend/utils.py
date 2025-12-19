from wordcloud import STOPWORDS
stop_words = set(STOPWORDS)
def clean_genres(text):
    text = str(text).lower()
    text = text.replace(" ", "")  # "Sci-Fi" -> "scifi"
    text = text.replace(",", " ") # "action, adventure" -> "action adventure"
    return text
def clean_title(x):
    return str(x).lower()
def clean_description(text):

    # updating the stop words to include the following
    stop_words.update(["movie", "film", "series", "show", "season", "episode"])
    text = str(text).lower()
    words = text.split()
    cleaned_words = [w for w in words if w not in stop_words and len(w) > 2]
    return " ".join(cleaned_words)