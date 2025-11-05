import pathlib
import re
html = pathlib.Path("temp_totk_character.html").read_text(encoding="utf-8")
match = re.search(r'alt="([^"]*?)"', html)
print(match.group(1) if match else 'no match')
