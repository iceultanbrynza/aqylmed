from contextlib import asynccontextmanager
import asyncio

from aiagent.settings import load_config, get_api_key
from aiagent.serializers import QueryRequest
from aiagent.settings import ALLOWED_ORIGINS
from aiagent import (services,
                     prompts)

from fastapi.applications import FastAPI
from fastapi import Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

state = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    query_engine = await asyncio.to_thread(load_config)

    state["query_engine"] = query_engine

    yield

    state.clear()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/v1/agent", dependencies=[Depends(get_api_key)])
async def agent(query: QueryRequest):
    query_engine = state["query_engine"]

    query_engine.update_prompts(
        {"response_synthesizer:text_qa_template": prompts.ACADEMIC}
    )

    if query.filters:
        filters = services.FilterService.build(query.filters)
        query_engine.retriever._filters = filters

    try:
        response = await query_engine.aquery(query.query)
        return {"response": str(response)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# @app.post("/api/v1/generate_quiz", dependencies=[Depends(get_api_key)])
# async def generate_quiz(query: QueryRequest):



# @app.post("/api/v1/load_book", dependencies=[Depends(get_api_key)])
# async def load_book(query: QueryRequest):
