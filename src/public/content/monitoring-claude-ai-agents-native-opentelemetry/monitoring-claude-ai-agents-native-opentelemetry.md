---
title: "Monitoring Claude AI Agents: Why Standard Tools Don't Work (And What Does)"
date: "2025-10-27"
slug: "monitoring-claude-ai-agents-native-opentelemetry"
excerpt: "Building an AI agent is exciting. Monitoring it in production without the right approach is terrifying. Here's what I learned after 7 days of debugging."
thumbnail: "/images/monitoring-claude-ai-agents-native-opentelemetry-thumbnail.webp"
categories: ["AI/LLM", "Observability", "Claude Code"]
---

# Monitoring Claude AI Agents: Why Standard Tools Don't Work (And What Does)

I built an AI agent using Anthropic's Claude Agent SDK. The agent worked beautifully - analyzing markdown documents, generating insights, reporting token usage and costs. But I had a problem: zero visibility into what was happening under the hood. How much were these requests really costing? Which operations were slowest? Were there errors I wasn't seeing?

I found what seemed like the perfect solution: Traceloop OpenLLMetry, the "industry standard" for LLM observability. I installed it, configured it with New Relic, and ran my agent. Then I waited. And waited. The New Relic dashboard remained empty. After three days of debugging network settings, API keys, and configurations - all of which were correct - I discovered the real problem. Traceloop couldn't work with Claude Agent SDK. Not because of a bug, but because of fundamental architecture.

## Understanding Claude Agent SDK's Architecture

Here's what most developers miss about Claude Agent SDK: **it's not a simple wrapper around the Anthropic API**. It doesn't make direct HTTP calls to `api.anthropic.com` like the standard `@anthropic-ai/sdk` package does.

Instead, Claude Agent SDK uses a completely different architecture:

```
Your Application
  ↓ (imports SDK)
@anthropic-ai/claude-agent-sdk
  ↓ (IPC/WebSocket)
Claude Code CLI (local process)
  ↓ (HTTPS)
Anthropic API (api.anthropic.com)
```

The SDK communicates with a locally running Claude Code CLI process, which acts as a proxy. The CLI handles authentication, manages session state, controls permissions, and makes the actual API calls.

**Why this architecture?** It makes sense when you think about it:

- **Centralized credentials**: Your API key lives in the CLI, not scattered across projects
- **Session management**: The CLI maintains conversation history
- **Tool integration**: The CLI has system access for file operations and bash commands
- **Permission control**: The CLI can prompt users before executing sensitive operations
- **Privacy**: All logging happens locally by default

But this architecture has a critical implication for observability: **traditional HTTP monitoring tools are blind to the SDK→CLI communication layer**.

## The Traceloop Approach (And Why It Failed)

Traceloop OpenLLMetry is genuinely excellent for monitoring LLM applications. It supports all major providers including Anthropic, automatically instruments HTTP traffic, and sends telemetry data via OpenTelemetry Protocol (OTLP). The documentation clearly states "supports Anthropic."

So I installed it:

```typescript
import * as traceloop from '@traceloop/node-server-sdk';

traceloop.initialize({
  appName: 'markdown-analyzer-agent',
  disableBatch: true,
});
```

I configured the environment variables for New Relic:

```bash
TRACELOOP_BASE_URL=https://otlp.nr-data.net:443
TRACELOOP_HEADERS="api-key=NRAK-..."
```

The code compiled. The application ran. No errors appeared in the logs. But New Relic showed absolutely nothing.

**The root cause**: Traceloop's auto-instrumentation works by intercepting HTTP requests. It has specific support for `@anthropic-ai/sdk` because that package makes direct HTTP calls to the Anthropic API. But Claude Agent SDK doesn't make HTTP calls - it uses IPC (Inter-Process Communication) or WebSocket to talk to the CLI. Traceloop never sees this communication, so it has nothing to instrument.

Think of it like trying to monitor a phone call by watching the mail. You're looking at the wrong communication channel entirely.

