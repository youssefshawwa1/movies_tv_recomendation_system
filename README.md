# Recommendation System

A full-stack machine learning application that provides content recommendations based on textual similarity. The system uses a **FastAPI** backend to serve predictions from a trained model and a **React** frontend for an interactive user experience.

## 1. Overview

The main goal of this project is to build a **Content-Based Filtering** system (recommendation system). This system analyzes the _description, genre, and title_ of the content to find similarities.

#### A user can do 2 things:

1. **Input a Title** (Movie or TV Show or Both), and get recommendations based on that specific title.
2. **Input a search query**, and it finds word similarities based on description, title, and genres.

When a user searches for "space wars", the system first cleans the search term from stopwords such as "the, in, is...", and then converts that text into mathematical vectors and finds the closest matching items in the vector space, returning results like _Star Wars_ or _Guardians of the Galaxy_. Also, it depends on the availability of the titles, as the dataset is not full.

## 2. Architecture

The project is structured as a monorepo with two distinct parts:

- **`/backend`**: A Python-based API that hosts the machine learning model.
- **`/frontend`**: A React.js web interface that communicates with the API.

## 3. Phases and Approach

### Part 1: Backend

1. **Finding and exploring the datasets:** I sourced datasets for Netflix, Disney+, Amazon Prime, and Hulu to create a comprehensive library.
2. **Data Wrangling:** I merged the multiple CSV files using **Pandas** into one giant dataset and standardized the IDs to handle schema mismatches.
3. **Exploring and Cleaning:** I analyzed the giant dataset for null values (NaNs) and duplicates. Instead of dropping rows with missing directors/cast, I filled them with "Unknown" to preserve data volume.
4. **Exploratory Data Analysis (EDA):** I visualized the content distribution (Movies vs. TV Shows) and top genres to understand the class balance and data spread.
5. **Preprocessing (The "Soup"):** I created a new "Soup" column by combining _Description + Title + Genre_. This ensures the model finds similarities not just by plot, but by mood.
   - I converted this "soup" into mathematical vectors using **TfidfVectorizer**.
   - _Challenge:_ I encountered a problem where standard stopwords removed important context. I compared manual cleaning vs. the built-in `stop_words='english'` to optimize accuracy.
6. **Dimension Reduction:** I visualized the distribution of the movies and TV shows to see how the data clusters.
7. **Training:** Now that the data was cleaned and transformed into numerical vectors, I trained the model. I chose **K-Nearest Neighbors (KNN)** with **Cosine Similarity** because it is efficient for finding the "nearest neighbor" in a vector space based on word occurrences.
8. **Testing:** I manually tested the model with edge cases (e.g., exact title matches vs. vague descriptions) to ensure the `k` neighbors parameter was tuned correctly.
9. **API Creation:** After testing, I created a simple **FastAPI** application with two GET endpoints: `/search` (for querying) and `/recommend` (for title lookups).

### Part 2: Frontend

1. **Implementing a simple UI** to demonstrate the full stack and to visualize results. Using React.js and Tailwind CSS.
2. **Connecting the Frontend** with the backend using Axios.
3. **Testing the Frontend** with some search/recommend calls, and it works.

## 4. How to Run Locally

This project is a Monorepo containing both the Python backend and React frontend. You will need **two separate terminal windows** to run them simultaneously.

### Prerequisites

- **Python 3.8+** (for the API)
- **Node.js & npm** (for the UI)

### ➤ Step 1: Start the Backend (API)

The backend runs on `localhost:8000` and handles the logic/database.

1.  Open your first terminal and navigate to the backend folder:

    ```bash
    cd backend
    ```

2.  Create and activate a virtual environment (Recommended):

    ```bash
    # Windows
    python -m venv env
    .\env\Scripts\activate

    # Mac/Linux
    python3 -m venv env
    source env/bin/activate
    ```

3.  Install the required libraries:

    ```bash
    pip install -r requirements.txt
    ```

4.  Start the FastAPI server:
    ```bash
    uvicorn main:app --reload
    ```
    _You should see: `Uvicorn running on http://127.0.0.1:8000`_

### ➤ Step 2: Start the Frontend (UI)

The frontend runs on `localhost:5173` and provides the interactive interface.

1.  Open a **new** terminal window and navigate to the frontend folder:

    ```bash
    cd frontend
    ```

2.  Install the JavaScript dependencies:

    ```bash
    npm install
    ```

3.  Launch the React application:
    ```bash
    npm run dev
    ```
    _Your browser should automatically open to `http://localhost:5173`._

---

### API Usage Examples

Once the backend is running, you can also test it directly via the browser or Postman:

- **Search:** `http://localhost:8000/search?query=matrix&type=Movie`
- **Recommend:** `http://localhost:8000/recommend?title=Toy%20Story&type=All`

## 5. Technologies & Libraries Used

### Backend

- **Python 3.9+**: The core programming language.
- **FastAPI**: For building the high-performance REST API.
- **Pandas**: For data manipulation, cleaning, and analysis.
- **wordcloud**: In order to get the list of stopwords.
- **Scikit-Learn**: For machine learning (TF-IDF Vectorization, K-Nearest Neighbors).
- **NumPy**: For numerical operations.
- **Uvicorn**: An ASGI web server implementation for Python.

### Frontend

- **React.js**: For building the component-based user interface.
- **React Icons**: For some basic icons.
- **Tailwind CSS**: For styling and responsive design.
- **Axios**: For making HTTP requests to the backend API.
