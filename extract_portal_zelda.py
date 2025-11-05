import pathlib
from html import unescape
html = pathlib.Path("temp_portal_zelda.html").read_text(encoding="utf-8")
segments = []
start = 0
while True:
    idx = html.find('???', start)
    if idx == -1:
        break
    seg_start = html.rfind('>', 0, idx)
    seg_end = html.find('<', idx)
    if seg_start != -1 and seg_end != -1:
        text = html[seg_start+1:seg_end].strip()
        if text:
            segments.append(unescape(text))
    start = idx + 1
for segment in segments:
    print(segment)
