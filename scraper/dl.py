from itertools import chain
from datetime import date
from time import sleep
import requests

scrapeYears = [i for i in chain((f"{i}s" for i in range(60, 91, 10)), (str(i) for i in range(2000, date.today().year+1)))]

for y in scrapeYears:
    url = f"https://www.reddit.com/r/AnimeThemes/wiki/{y}"
    print(f"Downloading: {url}")
    resp = requests.get(url, headers={
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36"
    })
    with open(f"pages/{y}.html", "w+") as f:
        f.write(resp.text)
    sleep(1)