# Security guidance

An agent connected to PacketExchange can spend your balance, send messages and place calls. Set it up the way you would set up any other integration that can move money.

## How the key reaches the server

- Connecting to the server needs no credentials, and the three public tools (`wmmn_list_routes`, `wmmn_route_details`, `wmmn_market_summary`) never need a key.
- Every other tool has a required `api_key` argument, and that argument is the only place the server reads a key from. It does not accept a key in a connection header, an environment variable or the client configuration.
- A key given to a tool as an argument is visible to the model and is saved in your client's conversation history, together with everything the tool returns.

Treat any key you use with account tools as exposed to the conversation, and choose the key accordingly.

## Recommendations

1. **Start with the public tools.** Searching routes and reading market data needs no key at all.
2. **Create a dedicated key for agent use.** In the dashboard under **API keys**, create a key used for nothing else, so you can revoke it without affecting other integrations.
3. **Give it only the scopes it needs.** Scopes can be narrowed later but never broadened. Examples:

   | Use | Scopes |
   | --- | --- |
   | Look up your purchased routes and balance | `routes:read`, `account:read` |
   | Phone verification | `verify:write` |
   | Send SMS | `sms:send` |
   | Place calls or read passcodes by voice | `voice:send` |

   Avoid full-access keys (keys created without scopes). `wmmn_list_purchases` needs one, so leave it out unless you need it.
4. **Set an expiry.** Give the key an expiry date when you create it, and revoke it when you are done.
5. **Limit what it can spend.** Test with a small amount of credit. Keep the balance on the account the agent uses no higher than you are willing to lose.
6. **Never paste your main API key into a chat.** Do not put keys in prompts, shared conversations, screenshots, issues or configuration files that are committed to version control.
7. **Review before anything is sent.** Configure your client to ask for approval before it calls tools that spend money or change state. Their descriptions start by saying so.
8. **Watch for credentials in results.** `wmmn_purchase_route` and `wmmn_list_purchases` return SIP passwords, and `switch_create_customer` returns a new API key. These also end up in the conversation history.

## If a key is exposed

1. Revoke it in the dashboard under **API keys**. Revocation takes effect straight away.
2. Check recent activity with the dashboard's API usage and transaction views.
3. Create a new key with the scopes you need.
4. If you see activity you did not make, email [support@packetexchange.io](mailto:support@packetexchange.io) with the key's label and the time range.

## Sending responsibly

Use PacketExchange only for messages and calls the recipient expects: verification codes, account alerts, appointment reminders and similar transactional traffic to people who have agreed to receive it. Check an agent's plan before it sends to more than one number.

## Reporting a vulnerability

See [SECURITY.md](../SECURITY.md).
