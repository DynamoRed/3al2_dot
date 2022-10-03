import { ActionRowBuilder, ActionRowComponent, AnyComponentBuilder, APIActionRowComponent, ButtonBuilder, ButtonStyle, Client, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { UserUtil } from "../../utils/user.util";
import { ICommand } from "../../utils/interfaces/command.interface";
import { EmbedsUtil } from "../../utils/embeds.util";
import { ValidationUtil } from "../../utils/validation.util";
import { v4 as uuidV4 } from 'uuid';
import { Mailing } from "../../utils/mailing.util";
import { RegexUtil } from "../../utils/regex.util";
import { Database } from "../../utils/database.util";
import { Logging, LogType } from "../../utils/logging.util";
import { MysqlError } from "mysql";

const command: ICommand = {
    name: 'register',
    data: new SlashCommandBuilder()
            .setName('register')
            .setDescription('Register your @myges.fr email adress to our services')
            .setDescriptionLocalization('fr', 'Enregistrez votre adresse mail @myges.fr sur nos services')
            .addStringOption(opt => opt.setName('firstname').setNameLocalization('fr', 'prenom').setDescription('Your firstname').setDescriptionLocalization('fr', 'Votre prénom').setMinLength(2).setRequired(true))
            .addStringOption(opt => opt.setName('lastname').setNameLocalization('fr', 'nom_de_famille').setDescription('Your lastname').setDescriptionLocalization('fr', 'Votre nom de famille').setMinLength(3).setRequired(true))
            .addStringOption(opt => opt.setName('email').setDescription('Your @myges.fr email adress').setDescriptionLocalization('fr', 'Votre adresse email @myges.fr').setMinLength(10).setRequired(true))
    ,
    execute(interaction: CommandInteraction, app: Client) {
        let firstname: string = interaction.options.get('firstname')?.value?.toString() || 'invalid';
        const lastname: string = interaction.options.get('lastname')?.value?.toString().toUpperCase()|| 'invalid';
        const email: string = interaction.options.get('email')?.value?.toString() || 'invalid';

        firstname = firstname.split(' ').map((name: string) => name[0].toUpperCase() + name.substring(1).toLowerCase()).join(' ');

        const name: string = firstname + " " + lastname;

        if(!email.match(RegexUtil.mygesEmailAdress) || !name.match(RegexUtil.fullName)){
            return interaction.reply({embeds: [EmbedsUtil.error('😕 Seems like something going wrong', [`Incorrect name or email adress`, `*Your email adress must be like: yourName@myges.fr*`])], ephemeral: true});
        }

        UserUtil.isRegistered(interaction.user.id).then(flg => {
            if(flg || interaction.guild?.members.cache.find(m => m.user.id === interaction.user.id)?.roles.cache.find(r => r.name.toLowerCase() === 'classe')) return interaction.reply({embeds: [EmbedsUtil.warning('🤷‍♂️ You are already verified !', [])], ephemeral: true});

            UserUtil.discordIdToUuid(interaction.user.id).then(uuid => {
                const row: any = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('aB4n66')
                        .setLabel('🔄 Resent me a verification key')
                        .setStyle(ButtonStyle.Secondary)
                );

                interaction.reply({components: [row], embeds: [EmbedsUtil.warning('😕 Whoops', [`Looks like you are already waiting for verification`, `A verification key has been sent to ${email}`])], ephemeral: true});
            }).catch(() => {
                const uuid: string = uuidV4();
                const code: string = ValidationUtil.generateCode(uuid);

                new Promise<void>((resolve, reject) => {
                    Database.pool.query("INSERT INTO members(uuid, discord_id, firstname, lastname, email, validation_code) VALUES (?,?,?,?,?,?)", [uuid, interaction.user.id, firstname, lastname, email, code], (err: MysqlError | null) => {
                        if(err){
                            Logging.write(err.message, LogType.Error);
                            reject();
                        }
                        Logging.write(`Registering ${interaction.user.tag}`, LogType.Success);
                        resolve();
                    });
                }).then(() => {
                    Mailing.send([email], 'Here is your verification key !', Mailing.verificationEmail(name, code)).then(() => {
                        interaction.reply({embeds: [EmbedsUtil.info('👍 One more step', [`We sent you a verification key at **${email}**`, `Follow the instructions in this email to complete your verification`, `*Don't forget to check your spam folder*`])], ephemeral: true});
                    });
                })
            })
        });
    },
}

module.exports = command;