After three days of debugging configuration files, testing network connectivity, and questioning my sanity, I finally understood: this wasn't a configuration problem. Traceloop physically couldn't work with this architecture. I needed a different approach.

## The Solution: Native OpenTelemetry in Claude Code

Here's where the story gets better. While researching alternatives, I discovered something I'd completely missed in the Claude Code documentation: **the CLI has built-in OpenTelemetry support**.

This changes everything. Instead of trying to instrument at the application level (which can't see the CLI), or at the HTTP level (which happens too late), we instrument at the CLI level - exactly where all the action happens.

The best part? **Zero code changes**. My application code stayed completely identical:

```typescript
import { query } from '@anthropic-ai/claude-agent-sdk';

const result = query({
  prompt: userPrompt,
  options: {
    systemPrompt,
    permissionMode: 'bypassPermissions',
  }
});
```

All the magic happens through environment variables. I created a `.env.claude-code` file:

```bash
# Enable telemetry
export CLAUDE_CODE_ENABLE_TELEMETRY=1

# Configure exporters
export OTEL_METRICS_EXPORTER=otlp
export OTEL_LOGS_EXPORTER=otlp

# Protocol
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf

# New Relic endpoint (EU region)
export OTEL_EXPORTER_OTLP_ENDPOINT=https://otlp.eu01.nr-data.net:443

# Authentication
export OTEL_EXPORTER_OTLP_HEADERS="api-key=eu01xx...NRAL"

# Faster export intervals for testing (10s instead of 60s)
export OTEL_METRIC_EXPORT_INTERVAL=10000

# Service identification
export OTEL_RESOURCE_ATTRIBUTES="service.name=markdown-analyzer-agent,environment=development"
```

Then I just sourced the file and ran the application:

```bash
source .env.claude-code
npm start
```

Within 10 seconds, data started appearing in New Relic. Traces. Metrics. Logs. Everything.

## What Gets Monitored Automatically

The Claude Code CLI tracks comprehensive telemetry without any application-level instrumentation:

**Token Usage Metrics:**
- Input tokens per request
- Output tokens per request (remember, output tokens are 5x more expensive!)
- Total token counts over time

**Cost Tracking:**
- Per-request costs in USD
- Cumulative costs
- Cost trends over time

For context, Claude Sonnet 4.5 pricing is $0.003 per 1K input tokens and $0.015 per 1K output tokens. My typical markdown analysis request uses about 1,200 input tokens and 280 output tokens, costing approximately $0.0045 per request. Without monitoring, you wouldn't know if a code change accidentally tripled your token usage.

**Performance Metrics:**
- Request latency (start to finish)
- Active processing time
- Time-to-first-token for streaming responses

**Operational Events:**
- Every API request with timestamp and model
- API errors with full error messages
- Tool executions (when the agent uses tools like file reading)
- Session tracking

**Automatic Attributes:**
- Session ID (for correlating related requests)
- Model name (e.g., "claude-sonnet-4-5")
- Organization ID
- Service name and environment (from your config)

### Privacy by Default

Importantly, **prompt and response content are NOT sent by default**. The telemetry includes prompt *length* but not the actual text. This is crucial for production systems handling sensitive data.

You can optionally enable prompt logging for development:

```bash
export OTEL_LOG_USER_PROMPTS=1
```

But in production with sensitive data, leave this disabled. Token counts and costs are always safe to track.

## Practical Value: Cost Analysis and Dashboards

Once data flows into New Relic, you can build powerful analytics using NRQL (New Relic Query Language).

**Daily cost tracking:**

```sql
SELECT
  sum(claude_code.cost.usage) as 'Total Cost',
  average(claude_code.cost.usage) as 'Avg per Request',
  count(*) as 'Total Requests'
FROM Metric
WHERE service.name = 'markdown-analyzer-agent'
FACET dateOf(timestamp)
SINCE 30 days ago
```

This single query gives you a complete cost picture: total spend, efficiency per request, and volume trends.

**Token usage trends:**

```sql
SELECT
  sum(claude_code.token.usage) as 'Total Tokens'
FROM Metric
WHERE service.name = 'markdown-analyzer-agent'
FACET type
TIMESERIES AUTO
SINCE 7 days ago
```

Visualized as a line chart, this shows input vs output token trends over time, helping identify optimization opportunities.

**Performance SLAs:**

```sql
SELECT
  average(duration.ms) as 'Avg Response Time',
  percentile(duration.ms, 95) as 'P95',
  percentile(duration.ms, 99) as 'P99'
FROM Span
WHERE service.name = 'markdown-analyzer-agent'
SINCE 1 hour ago
```

Now you can set realistic SLAs based on actual data: "P95 latency under 5 seconds" instead of vague "AI is sometimes slow."

**Automated alerts** become possible too:
- Alert when hourly cost exceeds $5 (prevents accidental spam)
- Page when P95 latency exceeds 5 seconds for 5 minutes (user experience degradation)
- Create tickets when error rate exceeds 5% (API issues or rate limits)

## The Business Case for Monitoring

Let's talk ROI. Observability tools cost money (New Relic free tier covers 100 GB/month, paid starts around $25/month). Is it worth it?

Consider this scenario: Your AI feature handles 1,000 requests per day. Without monitoring, you don't know which operations are most expensive. With monitoring, you discover that 20% of requests use 80% of tokens because they're processing unnecessarily large inputs.

You optimize those expensive operations. Token usage drops 40% across the board.

- Original monthly cost: $135 (1,000 requests/day × $0.0045 × 30 days)
- After optimization: $81 (40% reduction)
- **Monthly savings: $54**

If your monitoring costs $25/month, you're net positive $29/month - and that's just from one optimization. Plus you gain:

- Predictable costs (no surprise bills)
- Performance baseline (set realistic SLAs)
- Quality tracking (detect regressions)
- Error visibility (fix issues proactively)

The question isn't whether you can afford to monitor. It's whether you can afford not to.

## Key Lessons Learned

After seven days of debugging and discovery, here's what I wish I'd known from the start:

**1. Architecture determines monitoring strategy**

Before choosing observability tools, draw a diagram of your actual data flow. Understand where requests cross boundaries. Traditional HTTP monitoring only works if your code makes HTTP requests. Claude Agent SDK's CLI proxy architecture requires a different approach.

**2. Prefer vendor-native solutions when available**

If Claude Code has built-in OpenTelemetry support, use it. Third-party solutions might not support edge cases or architectural quirks. Vendors have strong incentives to make their native tools work reliably. Plus, native solutions often have zero code overhead.

**3. Test assumptions early**

I spent time configuring Traceloop and writing extensive documentation before actually verifying it worked. A 5-minute spike test would have revealed the architecture incompatibility immediately. Working code beats perfect documentation.

**4. OpenTelemetry is genuinely vendor-neutral**

Because this solution uses standard OTLP, switching from New Relic to Datadog or Grafana would require changing only the endpoint URL. No code changes. No vendor lock-in. This is OpenTelemetry's actual superpower.

## Getting Started

The full working example is available as an open-source project with comprehensive documentation, including:

- Complete source code for the markdown analyzer agent
- Step-by-step setup guide (5 minutes to working observability)
- New Relic dashboard templates
- NRQL query examples for common use cases
- Troubleshooting guide

You can use this as a template for any Claude Agent SDK project - just change the service name and adapt the agent logic for your use case.

## Conclusion

Standard LLM observability tools like Traceloop are excellent for most use cases, but Claude Agent SDK's unique architecture requires a different approach. The good news: Claude Code's native OpenTelemetry support provides comprehensive monitoring with zero code changes and zero dependencies.

The key insights:
- Understand your architecture before choosing monitoring tools
- Native vendor solutions often beat third-party alternatives
- OpenTelemetry provides true vendor neutrality
- Cost tracking isn't optional for production AI systems

If you're building with Claude Agent SDK, you now have a proven path to production-ready observability. Try it yourself, and let me know what you discover.
