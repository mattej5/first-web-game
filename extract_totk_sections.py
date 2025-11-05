import json
import pathlib
import re
text = pathlib.Path("temp_totk.html").read_text()
match = re.search(r'__NEXT_DATA__" type="application/json">(.*?)</script>', text)
if not match:
    raise SystemExit('no next data')
data = json.loads(match.group(1))
sections = data['props']['pageProps'].get('marketingPage', {}).get('sections', [])
for idx, section in enumerate(sections):
    for key, value in list(section.items()):
        if isinstance(value, str) and 'Zelda' in value:
            print(f'section {idx} string field {key}: {value[:400]}')
    stack = [(section, '')]
    while stack:
        current, path = stack.pop()
        if isinstance(current, dict):
            for k, v in current.items():
                stack.append((v, f'{path}.{k}' if path else k))
        elif isinstance(current, list):
            for i, v in enumerate(current):
                stack.append((v, f'{path}[{i}]'))
        else:
            if isinstance(current, str) and 'Zelda' in current:
                print(f'section {idx} {path}: {current[:400]}')
