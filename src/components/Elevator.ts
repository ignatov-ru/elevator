import * as PIXI from "pixi.js";
import debounce from "lodash/debounce";

import { FLOORS_AMOUNT, POSITION_Y_FIRST_FLOOR, model } from "../model";
import { colors } from "../styles/colors";
import { controller } from "../index";

const TIMER_DEBOUNCE = 2000;

export const Elevator = {
  elevator: null as PIXI.Graphics | null,

  init: function (): void {
    this.elevator = new PIXI.Graphics();
    this.elevator.lineStyle(5, colors.darkGrey, 1); // толщина, цвет, прозрачность
    this.elevator.drawRect(0, 25, 60, 90); // x, y, ширина, высота

    this.elevator.x = 20;
    this.elevator.y = POSITION_Y_FIRST_FLOOR;
  },

  startElevator: debounce((): void => {
    controller.isButtonsInteractive(false);

    for (let i = 0; i < model.stack.length; i++) {
      const oneFloor = setTimeout(() => {
        const positionFloorY: number = model.stack[i];

        Elevator.moveElevator(positionFloorY);
        clearTimeout(oneFloor);
      }, i * 400 * FLOORS_AMOUNT);
    }

    const restore = setTimeout(() => {
      controller.toInitialState();

      clearTimeout(restore);
    }, model.stack.length * 350 * FLOORS_AMOUNT);
  }, TIMER_DEBOUNCE),

  moveElevator: function (positionFloorY: number): void {
    const ticker = new PIXI.Ticker();
    ticker.start();

    ticker.add(() => {
      if (this.elevator.y < positionFloorY) {
        this.elevator.y += 5;
      }

      if (this.elevator.y > positionFloorY) {
        this.elevator.y -= 5;
      }

      if (this.elevator.y === positionFloorY) {
        ticker.stop();
      }
    });
  },
};
