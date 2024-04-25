
const data = new ImageData(new Uint8ClampedArray([0, 0, 0, 255]), 1, 1); // reusable image data
let steps = 25; // pixel generated per frame

const it = genPixel();
let p = it.next();
let ctx: CanvasRenderingContext2D | null = null;

export function tick() {
    if(!ctx){
        const canvas = document.querySelector("canvas");
        if(!canvas){
            return;
        }
        ctx = (canvas as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;
    }
    const startTime = performance.now();
    const wasDone = p.done;
    for (let i = 0; i < steps && !p.done; i++) {
      // Get value from generator, set pixel
      data.data[0] = p.value.r;
      data.data[1] = p.value.g;
      data.data[2] = p.value.b;
      ctx.putImageData(data, p.value.pos[0], p.value.pos[1]);
      p = it.next();
    }
    const endTime = performance.now();
    // fine-tune the number of pixels to generate until it takes around 16-20ms
    if (!p.done) {
      if (endTime - startTime > 20) {
        steps /= 1.1;
      } else if (endTime - startTime < 16) {
        steps *= 1.1;
      }
    }
    if (p.done && !wasDone) {
    //   prog.style.display = "none";
    //   displayCounts();
    return;
    }
    window.requestAnimationFrame(tick);
  }

// Generator
function* genPixel() {
    const saturation = 1;
    // Hue
    for (let h = 0; h < 360; h++) {
      // Brightness
      for (let b = 0; b < 200; b++) {
        let rgb = hslToRgb(h / 360, saturation, b / 200);
        // if (mapToPalette) {
        //   rgb = closestColour(rgb[0], rgb[1], rgb[2]);
        //   let v = paletteCountMap[toHexColour(rgb)];
        //   v = v == null ? 1 : v + 1;
        //   paletteCountMap[toHexColour(rgb)] = v;
        // }
        yield { r: rgb[0], g: rgb[1], b: rgb[2], pos: [h, b] };
      }
    }
  }
  

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
function hslToRgb(h:number, s:number, l:number) {
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

  function hue2rgb(p:number, q:number, t:number) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };