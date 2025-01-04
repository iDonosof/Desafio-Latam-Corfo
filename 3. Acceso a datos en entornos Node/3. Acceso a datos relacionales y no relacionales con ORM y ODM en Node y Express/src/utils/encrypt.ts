import bcrypt from "bcryptjs";
import { BCRYPT_SALT_ROUNDS } from "../common/constants";

const encrypt = (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(BCRYPT_SALT_ROUNDS, function (salt_error, salt) {
            if (salt_error) {
                reject(salt_error);
                return;
            }
            bcrypt.hash(password, salt, function (hash_error, hash: string) {
                if (hash_error) {
                    reject(hash_error);
                    return;
                }
                resolve(hash);
            });
        });
    });
};

const compare = (password: string, hash: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, result) {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};

export { encrypt, compare };
