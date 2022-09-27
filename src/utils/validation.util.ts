import { sha512 } from 'js-sha512';
import * as mysql from 'mysql';
import { Database } from './database.util';
import { Logging, LogType } from './logging.util';

export class ValidationUtil {
    static validateCode(uuid: string, code: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            Database.pool.query("SELECT 1 FROM members WHERE uuid = ? AND validation_code = ?", [uuid, sha512.update(code)], (err: mysql.MysqlError | null, res: string) => {
                if(err){
                    Logging.write(err.message, LogType.Error);
                    reject();
                }
                if(res) resolve(true);
                reject();
            });
        });
    }

    static generateCode(uuid: string): string {
        let code: string = uuid.charAt(0);
        let inOptions: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for(let i = 1; i < 12; i++){
            code += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
        }

        return code;
    }
}