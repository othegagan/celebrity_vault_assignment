# Celebrity Vault

Simple celebrity system that allows you to view, edit, and delete celebrities. It uses the following technologies:

-   React & Next.js 14
-   Tailwind CSS : For styling
-   TypeScript
-   Shadcn UI : For UI components
-   Zod : For form validation
-   React Hook Form : For form validation
-   TanStack Query: For data fetching and caching

## Key Features 🔥

-   💫 View, edit, and delete celebrities
-   🔍 Search for celebrities by name
-   🌓 Adaptive Light and Dark Modes
-   📱Mobile responsiveness

## Getting Started

To get started, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/othegagan/celebrity_vault_assignment.git
```

2. Install dependencies:

```bash
npm install   or  pnpm install
```

3. Start the development server:

```bash
npm run dev   or  pnpm dev
```

4. Go to mongodb atlas and create a new cluster and database.
   Copy the URI and paste it in the .env.local file.
   An example URI is given below:

    ```bash
    MONGODB_URI="mongodb+srv://<username>:<password>@<collection>.yjq3oco.mongodb.net/celebrity_vault?retryWrites=true&w=majority"

    ```

5. Open your browser and navigate to `http://localhost:3000`.

6. Additionally, Added few endpoints to the API:

-   POST `/api/celebrities`
-   GET `/api/celebrities`
-   DELETE `/api/celebrities?celebrityId=1`
-   PUT `/api/celebrities`

<hr/>
<div align="center">
    <h5 align="center">💫  Developed with ❤️ by <a href="https://thegagan-portfolio.vercel.app/">Gagan Kumar</a>  </h5>
    <p align="center"> Don't be shy to contact 📫 <a href="mailto:example@gmail.com">hellothegagan@gmail.com</a>
 <br>
     🤙 <a herf="tel:+919036644552">+919036644552 </a>
</div>
