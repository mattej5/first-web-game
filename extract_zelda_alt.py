import pathlib
from bs4 import BeautifulSoup
html = pathlib.Path("temp_totk_character.html").read_text(encoding="utf-8")
soup = BeautifulSoup(html, "html.parser")
txt_img = soup.find('img', {'src': '../assets/img/character/txt_zelda_sp.webp'})
if not txt_img:
    txt_img = soup.find('img', {'alt': True, 'src': lambda s: s and 'txt_zelda' in s})
print(txt_img['alt'])
