from fastapi import FastAPI, Depends, HTTPException #depends tell before running API, the other thing is needed first
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text #execute raw SQL text through sqlalchemy interface
from sqlalchemy.orm import Session

from database import engine, get_db ,Base #import engine and base we created in db.py
from models import Product,Customer
from schemas import (
    ProductCreate, 
    ProductResponse, 
    ProductUpdate,
    CustomerCreate,
    CustomerResponse,
    CustomerLogin
    )
from security import hash_password, verify_password, create_access_token

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], #allow react frontend to communicate with API
    allow_credentials=True, #allows credentilas such as authentication inof when implement login
    allow_methods=["*"], #allows the HTTP methods as GET POST PUT DELETE
    allow_headers=["*"], #allows frontend to send HTTP headers
)
Base.metadata.create_all(bind=engine) #scans all the models that inherit from base and creates their database if they don't exist

@app.get("/")
def root():
    return {"message": "Customer Centric Inventory System API is running!"}

@app.get("/db-test") #creates another API endpoint that test FastAPI +PostgreSQL
def database_test():
    with engine.connect() as connection: #opens connection to postgre
        result = connection.execute(text("SELECT 1")) #simple database connection test
        return {
            "database": "connected",
            "result": result.scalar() #gets actual value ie 1
        }

@app.post("/products", response_model=ProductResponse)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):

    new_product = Product(
        name=product.name,
        category=product.category,
        description=product.description,
        price=product.price,
        stock_quantity=product.stock_quantity,
        reorder_level=product.reorder_level
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product

@app.get("/products", response_model=list[ProductResponse])
def get_products(db: Session = Depends(get_db)):

    products = db.query(Product).all()

    return products

@app.get("/products/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):

    product = db.query(Product).filter(Product.id == product_id).first()

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )
    return product

@app.put("/products/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    product_update: ProductUpdate,
    db: Session = Depends(get_db)
):

    product = db.query(Product).filter(Product.id == product_id).first()

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    update_data = product_update.model_dump(exclude_unset=True) #only update fields the user actually provided

    for field, value in update_data.items():
        setattr(product, field, value) #product ko kun field ma kati value update garne herxa

    db.commit()
    db.refresh(product)

    return product

@app.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):

    product = db.query(Product).filter(Product.id == product_id).first()

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    db.delete(product)
    db.commit()

    return {
        "message": "Product deleted successfully"
    }

#Customer
@app.post("/customers", response_model=CustomerResponse) #accepts post request
def create_customer(
    customer: CustomerCreate, #FastAPI expects data matching
    db: Session = Depends(get_db)
):
    existing_customer = (
        db.query(Customer)
        .filter(Customer.email == customer.email)
        .first()
    )

    if existing_customer:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = hash_password(customer.password)

    new_customer = Customer(
        name=customer.name,
        email=customer.email,
        password=hashed_password
    )

    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)

    return new_customer

#login customer
@app.post("/login")
def login(
    customer: CustomerLogin, #data from user
    db: Session = Depends(get_db) #db session
):
    existing_customer = ( #find the customer
        db.query(Customer)
        .filter(Customer.email == customer.email)
        .first()
    )

    if existing_customer is None:
        raise HTTPException(
            status_code=401, #401 means the request isn't authenticated with valid credentials
            detail="Invalid email or password"
        )

    password_is_correct = verify_password(
        customer.password, #usertyped password
        existing_customer.password #hash stored in postgreSQL
    )

    if not password_is_correct:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )
    
    access_token = create_access_token(
    data={
        "sub": str(existing_customer.id) #sub stands for subject to identify who the token belongs to
    }
    )

    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "customer_id": existing_customer.id,
        "name": existing_customer.name,
        "email": existing_customer.email
    }