import { Client, CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../utils/interfaces/command.interface";

const command: ICommand = {
    name: 'schedule',
    inTest: true,
    data: new SlashCommandBuilder()
            .setName('schedule')
            .setDescription('Schedule something')
            .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    execute(interaction: CommandInteraction, app: Client) {

    },
}

module.exports = command;