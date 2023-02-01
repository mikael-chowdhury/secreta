import process from "process";
import colors from "colors";
import Log from "./Log";

class Input {
  static async getInput(
    prompt: string,
    inline: boolean = false,
    slowtype: boolean = true,
    silent: boolean = false
  ): Promise<string> {
    if (inline) {
      if (slowtype) {
        await Log.SlowType(colors.red(prompt + " > "));
      } else process.stdout.write(colors.red(prompt + " > "));
    } else {
      if (slowtype) {
        await Log.SlowType(colors.red(prompt + " > "));
      } else console.log(colors.red(prompt + " > "));
    }

    if (!silent) {
      return new Promise((res, rej) => {
        process.stdin.on("data", (chunk) => {
          process.stdin.removeAllListeners();
          res(chunk.toString().trim());
        });
      });
    } else {
      return new Promise((res, rej) => {
        let response = "";

        process.stdin.setRawMode(true);
        process.stdin.on("data", (chunk) => {
          const resString = chunk.toString();

          switch (resString) {
            case "\n":
            case "\r":
            case "\u0004":
              process.stdin.setRawMode(false);
              process.stdin.removeAllListeners();
              res(response);
              break;

            case "\u0003":
              process.exit();

            case "\b":
              response = response.substring(0, response.length - 1);
              break;

            default:
              response += resString;
              break;
          }
        });
      });
    }
  }
}

export default Input;
