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

    my_prompt_text = (
        "Ты — академический ассистент. Используй этот текст из учебника:\n"
        "---------------------\n"
        "{context_str}\n"
        "---------------------\n"
        "Ответь на вопрос студента: {query_str}\n"
        "Правила ответа:\n"
        "1. Приоритет источника: Всегда начинай ответ с предоставленного контекста учебника. Если в контексте есть прямой ответ, начни с него.\n"
        "2. Цитирование: При использовании информации из контекста, делай сноску в формате: (Учебник: 'Название', Автор: 'Имя').\n"
        "3. Дополнение: После разбора материала из учебника, дополни ответ актуальными данными из внешних источников (интернет-знаний), чтобы дать студенту полную картину. Выделяй это фразой: 'Дополнительно стоит отметить...'"

    )
    my_prompt_template = PromptTemplate(my_prompt_text)

    query_engine = index.as_query_engine(similarity_top_k=1,
                                         metadata_mode="llm" )

    query_engine.update_prompts(
        {"response_synthesizer:text_qa_template": my_prompt_template}
    )

    SECRET_KEY = os.getenv("SECRET_KEY")

    api_key_header = APIKeyHeader(name="X-API-KEY", auto_error=False)

    def get_api_key(api_key: str = Security(api_key_header)):
        if api_key == SECRET_KEY:
            return api_key
        raise HTTPException(status_code=HTTP_403_FORBIDDEN, detail="Invalid API Key")

    return query_engine, get_api_key