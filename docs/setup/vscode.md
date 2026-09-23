# VS Code

VS Code connects to the hosted server directly over SSE, with no bridge to install. MCP tools are used from chat in agent mode.

## Before you start

- Use a version of VS Code with MCP support in chat.
- No account is needed for the public tools. Account tools need a PacketExchange account with prepaid credit and an API key; read [security.md](../security.md) first.

## Steps

1. In your workspace, create `.vscode/mcp.json` with this content ([configs/vscode.json](../../configs/vscode.json)):

   ```json
   {
     "servers": {
       "packetexchange": {
         "type": "sse",
         "url": "https://packetexchange.io/mcp/sse"
       }
     }
   }
   ```

   If the file already exists, add only the `"packetexchange": { ... }` entry inside `servers`.
2. Save the file. VS Code shows a **Start** action above the server entry; select it.
3. Open chat, switch to agent mode, and open the tools picker to confirm the PacketExchange tools are listed.

To use the server in every workspace, run **MCP: Open User Configuration** from the Command Palette and add the same entry there.

Keep `"type": "sse"`. The endpoint speaks the SSE transport only.

## Check it works

In agent mode, ask:

> Show me details for the cheapest voice route to Nigeria on PacketExchange.

## Troubleshooting

- **The server does not start:** run **MCP: List Servers** from the Command Palette, select `packetexchange` and choose **Show Output**.
- **A tool call fails with a connection or session error:** retry it. If it keeps failing, restart the server from **MCP: List Servers**.
