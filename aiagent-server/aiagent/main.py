from fastapi.applications import FastAPI
from fastapi import Depends

from aiagent.settings import load_config
from aiagent.serializers import QueryRequest

app = FastAPI()

query_engine, get_api_key = load_config()

@app.post("/api/v1/agent", dependencies=[Depends(get_api_key)])
async def agent(query: QueryRequest):
    response = query_engine.query(query.query)

    return {"response": response}
