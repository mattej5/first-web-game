import json
import pathlib
import re
text = pathlib.Path("temp_totk.html").read_text()
match = re.search(r'__NEXT_DATA__" type="application/json">(.*?)</script>', text)
if not match:
    raise SystemExit('no next data')
product = json.loads(match.group(1))['props']['pageProps']['initialApolloState']['Product:{"sku":"7100063714"}']
print(product.keys())
for field in ['description', 'longDescription', 'missionDescription', 'blurb', 'shortDescription']:
    print(field, ':', product.get(field))
