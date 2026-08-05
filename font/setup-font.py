import shutil

OUT_DIR = "setup"
GLYPHS = [ # the file name will be a ligature, aliases will be additional ones
    {
        "file": "rovalra.svg",
    },
    {
        "file": "square.svg",
    },
    {
        "file": "borderless.svg",
    },
    {
        "file": "circle.svg",
    },
    {
        "file": "icon.svg",
        "aliases": [
            "contributor"
        ]
    },
    {
        "file": "bronze.svg",
    },
    {
        "file": "silver.svg",
    },
    {
        "file": "gold.svg",
    },
    {
        "file": "diamond.svg",
    },
]

def main():
    currentPUA = 0xe000

    for glyph in GLYPHS:

        # Unicode PUA charactor

        shutil.copyfile(src=glyph['file'], dst=f'{OUT_DIR}/{str(hex(currentPUA)).lstrip('0x')}.svg')

        currentPUA += 0x1

        # Main ligature based on filename
        mainLigature = []

        for char in glyph['file'].rstrip('.svg'):
            mainLigature.append(str(hex(ord(char))).lstrip('0x'))

        shutil.copyfile(src=glyph['file'], dst=f'{OUT_DIR}/{'_'.join(mainLigature)}.svg')

        # Additional ligature aliases
        if glyph['aliases']:
            for alias in glyph['aliases']:
                aliasLigature = []

                for char in alias:
                    aliasLigature.append(str(hex(ord(char))).lstrip('0x'))

                shutil.copyfile(src=glyph['file'], dst=f'{OUT_DIR}/{'_'.join(aliasLigature)}.svg')





if __name__ == "__main__":
    main()
