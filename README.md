<p align="center">
  <img src="assets/logo.png" alt="PacketExchange" width="96" height="96">
</p>

<h1 align="center">PacketExchange MCP</h1>

<p align="center">Connect AI agents and MCP clients to the PacketExchange voice and SMS marketplace.</p>

<p align="center">
  <a href="https://github.com/PacketExchangeIO/packetexchange-mcp/actions/workflows/ci.yml"><img src="https://github.com/PacketExchangeIO/packetexchange-mcp/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT license"></a>
</p>

PacketExchange runs a hosted [Model Context Protocol](https://modelcontextprotocol.io) server. Once your client is connected, an agent can search the marketplace, compare routes, run a phone verification, send an SMS, place a call and follow it, and check the account balance, by calling tools by name.

This repository holds the documentation and ready-to-use client configurations. There is nothing to build or host: the server runs at PacketExchange.

## Server

| | |
| --- | --- |
| Endpoint | `https://packetexchange.io/mcp/http` |
| Transport | Streamable HTTP, stateless (every request stands alone, with no session to keep) |
| Legacy endpoint | `https://packetexchange.io/mcp/sse`, for clients that only speak the older HTTP+SSE transport |
| Tools | 33: 15 marketplace and account tools, 18 Switch tools |
| Authentication | `Authorization: Bearer <API key>` header, set in your client configuration. The three public tools work without it. |

## Install

Pick your client and copy its configuration:

| Client | Guide | Configuration |
| --- | --- | --- |
| Claude Code | [docs/setup/claude-code.md](docs/setup/claude-code.md) | [configs/claude-code.json](configs/claude-code.json) |
| Claude Desktop | [docs/setup/claude-desktop.md](docs/setup/claude-desktop.md) | [configs/claude-desktop.json](configs/claude-desktop.json) |
| Cursor | [docs/setup/cursor.md](docs/setup/cursor.md) | [configs/cursor.json](configs/cursor.json) |
| VS Code | [docs/setup/vscode.md](docs/setup/vscode.md) | [configs/vscode.json](configs/vscode.json) |
| Codex | [docs/setup/codex.md](docs/setup/codex.md) | [configs/codex.toml](configs/codex.toml) |
| Any other MCP client | [docs/setup/other-clients.md](docs/setup/other-clients.md) | [configs/generic-stdio.json](configs/generic-stdio.json) |

Clients that connect to remote servers directly need only the URL and the header. For example, a client that reads an `mcpServers` file with environment variable expansion:

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

Clients that can only start local commands reach the server through the [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) bridge, which needs a current Node.js LTS release.

## Quick start

With the server connected, try a public tool. These need no key and cost nothing:

- "What are the five cheapest voice routes to Kenya on PacketExchange? Include the seller-stated ASR."
- "Give me a summary of the PacketExchange marketplace right now."

More in [docs/example-prompts.md](docs/example-prompts.md).

## Tools

| Group | Tools |
| --- | --- |
| Discover (public, free) | `wmmn_list_routes`, `wmmn_route_details`, `wmmn_market_summary` |
| Route | `wmmn_resolve_route`, `wmmn_purchase_route`, `wmmn_list_purchases` |
| Send (billed) | `wmmn_send_sms`, `wmmn_make_call`, `wmmn_get_call` (free) |
| Verify | `wmmn_send_voice_otp`, `wmmn_verify_start`, `wmmn_verify_check` |
| Account | `wmmn_get_balance`, `wmmn_list_transactions`, `wmmn_topup_x402` |
| Switch (Switch plan) | 18 `switch_*` tools for routing, customers, suppliers, rates, invoicing and fraud settings |

`wmmn_make_call` places the call asynchronously and can speak text, play audio and collect keypad digits once the call is answered. It waits a short time for the result; if the call is still running, `wmmn_get_call` reads its status, cost and gathered digits later.

The full reference, with parameters, required scopes and cost notes, is in [docs/tools.md](docs/tools.md).

## Authentication

Using account tools needs a PacketExchange account with prepaid credit: sign up at [packetexchange.io](https://packetexchange.io), add credit, and create an API key in the dashboard under **API keys**.

- The key is sent as an `Authorization: Bearer <key>` header, configured once in your MCP client. It is the only way the server accepts a key: no tool takes a key as an argument, so the key never passes through the model or into the conversation.
- The public tools (`wmmn_list_routes`, `wmmn_route_details`, `wmmn_market_summary`) work without a key. Any other tool called on a connection without one returns an error asking you to add the header.
- Use a dedicated key with only the scopes the agent needs. Read [docs/security.md](docs/security.md) before using account tools.

## Costs

Tools that spend money say so in their descriptions, so the agent knows before it calls them. Calls and messages are billed from your prepaid balance at the route price plus the platform fee (2% of the route rate, capped at $0.001 per call or message). See [pricing](https://packetexchange.io/pricing) for details.

## Good to know

- ASR and ACD figures on listings are stated by the seller, not measured by PacketExchange.
- `wmmn_send_sms` returns the send-time outcome (accepted, sent or failed). The delivery outcome, when the route returns a carrier receipt, is available from the REST API (`GET /comms/sms/{messageId}`) and the `sms.delivered` and `sms.failed` webhooks.
- Voice passcodes and spoken call actions can use English, Spanish, French, German, Portuguese and Hindi.
- Test keys (`wmmn_test_sk_...`) simulate calls and messages against test credit. They can read Switch data but cannot change it, and cannot make x402 top-ups: those requests are refused with `TEST_KEY_NOT_ALLOWED`.
- Use PacketExchange for transactional messages and calls to people who expect them, such as verification codes, alerts and appointment reminders.

## Links

- MCP server overview: [packetexchange.io/mcp](https://packetexchange.io/mcp)
- Developers: [packetexchange.io/developers](https://packetexchange.io/developers)
- API reference: [packetexchange.io/api-docs](https://packetexchange.io/api-docs)
- OpenAPI specification: [packetexchange-openapi](https://github.com/PacketExchangeIO/packetexchange-openapi)
- Support: [support@packetexchange.io](mailto:support@packetexchange.io)

## License

The documentation and configurations in this repository are released under the [MIT License](LICENSE).
