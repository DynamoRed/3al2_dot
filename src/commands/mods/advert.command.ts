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
                {name: 'Welcome', value: '8jE5Q4'},
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

            case '8jE5Q4':

                return interaction.reply({embeds: [EmbedsUtil.info(`👋 Bienvenue`, [`Il n'y a pas vraiment de règles, simplement, **respectez vous les uns les autres**\n`, `N'hésitez pas a faire des ${interaction.guild?.channels.cache.find(c => c.name === "suggestions")}, toute idée est bonne a prendre !\n`, `Pour acceder aux commandes de ${app.user}, commencez votre message par \`/\` puis cliquez sur l'icon <:3AL2:1024333044389249064>\n`, `**Have fun !**`])]});

            default:
                interaction.reply({embeds: [EmbedsUtil.error('❌ Unkown pre-defined message !', [])], ephemeral: true});
        }
    },
}

module.exports = command;