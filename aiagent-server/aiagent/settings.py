import os
import logging

logging.basicConfig(level=logging.INFO)

from llama_index.core import (VectorStoreIndex,
                              Settings,
                              PromptTemplate)
from llama_index.vector_stores.postgres import PGVectorStore
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.llms.gemini import Gemini

from fastapi import Security, HTTPException
from fastapi.security.api_key import APIKeyHeader
from starlette.status import HTTP_403_FORBIDDEN

SECRET_KEY = os.getenv("SECRET_KEY")
ALLOWED_ORIGINS = os.getenv("ORIGIN")

api_key_header = APIKeyHeader(name="X-API-KEY", auto_error=False)

def load_config():
    Settings.llm = Gemini(model="gemini-3-flash-preview",
                          temperature=0.5,
                          max_tokens=1500,
                          api_key=os.getenv("API_KEY"))
    Settings.embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-m3")

    vector_store = PGVectorStore.from_params(
        database=os.getenv("DB_NAME"),
        host=os.getenv("DB_HOST"),
        password=os.getenv("DB_PASS"),
        port=5432,
        user=os.getenv("DB_USER"),
        table_name="medical_rag_index",
        embed_dim=1024,
    )

    index = VectorStoreIndex.from_vector_store(
        vector_store=vector_store
    )

    query_engine = index.as_query_engine(similarity_top_k=1,
                                         metadata_mode="llm")

    return query_engine

async def get_api_key(api_key: str = Security(api_key_header)):
    logging.info(f"api_key: {repr(api_key)}")
    logging.info(f"secret: {repr(SECRET_KEY)}")
    if api_key == SECRET_KEY:
        return api_key
    raise HTTPException(status_code=HTTP_403_FORBIDDEN, detail="Invalid API Key")