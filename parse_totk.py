import json
import pathlib
import re
text = pathlib.Path("temp_totk.html").read_text()
match = re.search(r'__NEXT_DATA__" type="application/json">(.*?)</script>', text)
if not match:
    raise SystemExit('no next data')
raw_json = match.group(1)
data = json.loads(raw_json)

def scan(obj, path=''):
    if isinstance(obj, dict):
        for k, v in obj.items():
            scan(v, f'{path}.{k}' if path else k)
    elif isinstance(obj, list):
        for idx, v in enumerate(obj):
            scan(v, f'{path}[{idx}]')
    else:
        if isinstance(obj, str) and 'Zelda' in obj:
            print(path, ':', obj[:200].replace('\n', ' '))

scan(data)
