try:
    import Image
except ImportError:
    from PIL import Image

import pytesseract
import re

pytesseract.pytesseract.tesseract_cmd = '/usr/local/bin/tesseract'


class ImageText:
    def __init__(self, filename):
        self.filename = filename
        self.text = self.get_image_text()

    def get_image_text(self):
        '''
        Parses image and gets text associated
        '''
        ocr_text = pytesseract.image_to_string(Image.open(self.filename))
        self.text = re.sub(r"\s+", " ", ocr_text, flags=re.UNICODE)
        return self.text


#d = ImageText('img/20130101.jpg')
