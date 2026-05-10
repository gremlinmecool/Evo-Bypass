import { Client, GatewayIntentBits, Collection, REST, Routes } from "discord.js";
import { env } from "../config/env";
import { commands } from "./commands";
import type { ChatInputCommandInteraction } from "discord.js";

interface CommandModule {
  data: {
    name: string;
    toJSON: () => unknown;
  };
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export function createDiscordClient() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMembers
    ]
  });

  // Store commands in a collection
  const commandCollection = new Collection<string, CommandModule>();
  
  for (const command of commands) {
    commandCollection.set(command.data.name, command as CommandModule);
  }

  // Register slash commands
  client.once('ready', async () => {
    console.log(`✅ Bot logged in as ${client.user?.tag}`);
    
    if (env.discordToken && env.discordClientId) {
      try {
        const rest = new REST({ version: '10' }).setToken(env.discordToken);
        
        console.log('🔄 Registering slash commands...');
        
        await rest.put(
          Routes.applicationCommands(env.discordClientId),
          { body: commands.map(cmd => cmd.data.toJSON()) }
        );
        
        console.log('✅ Slash commands registered successfully!');
      } catch (error) {
        console.error('❌ Error registering commands:', error);
      }
    }
  });

  // Handle interactions
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = commandCollection.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error('Error executing command:', error);
      
      const errorMessage = { 
        content: '❌ There was an error executing this command!', 
        ephemeral: true 
      };
      
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(errorMessage);
      } else {
        await interaction.reply(errorMessage);
      }
    }
  });

  // Login
  if (env.discordToken) {
    void client.login(env.discordToken);
  } else {
    console.warn('⚠️ Discord token not found. Bot will not start.');
  }

  return client;
}
