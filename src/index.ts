import * as PIXI from "pixi.js";
import { model, POSITION_Y_FIRST_FLOOR } from "./model";

import { Elevator } from "./components/Elevator";
import { FloorContainer } from "./components/FloorContainer";
import { App } from "./components/App";

let app: PIXI.Application;

export const controller = {
  initializeApp: (): void => {
    app = App.init();
    document.body.appendChild(app.view);

    Elevator.init();
    app.stage.addChild(Elevator.elevator);

    FloorContainer.init().forEach((el: PIXI.Graphics | PIXI.Text) => {
      app.stage.addChild(el);
    });
  },

  addFloorInRoute: (positionFloorY: number): void => {
    if (!model.stack.includes(positionFloorY)) {
      model.stack.push(positionFloorY);
    }

    model.stack.sort((a: number, b: number) => a - b);
  },

  isButtonsInteractive: (bool: boolean): void => {
    for (let i = 0; i <= app.stage.children.length; i++) {
      const element: PIXI.DisplayObject = app.stage.children[i];

      if (element?.name && element?.name.startsWith("button_")) {
        element.interactive = bool;
      }

      if (bool && element?.alpha) {
        element.alpha = 1;
      }
    }
  },

  switchIndicator: (bool: boolean, positionFloorY?: number): void => {
    if (bool && typeof positionFloorY === "number") {
      app.stage.children.find(
        (indicator: PIXI.DisplayObject) =>
          indicator.name === "indicator_" + positionFloorY
      ).alpha = 1;
    }

    if (!bool && positionFloorY === undefined) {
      app.stage.children.map((indicator: PIXI.DisplayObject) => {
        if (indicator.name?.startsWith("indicator_")) indicator.alpha = 0.4;
      });
    }
  },

  toInitialState: (): void => {
    model.stack = [POSITION_Y_FIRST_FLOOR];
    controller.isButtonsInteractive(true);
    controller.switchIndicator(false);
  },
};

controller.initializeApp();
