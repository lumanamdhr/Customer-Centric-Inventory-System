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