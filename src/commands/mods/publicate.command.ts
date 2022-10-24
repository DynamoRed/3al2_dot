import { Client, CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../utils/interfaces/command.interface";

const command: ICommand = {
    name: 'publicate',
    inTest: true,
    data: new SlashCommandBuilder()
            .setName('publicate')
            .setDescription('Send an advert in #annonces')
            .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    execute(interaction: CommandInteraction, app: Client) {

    },
}

module.exports = command;