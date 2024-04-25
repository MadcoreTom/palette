
export type RGB = [number,number,number];
// https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
export function hslToRgb(h: number, s: number, l: number) :RGB{
    let r, g, b;
    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function hue2rgb(p: number, q: number, t: number) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
};

// Find the closest (euclidean) colour based on RGB values
export function closestColour(rgb:RGB, palette:RGB[]):RGB {
    let closeDist = 255 * 255 * 255;
    let colour = palette[0];
    let dr, dg, db;
    for (let i = 0; i < palette.length; i++) {
      dr = rgb[0] - palette[i][0];
      dg = rgb[1] - palette[i][1];
      db = rgb[2] - palette[i][2];
      const dsq = dr * dr + dg * dg + db * db;
      if (dsq < closeDist) {
        closeDist = dsq;
        colour = palette[i];
      }
    }
    return colour;
}

export function parsePalette(s: string): RGB {
    return [
        parseInt(s.substring(0, 2), 16),
        parseInt(s.substring(2, 4), 16),
        parseInt(s.substring(4, 6), 16)
    ];
}