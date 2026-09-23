# Claude Desktop

Claude Desktop starts MCP servers from its configuration file as local commands, so it reaches the hosted PacketExchange server through the [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) bridge, which sends your API key as a header.

## Before you start

- Install a current Node.js LTS release, so that `npx` is available.
- No account is needed for the public tools. Account tools need a PacketExchange account with prepaid credit and an API key; read [security.md](../security.md) first.

## Steps

1. Open **Settings**, then **Developer**, and choose **Edit Config**. This opens `claude_desktop_config.json`:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
2. Add the `packetexchange` entry to `mcpServers`. If the file is empty, use exactly this ([configs/claude-desktop.json](../../configs/claude-desktop.json)):

   ```json
   {
     "mcpServers": {
       "packetexchange": {
         "command": "npx",
         "args": [
           "-y",
           "mcp-remote",
           "https://packetexchange.io/mcp/http",
           "--transport",
           "http-only",
           "--header",
           "Authorization:${PACKETEXCHANGE_AUTH_HEADER}"
         ],
         "env": {
           "PACKETEXCHANGE_AUTH_HEADER": "Bearer YOUR_API_KEY"
         }
       }
     }
   }
   ```

   If the file already lists other servers, add only the `"packetexchange": { ... }` entry inside the existing `mcpServers` object.
3. Replace `YOUR_API_KEY` with your key, keeping the word `Bearer` and the space before it. To use only the public tools, remove the `--header` line, its value and the `env` block.
4. Save the file and restart Claude Desktop completely.

The header value is passed through the `env` block, rather than written into `args`, because an argument that contains a space can be split on some platforms. `mcp-remote` substitutes `${PACKETEXCHANGE_AUTH_HEADER}` itself.

This file now holds your API key. Keep it private: do not share it, commit it or paste it into a chat.

## Check it works

Open a new chat. The PacketExchange tools appear in the tools menu. Then ask:

> What is my PacketExchange balance?

## Troubleshooting

- **The server does not start:** run `npx -y mcp-remote https://packetexchange.io/mcp/http --transport http-only` in a terminal to see the error. The most common cause is that Node.js is missing or too old.
- **Account tools say the key is missing:** check that the `env` block is inside the `packetexchange` entry and that its value starts with `Bearer`.
- **A tool fails with 401 or 403:** the key is invalid, or lacks the scope the tool needs. [tools.md](../tools.md) lists the scope for each tool.
- **Logs:** Claude Desktop writes MCP logs to `~/Library/Logs/Claude/` on macOS and `%APPDATA%\Claude\logs\` on Windows.
