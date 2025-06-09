
import sys
import os

# Add project root folder to Python path for imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


import streamlit as st
from utils.extract_text import extract_text_from_pdf
from utils.flashcard import generate_flashcards_from_text
from utils.mindmap import generate_mindmap_outline
from utils.mcq import generate_mcqs_from_text
from utils.chatbot import chat_with_content
from utils.summary import generate_summary
from utils.extract_image import extract_text_from_image

st.title("AI EdTech Assistant")

uploaded_file = uploaded_file = st.file_uploader(
    "Upload your study material (PDF or Image)", 
    type=["pdf", "png", "jpg", "jpeg"]
)

if uploaded_file:
    file_type = uploaded_file.type

    if file_type == "application/pdf":
        text = extract_text_from_pdf(uploaded_file)
        st.success("✅ PDF uploaded and text extracted!")

    elif file_type.startswith("image/"):
        text = extract_text_from_image(uploaded_file)
        st.success("✅ Image uploaded and text extracted!")
    
    task = st.radio("Choose what you want to generate:", ["Summary", "Flashcards", "Mind Map", "MCQs", "Chat with Content"])

    if task == "Summary":
        st.write("🔍 Generating Summary...")
        summary = generate_summary(text)
        st.text_area("Summary", summary, height=300)

    elif task == "Flashcards":
        st.write("📋 Generating Flashcards...")
        cards = generate_flashcards_from_text(text)
        for card in cards:
            st.markdown(f"**Q:** {card['question']}\n\n**A:** {card['answer']}")

    elif task == "Mind Map":
        st.write("🧠 Generating Mind Map...")
        mindmap = generate_mindmap_outline(text)
        st.markdown("```mermaid\n" + mindmap + "\n```")

    elif task == "MCQs":
        st.write("📚 Generating MCQs...")
        mcqs = generate_mcqs_from_text(text)
        for q in mcqs:
            st.markdown(f"**Q:** {q['question']}")
            for opt in q['options']:
                st.markdown(f"- {opt}")
            st.markdown(f"**Answer:** {q['answer']}")
            st.markdown("---")

    elif task == "Chat with Content":
        user_question = st.text_input("Ask anything based on the uploaded content:")
        if user_question:
            reply = chat_with_content(text, user_question)
            st.markdown(f"**AI:** {reply}")
