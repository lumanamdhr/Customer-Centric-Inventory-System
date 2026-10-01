import math
import re
from collections import Counter, defaultdict

from models import Product, SaleItem


def tokenize(text):
    # lowercase, and split into words (letters only)
    return re.findall(r"[a-z]+", text.lower())

#Tf: how often a word apperas X IDF: how rare that word is acrpss all products
def build_content_vectors(products):
    # one "bag of words" per product, e.g. {12: ["lips", "matte", "lipstick"]}
    docs = {}
    for p in products:
        text = f"{p.category} {p.name} {p.description or ''}"
        docs[p.id] = tokenize(text)

    # document frequency: how many PRODUCTS contain each word (not how many times total)
    doc_freq = defaultdict(int)
    for words in docs.values():
        for word in set(words):
            doc_freq[word] += 1

    total_docs = len(docs)

    # build a TF-IDF vector per product: {word: score}
    vectors = {}
    for pid, words in docs.items():
        word_counts = Counter(words)
        total_words = len(words)
        vector = {}
        for word, count in word_counts.items():
            tf = count / total_words                       # how common in THIS product
            idf = math.log(total_docs / doc_freq[word])     # how rare ACROSS all products
            vector[word] = tf * idf
        vectors[pid] = vector

    return vectors

#multiplying matching word together and sum them, then divide the length of each vector(norm_a, norm_b)
def cosine_similarity(vec_a, vec_b):
    common_words = set(vec_a) & set(vec_b)
    dot_product = sum(vec_a[w] * vec_b[w] for w in common_words)

    norm_a = math.sqrt(sum(v * v for v in vec_a.values()))
    norm_b = math.sqrt(sum(v * v for v in vec_b.values()))

    if norm_a == 0 or norm_b == 0:
        return 0

    return dot_product / (norm_a * norm_b)


def build_cooccurrence_scores(db):
    rows = db.query(SaleItem.sale_id, SaleItem.product_id).all()

    items_by_sale = defaultdict(list)
    for sale_id, product_id in rows:
        items_by_sale[sale_id].append(product_id)

    # count how often every pair of products shows up in the same sale
    co_counts = defaultdict(int)
    for items in items_by_sale.values():
        for i in items:
            for j in items:
                if i != j:
                    co_counts[(i, j)] += 1

    return co_counts


def get_recommendations(db, product_id, top_n=4, content_weight=0.5):
    products = db.query(Product).all()
    vectors = build_content_vectors(products)

    if product_id not in vectors:
        return []

    co_counts = build_cooccurrence_scores(db)
    max_count = max(co_counts.values()) if co_counts else 1

    scores = {}
    for p in products:
        if p.id == product_id:
            continue
        content_score = cosine_similarity(vectors[product_id], vectors[p.id])
        collab_score = co_counts.get((product_id, p.id), 0) / max_count
        scores[p.id] = content_weight * content_score + (1 - content_weight) * collab_score

    ranked = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    top_ids = [pid for pid, _ in ranked[:top_n]]

    return db.query(Product).filter(Product.id.in_(top_ids)).all()