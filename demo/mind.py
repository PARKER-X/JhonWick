
import sys
import os

# Add project root folder to Python path for imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import streamlit as st
from utils.flashcard import generate_flashcards_from_text
from utils.mindmap import generate_mindmap_outline, outline_to_mermaid

st.set_page_config(page_title="AI EdTech - Flashcards & Mind Map")

st.title("🧠 AI EdTech Assistant")

input_text = st.text_area("Paste your learning content here:", height=300)

task = st.radio("What do you want to generate?", ["Flashcards", "Mind Map"])

if st.button("Generate"):
    if not input_text.strip():
        st.warning("Please paste some content.")
    else:
        with st.spinner("Thinking..."):
            if task == "Flashcards":
                flashcards = generate_flashcards_from_text(input_text)
                st.markdown("### 📘 Flashcards")
                for line in flashcards.strip().split("\n"):
                    st.markdown(line)
            else:
                outline = generate_mindmap_outline(input_text)
                mermaid_code = outline_to_mermaid(outline)

                st.markdown("### 🧩 Mind Map")
                st.markdown("```mermaid\n" + mermaid_code + "\n```")
