from fastapi.applications import FastAPI

from aiagent.settings import load_config
from aiagent.serializers import QueryRequest

app = FastAPI()

query_engine = load_config()

@app.post("/api/v1/agent")
async def agent(query: QueryRequest):
    response = query_engine.query(query.query)

    return {"response": response}
