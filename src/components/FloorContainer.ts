import * as PIXI from "pixi.js";
import { FLOORS_AMOUNT } from "../model";

import { LayerBetweenFloors } from "./FloorElements/LayerBetweenFloors";
import { Button } from "./FloorElements/Button";
import { NumberFloor } from "./FloorElements/NumberFloor";
import { IndicatorButton } from "./FloorElements/IndicatorButton";

type TFloor = PIXI.Text[] | PIXI.Graphics[];

export const FloorContainer = {
  init: (): TFloor => {
    let result = [];

    for (
      let positionFloorY = 115;
      positionFloorY <= 115 * FLOORS_AMOUNT;
      positionFloorY += 115
    ) {
      result.push(LayerBetweenFloors.init(positionFloorY));
      result.push(Button.init(positionFloorY - 115));
      result.push(IndicatorButton.init(positionFloorY - 115));
    }

    NumberFloor.init().forEach((el: PIXI.Text) => result.push(el));

    return result;
  },
};
