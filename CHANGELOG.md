# Changelog

All notable changes to this repository are recorded here.

## [1.1.0] - 2026-09-23

### Added

- The Streamable HTTP endpoint, `https://packetexchange.io/mcp/http`, now the recommended way to connect. It is stateless, so there is no session to keep or lose.
- Setup guides and configurations for Claude Code and Codex.
- `wmmn_get_call`, and call actions on `wmmn_make_call` (`say`, `play`, `gather`, `pause`, `hangup`), in the tools reference.

### Changed

- Authentication is by `Authorization: Bearer <API key>` header only. Tools no longer take an `api_key` argument, so the key never passes through the model. Every configuration sends the header, reading the key from an environment variable or the client's secret store where the client supports it.
- `wmmn_make_call` places the call asynchronously and waits up to `wait_seconds` for the result, instead of holding the request for the whole call.
- The Claude Desktop, Cursor, VS Code and generic configurations use the Streamable HTTP endpoint. The SSE endpoint, `https://packetexchange.io/mcp/sse`, is documented as legacy.
- The tools reference covers 33 tools and matches the server's current parameters.

## [1.0.0] - 2026-09-23

### Added

- Documentation for the hosted PacketExchange MCP server and its 32 tools.
- Setup guides and configurations for Claude Desktop, Cursor, VS Code and other MCP clients.
- Security guidance and example prompts.
- Continuous integration that lints the Markdown and validates the configurations against JSON schemas.

[1.1.0]: https://github.com/PacketExchangeIO/packetexchange-mcp/releases/tag/v1.1.0
[1.0.0]: https://github.com/PacketExchangeIO/packetexchange-mcp/releases/tag/v1.0.0
