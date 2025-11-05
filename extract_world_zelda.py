import pathlib
import re
html = pathlib.Path("temp_totk_world.html").read_text(encoding="utf-8")
for match in re.finditer(r'alt="([^"]*???[^"]*)"', html):
    print(match.group(1))
