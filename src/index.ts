import * as PIXI from "pixi.js";
import debounce from "lodash/debounce";

import { colors } from "./styles/colors";

const FLOORS_AMOUNT = 5;
const TIMER_DEBOUNCE = 2000;

const POSITION_FIRST_FLOOR_Y = (FLOORS_AMOUNT - 1) * 115;

const model = {
  stack: [POSITION_FIRST_FLOOR_Y] as number[],
};

const view = {
  app: null as PIXI.Application | null,
  elevator: null as PIXI.Graphics | null,

  createStage: () => {
    view.app = new PIXI.Application({
      height: 119 * FLOORS_AMOUNT,
      width: 300,
      backgroundColor: colors.turquoise,
      backgroundAlpha: 0.8,
      antialias: true, // сглаживание
    });

    document.body.appendChild(view.app.view);
  },

  createElevator: () => {
    view.elevator = new PIXI.Graphics();
    view.elevator.lineStyle(5, colors.darkGrey, 1); // толщина, цвет, прозрачность
    view.elevator.drawRect(0, 25, 60, 90); // x, y, ширина, высота

    view.elevator.x = 20;
    view.elevator.y = POSITION_FIRST_FLOOR_Y;

    view.app.stage.addChild(view.elevator);
  },

  createFloor: () => {
    for (
      let positionFloorY = 115;
      positionFloorY <= 115 * FLOORS_AMOUNT;
      positionFloorY += 115
    ) {
      view.createLine(positionFloorY);
      view.createButton(positionFloorY - 115);
      view.createIndicatorButton(positionFloorY - 115);
    }

    view.createFloorNumber();
  },

  createLine: (positionFloorY: number) => {
    const line = new PIXI.Graphics();

    line.lineStyle(5, colors.darkGrey, 1); // толщина, цвет, прозрачность
    line.moveTo(83, positionFloorY); // начало линии (x, y)
    line.lineTo(280, positionFloorY); // конец линии (x, y)

    view.app.stage.addChild(line);
  },

  createButton: (positionFloorY: number) => {
    const btn = new PIXI.Graphics();
    btn.name = "button";

    btn.beginFill(colors.lightGreen, 1); // заливка, прозрачность
    btn.lineStyle(5, colors.darkGreen, 1); // толщина, цвет, прозрачность
    btn.drawCircle(150, positionFloorY + 60, 25);

    if (positionFloorY !== POSITION_FIRST_FLOOR_Y) {
      btn.buttonMode = true;
      btn.interactive = true;

      btn.on("pointerdown", () => (btn.alpha = 0.2));
      btn.on("pointerup", () => {
        controller.switchIndicator(true, positionFloorY);
        controller.addFloorInRoute(positionFloorY);
        controller.startElevator();
      });
    }

    view.app.stage.addChild(btn);
  },

  createIndicatorButton: (positionFloorY: number) => {
    const indicator = new PIXI.Graphics();
    indicator.name = "indicator_" + positionFloorY.toString();

    indicator.beginFill(colors.darkGreen, 1); // заливка, прозрачность
    indicator.drawCircle(100, positionFloorY + 60, 5); // x, y, радиус
    indicator.alpha = 0.4;

    view.app.stage.addChild(indicator);
  },

  createFloorNumber: () => {
    for (let floor = 1; floor <= FLOORS_AMOUNT; floor++) {
      const number = new PIXI.Text(`${floor} этаж`, {
        fill: colors.darkGrey,
      });

      number.x = 190;
      number.y = 115 * (FLOORS_AMOUNT - floor + 1) - 70;

      view.app.stage.addChild(number);
    }
  },
};

const controller = {
  initializeApp: () => {
    view.createStage();
    view.createFloor();
    view.createElevator();
  },

  addFloorInRoute: (positionFloorY: number) => {
    if (!model.stack.includes(positionFloorY)) {
      model.stack.push(positionFloorY);
    }

    model.stack.sort((a, b) => a - b);
  },

  isButtonsInteractive: (bool: boolean) => {
    for (let i = 0; i <= view.app.stage.children.length; i++) {
      const element = view.app.stage.children[i];

      if (element?.name && element?.name === "button") {
        element.interactive = bool;
      }

      if (bool && element?.alpha) {
        element.alpha = 1;
      }
    }
  },

  switchIndicator: (bool: boolean, positionFloorY?: number) => {
    if (bool && typeof positionFloorY === "number") {
      view.app.stage.children.find(
        (ind) => ind.name === "indicator_" + positionFloorY
      ).alpha = 1;
    }

    if (!bool && positionFloorY === undefined) {
      view.app.stage.children.map((ind) => {
        if (ind.name?.startsWith("indicator_")) ind.alpha = 0.4;
      });
    }
  },

  startElevator: debounce(() => {
    controller.isButtonsInteractive(false);

    for (let i = 0; i < model.stack.length; i++) {
      const oneFloor = setTimeout(() => {
        const positionFloorY = model.stack[i];
        controller.moveElevator(positionFloorY);

        clearTimeout(oneFloor);
      }, i * 400 * FLOORS_AMOUNT);
    }

    const restore = setTimeout(() => {
      controller.toInitialState();
      clearTimeout(restore);
    }, model.stack.length * 350 * FLOORS_AMOUNT);
  }, TIMER_DEBOUNCE),

  moveElevator: (positionFloorY: number) => {
    const ticker = new PIXI.Ticker();
    ticker.start();

    ticker.add(() => {
      if (view.elevator.y < positionFloorY) {
        view.elevator.y += 5;
      }

      if (view.elevator.y > positionFloorY) {
        view.elevator.y -= 5;
      }

      if (view.elevator.y === positionFloorY) {
        ticker.stop();
      }
    });
  },

  toInitialState: () => {
    model.stack = [POSITION_FIRST_FLOOR_Y];
    controller.isButtonsInteractive(true);
    controller.switchIndicator(false);
  },
};

controller.initializeApp();
