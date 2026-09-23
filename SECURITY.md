# Security Policy

## Reporting a vulnerability

Please report security vulnerabilities privately by email to **[security@packetexchange.io](mailto:security@packetexchange.io)**. Do not open a public issue, pull request or discussion for a suspected vulnerability.

Include as much of the following as you can:

- a description of the issue and its impact;
- the tool, configuration or document involved;
- steps to reproduce, or a proof of concept;
- any suggested fix.

We aim to acknowledge reports promptly and will keep you informed while we investigate. Please give us a reasonable opportunity to fix the issue before disclosing it publicly.

## Scope

This repository contains documentation and client configurations. Vulnerabilities in the hosted MCP server at `https://packetexchange.io/mcp/http`, or in the PacketExchange platform and API, should be reported to the same address.

Never include a live API key, webhook secret or customer data in a report. If a credential has been exposed, revoke it in the PacketExchange dashboard straight away; see [docs/security.md](docs/security.md#if-a-key-is-exposed).
