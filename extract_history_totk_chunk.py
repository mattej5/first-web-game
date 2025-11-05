import pathlib
html = pathlib.Path("temp_portal_history.html").read_text(encoding="utf-8")
marker = 'zeldaHistory-section zeldaHistory-section--totk'
idx = html.find(marker)
chunk = html[idx:idx+3000]
print(chunk)
