import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('View all available commands and how to use them');

export async function execute(interaction: ChatInputCommandInteraction) {
  const embed = new EmbedBuilder()
    .setColor(0xFF006E)
    .setTitle('🤖 EVO BYPASS Bot Commands')
    .setDescription('Here are all available commands:')
    .addFields(
      { 
        name: '🔓 /bypass <link>', 
        value: 'Bypass **ANY** supported link instantly\nExamples:\n• `/bypass https://linkvertise.com/example`\n• `/bypass https://work.ink/example`\n• `/bypass https://lootlabs.gg/example`\n• `/bypass https://any-supported-link.com`', 
        inline: false 
      },
      { 
        name: '💎 /premium', 
        value: 'Check your premium status and benefits', 
        inline: false 
      },
      { 
        name: '📊 /stats', 
        value: 'View global bypass statistics', 
        inline: false 
      },
      { 
        name: '🎫 /ticket', 
        value: 'Create a support ticket', 
        inline: false 
      },
      { 
        name: '⚙️ /settings', 
        value: 'Configure bot settings for your server', 
        inline: false 
      },
      { 
        name: '\u200B', 
        value: '**✅ Supported Services (14+):**\nLinkvertise • Work.ink • Lootlabs • Admaven • Lockr.so • Shortfly • Sub2Unlock • Rekonise • Boost.ink • mBoost • SocialWolvez • LetsBoost • Sub2Get • And more!\n\n**Just use `/bypass` with ANY link!**', 
        inline: false 
      }
    )
    .setFooter({ text: 'EVO BYPASS • Need help? Join our Discord server!' })
    .setTimestamp();

  await interaction.reply({ embeds: [embed], ephemeral: true });
}
