import { Client, CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
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
                return interaction.reply({embeds: [EmbedsUtil.warning('🤔 How to register ?', [`**First**, use the \`/register\` command in ${interaction.guild?.channels.cache.find(c => c.name === "nouveaux")}\n*(If you don't know how to use slash commands on discord, just [read that](https://discord.com/blog/slash-commands-are-here))*\n`, `Then you will receive a **verification key** in your [@myges.fr](https://cdn.dynamored.com/resources/esgi/2022_23/myges_inbox_tuto.pdf) email adress inbox\n`, `**Finally**, use the \`/validate\` command combined with your verification key\n\n`, `*__You cannot send messages in this channel__. If you need help, contact <@324956349353951232> in MP*`])]});

            default:
                interaction.reply({embeds: [EmbedsUtil.error('❌ Unkown pre-defined message !', [])], ephemeral: true});
        }
    },
}

module.exports = command;