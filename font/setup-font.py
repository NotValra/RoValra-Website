import shutil

OUT_DIR = "setup"

def main():
    currentPUA = 0xe000
    fontGlyphs = [ # name is what the ligature will be
        {"name": "rovalra", "file": "rovalra.svg"},
        {"name": "square", "file": "square.svg"},
        {"name": "borderless", "file": "borderless.svg"},
        {"name": "circle", "file": "circle.svg"},
        {"name": "icon", "file": "icon.svg"},
        {"name": "bronze", "file": "bronze.svg"},
        {"name": "silver", "file": "silver.svg"},
        {"name": "gold", "file": "gold.svg"},
        {"name": "diamond", "file": "diamond.svg"},
    ]

    for glyph in fontGlyphs:
        ligature = []

        for char in glyph['name']:
            ligature.append(str(hex(ord(char))).lstrip('0x'))

        shutil.copyfile(src=glyph['file'], dst=f'setup/{str(hex(currentPUA)).lstrip('0x')}.svg')
        shutil.copyfile(src=glyph['file'], dst=f'setup/{'_'.join(ligature)}.svg')


if __name__ == "__main__":
    main()
