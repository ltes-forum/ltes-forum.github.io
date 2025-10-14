import docx2txt
import os

# Define the session files
session_files = [
    ("Relevant info/01_Concept and Agenda/Session concept notes/Session 1_LTES frameworks and NDC alignment in practice_Agenda.docx",
     "Relevant info/01_Concept and Agenda/Session concept notes/Session 1_LTES frameworks and NDC alignment in practice_Agenda.txt"),
    ("Relevant info/01_Concept and Agenda/Session concept notes/Session 2_Planning to Investment_Agenda.docx",
     "Relevant info/01_Concept and Agenda/Session concept notes/Session 2_Planning to Investment_Agenda.txt"),
    ("Relevant info/01_Concept and Agenda/Session concept notes/Session 3_Communicating scenarios _Agenda.docx",
     "Relevant info/01_Concept and Agenda/Session concept notes/Session 3_Communicating scenarios _Agenda.txt"),
    ("Relevant info/01_Concept and Agenda/Session concept notes/Session 4_Adopting Modelling Tools_Agenda.docx",
     "Relevant info/01_Concept and Agenda/Session concept notes/Session 4_Adopting Modelling Tools_Agenda.txt"),
    ("Relevant info/01_Concept and Agenda/Session concept notes/Session 5_Supply Chain Uncertainties_Agenda.docx",
     "Relevant info/01_Concept and Agenda/Session concept notes/Session 5_Supply Chain Uncertainties_Agenda.txt"),
    ("Relevant info/01_Concept and Agenda/Session concept notes/Session 6_digitalization through demand-side planning_Agenda.docx",
     "Relevant info/01_Concept and Agenda/Session concept notes/Session 6_digitalization through demand-side planning_Agenda.txt"),
    ("Relevant info/01_Concept and Agenda/Session concept notes/Session 7_AI in Energy Planning_Agenda.docx",
     "Relevant info/01_Concept and Agenda/Session concept notes/Session 7_AI in Energy Planning_Agenda.txt"),
    ("Relevant info/01_Concept and Agenda/Session concept notes/Session 8_Just Transition_Agenda.docx",
     "Relevant info/01_Concept and Agenda/Session concept notes/Session 8_Just Transition_Agenda.txt"),
]

print("Converting DOCX files to TXT...\n")

for docx_path, txt_path in session_files:
    try:
        # Extract text from DOCX
        text = docx2txt.process(docx_path)

        # Write to TXT file
        with open(txt_path, 'w', encoding='utf-8') as f:
            f.write(text)

        session_num = os.path.basename(docx_path).split('_')[0]
        print(f"[OK] Converted {session_num}")

    except Exception as e:
        print(f"[ERROR] Error converting {docx_path}: {e}")

print("\nConversion complete!")
