import { Transform } from "stream";
import { safeParseJSON } from "../../utils/index.js";
import fs from "fs";
import { rgbaColors, hexColors } from './colors.js';

export const MessageStream = { parseMessageStream: null };

export const parseMessageBuilder = (label) =>
  new Transform({
    objectMode: true,
    transform(chunk, encoding, next) {
      let type,
        data,
        from = "Received";
      ({ type, data, from } = safeParseJSON(chunk.toString().trim()));

      // handle text
      if (type === "text") {
        let color = rgbaColors.aqua;

        if (from === "Gods") {
          color = rgbaColors.magenta;
          from = "A voice out of the void";
        }
        if (from === "Help") color = rgbaColors.white;
        if (from === "Server") color = rgbaColors.lavender;
        if (from === "World") color = rgbaColors.green;
        if (from === "You") color = rgbaColors.white;

        let string;
        if (from === "World") string = `${data}\n`;
        else string = `${from}: ${data}\n`;

        const displayInput = buildDisplayInput({
          type,
          data: string,
          color,
        });

        this.push(displayInput);
      }
      // handle ascii art
      else if (type === "ascii") {
        const art = artDict[data];
        if (art) {
          const string = fs.readFileSync(art.path, "utf8");
          const displayInput = buildDisplayInput({
            type,
            data: string,
            color: art.color,
          });
          this.push(displayInput);
        } else {
          console.log(`Unknown ascii art: ${string.slice(1)}`);
        }
      } else if (type === "volcano") {
        const displayInput = buildDisplayInput({
          type,
          data,
        });
        this.push(displayInput);
      } else console.error(`Unknown message type: ${type}`);

      next();
    },
  });

function buildDisplayInput({ type, data, color }) {
  return { type, data, color };
}

// map art to file path and color
const artDict = {
  cleric: { path: "./assets/cleric.txt", color: rgbaColors.yellow },
  ogre: { path: "./assets/ogre.txt", color: rgbaColors.green },
  punch: { path: "./assets/punch.txt", color: rgbaColors.red },
  moon: { path: "./assets/moon.txt", color: rgbaColors.White },
  sun: { path: "./assets/sun.txt", color: rgbaColors.Yellow },
  storm: { path: "./assets/storm.txt", color: rgbaColors.aqua },
};

function getCleric() {
  return fs.readFileSync("./assets/cleric.txt", "utf8");
}

function getOgre() {
  return fs.readFileSync("./assets/ogre.txt", "utf8");
}

function getPunch() {
  return fs.readFileSync("./assets/punch.txt", "utf8");
}
