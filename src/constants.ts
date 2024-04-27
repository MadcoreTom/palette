
export const COLOURS = "000000,1D2B53,7E2553,008751,AB5236,5F574F,C2C3C7,FFF1E8,FF004D,FFA300,FFEC27,00E436,29ADFF,83769C,FF77A8,FFCCAA".split(/,/)
export const MODES = [
    {
        option: "HSL", slider: "Lightness"
    },
    {
        option: "RGB", slider: "Blue"
    }
]
export type Preset = {
    name: string,
    link?: string,
    colours: string[]
}

export const PRESETS: Preset[] = [
    {
        name: "RGB",
        colours: "FF0000,00FF00,0000FF".split(",")
    },
    {
        name: "Palette 1",
        colours: "484a47,e2dadb,777da7,e88873,86cd82,ffd97d,b5d181,aa8796,b5b4b2,f3b279".split(",")
    },
    {
        name: "Palette 2",
        colours: "000026,FFE7F7,FFA62B,B9FF50,5269FF,DA66B1,ffef20,008800,aaaaff".split(",")
    }, {
        name: "Palette 3",
        colours: "000026,FFE7F7,FFA62B,B9FF50,5269FF,DA66B1,41A7AA,6020AD,FFDD47,F63600,41FF58,FFBFEB".split(",")
    }, {
        name: "Palette 4",
        colours: "FFFFFF,79F3C3,1FAAB9,636D7F,3A3652,268773,62B169,A8E069,F5E582,F09760,C7506E,6A3C6C,C32865,EF90B5,F2B9A2,9A9D87".split(",")
    }, {
        name: "Palette 5",
        colours: "000000,555555,aaaaaa,ffffff,550000,aa5555,ffaaaa, 555500,aaaa55,ffffaa,005500,55aa55,aaffaa, 005555,55aaaa,aaffff,000055,5555aa,aaaaff, 550055,aa55aa,ffaaff".split(",")
    }, {
        name: "CGA 16",
        colours: "000000,555555,0000AA,5555FF,00AA00,55FF55,00AAAA,55FFFF,AA0000,FF5555,AA00AA,FF55FF,AA5500,FFFF55,AAAAAA,FFFFFF".split(",")
    }, {
        name: "Gameboy",
        colours: "003f00,2e7320,8cbf0a,a0cf0a".split(",")
    }, {
        name: "ZX Spectrum",
        colours: "000000,0000ff,ff0000,ff00ff,00ff00,00ffff,ffff00,ffffff".split(",")
    }, {
        name: "c64",
        colours: "000000,FFFFFF,880000,AAFFEE,CC44CC,00CC55,0000AA,EEEE77,DD8855,664400,FF7777,333333,777777,AAFF66,0088FF,BBBBBB".split(",")
    }, {
        name: "Autumn",
        colours: "062B3D,FF6933,553017,719A32,EF9F11,F5CB48,C7C1AB".split(",")
    }, {
        name: "Sailor Moon",
        link: "https://lospec.com/palette-list/sailor-moon-background",
        colours: "bdffff,5db8ca,5cadc3,378dae,3c7596,1e6da0,144d70,00245c,a0e1d9,80bcb9,438d98,07687b,065866,06505c,054752,d998c3,d48cd4,8797c5,e055b8,b65bb2,675390,3c377b,e8f8d7,dddac7,fdd3b0,ffdac9,ffcec7,d9bed0".split(",")
    }, {
        name: "RAMP 20",
        link: "https://lospec.com/palette-list/ramp-20",
        colours: "070d19,510a7c,a932b1,ff80c0,ffffe2,ffcb97,b16351,4b1f2a,1b0532,621545,a72d3d,ee8b28,ffff68,8ef93c,2da160,124c50,121a50,1c3089,1971c9,69dbf5".split(",")
    }, {
        name: "Pico-8",
        colours: "000000,1D2B53,7E2553,008751,AB5236,5F574F,C2C3C7,FFF1E8,FF004D,FFA300,FFEC27,00E436,29ADFF,83769C,FF77A8,FFCCAA".split(",")
    }, {
        name: "NA16",
        link:"https://lospec.com/palette-list/na16",
        colours: "8c8fae,584563,3e2137,9a6348,d79b7d,f5edba,c0c741,647d34,e4943a,9d303b,d26471,70377f,7ec4c1,34859d,17434b,1f0e1c".split(",")
    }, {
        name: "Pinks",
        colours: "013029,014D79,010DDD,8021FF,F26AFF,FFC0E7,FFDDEC,FFFFFF,013732,01409E".split(",")
    }, {
        name: "Pastel",
        colours: "f5f0de,f5e9e0,f3d3da,f5c1d7,f5e0d1,f5ccbb,f5b4b3,acd5ba,8ab793,88a77c,c5c6cd,a3a3ba,8f8daf,6f6d97,986e88".split(",")
    }
]