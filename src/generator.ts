import { RGB, closestColour, hslToRgb, parsePalette } from "./colour-utils";

let steps = 25; // pixel generated per frame


type GeneratedData = { rgb: [number, number, number], pos: [number, number] };

export let GENERATOR: HslPixelGen|undefined = undefined;


export class HslPixelGen {

  protected generator: Generator<GeneratedData>;
  protected cur: IteratorResult<GeneratedData, any>;
  protected data = new ImageData(new Uint8ClampedArray([0, 0, 0, 255]), 1, 1); // reusable image data
  private rendering:boolean = false;
  private palette:RGB[] = [[0,100,200], [255,255,30]]

  public constructor(protected ctx: CanvasRenderingContext2D) {
    GENERATOR = this;
    this.reset();
  }

  public reset(palette?:string[]){
    console.log("RESET", palette)
    this.generator = this.generate();
    this.cur = this.generator.next();
    if(palette){
      this.palette = palette.map(parsePalette)
    }
    if(!this.rendering){
     this.tick();
    }
  }

  public tick() {
    let { ctx, generator, cur, data } = this;

    const startTime = performance.now();
    const wasDone = cur.done;
    for (let i = 0; i < steps && !cur.done; i++) {
      // Get value from generator, set pixel
      data.data[0] = cur.value.rgb[0];
      data.data[1] = cur.value.rgb[1];
      data.data[2] = cur.value.rgb[2];
      ctx.putImageData(data, cur.value.pos[0], cur.value.pos[1]);
      this.cur = cur = generator.next();
    }
    const endTime = performance.now();
    // fine-tune the number of pixels to generate until it takes around 16-20ms
    if (!cur.done) {
      if (endTime - startTime > 18) {
        steps /= 1.1;
      } else if (endTime - startTime < 16) {
        steps *= 1.1;
      }
    }
    if (cur.done && !wasDone) {
      //   prog.style.display = "none";
      //   displayCounts();
      this.rendering = false;
      return;
    }
    // this.rendering = true;
    window.requestAnimationFrame(() => this.tick());
  }

  protected generate = function* () {
    const saturation = 1;
    // Hue
    for (let h = 0; h < 360; h++) {
      // Brightness
      for (let b = 0; b < 200; b++) {
        let rgb = hslToRgb(h / 360, saturation, b / 200);
        // if (mapToPalette) {
          rgb = closestColour(rgb, this.palette);
          // let v = paletteCountMap[toHexColour(rgb)];
          // v = v == null ? 1 : v + 1;
          // paletteCountMap[toHexColour(rgb)] = v;
        // }
        yield { rgb, pos: [h, b] } as GeneratedData;
      }
    }
  }
}





