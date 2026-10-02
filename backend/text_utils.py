import re
import math
from collections import Counter


STOP_WORDS = {
    "a", "an", "the", "is", "are", "am", "was", "were", "be", "been",
    "do", "does", "did", "have", "has", "had",
    "i", "you", "he", "she", "it", "we", "they", "my", "your", "me",
    "this", "that", "these", "those",
    "what", "when", "where", "who", "how", "why",
    "to", "of", "in", "on", "for", "with", "at", "by", "as",
    "and", "or", "but", "if", "so",
    "can", "will", "would", "should", "could",
    "there", "here", "any", "some",
    
}

def tokenize(text):
    words = re.findall(r"[a-z]+", text.lower())
    return [word for word in words if word not in STOP_WORDS]


def compute_idf(tokenized_documents):
    """
    tokenized_documents: a list of token-lists (one per training example).
    Returns {word: idf_score} — how rare each word is across all of them.
    """
    doc_freq = {}
    total_docs = len(tokenized_documents)

    for tokens in tokenized_documents:
        for word in set(tokens):
            doc_freq[word] = doc_freq.get(word, 0) + 1

    return {word: math.log(total_docs / freq) for word, freq in doc_freq.items()}


def to_tfidf_vector(tokens, idf):
    """Turns a list of tokens into a TF-IDF vector, using already-computed idf weights."""
    counts = Counter(tokens)
    total = len(tokens) if tokens else 1
    vector = {}

    for word, count in counts.items():
        if word in idf:  # ignore words the training data never saw
            tf = count / total
            vector[word] = tf * idf[word]

    return vector


def cosine_similarity(vec_a, vec_b):
    common_words = set(vec_a) & set(vec_b)
    dot_product = sum(vec_a[w] * vec_b[w] for w in common_words)

    norm_a = math.sqrt(sum(v * v for v in vec_a.values()))
    norm_b = math.sqrt(sum(v * v for v in vec_b.values()))

    if norm_a == 0 or norm_b == 0:
        return 0

    return dot_product / (norm_a * norm_b)