from PIL import Image
from pathlib import Path

SRC = Path("photos")          # folder with your original photos
DST = Path("web_photos")      # output folder
DST.mkdir(exist_ok=True)

for f in SRC.glob("*.jpg"):
    img = Image.open(f).convert("RGB")
    img.thumbnail((1600, 1600))   # keep the longest side at 1600 px
    img.save(DST / f.name, "JPEG", quality=82, optimize=True)
    print("done", f.name)