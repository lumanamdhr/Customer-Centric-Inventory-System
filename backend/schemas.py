from pydantic import BaseModel

class ProductCreate(BaseModel):
    name: str
    category: str
    description: str | None = None
    price: float
    stock_quantity: int
    reorder_level: int = 10

class ProductUpdate(BaseModel):
    name: str | None = None
    category: str | None = None
    description: str | None = None
    price: float | None = None
    stock_quantity: int | None = None
    reorder_level: int | None = None

class ProductResponse(BaseModel):
    id: int
    name: str
    category: str
    description: str | None
    price: float
    stock_quantity: int
    reorder_level: int

    class Config:
        from_attributes = True #without this pydantic may not know how to read the attributes from SQLAlchemy object

class CustomerCreate(BaseModel):
    name: str
    email: str
    password: str

class CustomerResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str

    class Config:
        from_attributes = True

class CustomerLogin(BaseModel):
    email: str
    password: str

class CartItemCreate(BaseModel): #when user clicks add to cart the frontend need sto tell the backend of products added to cart
    product_id: int
    quantity: int = 1

class CartItemResponse(BaseModel): #fastAPI send back info to frontend
    id: int
    product_id: int
    quantity: int

class CartItemDetailResponse(BaseModel): #customer friendly response
    id: int
    product_id: int
    name: str #it comes from products table
    category: str
    price: float
    quantity: int #comes from cart_items
    subtotal: float #calculated by backend and not stored in db

class CartResponse(BaseModel): #represents entire cart
    id: int
    customer_id: int
    items: list[CartItemDetailResponse]
    total: float

class CartItemUpdate(BaseModel):
    quantity: int