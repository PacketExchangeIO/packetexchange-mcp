# Tools reference

The hosted server exposes 32 tools. Each one calls the public PacketExchange REST API, so the same scopes, limits and billing apply as for any other API caller. Parameter names below are exactly as the server declares them.

**Access** shows what a tool needs:

- **Public:** no key.
- **A scope, such as `sms:send`:** the API key in the `api_key` argument, with that scope if the key is scoped. Keys without scopes have full access.
- **Full-access key:** scoped keys are refused.

Every tool except the three public ones takes a required `api_key` argument. It is left out of the parameter lists below. Read [security.md](security.md) before using it.

Amounts are US dollars. The platform fee is 2% of the route rate, capped at $0.001 per call or message.

## Discover

| Tool | What it does | Key parameters | Access | Cost |
| --- | --- | --- | --- | --- |
| `wmmn_list_routes` | Searches live voice and SMS routes on the marketplace. | `country`, `type` (`voice`, `sms`), `max_price`, `min_asr`, `cli_type` (`full_cli`, `partial_cli`, `ncli`), `search`, `sort`, `limit` (1-100, default 25) | Public | Free |
| `wmmn_route_details` | Full details for one route: pricing, billing increment, seller-stated ASR, ACD and PDD, caller ID handling, capacity, Exchange Score and seller trust profile. | `route_id` | Public | Free |
| `wmmn_market_summary` | Marketplace totals and averages, with 24-hour activity by traffic type. | None | Public | Free |

ASR, ACD and PDD figures on listings are stated by the seller, not measured by PacketExchange.

## Route

| Tool | What it does | Key parameters | Access | Cost |
| --- | --- | --- | --- | --- |
| `wmmn_resolve_route` | Previews which of your purchased routes Smart Routing would pick for a number, with alternatives. Places nothing. | `to` (E.164), `type` (`voice`, `sms`), `strategy` (`cheapest`, `balanced`, `best_quality`) | `routes:read` | Free |
| `wmmn_purchase_route` | Connects a marketplace route to your account and returns its SIP credentials. | `route_id` | `purchases:write` | No upfront charge. Traffic you then send over the route is billed per minute or message. |
| `wmmn_list_purchases` | Lists the routes you have connected, with status, pricing and SIP credentials. | None | Full-access key | Free |

`wmmn_purchase_route` and `wmmn_list_purchases` return SIP usernames and passwords. Those credentials become part of the conversation; see [security.md](security.md).

## Send

| Tool | What it does | Key parameters | Access | Cost |
| --- | --- | --- | --- | --- |
| `wmmn_send_sms` | Sends one SMS over your purchased routes. Returns the message id, segment count and cost. | `to` (E.164), `from` (sender ID or number), `message` (up to 1,600 characters), `route_id` (omit for Smart Routing), `strategy` | `sms:send` | Route price per segment plus the platform fee. |
| `wmmn_make_call` | Places one outbound call and waits until it ends. Returns the status, duration, hangup cause and cost. | `to` (E.164), `from` (caller ID, E.164), `route_id`, `strategy`, `max_duration` (10-3600 seconds, default 300) | `voice:send` | Route price per minute plus the platform fee. The worst-case cost of `max_duration` is reserved up front and the unused part released when the call ends. |

SMS status is the send-time outcome (accepted, sent or failed). Handset delivery receipts are not provided.

## Verify

| Tool | What it does | Key parameters | Access | Cost |
| --- | --- | --- | --- | --- |
| `wmmn_verify_start` | Starts a phone verification: generates a code, stores only a keyed hash of it, and sends it by SMS or by a call that reads it out. Returns a `verificationId`, never the code. | `to` (E.164), `channel` (`sms`, `voice`), `length` (4-10, default 6), `language`, `brand`, `expiry_seconds` (60-3600, default 600), `from`, `strategy` | `verify:write` | Billed as the SMS or call that carries the code. |
| `wmmn_verify_check` | Checks the code the user entered. Returns `approved`, `denied`, `expired` or `max_attempts`, and the attempts remaining. | `verification_id`, `code` | `verify:write` | Free |
| `wmmn_send_voice_otp` | Calls a number and reads a passcode digit by digit, then hangs up. You check the code yourself. Returns as soon as the call is dialled. | `to` (E.164), `code` (4-10 digits, or omit to generate one), `length`, `language`, `repeat` (1-3, default 2), `from`, `brand`, `return_code`, `strategy` | `voice:send` | Route price per minute plus the platform fee. |

Voice languages are `en`, `es`, `fr`, `de`, `pt` and `hi`. For SMS verification, `ar` is also available.

A verification allows five check attempts and can be approved once. Verification codes and voice passcodes share these limits: five codes per number per hour, 30 seconds between codes to the same number, a daily cap per account, and an hourly cap per number range. Embargoed destinations, premium-rate, satellite and high-risk ranges, and numbers on your do-not-contact list are refused.

## Account

