import { Client, CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../utils/interfaces/command.interface";

const command: ICommand = {
    name: 'ban',
    data: new SlashCommandBuilder().setName('ban').setDescription('N.A.').setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    execute(interaction: CommandInteraction, app: Client) {

    },
}

module.exports = command;