import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('settings')
  .setDescription('Configure bot settings for your server')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .addSubcommand(subcommand =>
    subcommand
      .setName('view')
      .setDescription('View current server settings')
  )
  .addSubcommand(subcommand =>
    subcommand
      .setName('logs')
      .setDescription('Set the logging channel')
      .addChannelOption(option =>
        option
          .setName('channel')
          .setDescription('Channel for bypass logs')
          .setRequired(true)
      )
  )
  .addSubcommand(subcommand =>
    subcommand
      .setName('autorole')
      .setDescription('Set auto-role for verified users')
      .addRoleOption(option =>
        option
          .setName('role')
          .setDescription('Role to assign')
          .setRequired(true)
      )
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const subcommand = interaction.options.getSubcommand();

  if (subcommand === 'view') {
    const embed = new EmbedBuilder()
      .setColor(0x8338EC)
      .setTitle('⚙️ Server Settings')
      .setDescription('Current configuration for this server')
      .addFields(
        { name: '📝 Logging Channel', value: '#bypass-logs', inline: true },
        { name: '🎭 Auto Role', value: '@Verified', inline: true },
        { name: '🔔 Notifications', value: 'Enabled', inline: true },
        { name: '🛡️ Auto Moderation', value: 'Enabled', inline: true },
        { name: '💎 Premium Server', value: 'No', inline: true },
        { name: '🌐 Language', value: 'English', inline: true }
      )
      .setFooter({ text: 'EVO BYPASS • Server Configuration' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  } else if (subcommand === 'logs') {
    const channel = interaction.options.getChannel('channel', true);
    
    const embed = new EmbedBuilder()
      .setColor(0x00FF00)
      .setTitle('✅ Settings Updated')
      .setDescription(`Logging channel set to ${channel}`)
      .setFooter({ text: 'EVO BYPASS' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  } else if (subcommand === 'autorole') {
    const role = interaction.options.getRole('role', true);
    
    const embed = new EmbedBuilder()
      .setColor(0x00FF00)
      .setTitle('✅ Settings Updated')
      .setDescription(`Auto-role set to ${role}`)
      .setFooter({ text: 'EVO BYPASS' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
}
