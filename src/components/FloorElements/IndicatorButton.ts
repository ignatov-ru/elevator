import * as PIXI from "pixi.js";
import { colors } from "../../styles/colors";

export const IndicatorButton = {
  init: (positionFloorY: number): PIXI.Graphics => {
    const indicator = new PIXI.Graphics();
    indicator.name = "indicator_" + positionFloorY.toString();

    indicator.beginFill(colors.darkGreen, 1); // заливка, прозрачность
    indicator.drawCircle(100, positionFloorY + 60, 5); // x, y, радиус
    indicator.alpha = 0.4;

    return indicator;
  },
};