| Tool | What it does | Key parameters | Access | Cost |
| --- | --- | --- | --- | --- |
| `wmmn_get_balance` | Current balance and test credit. Only the balance pays for live calls and messages. | None | `account:read` | Free |
| `wmmn_list_transactions` | Recent billing transactions. Charges are negative, credits positive. | `limit` (default 20) | `account:read` | Free |
| `wmmn_topup_x402` | Adds funds to your balance in USDC on Base using the x402 protocol, in two steps. The first call returns the payment requirements. The second call, with your signed authorization in `payment_header`, settles the transfer on-chain and credits your balance. | `amount_usd` (5 to 50,000), `payment_header` (second call only) | `billing:write` | The first call is free. The second call transfers USDC from your wallet. |

Top-ups can require identity verification and are subject to account limits.

## Switch

These tools manage a PacketExchange Switch: your own customers, suppliers, routing, rates and invoicing. They need an account with an active Switch plan or trial, and a key with the `switch:manage` scope (or a full-access key). Tools that change state say so in their descriptions.

| Tool | What it does | Key parameters | Changes state |
| --- | --- | --- | --- |
| `switch_preview_routing` | Shows how a dialled number would route: the matched dialplan rule, block decision, translated number, outbound caller ID and the ordered supplier failover chain with prices. | `to`, `cli`, `type`, `sub_account_id` | No |
| `switch_analytics_overview` | Revenue, cost, margin, calls, minutes, ASR, ACD, SMS count and average PDD for a date range. | `from`, `to` (ISO dates, default the last 30 days) | No |
| `switch_analytics_breakdown` | The top 100 rows of the same metrics, grouped by customer, supplier or destination. | `by` (`customer`, `supplier`, `destination`), `from`, `to` | No |
| `switch_list_customers` | Lists your customers with balance, credit limit, markup, margin floor, spend caps, concurrency and status. | None | No |
| `switch_create_customer` | Creates a customer and its first API key, returned once. | `label`, `source`, `externalRef`, `creditLimit`, `markupPct`, `currency`, `minMarginPct`, `marginFloorAction`, `dailySpendCap`, `maxConcurrentCalls`, `portalEmail` | Yes |
| `switch_list_suppliers` | Lists your supplier trunks with SIP settings, default rate, capacity, CPS, settlement mode and status. | None | No |
| `switch_create_supplier` | Creates a supplier trunk. | `label`, `sipHost`, `sipPort`, `transport`, `techPrefix`, `sipAuthUsername`, `sipAuthPassword`, `supportedCodecs`, `defaultRatePerUnit`, `billingIncrement`, `currency`, `capacity`, `maxCps`, `status`, `settlementMode`, `balance`, `portalEmail` | Yes |
| `switch_set_route_plan_entries` | Replaces every entry of a route plan with an ordered list of targets, each with a prefix, priority, weight and optional ASR and PDD gates. | `id`, `entries` (up to 200) | Yes |
| `switch_assign_customer_routing` | Assigns a dialplan, route plan or routing strategy to a customer. | `id`, `dialplanId`, `routePlanId`, `strategyOverride` | Yes |
| `switch_bulk_upsert_supplier_rates` | Loads or refreshes a supplier's cost deck. | `id`, `rows` (`prefix`, `rate`; up to 50,000) | Yes |
| `switch_bulk_upsert_sell_rates` | Loads or refreshes your sell deck, the prices your customers pay. | `rows` (`prefix`, `rate`; up to 50,000) | Yes |
| `switch_create_invoice` | Creates an invoice for a customer from usage in a period. | `customerId`, `periodStart`, `periodEnd`, `notes` | Yes |
| `switch_list_invoices` | Lists invoices, with filters and an overdue flag. | `customerId`, `status`, `limit`, `offset` | No |
| `switch_ar_aging` | Total outstanding and the current, 1-30, 31-60, 61-90 and 90+ day buckets. | None | No |
| `switch_create_payable` | Creates a payable for a supplier from cost in a period. | `vendorTrunkId`, `periodStart`, `periodEnd`, `notes` | Yes |
| `switch_run_netting` | Offsets what a counterparty owes you against what you owe them for a period, and returns the net amount and direction. | `id`, `periodStart`, `periodEnd`, `notes` | Yes |
| `switch_fraud_events` | Lists recent fraud events with score, action, destination and reasons. | None | No |
| `switch_update_fraud_settings` | Turns fraud screening on or off and sets the flag and block thresholds and high-risk prefixes. | `fraudEnabled`, `fraudBlockScore`, `fraudAlertScore`, `highRiskPrefixes` | Yes |

`switch_create_customer` returns a new API key and SIP password, and `switch_create_supplier` takes a supplier's SIP password as input. Both place credentials in the conversation.

## Test keys

Keys that start with `wmmn_test_sk_` simulate calls and messages against test credit instead of the balance, with no real delivery. Test credit is only available on accounts it has been granted to; check with `wmmn_get_balance`.
