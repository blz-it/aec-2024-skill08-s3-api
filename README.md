# AEC 2024 Skill08 S3 API

## Development

```sh
docker compose -f docker-compose.dev.yml up
pnpm install
pnpm start:dev
```

## Production

Note: Image needs to be public or `docker login ghcr.io`.

```sh
docker compose -f docker-compose.prod.yml up
```
