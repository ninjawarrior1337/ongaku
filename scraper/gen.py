import os
import json
from multiprocessing import Pool
from typing import TypedDict
from bs4 import BeautifulSoup

class Theme(TypedDict):
    title: str
    type: str
    link: str
    anime_idx: int

class Anime(TypedDict):
    title: str
    mal_link: str
    themes: list[Theme]


def parseFile(name):
    animeList = []
    path = os.path.join("pages", name)
    print(path)
    with open(path) as f:
        bs = BeautifulSoup(f.read(), "html.parser")
        for e in bs.select(".md.wiki > table"):
            anime: Anime = {}

            title = e.find_previous_sibling("h3")
            body = e.find("tbody")

            themes = []
            for row in body.select("tr"):
                theme: Theme = {}
                cols = row.select("td")
                
                if aTag := cols[1].find("a"):
                    theme["title"] = cols[0].text
                    theme["type"] = cols[0].text[:2]
                    theme["link"] = aTag["href"]

                if theme.get("title"):
                    themes.append(theme)

            anime["title"] = title.text
            anime["mal_link"] = title.findChild("a")["href"]
            anime["themes"] = themes

            animeList.append(anime)
            
    return animeList

aL = []

for dir, _, f in os.walk("pages"):
    with Pool() as p:
        aL = p.map(parseFile, f)

aL: list[Anime] = [a for y in aL for a in y]
for i, a in enumerate(aL):
    for t in a["themes"]:
        t["anime_idx"] = i


# change dir so that the prod json can be written to the right place
os.chdir(os.path.dirname(os.path.abspath(__file__)))

with open("anime.json", "w+") as f:
    f.write(json.dumps({"anime": aL}, indent=4))

with open("../src/assets/anime.json", "w+") as f:
    f.write(json.dumps({"anime": aL}))

print(f"Processed {len(aL)} anime.")
print(f"Processed { len([t for a in aL for t in a['themes']]) } themes.")