import pathlib
html = pathlib.Path("temp_portal_history.html").read_text(encoding="utf-8")
start = html.find('zeldaHistory-content__text')
chunk = html[start:start+600]
print(chunk)
