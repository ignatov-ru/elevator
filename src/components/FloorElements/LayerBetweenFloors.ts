import * as PIXI from "pixi.js";
import { colors } from "../../styles/colors";

export const LayerBetweenFloors = {
  init: (positionFloorY: number): PIXI.Graphics => {
    const line = new PIXI.Graphics();

    line.lineStyle(5, colors.darkGrey, 1); // толщина, цвет, прозрачность
    line.moveTo(83, positionFloorY); // начало линии (x, y)
    line.lineTo(280, positionFloorY); // конец линии (x, y)

    return line;
  },
};
