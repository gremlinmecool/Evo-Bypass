import { SlashCommandBuilder, EmbedBuilder, ChannelType, PermissionFlagsBits } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ticket')
  .setDescription('Create a support ticket')
  .addStringOption(option =>
    option
      .setName('reason')
      .setDescription('Reason for creating the ticket')
      .setRequired(true)
      .addChoices(
        { name: '🐛 Bug Report', value: 'bug' },
        { name: '💎 Premium Support', value: 'premium' },
        { name: '❓ General Question', value: 'question' },
        { name: '💰 Billing Issue', value: 'billing' },
        { name: '🔧 Technical Issue', value: 'technical' }
      )
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ ephemeral: true });

  const reason = interaction.options.getString('reason', true);
  const guild = interaction.guild;

  if (!guild) {
    await interaction.editReply('This command can only be used in a server!');
    return;
  }

  try {
    // Create ticket channel
    const ticketChannel = await guild.channels.create({
      name: `ticket-${interaction.user.username}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: guild.id,
          deny: [PermissionFlagsBits.ViewChannel],
        },
        {
          id: interaction.user.id,
          allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
        },
      ],
    });

    const embed = new EmbedBuilder()
      .setColor(0xFF006E)
      .setTitle('🎫 Support Ticket Created')
      .setDescription(`Welcome ${interaction.user}! Our support team will be with you shortly.`)
      .addFields(
        { name: '📝 Reason', value: getReasonText(reason), inline: true },
        { name: '👤 Created by', value: interaction.user.tag, inline: true },
        { name: '⏰ Created at', value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true }
      )
      .setFooter({ text: 'EVO BYPASS • Support Team' })
      .setTimestamp();

    await ticketChannel.send({ embeds: [embed] });

    await interaction.editReply(`✅ Ticket created! Check ${ticketChannel}`);
  } catch (error) {
    await interaction.editReply('❌ Failed to create ticket. Please contact an administrator.');
  }
}

function getReasonText(reason: string): string {
  const reasons: Record<string, string> = {
    bug: '🐛 Bug Report',
    premium: '💎 Premium Support',
    question: '❓ General Question',
    billing: '💰 Billing Issue',
    technical: '🔧 Technical Issue'
  };
  return reasons[reason] || reason;
}
