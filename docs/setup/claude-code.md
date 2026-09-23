# Claude Code

Claude Code connects to the hosted server directly over Streamable HTTP, with no bridge to install.

## Before you start

- No account is needed for the public tools. Account tools need a PacketExchange account with prepaid credit and an API key; read [security.md](../security.md) first.
- Put the key in an environment variable, for example in your shell profile:

  ```sh
  export PACKETEXCHANGE_API_KEY="your-api-key"
  ```

## Option 1: project configuration

Add a `.mcp.json` file to the project root ([configs/claude-code.json](../../configs/claude-code.json)):

```json
{
  "mcpServers": {
    "packetexchange": {
      "type": "http",
      "url": "https://packetexchange.io/mcp/http",
      "headers": {
        "Authorization": "Bearer ${PACKETEXCHANGE_API_KEY}"
      }
    }
  }
}
```

Claude Code expands `${PACKETEXCHANGE_API_KEY}` from the environment when it starts the server, so the file contains no credentials and can be committed. Each person who uses the project sets the variable with their own key. Claude Code asks you to approve project servers the first time it sees them.

## Option 2: the command line

```sh
claude mcp add --transport http packetexchange https://packetexchange.io/mcp/http \
  --header "Authorization: Bearer $PACKETEXCHANGE_API_KEY"
```

Your shell substitutes the key when you run the command, and Claude Code stores the resulting header in its own configuration for this project. Add `--scope user` to make the server available in every project.

## Check it works

Run `claude mcp list` and check that `packetexchange` is connected, or type `/mcp` in a session. Then ask:

> Give me a summary of the PacketExchange marketplace right now.

## Troubleshooting

- **Account tools say the key is missing:** check that `PACKETEXCHANGE_API_KEY` is set in the shell that started Claude Code (`echo $PACKETEXCHANGE_API_KEY`), then restart the session.
- **A tool fails with 401:** the key is wrong, expired or revoked. Create a new one in the dashboard.
- **A tool fails with 403:** the key lacks the scope that tool needs. [tools.md](../tools.md) lists the scope for each tool.
