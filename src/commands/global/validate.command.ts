import { Client, CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { UserUtil } from "../../utils/user.util";
import { ICommand } from "../../utils/interfaces/command.interface";
import { EmbedsUtil } from "../../utils/embeds.util";
import { Database } from "../../utils/database.util";
import { Logging, LogType } from "../../utils/logging.util";
import { MysqlError } from "mysql";

const command: ICommand = {
    name: 'validate',
    data: new SlashCommandBuilder()
        .setName('validate')
        .setDescription('Validate your verification key')
        .addStringOption(opt => opt.setName('code').setDescription('Your verification key').setMinLength(12).setMaxLength(12).setRequired(true)),
    execute(interaction: CommandInteraction, app: Client) {
        const code: any = interaction.options.get('code')?.value;

        UserUtil.isRegistered(interaction.user.id).then(flg => {
            if(flg || interaction.guild?.members.cache.find(m => m.user.id === interaction.user.id)?.roles.cache.find(r => r.name.toLowerCase() === 'classe')) return interaction.reply({embeds: [EmbedsUtil.warning('🤷‍♂️ You are already verified !', [])], ephemeral: true});

            UserUtil.discordIdToUuid(interaction.user.id).then(uuid => {
                new Promise<string>((resolve, reject) => {
                    Database.pool.query("SELECT firstname, lastname FROM members WHERE uuid=? AND validation_code=?", [uuid, code], (err: MysqlError | null, res) => {
                        if(err){
                            Logging.write(err.message, LogType.Error);
                            reject();
                        }
                        resolve(res.length === 1 ? res[0].firstname : null);
                    });
                }).then(name => {
                    if(name){
                        Database.pool.query("UPDATE members SET registered_flg=1 WHERE uuid=?", [uuid], (err: MysqlError | null, res) => {
                            if(err){
                                Logging.write(err.message, LogType.Error);
                                return;
                            }

                            interaction.reply({embeds: [EmbedsUtil.success('✅ Here we go !', [`Welcome onboard`])], ephemeral: true});

                            const classRole: any = interaction.guild?.roles.cache.find(r => r.name.toLowerCase() === 'classe')?.id;
                            const visitorRole: any = interaction.guild?.roles.cache.find(r => r.name.toLowerCase() === 'visiteur')?.id;
                            const member = interaction.guild?.members.cache.find(m => m.user.id === interaction.user.id);
                            member?.roles.remove(visitorRole, 'Registering').then(() => member?.roles.add(classRole, 'Registering').then(() => member?.setNickname(name)));
                        });
                    } else interaction.reply({embeds: [EmbedsUtil.error('🔴 Invalid key', [])], ephemeral: true});
                })
            }).catch(() => interaction.reply({embeds: [EmbedsUtil.warning('💤 First things first !', [`Use \`/register\` to get a verification key first`])], ephemeral: true}));
        });
    },
}

module.exports = command;