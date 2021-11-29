import * as PIXI from "pixi.js";
import { POSITION_Y_FIRST_FLOOR } from "../../model";
import { colors } from "../../styles/colors";
import { controller } from "../../index";

import { Elevator } from "../Elevator";

export const Button = {
  init: (positionFloorY: number): PIXI.Graphics => {
    const button = new PIXI.Graphics();
    button.name = "button_" + positionFloorY;

    button.beginFill(colors.lightGreen, 1); // заливка, прозрачность
    button.lineStyle(5, colors.darkGreen, 1); // толщина, цвет, прозрачность
    button.drawCircle(150, positionFloorY + 60, 25);

    if (positionFloorY !== POSITION_Y_FIRST_FLOOR) {
      button.buttonMode = true;
      button.interactive = true;

      button.on("pointerdown", () => (button.alpha = 0.2));
      button.on("pointerup", () => {
        controller.switchIndicator(true, positionFloorY);
        controller.addFloorInRoute(positionFloorY);
        Elevator.startElevator();
      });
    }

    return button;
  },
};
