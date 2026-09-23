# Other MCP clients

The server works with any client that supports the Streamable HTTP transport, the older HTTP+SSE transport, or that can start a local command.

## Streamable HTTP (recommended)

Point the client at:

```text
https://packetexchange.io/mcp/http
```

and configure it to send this header on every request:

```text
Authorization: Bearer <your API key>
```

The server is stateless: each JSON-RPC request is a `POST` answered with a JSON body, there is no session id, and any request may follow any other. It offers no standalone server stream, so a `GET` returns 405. Read the key from an environment variable or your client's secret store rather than writing it into a configuration file.

## Legacy HTTP+SSE

Clients that only speak the older transport can use:

```text
https://packetexchange.io/mcp/sse
```

The client opens the event stream with `GET /mcp/sse`, sending the `Authorization` header on that request; the key is bound to the stream for its lifetime. It then posts messages to the URL in the `endpoint` event. If a stream drops, the client reconnects and gets a new session. Prefer Streamable HTTP where you can.

## Clients that start local commands

Use [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) as a bridge ([configs/generic-stdio.json](../../configs/generic-stdio.json)):

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

Replace `YOUR_API_KEY` with your key. The bridge needs a current Node.js LTS release. If your client uses a different file format, run the same command with `PACKETEXCHANGE_AUTH_HEADER` set in its environment:

```sh
PACKETEXCHANGE_AUTH_HEADER="Bearer $PACKETEXCHANGE_API_KEY" \
  npx -y mcp-remote https://packetexchange.io/mcp/http --transport http-only \
  --header 'Authorization:${PACKETEXCHANGE_AUTH_HEADER}'
```

## Agent frameworks

Frameworks with an MCP client take the same URL and header. Register the server once at startup and let the framework list the tools; do not hard-code the tool list, as tools may be added.

## Check it works

Call `wmmn_market_summary` with no arguments. It is free, needs no key, and returns marketplace totals. Then call `wmmn_get_balance` to confirm the header reaches the server.

Before calling any other tool, read [security.md](../security.md).
