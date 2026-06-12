from pydantic import BaseModel

class FilterValue(BaseModel):
    values: list[str]
    key: str

class QueryRequest(BaseModel):
    query: str
    filters: list[FilterValue]|None = None

class GenerateRequest(BaseModel):
    query: str
    filters: list[FilterValue]|None = None
    difficulty: str
    questions_count: int