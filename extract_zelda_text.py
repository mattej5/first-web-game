import pathlib
import re
html = pathlib.Path("temp_totk_character.html").read_text(encoding="utf-8")
pattern = r'txt_zelda[^>]*>.*?<img[^>]+alt="([^"]+)"'
match = re.search(pattern, html, re.DOTALL)
if match:
    print(match.group(1))
else:
    print('no zelda alt found')
