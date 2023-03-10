import bcrypt from "bcryptjs";
import Config from "../files/Config";

class Crypt {
  static hash(password: string): Promise<Error | string> {
    return new Promise((res, rej) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return res(err);

        bcrypt.hash(password, salt, (err, hash) => {
          if (err) return res(err);
          return res(hash);
        });
      });
    });
  }

  static validPassword(password: string): boolean {
    console.log("\n", password, Config.ConfigObject.password);
    return bcrypt.compareSync(password, Config.ConfigObject.password as string);
  }
}

export default Crypt;
