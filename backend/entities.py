import re
from text_utils import tokenize
from models import Product

# Maps words customers might type to your actual category names.
# Multiple words can point to the same category.
CATEGORY_KEYWORDS = {
    "lips": "Lips", "lipstick": "Lips", "lip": "Lips", "balm": "Lips",
    "face": "Face", "foundation": "Face", "primer": "Face", "blush": "Face", "concealer": "Face",
    "eyes": "Eyes", "eye": "Eyes", "eyeshadow": "Eyes", "eyeliner": "Eyes", "mascara": "Eyes", "kajal": "Eyes",
    "skincare": "Skincare", "skin": "Skincare", "sunscreen": "Skincare", "serum": "Skincare", "moisturizer": "Skincare",
}

#a straight forward lookup dictionary
def extract_category(message):
    tokens = tokenize(message)
    for token in tokens:
        if token in CATEGORY_KEYWORDS:
            return CATEGORY_KEYWORDS[token]
    return None

#reuses tokenize then check how many words overlap between the message and eacch real product's name
def extract_product(message, products):
    """Finds the product whose name shares the most words with the message."""
    message_tokens = set(tokenize(message))

    best_match = None
    best_overlap = 0

    for product in products:
        name_tokens = set(tokenize(product.name))
        overlap = len(message_tokens & name_tokens)

        if overlap > best_overlap:
            best_overlap = overlap
            best_match = product

    return best_match

#finds the first run of digitd anywhere in text
def extract_order_number(message):
    match = re.search(r"\d+", message)
    return int(match.group()) if match else None


# Quick standalone test, same idea as chatbot.py
if __name__ == "__main__":
    from database import SessionLocal

    db = SessionLocal()
    products = db.query(Product).all()

    print("Type a message to test entity extraction ('quit' to stop):")
    while True:
        message = input("> ")
        if message.lower() == "quit":
            break

        print(f"  Category: {extract_category(message)}")
        print(f"  Product:  {extract_product(message, products)}")
        print(f"  Order #:  {extract_order_number(message)}")

    db.close()