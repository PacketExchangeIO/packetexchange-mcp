# Other MCP clients

The server works with any client that supports the MCP HTTP+SSE transport, or that can start a local command.

## Clients with SSE support

Point the client at:

```text
https://packetexchange.io/mcp/sse
```

and select the SSE transport. The client opens the event stream with `GET /mcp/sse`, receives an `endpoint` event, and posts messages to the URL in that event. No authentication is needed to connect.

The endpoint does not support the Streamable HTTP transport. If your client offers both, choose SSE.

## Clients that start local commands

Use [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) as a bridge ([configs/generic-stdio.json](../../configs/generic-stdio.json)):

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

The bridge needs a current Node.js LTS release. If your client uses a different file format, the command is:

```sh
npx -y mcp-remote https://packetexchange.io/mcp/sse --transport sse-only
```

## Agent frameworks

Frameworks with an MCP client, such as those that accept a list of MCP servers for an agent, take the same SSE URL. Register the server once at startup and let the framework list the tools; do not hard-code the tool list, as tools may be added.

## Check it works

Call `wmmn_market_summary` with no arguments. It is free, needs no key, and returns marketplace totals.

Before calling any other tool, read [security.md](../security.md).
