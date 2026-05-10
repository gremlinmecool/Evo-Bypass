import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('premium')
  .setDescription('Check your premium status and benefits');

export async function execute(interaction: ChatInputCommandInteraction) {
  const embed = new EmbedBuilder()
    .setColor(0x8338EC)
    .setTitle('💎 Premium Status')
    .setDescription('Upgrade to premium for unlimited bypasses and priority support!')
    .addFields(
      { name: '✨ Current Plan', value: '`Free Tier`', inline: true },
      { name: '🔄 Bypasses Used', value: '`12/50`', inline: true },
      { name: '⏰ Resets In', value: '`18 days`', inline: true },
      { name: '\u200B', value: '\u200B', inline: false },
      { name: '🚀 Premium Benefits', value: '• Unlimited bypasses\n• Priority queue\n• Faster processing\n• API access\n• No cooldowns\n• Premium support', inline: false }
    )
    .setFooter({ text: 'EVO BYPASS • Upgrade at your-website.com/pricing' })
    .setTimestamp();

  await interaction.reply({ embeds: [embed], ephemeral: true });
}
