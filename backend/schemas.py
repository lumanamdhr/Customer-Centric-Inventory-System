from pydantic import BaseModel

class ProductCreate(BaseModel):
    name: str
    category: str
    description: str | None = None
    price: float
    stock_quantity: int
    reorder_level: int = 10
    image: str | None = None

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
    image: str | None

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
    image: str | None = None

class CartResponse(BaseModel): #represents entire cart
    id: int
    customer_id: int
    items: list[CartItemDetailResponse]
    total: float

class CartItemUpdate(BaseModel):
    quantity: int

class CheckoutRequest(BaseModel):
    payment_method: str = "cash"

class SaleResponse(BaseModel):
    id: int
    customer_id: int
    total_amount: float
    payment_method: str
    status: str

    class Config:
        from_attributes = True

class CustomerDashboardResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str
    total_orders: int
    total_spending: float
    age: int | None = None
    gender: str | None = None
    location: str | None = None
    class Config:
        from_attributes = True

class IntelligenceProductResponse(BaseModel):
    id: int
    name: str
    stock_quantity: int
    reorder_level: int
    suggested_reorder_quantity: int

class AdminUserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str
    age: int | None = None
    gender: str | None = None
    location: str | None = None