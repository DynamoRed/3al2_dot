import { Client, CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../utils/interfaces/command.interface";

const command: ICommand = {
    name: 'unmute',
    inTest: true,
    data: new SlashCommandBuilder().setName('unmute').setDescription('N.A.').setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),
    execute(interaction: CommandInteraction, app: Client) {

    },
}

module.exports = command;