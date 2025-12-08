# Vision Vault Developer Documentation

## Prerequisites

- Node.js (v18 or later)
- Docker and Docker Compose
- npm, Yarn, or Bun package manager
- Git

## Initial Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd Vision-Vault
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your specific configuration values.

4. Start the MySQL database:

   ```bash
   docker-compose up -d
   ```

5. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

## Development Workflow

1. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

   This will start the Next.js development server with Turbopack enabled.

2. The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio for database management

## Project Structure

- `src/` - Main source code
- `prisma/` - Database schema and migrations
- `public/` - Static assets
- `components/` - Reusable UI components
- `.next/` - Next.js build output (do not edit)

## Database Management

The project uses MySQL with Prisma as the ORM. The database runs in a Docker container.

To access the database:

- Host: localhost
- Port: 5432
- Database: exampledb
- Username: exampleuser
- Password: examplepass

To view and manage the database, you can use Prisma Studio:

```bash
npx prisma studio
```

## Environment Variables

Required environment variables are defined in `.env.example`. Make sure to set up all required variables in your `.env` file before starting the application.

### Setting up Third-Party Services

#### Clerk Authentication

1. Go to [Clerk Dashboard](https://dashboard.clerk.dev/)
2. Create a new application
3. In the API Keys section, you'll find:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
4. Copy these values to your `.env` file

#### Umami Analytics

1. Go to [Umami Cloud](https://umami.is/) or set up a self-hosted instance
2. Create a new website in your Umami dashboard
3. You'll receive:
   - `NEXT_PUBLIC_UMAMI_WEBSITE_ID`
   - `NEXT_PUBLIC_UMAMI_SCRIPT_URL`
4. Add these values to your `.env` file

## Contributing

1. Create a new branch for your feature/fix
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## Troubleshooting

- If you encounter database connection issues, ensure the Docker container is running
- For Prisma-related issues, try running `npx prisma generate`
- Clear `.next` directory and node_modules if you encounter build issues

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
