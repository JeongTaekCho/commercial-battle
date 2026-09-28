This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Local API (JSON Server)

```bash
pnpm install
pnpm dev:server
```

API 주소는 `http://localhost:4000`입니다. 프런트엔드는 별도 터미널에서 `pnpm dev`로 실행합니다.

데이터는 `server/db.json`에서 관리합니다. 시작용으로 빈 `stores` 배열만 있으며, 필요한 리소스와 필드는 직접 추가하면 됩니다.

- `GET /stores`: 목록 조회
- `GET /stores/:id`: 단건 조회
- `POST /stores`: 생성
- `PUT /stores/:id`, `PATCH /stores/:id`: 수정
- `DELETE /stores/:id`: 삭제

API로 변경한 데이터는 `server/db.json`에 저장됩니다. 프런트엔드 API 연결은 별도로 구현하면 됩니다.

[JSON Server 공식 문서](https://github.com/typicode/json-server)

## Frontend

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
