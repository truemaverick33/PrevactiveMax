from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import re
import string
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')

app = Flask(__name__)
CORS(app)

def preprocess(text):
    text = text.lower()
    text = re.sub('[^a-zA-Z]', ' ', text)
    tokens = word_tokenize(text)
    stop_words = set(stopwords.words('english'))
    filtered_tokens = [token for token in tokens if token not in stop_words]
    lemmatizer = WordNetLemmatizer()
    lemmatized_tokens = [lemmatizer.lemmatize(token) for token in filtered_tokens]
    preprocessed_text = ' '.join(lemmatized_tokens)
    return preprocessed_text

df = pd.read_csv('technicianskey.csv')
df['keywords'] = df['keywords'].apply(preprocess)

vectorizer = TfidfVectorizer()
kw_vectors = vectorizer.fit_transform(df['keywords'])
cos_sim = cosine_similarity(kw_vectors)

@app.route('/predict', methods=['POST'])
@cross_origin(origin='*')
def predict():
    data = request.get_json()
    description = data['description']
    print(description)
    preprocessed_description = preprocess(description)
    desc_vector = vectorizer.transform([preprocessed_description])
    cos_sim_desc_kw = cosine_similarity(desc_vector, kw_vectors)
    technician_idx = cos_sim_desc_kw.argmax()
    technician = df.loc[technician_idx, 'technician']
    response = {'technician': technician}
    return jsonify(response)

@app.route('/hello', methods=['GET'])
@cross_origin(origin='*')
def hello():
    response = {'message': 'Hello, World!'}
    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
