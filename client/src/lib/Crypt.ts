import bcrypt from "bcrypt";

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
}

export default Crypt;
