# Claude Desktop

Claude Desktop starts MCP servers as local commands, so it reaches the hosted PacketExchange server through [`mcp-remote`](https://www.npmjs.com/package/mcp-remote).

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
         "args": ["-y", "mcp-remote", "https://packetexchange.io/mcp/sse", "--transport", "sse-only"]
       }
     }
   }
   ```

   If the file already lists other servers, add only the `"packetexchange": { ... }` entry inside the existing `mcpServers` object.
3. Save the file and restart Claude Desktop completely.

## Check it works

Open a new chat. The PacketExchange tools appear in the tools menu. Then ask:

> Give me a summary of the PacketExchange marketplace right now.

## Troubleshooting

- **The server does not start:** run `npx -y mcp-remote https://packetexchange.io/mcp/sse --transport sse-only` in a terminal to see the error. The most common cause is that Node.js is missing or too old.
- **A tool call fails with a connection or session error:** retry it. If it keeps failing, restart Claude Desktop.
- **Logs:** Claude Desktop writes MCP logs to `~/Library/Logs/Claude/` on macOS and `%APPDATA%\Claude\logs\` on Windows.
