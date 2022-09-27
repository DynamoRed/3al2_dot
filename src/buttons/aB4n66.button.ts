import { ButtonInteraction, Client } from "discord.js";
import { MysqlError } from "mysql";
import { Database } from "../utils/database.util";
import { EmbedsUtil } from "../utils/embeds.util";
import { Logging, LogType } from "../utils/logging.util";
import { Mailing } from "../utils/mailing.util";
import { UserUtil } from "../utils/user.util";
import { IButton } from "../utils/interfaces/button.interface";

const button: IButton = {
    name: 'aB4n66',
    execute(interaction: ButtonInteraction, app: Client) {
        UserUtil.discordIdToUuid(interaction.user.id).then(uuid => {
            Database.pool.query("SELECT name, email, validation_code as code FROM members WHERE uuid=?", [uuid], (err: MysqlError | null, res) => {
                if(err){
                    Logging.write(err.message, LogType.Error);
                } else if(res.length === 1) {
                    Mailing.send([res[0].email], 'Here is your verification key !', Mailing.verificationEmail(res[0].name, res[0].code)).then(() => {
                        interaction.reply({embeds: [EmbedsUtil.info('👍 Email resent', [`We resent you a verification key at **${res[0].email}**`, `Follow the instructions in this email to complete your verification`, `*Don't forget to check your spam folder*`])], ephemeral: true});
                    });
                }
            });
        }).catch(() => {
            interaction.reply({embeds: [EmbedsUtil.warning('💤 First things first !', [`Use \`/register\` to get a verification key first`])], ephemeral: true});
        })
    },
}

module.exports = button;