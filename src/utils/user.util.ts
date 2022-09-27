import { MysqlError } from "mysql";
import { Database } from "./database.util";
import { Logging, LogType } from "./logging.util";
import { RegexUtil } from "./regex.util";

export class UserUtil {
    static discordIdToUuid(did: string): Promise<string> {
        return new Promise((resolve, reject) => {
            Database.pool.query("SELECT uuid FROM members WHERE discord_id = ?", [did], (err: MysqlError | null, res) => {
                if(err){
                    Logging.write(err.message, LogType.Error);
                    reject();
                }
                if(res.length === 1 && res[0]?.uuid.match(RegexUtil.uuidV4)) resolve(res[0].uuid);
                reject();
            });
        });
    }

    static isRegistered(did: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            Database.pool.query("SELECT 1 FROM members WHERE discord_id = ? AND registered_flg = 1", [did], (err: MysqlError | null, res) => {
                if(err){
                    Logging.write(err.message, LogType.Error);
                    reject();
                }
                if(res.length === 1) resolve(true);
                resolve(false);
            });
        });
    }
}