This is a demo Lyrebird clone

## TODOs

- Testing - unit, integration, visual
- Logging
- Monitoring

### Speech-to-text optimisations

e.g.

- Medical terms
- Diarisation

### Prompt optimisations

e.g.

- experiments and evaluations

### LLM optimisations

- combination of different sized models
- prompt caching
- hallucination checking
- better error handling - e.g. exponential backoff, retries to different providers

## Stack

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Development

First set the `OPENAI_API_KEY` environment variable. Then run the development server:

```bash
export OPENAI_API_KEY="sk-..."
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
