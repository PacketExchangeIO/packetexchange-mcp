# Contributing

Thanks for helping improve the PacketExchange MCP documentation.

## Reporting a problem

[Open an issue](https://github.com/PacketExchangeIO/packetexchange-mcp/issues/new/choose) if a configuration does not work with your client, or if the documentation does not match what a tool does. Include the client and its version, and the error message. Please remove API keys, phone numbers and other personal data first.

To report a security vulnerability, follow [SECURITY.md](SECURITY.md) instead.

## Pull requests

Pull requests are welcome, particularly setup guides for more clients. Please:

- keep configurations free of credentials; the checks reject anything that looks like an API key;
- add a new configuration file to `configs/` together with a JSON schema in `schemas/` (or, for a TOML file, its expected lines), and register it in `scripts/validate.mjs`;
- describe tools exactly as the server declares them, and mark anything that spends money;
- use transactional, consented messaging in examples.

Before opening a pull request, run:

```sh
npm install
npm test
```

This lints every Markdown file with markdownlint and validates each file in `configs/` against its schema. It needs Node.js 22 or later.

## Code of conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). By taking part, you agree to follow it.
