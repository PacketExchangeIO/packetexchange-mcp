# Cursor

Cursor reaches the hosted PacketExchange server through [`mcp-remote`](https://www.npmjs.com/package/mcp-remote), which it starts as a local command.

## Before you start

- Install a current Node.js LTS release, so that `npx` is available.
- No account is needed for the public tools. Account tools need a PacketExchange account with prepaid credit and an API key; read [security.md](../security.md) first.

## Steps

1. Create or open the MCP configuration file:
   - for every project: `~/.cursor/mcp.json`
   - for one project: `.cursor/mcp.json` in the project root
2. Add the `packetexchange` entry ([configs/cursor.json](../../configs/cursor.json)):

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
3. Open **Cursor Settings**, find the MCP section, and check that `packetexchange` is enabled and shows its tools.

A project-level `.cursor/mcp.json` is often committed to version control. The configuration above contains no credentials, and it should stay that way.

## Check it works

In the agent chat, ask:

> List the three cheapest voice routes to the United Kingdom on PacketExchange.

## Troubleshooting

- **No tools are listed:** run `npx -y mcp-remote https://packetexchange.io/mcp/sse --transport sse-only` in a terminal to see the error.
- **A tool call fails with a connection or session error:** retry it. If it keeps failing, turn the server off and on again in Cursor Settings.
