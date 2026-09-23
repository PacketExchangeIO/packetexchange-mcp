# Example prompts

Prompts that work well once the server is connected. Phone numbers below use the UK range reserved for drama and testing (`+44 7700 900xxx`); replace them with numbers you are allowed to contact.

## Explore the marketplace

These use public tools only. They need no key and cost nothing.

- "What are the five cheapest voice routes to Kenya on PacketExchange? Show the price per minute, caller ID type and seller-stated ASR."
- "Compare full CLI and no-CLI voice routes to Nigeria. What is the price difference?"
- "Give me a summary of the PacketExchange marketplace right now."
- "Show me the full details of the cheapest direct voice route to the United Kingdom, including its billing increment and Exchange Score."

## Plan before you spend

- "Using PacketExchange, which of my purchased routes would Smart Routing choose for +447700900123 with the cheapest strategy? Don't place any calls."
- "What is my PacketExchange balance, and what were my last ten transactions?"

## Verify a phone number

- "Start an SMS verification for +447700900123 with the brand name Acme. I'll tell you the code the user types."
- "The user entered 482913. Check it against that verification and tell me whether it was approved."
- "Start a voice verification for +447700900123 in Spanish."

## Send transactional messages

- "Send an SMS to +447700900123 from Acme saying: Your table for two at 7pm tonight is confirmed. Reply to this number to change it. Tell me the cost and segment count first."
- "Call +447700900123 from +447700900456 with a 60-second limit and tell me how the call ended and what it cost."

For anything that spends money, ask the agent to show you the destination, the route and the expected cost before it sends.

## Run a Switch

These need an active Switch plan and a key with the `switch:manage` scope.

- "Preview how +447700900123 would route on my Switch and show the supplier failover order."
- "Show my Switch revenue, cost and margin for the last 30 days, then break it down by supplier."
- "List my open and overdue invoices and the accounts-receivable aging buckets."
- "Show recent fraud events and summarise the most common reasons."

## Tips

- Name PacketExchange in the prompt when several MCP servers are connected, so the agent picks the right tools.
- Ask for amounts in US dollars with the unit ("per minute", "per message") to avoid ambiguity.
- ASR and ACD on listings are stated by the seller. Ask the agent to label them that way when it compares routes.
