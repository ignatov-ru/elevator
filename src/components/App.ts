import * as PIXI from "pixi.js";
import { FLOORS_AMOUNT } from "../model";
import { colors } from "../styles/colors";

export const App = {
  init: (): PIXI.Application => {
    const app = new PIXI.Application({
      height: 119 * FLOORS_AMOUNT,
      width: 300,
      backgroundColor: colors.turquoise,
      backgroundAlpha: 0.8,
      antialias: true, // сглаживание
    });

    return app;
  },
};
