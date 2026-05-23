from contextlib import asynccontextmanager
import asyncio

from aiagent.settings import load_config, get_api_key
from aiagent.serializers import QueryRequest

from fastapi.applications import FastAPI
from fastapi import Depends, HTTPException

from llama_index.core import QueryBundle
from llama_index.core.vector_stores import MetadataFilters, MetadataFilter, FilterOperator

state = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    query_engine = await asyncio.to_thread(load_config)

    state["query_engine"] = query_engine

    yield

    state.clear()

app = FastAPI(lifespan=lifespan)

@app.post("/api/v1/agent", dependencies=[Depends(get_api_key)])
async def agent(query: QueryRequest):
    query_engine = state["query_engine"]
    if query.filters:
        node_filters = [
            MetadataFilter(key=k, value=v, operator=FilterOperator.EQ)
            for k, v in query.filters.items()
        ]
        query_engine.retriever._filters = MetadataFilters(filters=node_filters)

    try:
        response = await query_engine.aquery(query.query)
        return {"response": str(response)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))