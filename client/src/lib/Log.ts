import process from "process";
import colors from "colors";

class Log {
  static async SlowType(text: string): Promise<void> {
    return new Promise((res, rej) => {
      let i = 0;

      function loop() {
        process.stdout.write(text[i]);

        i++;
        if (i == text.length) {
          res();
        } else {
          setTimeout(() => {
            loop();
          }, 30);
        }
      }

      loop();
    });
  }
}

export default Log;
