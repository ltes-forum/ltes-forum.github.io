import re

# Read the HTML file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract speaker cards section
speaker_section = re.search(r'(<div class="speakers-track" id="speakersTrack">)(.*?)(</div>\s*</div>\s*<button class="carousel-btn carousel-btn--next")', content, re.DOTALL)

if not speaker_section:
    print("Could not find speakers section!")
    exit(1)

before = speaker_section.group(1)
speakers_html = speaker_section.group(2)
after = speaker_section.group(3)

# Extract individual speaker cards with comments
speaker_cards = []
# Pattern to match speaker card including its comment
card_pattern = r'(<!-- Speaker \d+ -->.*?</div>\s*(?=<!-- Speaker|</div>\s*</div>))'
cards = re.findall(card_pattern, speakers_html, re.DOTALL)

# Parse each card to extract first name for sorting
for card_html in cards:
    # Extract the name from the h3 tag
    name_match = re.search(r'<h3 class="speaker-card__name">([^<]+)</h3>', card_html)
    if name_match:
        full_name = name_match.group(1).strip()
        first_name = full_name.split()[0]
        speaker_cards.append((first_name, full_name, card_html))

# Sort by first name (case-insensitive)
speaker_cards.sort(key=lambda x: x[0].lower())

# Rebuild the speakers section with new order and sequential numbering
new_speakers_html = "\n"
for i, (first_name, full_name, card_html) in enumerate(speaker_cards, 1):
    # Update the comment number
    updated_card = re.sub(r'<!-- Speaker \d+ -->', f'<!-- Speaker {i} -->', card_html)
    new_speakers_html += updated_card + "\n"

# Replace the old speakers section with the new one
new_content = content[:speaker_section.start()] + before + new_speakers_html + after + content[speaker_section.end():]

# Write back to file
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"✓ Reordered {len(speaker_cards)} speakers alphabetically by first name")
for i, (first_name, full_name, _) in enumerate(speaker_cards, 1):
    print(f"  {i}. {full_name} ({first_name})")
