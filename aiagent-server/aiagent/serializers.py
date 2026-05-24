from typing import Dict, Optional

from pydantic import BaseModel

class FilterValue(BaseModel):
    values: list[str]          # список значений для OR
    key: str                   # поле метаданных

class QueryRequest(BaseModel):
    query: str
    filters: list[FilterValue]|None = None