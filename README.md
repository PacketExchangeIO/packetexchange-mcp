<p align="center">
  <img src="assets/logo.png" alt="PacketExchange" width="96" height="96">
</p>

<h1 align="center">PacketExchange MCP</h1>

<p align="center">Connect AI agents and MCP clients to the PacketExchange voice and SMS marketplace.</p>

<p align="center">
  <a href="https://github.com/PacketExchangeIO/packetexchange-mcp/actions/workflows/ci.yml"><img src="https://github.com/PacketExchangeIO/packetexchange-mcp/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT license"></a>
</p>

PacketExchange runs a hosted [Model Context Protocol](https://modelcontextprotocol.io) server. Once your client is connected, an agent can search the marketplace, compare routes, run a phone verification, send an SMS, place a call and check the account balance, by calling tools by name.

This repository holds the documentation and ready-to-use client configurations. There is nothing to build or host: the server runs at PacketExchange.

## Server

| | |
| --- | --- |
| Endpoint | `https://packetexchange.io/mcp/sse` |
| Transport | Server-Sent Events (the MCP HTTP+SSE transport) |
| Tools | 32: 14 marketplace and account tools, 18 Switch tools |
| Authentication | None to connect. Account tools need a PacketExchange API key; read [Authentication](#authentication) first. |

## Install

Pick your client and copy its configuration:

| Client | Guide | Configuration |
| --- | --- | --- |
| Claude Desktop | [docs/setup/claude-desktop.md](docs/setup/claude-desktop.md) | [configs/claude-desktop.json](configs/claude-desktop.json) |
| Cursor | [docs/setup/cursor.md](docs/setup/cursor.md) | [configs/cursor.json](configs/cursor.json) |
| VS Code | [docs/setup/vscode.md](docs/setup/vscode.md) | [configs/vscode.json](configs/vscode.json) |
| Any other MCP client | [docs/setup/other-clients.md](docs/setup/other-clients.md) | [configs/generic-stdio.json](configs/generic-stdio.json) |

Clients that launch servers as local commands use [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) to reach the hosted endpoint. It needs a current Node.js LTS release (`npx` must be on your PATH):

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

Keep `--transport sse-only`: the endpoint speaks the SSE transport only.

## Quick start

With the server connected, try a public tool. These need no account and cost nothing:

- "What are the five cheapest voice routes to Kenya on PacketExchange? Include the seller-stated ASR."
- "Give me a summary of the PacketExchange marketplace right now."

More in [docs/example-prompts.md](docs/example-prompts.md).

## Tools

| Group | Tools |
| --- | --- |
| Discover (public, free) | `wmmn_list_routes`, `wmmn_route_details`, `wmmn_market_summary` |
| Route | `wmmn_resolve_route`, `wmmn_purchase_route`, `wmmn_list_purchases` |
| Send (billed) | `wmmn_send_sms`, `wmmn_make_call` |
| Verify | `wmmn_send_voice_otp`, `wmmn_verify_start`, `wmmn_verify_check` |
| Account | `wmmn_get_balance`, `wmmn_list_transactions`, `wmmn_topup_x402` |
| Switch (Switch plan) | 18 `switch_*` tools for routing, customers, suppliers, rates, invoicing and fraud settings |

The full reference, with parameters, required scopes and cost notes, is in [docs/tools.md](docs/tools.md).

## Authentication

Using account tools needs a PacketExchange account with prepaid credit: sign up at [packetexchange.io](https://packetexchange.io) and add credit.

- The public tools (`wmmn_list_routes`, `wmmn_route_details`, `wmmn_market_summary`) need no key.
- Every other tool takes the API key in its `api_key` argument, on each call. The server does not read a key from connection headers, environment variables or the client configuration, so none of the configurations in this repository contain one.
- A key passed as a tool argument is visible to the model and is kept in your client's conversation history. Read [docs/security.md](docs/security.md) before using account tools, and only ever use a dedicated, narrowly scoped key with a small balance.

## Costs

Tools that spend money say so in their descriptions, so the agent knows before it calls them. Calls and messages are billed from your prepaid balance at the route price plus the platform fee (2% of the route rate, capped at $0.001 per call or message). See [pricing](https://packetexchange.io/pricing) for details.

## Good to know

- ASR and ACD figures on listings are stated by the seller, not measured by PacketExchange.
- SMS status is the send-time outcome (accepted, sent or failed). Handset delivery receipts are not provided.
- Voice passcodes can be spoken in English, Spanish, French, German, Portuguese and Hindi.
- Use PacketExchange for transactional messages to people who expect them, such as verification codes, alerts and appointment reminders.

## Links

- MCP server overview: [packetexchange.io/mcp](https://packetexchange.io/mcp)
- Developers: [packetexchange.io/developers](https://packetexchange.io/developers)
- API reference: [packetexchange.io/api-docs](https://packetexchange.io/api-docs)
- OpenAPI specification: [packetexchange-openapi](https://github.com/PacketExchangeIO/packetexchange-openapi)
- Support: [support@packetexchange.io](mailto:support@packetexchange.io)

## License

The documentation and configurations in this repository are released under the [MIT License](LICENSE).
