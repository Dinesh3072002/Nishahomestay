import os
from PIL import Image

def optimize():
    # 1. exterior.webp
    ext_path = "images/exterior.webp"
    if os.path.exists(ext_path):
        orig = os.path.getsize(ext_path)
        with Image.open(ext_path) as im:
            im.save("images/exterior.webp", "WEBP", quality=82, method=6)
        new = os.path.getsize(ext_path)
        print(f"exterior.webp: {orig} -> {new} bytes (saved {(orig-new)/1024:.1f} KB)")

    # 2. food2.webp
    food_path = "images/food2.webp"
    if os.path.exists(food_path):
        orig = os.path.getsize(food_path)
        with Image.open(food_path) as im:
            im.save("images/food2.webp", "WEBP", quality=82, method=6)
        new = os.path.getsize(food_path)
        print(f"food2.webp: {orig} -> {new} bytes (saved {(orig-new)/1024:.1f} KB)")

    # 3. Logo
    logo_path = "images/nisha-logo.png"
    if os.path.exists(logo_path):
        orig = os.path.getsize(logo_path)
        with Image.open(logo_path) as im:
            im.save("images/nisha-logo.webp", "WEBP", quality=90, method=6)
            im_small = im.resize((120, 120), Image.Resampling.LANCZOS)
            im_small.save("images/nisha-logo-small.webp", "WEBP", quality=90)
            im_small.save("images/nisha-logo-small.png", "PNG", optimize=True)
        print(f"nisha-logo.png orig: {orig} bytes")
        print(f"nisha-logo.webp: {os.path.getsize('images/nisha-logo.webp')} bytes")
        print(f"nisha-logo-small.webp: {os.path.getsize('images/nisha-logo-small.webp')} bytes")
        print(f"nisha-logo-small.png: {os.path.getsize('images/nisha-logo-small.png')} bytes")

if __name__ == "__main__":
    optimize()

