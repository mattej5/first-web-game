import pathlib
from bs4 import BeautifulSoup
html = pathlib.Path("temp_portal_history.html").read_text(encoding="utf-8")
soup = BeautifulSoup(html, "html.parser")
section = soup.find('div', {'id': 'totk'})
if not section:
    section = soup.select_one('div.zeldaHistory-content__item[data-item="totk"]')
if section:
    text_blocks = section.select('div.zeldaHistory-content__text p')
    for p in text_blocks:
        print(p.get_text(strip=True))
else:
    print('section not found')
