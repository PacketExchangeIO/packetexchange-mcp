# VS Code

VS Code connects to the hosted server directly over Streamable HTTP, with no bridge to install. MCP tools are used from chat in agent mode.

## Before you start

- Use a version of VS Code with MCP support in chat.
- No account is needed for the public tools. Account tools need a PacketExchange account with prepaid credit and an API key; read [security.md](../security.md) first.

## Steps

1. In your workspace, create `.vscode/mcp.json` with this content ([configs/vscode.json](../../configs/vscode.json)):

   ```json
   {
     "inputs": [
       {
         "type": "promptString",
         "id": "packetexchange-api-key",
         "description": "PacketExchange API key",
         "password": true
       }
     ],
     "servers": {
       "packetexchange": {
         "type": "http",
         "url": "https://packetexchange.io/mcp/http",
         "headers": {
           "Authorization": "Bearer ${input:packetexchange-api-key}"
         }
       }
     }
   }
   ```

   If the file already exists, add the input to `inputs` and the `"packetexchange": { ... }` entry to `servers`.
2. Save the file. VS Code shows a **Start** action above the server entry; select it. The first time, VS Code asks for your API key and stores it securely, so the key never appears in the file.
3. Open chat, switch to agent mode, and open the tools picker to confirm the PacketExchange tools are listed.

To use the server in every workspace, run **MCP: Open User Configuration** from the Command Palette and add the same entries there.

## Check it works

In agent mode, ask:

> Show me details for the cheapest voice route to Nigeria on PacketExchange.

## Troubleshooting

- **The server does not start:** run **MCP: List Servers** from the Command Palette, select `packetexchange` and choose **Show Output**.
- **A tool fails with 401 or 403:** the key is invalid, or lacks the scope the tool needs. [tools.md](../tools.md) lists the scope for each tool.
