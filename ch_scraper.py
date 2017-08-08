'''
Calvin and Hobbes Scraper
'''

from datetime import timedelta, date
import scrapy
import urllib
import json
import os.path
from imageText import ImageText

CH_BASE_URL = "http://www.gocomics.com/calvinandhobbes/"


def daterange(start_date, end_date):
    for n in range(int((end_date - start_date).days)):
        yield start_date + timedelta(n)


def filterbyvalue(seq, value):
    if seq:
        for el in seq:
            if el.attribute == value:
                return el
    return ""


def is_jsonable(x):
    try:
        json.dumps(x)
        return True
    except:
        return False


class chSpier(scrapy.Spider):
    name = "ch_spider"
    # CH starts at 1985/11/18
    start_date = date(1985, 11, 18)
    end_date = date(1996, 1, 1)
    start_urls = []
    for single_date in daterange(start_date, end_date):
        start_urls.append(
            CH_BASE_URL + single_date.strftime("%Y/%m/%d"))
    print start_urls

    def parse(self, response):
        print self
        COMIC_IMAGE_URL_SELECTOR = '.item-comic-container picture > img'
        COMIC_TAGS_SELECTOR = '.tag-cloud-item ::text'

        url_parts = response.url.split('/')
        filename = url_parts[len(
            url_parts) - 3] + url_parts[len(url_parts) - 2] + url_parts[len(url_parts) - 1]

        comic_url_selector = COMIC_IMAGE_URL_SELECTOR + " ::attr(src)"
        comic_alt_text_selector = COMIC_IMAGE_URL_SELECTOR + " ::attr(alt)"
        comic_url = response.css(comic_url_selector).extract_first()
        comic_alt_text = response.css(comic_alt_text_selector).extract_first()

        # Load the existing json
        # if it exists.
        data = {'images': []}
        json_file = 'data.json'
        if os.path.exists(json_file):
            with open(json_file, "r") as jsonFile:
                data = json.load(jsonFile)

        item = {'date': filename,
                'gocomics_url': response.url,
                'alt-text': json.dumps(comic_alt_text),
                'comic_img_url': comic_url
                }

        try:
            found = False
            for i in data['images']:
                if i['date'] == item['date']:
                    found = True
                    return

            # if not found:
                # Save the file and get the text from it
                #img_file_path = "static/img/" + filename + ".jpg"
                #urllib.urlretrieve(comic_url, img_file_path)
                #comic_image_text = ImageText(img_file_path)
                #item['image_txt'] = json.dumps(comic_image_text.text)
                #item['image_path'] = img_file_path
                # data['images'].append(item)
        except Exception:
            return

        data['images'].append(item)

        with open(json_file, 'w') as outfile:
            json.dump(data, outfile)
