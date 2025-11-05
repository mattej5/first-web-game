import json
import pathlib
import re
text = pathlib.Path("temp_totk.html").read_text()
match = re.search(r'__NEXT_DATA__" type="application/json">(.*?)</script>', text)
if not match:
    raise SystemExit('no next data')
raw_json = match.group(1)
data = json.loads(raw_json)
product = data['props']['pageProps']['initialApolloState']['Product:{"sku":"7100063714"}']
print(product['description'])
print('\n----\n')
print(product.get('longDescription', 'no longDescription'))
