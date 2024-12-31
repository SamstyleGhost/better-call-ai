from dotenv import load_dotenv
import os
from supabase import Client, create_client
from sentence_transformers import SentenceTransformer

load_dotenv()
url: str = os.environ["SUPABASE_URL"]
key: str = os.environ["SUPABASE_KEY"]

supabase: Client = create_client(url, key)
encoding_name = "cl100k_base"
model = SentenceTransformer('thenlper/gte-large')

def generate_new_embedding(section_text: str):
    """
    Generate a new embedding for the given text.
    Replace this function with your actual embedding generation logic.
    """
    embedding = model.encode(section_text)
    embed = embedding.tolist()
    return embed

def migrate_and_update():
    # Step 1: Fetch data from `better_call_ai`
    response = supabase.table("better_call_ai").select("*").execute()
    
    data = response.data
    if not data:
        print("No data found in `better_call_ai` table.")
        return

    for row in data:
        # Step 2: Prepare data for `better_call_ai_updated`
        new_row = {
            "document_name": row["document_name"],
            "section_title": row["section_title"],
            "section_url": row["section_url"],
            "section_text": row["section_text"],
            "section_number_of_tokens": row["section_number_of_tokens"],
            "act_number": row["act_number"],
            "embedding": generate_new_embedding(row["section_text"]),
        }

        insert_response = supabase.table("better_call_ai_updated").insert(new_row).execute()

migrate_and_update()