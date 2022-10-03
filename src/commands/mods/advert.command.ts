import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { EmbedsUtil } from "../../utils/embeds.util";
import { ICommand } from "../../utils/interfaces/command.interface";

const command: ICommand = {
    name: 'advert',
    data: new SlashCommandBuilder()
			.setName('advert')
			.setDescription('Send system pre-defined messages')
			.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
			.addStringOption(opt => opt.setName('id').setDescription('Pre-defined message ID').setRequired(true).addChoices(
                {name: 'Registration', value: '7Nu5i6'},
            )),
    execute(interaction: CommandInteraction, app: Client) {
        const messageId: string = interaction.options.get('id')?.value?.toString() || 'invalid';

        switch(messageId){
            case '7Nu5i6':
                const row: any = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('u7Xm59')
                        .setLabel('🔵 English')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('5bL58S')
                        .setLabel('🔴 Français')
                        .setStyle(ButtonStyle.Secondary)
                );

                return interaction.reply({components: [row]});

            default:
                interaction.reply({embeds: [EmbedsUtil.error('❌ Unkown pre-defined message !', [])], ephemeral: true});
        }
    },
}

module.exports = command;