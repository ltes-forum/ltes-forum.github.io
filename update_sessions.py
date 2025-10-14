import re
import os

# Read all session concept notes
session_files = {
    '1': "Relevant info/01_Concept and Agenda/Session concept notes/Session 1_LTES frameworks and NDC alignment in practice_Agenda.txt",
    '2': "Relevant info/01_Concept and Agenda/Session concept notes/Session 2_Planning to Investment_Agenda.txt",
    '3': "Relevant info/01_Concept and Agenda/Session concept notes/Session 3_Communicating scenarios _Agenda.txt",
    '4': "Relevant info/01_Concept and Agenda/Session concept notes/Session 4_Adopting Modelling Tools_Agenda.txt",
    '5': "Relevant info/01_Concept and Agenda/Session concept notes/Session 5_Supply Chain Uncertainties_Agenda.txt",
    '6': "Relevant info/01_Concept and Agenda/Session concept notes/Session 6_digitalization through demand-side planning_Agenda.txt",
    '7': "Relevant info/01_Concept and Agenda/Session concept notes/Session 7_AI in Energy Planning_Agenda.txt",
    '8': "Relevant info/01_Concept and Agenda/Session concept notes/Session 8_Just Transition_Agenda.txt",
}

def extract_section(text, start_marker, end_markers):
    """Extract text between start_marker and any of end_markers"""
    # Find start
    start_idx = text.find(start_marker)
    if start_idx == -1:
        return ""

    start_idx += len(start_marker)

    # Find end (first occurrence of any end marker)
    end_idx = len(text)
    for end_marker in end_markers:
        idx = text.find(end_marker, start_idx)
        if idx != -1 and idx < end_idx:
            end_idx = idx

    section = text[start_idx:end_idx].strip()
    return section

def parse_expected_outcomes(text):
    """Parse expected outcomes into a list"""
    lines = text.split('\n')
    outcomes = []
    for line in lines:
        line = line.strip()
        if line and not line.lower().startswith('expected outcome'):
            outcomes.append(line)
    return outcomes

def create_concept_html(context, objective, outcomes):
    """Create the HTML content for the concept section"""
    html = []

    if context:
        html.append("<h4>Context</h4>")
        # Split into paragraphs
        paragraphs = [p.strip() for p in context.split('\n\n') if p.strip()]
        for p in paragraphs:
            html.append(f"<p>{p}</p>")

    if objective:
        html.append("\n<h4>Objective</h4>")
        html.append(f"<p>{objective}</p>")

    if outcomes:
        html.append("\n<h4>Expected Outcomes</h4>")
        html.append("<ul>")
        for outcome in outcomes:
            html.append(f"    <li>{outcome}</li>")
        html.append("</ul>")

    return "\n".join(html)

# Read and process each session
sessions_data = {}

for session_num, file_path in session_files.items():
    print(f"Processing Session {session_num}...")

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract sections
    context = extract_section(content, "Context", ["Objective", "Expected outcomes"])
    objective = extract_section(content, "Objective", ["Expected outcomes", "Proposed Agenda"])
    outcomes_text = extract_section(content, "Expected outcomes", ["Proposed Agenda", "Duration"])

    # Parse outcomes
    outcomes = parse_expected_outcomes(outcomes_text)

    # Create concept HTML
    concept_html = create_concept_html(context, objective, outcomes)

    sessions_data[session_num] = {
        'concept': concept_html
    }

# Print output for manual verification
print("\n" + "="*80)
print("GENERATED SESSION CONCEPTS")
print("="*80)

for session_num in sorted(sessions_data.keys()):
    print(f"\nSession {session_num}:")
    print("-" * 80)
    print(sessions_data[session_num]['concept'])
    print("-" * 80)

print("\n" + "="*80)
print("Now writing to update_data.js file...")
print("="*80)

# Write to a separate JS file that can be used to update main.js
with open('update_data.js', 'w', encoding='utf-8') as f:
    f.write("// Updated session data - use this to update main.js\n")
    f.write("// Copy each session's concept content to replace the existing one in main.js\n\n")

    for session_num in sorted(sessions_data.keys()):
        f.write(f"// Session {session_num}\n")
        f.write("concept: `\n")
        f.write(sessions_data[session_num]['concept'])
        f.write("\n`,\n\n")

print("\nGenerated update_data.js file with new session concepts!")
print("This file can be used to update the sessionData in main.js")
