import {init} from "./init";

export function draw(layer) {
  let drawables = init(layer);

  for (let drawable of drawables) {
    layer.add(drawable);
    if (drawable.tr != null) {
      layer.add(drawable.tr);
    }
  }
}
