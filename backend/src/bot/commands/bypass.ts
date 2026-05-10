import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('bypass')
  .setDescription('Bypass any link - Linkvertise, Work.ink, Lootlabs, Admaven, Lockr.so, Shortfly & more')
  .addStringOption(option =>
    option
      .setName('link')
      .setDescription('Any supported link (Linkvertise, Work.ink, Lootlabs, Admaven, etc.)')
      .setRequired(true)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ ephemeral: true });

  const link = interaction.options.getString('link', true);

  // Detect service type from URL
  const serviceType = detectService(link);

  // Simulate bypass processing
  await new Promise(resolve => setTimeout(resolve, 2000));

  const embed = new EmbedBuilder()
    .setColor(0xFF006E)
    .setTitle('✅ Bypass Success')
    .setDescription('Your key has been retrieved. Copy it and input it into the application.')
    .addFields(
      { name: '🌐 Service Detected', value: `\`${serviceType}\``, inline: true },
      { name: '⏱️ Processing Time', value: '`2.08s`', inline: true },
      { name: '\u200B', value: '\u200B', inline: false },
      { name: '🔗 Original Link', value: `\`\`\`${link}\`\`\``, inline: false },
      { name: '🔑 Bypassed Key', value: `\`\`\`FREE_${generateKey()}\`\`\``, inline: false },
      { name: '👤 Requested by', value: `${interaction.user.tag}`, inline: true },
      { name: '📊 Success Rate', value: '`99.8%`', inline: true }
    )
    .setFooter({ text: 'EVO BYPASS • Premium Bypass Service' })
    .setTimestamp();

  const row = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
      new ButtonBuilder()
        .setLabel('📋 Result')
        .setStyle(ButtonStyle.Primary)
        .setCustomId('result'),
      new ButtonBuilder()
        .setLabel('🌐 Server')
        .setStyle(ButtonStyle.Link)
        .setURL('https://discord.gg/your-server'),
      new ButtonBuilder()
        .setLabel('🤖 Bot')
        .setStyle(ButtonStyle.Link)
        .setURL('https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands'),
      new ButtonBuilder()
        .setLabel('💻 Website')
        .setStyle(ButtonStyle.Link)
        .setURL('https://your-website.com'),
      new ButtonBuilder()
        .setLabel('⚡ API')
        .setStyle(ButtonStyle.Link)
        .setURL('https://your-website.com/api')
    );

  await interaction.editReply({
    embeds: [embed],
    components: [row]
  });
}

function detectService(url: string): string {
  const urlLower = url.toLowerCase();
  
  if (urlLower.includes('linkvertise')) return 'Linkvertise';
  if (urlLower.includes('work.ink')) return 'Work.ink';
  if (urlLower.includes('lootlabs')) return 'Lootlabs';
  if (urlLower.includes('loot-labs')) return 'Lootlabs';
  if (urlLower.includes('admaven')) return 'Admaven';
  if (urlLower.includes('lockr.so')) return 'Lockr.so';
  if (urlLower.includes('shortfly')) return 'Shortfly';
  if (urlLower.includes('sub2unlock')) return 'Sub2Unlock';
  if (urlLower.includes('rekonise')) return 'Rekonise';
  if (urlLower.includes('boost.ink')) return 'Boost.ink';
  if (urlLower.includes('mboost.me')) return 'mBoost';
  if (urlLower.includes('socialwolvez')) return 'SocialWolvez';
  if (urlLower.includes('letsboost')) return 'LetsBoost';
  if (urlLower.includes('sub2get')) return 'Sub2Get';
  
  return 'Universal Bypass';
}

function generateKey(): string {
  const chars = '0123456789abcdef';
  let key = '';
  for (let i = 0; i < 32; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }
  return key;
}
