import * as PIXI from "pixi.js";
import { FLOORS_AMOUNT } from "../../model";
import { colors } from "../../styles/colors";

export const NumberFloor = {
  init: (): PIXI.Text[] => {
    let result = [];

    for (let floor = 1; floor <= FLOORS_AMOUNT; floor++) {
      const number = new PIXI.Text(`${floor} этаж`, {
        fill: colors.darkGrey,
      });

      number.x = 190;
      number.y = 115 * (FLOORS_AMOUNT - floor + 1) - 70;

      result.push(number);
    }

    return result;
  },
};
