# Codex

The Codex CLI and IDE extension connect to the hosted server directly over Streamable HTTP and read the API key from an environment variable.

## Before you start

- No account is needed for the public tools. Account tools need a PacketExchange account with prepaid credit and an API key; read [security.md](../security.md) first.
- Set the key in the environment Codex starts from, for example in your shell profile:

  ```sh
  export PACKETEXCHANGE_API_KEY="your-api-key"
  ```

## Steps

Add the server to `~/.codex/config.toml` ([configs/codex.toml](../../configs/codex.toml)):

```toml
[mcp_servers.packetexchange]
url = "https://packetexchange.io/mcp/http"
bearer_token_env_var = "PACKETEXCHANGE_API_KEY"
```

Or add it from the command line:

```sh
codex mcp add packetexchange --url https://packetexchange.io/mcp/http \
  --bearer-token-env-var PACKETEXCHANGE_API_KEY
```

Codex reads the key from `PACKETEXCHANGE_API_KEY` each time it connects and sends it as `Authorization: Bearer <key>`. The configuration file stores only the variable's name.

## Check it works

Run `codex mcp list` and check that `packetexchange` is listed, or type `/mcp` in a session. Then ask:

> Give me a summary of the PacketExchange marketplace right now.

## Troubleshooting

- **Account tools say the key is missing:** check that `PACKETEXCHANGE_API_KEY` is set in the shell that started Codex, then start a new session.
- **The server does not connect:** update Codex to a current release; older releases do not support Streamable HTTP servers.
- **A tool fails with 401 or 403:** the key is invalid, or lacks the scope the tool needs. [tools.md](../tools.md) lists the scope for each tool.
