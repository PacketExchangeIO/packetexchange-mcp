# Cursor

Cursor connects to the hosted server directly over Streamable HTTP and reads your API key from an environment variable.

## Before you start

- No account is needed for the public tools. Account tools need a PacketExchange account with prepaid credit and an API key; read [security.md](../security.md) first.
- Set `PACKETEXCHANGE_API_KEY` in the environment Cursor starts from, for example in your shell profile, then start Cursor from that shell:

  ```sh
  export PACKETEXCHANGE_API_KEY="your-api-key"
  ```

## Steps

1. Create or open the MCP configuration file:
   - for every project: `~/.cursor/mcp.json`
   - for one project: `.cursor/mcp.json` in the project root
2. Add the `packetexchange` entry ([configs/cursor.json](../../configs/cursor.json)):

   ```json
   {
     "mcpServers": {
       "packetexchange": {
         "url": "https://packetexchange.io/mcp/http",
         "headers": {
           "Authorization": "Bearer ${env:PACKETEXCHANGE_API_KEY}"
         }
       }
     }
   }
   ```

   If the file already lists other servers, add only the `"packetexchange": { ... }` entry inside the existing `mcpServers` object.
3. Open **Cursor Settings**, find the MCP section, and check that `packetexchange` is enabled and shows its tools.

Cursor replaces `${env:PACKETEXCHANGE_API_KEY}` with the variable's value, so the file itself contains no credentials. A project-level `.cursor/mcp.json` is often committed to version control; keep keys out of it.

## Check it works

In the agent chat, ask:

> List the three cheapest voice routes to the United Kingdom on PacketExchange.

## Troubleshooting

- **Account tools say the key is missing:** Cursor did not see the variable. Start Cursor from a terminal where `echo $PACKETEXCHANGE_API_KEY` prints your key.
- **A tool fails with 401 or 403:** the key is invalid, or lacks the scope the tool needs. [tools.md](../tools.md) lists the scope for each tool.
- **No tools are listed:** turn the server off and on again in Cursor Settings, and check the MCP output panel for errors.
