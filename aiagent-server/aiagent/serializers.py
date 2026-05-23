from typing import Dict, Optional

from pydantic import BaseModel

class QueryRequest(BaseModel):
    query: str
    filters: Optional[Dict[str, str]] = None