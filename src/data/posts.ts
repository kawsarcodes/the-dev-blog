export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
}

export const posts: BlogPost[] = [
  {
    id: "node-streams-for-big-data",
    title: "Stop Using fs.readFile for Big Files",
    description:
      "If you are loading entire files into memory in Node.js you are doing it wrong. A deep dive into Streams and Pipelines.",
    date: "20 March, 2026",
    tags: ["Node.js", "Performance"],
    content: `
I recently reviewed a PR that crashed our production server. The culprit was a simple file read operation.

\`\`\`javascript
// CRASH: Loads 2GB file into RAM
const data = fs.readFileSync('huge-log.csv');
parse(data);
\`\`\`

Node.js is single threaded. If you block the main thread or max out the heap your API dies. The solution is Streams.

### The Pipeline Pattern

Using stream.pipeline is the robust way to handle data flow. It handles backpressure so you do not overwhelm the consumer and handles error handling automatically.

\`\`\`javascript
import { pipeline } from 'node:stream/promises';
import fs from 'node:fs';
import zlib from 'node:zlib';

async function processFile() {
  await pipeline(
    fs.createReadStream('huge-log.csv'),
    zlib.createGzip(),
    fs.createWriteStream('huge-log.csv.gz')
  );
  console.log('Done and RAM usage stayed flat.');
}
\`\`\`

If you call yourself a Node developer you need to master Streams. They are the difference between a toy app and a scalable system.
    `,
  },
  {
    id: "react-compound-components",
    title: "Clean APIs with Compound Components",
    description:
      "Stop passing 20 props to your Modal component. Use the Compound Component pattern to separate concerns.",
    date: "18 March, 2026",
    tags: ["React", "Patterns"],
    content: `
We have all seen God Components. A Modal that takes props like hasFooter or footerButtonText or onFooterClick or hideCloseButton.

It is unreadable. The Compound Component pattern solves this by using Context to share state between related sub components.

### The Pattern

Instead of configuration props we use composition.

\`\`\`tsx
// Usage
<Modal>
  <Modal.Open>Open Window</Modal.Open>
  <Modal.Window>
    <Modal.Header>Title Here</Modal.Header>
    <Modal.Body>Content goes here...</Modal.Body>
  </Modal.Window>
</Modal>
\`\`\`

### Implementation

The trick is React Context.

\`\`\`tsx
const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = (name) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ close, open, openName }}>
      {children}
    </ModalContext.Provider>
  );
}
\`\`\`

This is just code. No libraries needed. Just pure React composition.
    `,
  },
  {
    id: "why-i-moved-back-to-monoliths",
    title: "Why I Moved Back to Monoliths",
    description:
      "Microservices were supposed to solve our scaling problems. Instead they doubled our infrastructure bill and made debugging a nightmare.",
    date: "15 March, 2026",
    tags: ["Architecture", "Node.js"],
    content: `
I spent the better part of 2024 decoupling a perfectly fine Node.js application into twelve different microservices. We had a service for authentication and a service for user profiles and a service for notifications.

It was a mistake.

We traded simple function calls for network latency. We replaced simple SQL joins with complex eventual consistency patterns.

Unless you are Netflix you do not have Netflix problems.

\`\`\`typescript
// The Monolith Way: Simple atomic transactional.
await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({ ... });
  await tx.email.sendWelcome(user.email);
});
\`\`\`

In a microservices architecture that simple transaction became a distributed saga involving message queues like RabbitMQ and retry logic and a dead letter exchange.

I am simpler now. I use a single repo and a single database and a nice fat server. It just works.
    `,
  },
  {
    id: "the-useEffect-hook-is-misunderstood",
    title: "You are using useEffect wrong",
    description:
      "Synchronizing with effects is the source of 90% of your React bugs. Let's talk about event handlers.",
    date: "12 March, 2026",
    tags: ["React", "Hooks"],
    content: `
Reviewing junior developers code I see the same pattern everywhere. Effect Chaining.

They change state A which triggers a useEffect to change state B which triggers another useEffect to fetch data C. It is a nightmare to debug because the data flow is invisible.

### Events over Effects

If a user clicks a button put the logic in the click handler. Do not set a state flag and wait for an effect to pick it up.

\`\`\`tsx
// BAD: Implicit data flow
function BadForm() {
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() => {
    if(submitted) {
      postData();
    }
  }, [submitted]);

  return <button onClick={() => setSubmitted(true)}>Submit</button>
}

// GOOD: Explicit action
function GoodForm() {
  const handleSubmit = () => {
    postData();
  };

  return <button onClick={handleSubmit}>Submit</button>
}
\`\`\`

useEffect is for synchronizing with external systems like a subscription or a manual DOM manipulation. It is not for managing your application flow.
    `,
  },
  {
    id: "optimizing-node-docker-images",
    title: "Trimming your Node.js Docker Image",
    description:
      "Your Docker image shouldn't be 1GB. Using Multi-stage builds and Alpine to ship faster.",
    date: "10 March, 2026",
    tags: ["Node.js", "DevOps"],
    content: `
I see Node.js images in production that include the entire src folder and the devDependencies and sometimes even secrets.

If you want fast CI/CD and lower costs you need Multi Stage Builds.

### The Pattern

*   Builder Stage: Install all dependencies and build TypeScript.
*   Runner Stage: Copy only the dist folder and node_modules.

\`\`\`dockerfile
# 1. Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2. Production Stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Only copy what we need
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

CMD ["node", "dist/index.js"]
\`\`\`

This usually reduces image size from 900MB to 80MB. No fluff. Just the runtime.
    `,
  },
  {
    id: "typescript-zod-validation",
    title: "Runtime Safety with Zod",
    description:
      "TypeScript only protects you at compile time. Zod protects you at runtime. Why you need both.",
    date: "8 March, 2026",
    tags: ["TypeScript", "Node.js"],
    content: `
We often lie to the TypeScript compiler. We define an interface for an API response and assume the API will return exactly that.

But APIs change. If the API returns a string instead of a number your app crashes at runtime even if it passed the type check.

### Enter Zod

I used to write complex if statements to check if data.user.email existed or if data.age was actually a number. It was brittle and hard to read.

I just ran \`npm install zod\` and my life got 10x easier.

Now I define a schema and if the data does not match the app throws an error immediately.

\`\`\`typescript
// It is this simple
const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  age: z.number().min(18)
});

const user = UserSchema.parse(input);
\`\`\`

Do not trust external data. Verify it.
    `,
  },
  {
    id: "react-suspense-data-fetching",
    title: "Suspense for Data Fetching",
    description:
      "Say goodbye to loading spinners and useEffect data fetching. Suspense is the future of async UI.",
    date: "5 March, 2026",
    tags: ["React", "Performance"],
    content: `
Handling loading states in React has historically been messy. We declare a loading boolean state and set it to true then fetch then set it to false.

React Suspense allows us to treat async data as if it were already available.

### The Mental Model

With Suspense we do not manually handle loading states inside the component. We let the parent handle the fallback.

\`\`\`tsx
// UserProfile.tsx
// Note: This is a Server Component in Next.js
export default async function UserProfile({ id }) {
  const user = await db.user.find(id);
  return <div>{user.name}</div>;
}

// Parent.tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <UserProfile id="123" />
    </Suspense>
  );
}
\`\`\`

This decouples the data fetching logic from the loading UI logic. It results in cleaner components that focus purely on rendering data.
    `,
  },
  {
    id: "postgres-indexing-strategies",
    title: "Postgres Indexing 101",
    description:
      "Your database is slow because you are missing indexes. How to analyze queries and fix performance.",
    date: "1 March, 2026",
    tags: ["Backend", "Database"],
    content: `
When an API endpoint takes 2 seconds to respond it is rarely Node.js fault. It is almost always the database performing a Sequential Scan.

A Sequential Scan means Postgres is reading every single row in the table to find your data.

### EXPLAIN ANALYZE

To fix this you must ask Postgres what it is doing.

\`\`\`sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
\`\`\`

If the result says Seq Scan you have a problem.

### Adding the Index

\`\`\`sql
CREATE INDEX idx_users_email ON users(email);
\`\`\`

Now run the query again. It should say Index Scan and take milliseconds instead of seconds. However be careful as too many indexes will slow down your INSERT operations. Balance is key.
    `,
  },
  {
    id: "nodejs-clustering-scaling",
    title: "Scaling Node.js with Clustering",
    description:
      "Node.js is single threaded by default. Here is how to utilize all CPU cores on your server.",
    date: "28 February, 2026",
    tags: ["Node.js", "Performance"],
    content: `
A common criticism of Node.js is that it cannot handle CPU intensive tasks because it runs on a single thread.

While true for a single process we can easily spawn a worker for every CPU core available on the server using the native cluster module.

### The Cluster Module

\`\`\`javascript
import cluster from 'node:cluster';
import os from 'node:os';
import http from 'node:http';

if (cluster.isPrimary) {
  const cpus = os.cpus().length;
  console.log(\`Forking for \${cpus} CPUs\`);
  
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World');
  }).listen(8000);
}
\`\`\`

In modern deployments we often rely on Kubernetes or PM2 to handle this for us but understanding how Node works under the hood is essential for debugging performance issues.
    `,
  },
  {
    id: "typescript-infer-keyword",
    title: "Mastering the infer Keyword",
    description:
      "Unlock the true power of TypeScript conditionals. How to unwrap types and create dynamic utilities.",
    date: "25 February, 2026",
    tags: ["TypeScript", "Advanced"],
    content: `
The infer keyword in TypeScript allows you to extract a type from within another type. It is useful when you want to get the return type of a function or the type of a Promise result.

### Basic Usage

Let us say we want to extract the return type of a function type.

\`\`\`typescript
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { id: 1, name: "John" };
}

// User is { id: number, name: string }
type User = MyReturnType<typeof getUser>;
\`\`\`

### Unwrapping Promises

We can also use it to unwrap async functions.

\`\`\`typescript
type Unpromisify<T> = T extends Promise<infer U> ? U : T;

type AsyncData = Promise<string[]>;
type Data = Unpromisify<AsyncData>; // string[]
\`\`\`

This is fundamental when building generic libraries or complex type helpers.
    `,
  },
  {
    id: "nextjs-middleware-auth",
    title: "Authentication at the Edge",
    description:
      "Using Next.js Middleware to protect routes before they even hit your server code.",
    date: "20 February, 2026",
    tags: ["Next.js", "Security"],
    content: `
Checking authentication inside every single page or API route is repetitive and error prone. If you forget one check you have a security vulnerability.

Next.js Middleware runs before the request is processed allowing us to centrally manage access.

### Middleware Implementation

Middleware runs on the Edge so we must use standard Web APIs.

\`\`\`typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
\`\`\`

This ensures that no request ever reaches your dashboard code unless the user has a token. It is a firewall for your application logic.
    `,
  },
  {
    id: "redis-caching-strategies",
    title: "Caching Strategies with Redis",
    description:
      "Cache-Aside vs Write-Through. How to speed up your Node.js API with Redis.",
    date: "15 February, 2026",
    tags: ["Backend", "Redis"],
    content: `
The fastest database query is the one you never make. Redis is an in-memory data store that can serve data in microseconds.

### The Cache Aside Pattern

This is the most common pattern.

1.  Check Redis for data.
2.  If found return it (Cache Hit).
3.  If not found query Database.
4.  Save Database result to Redis (Cache Miss).

\`\`\`javascript
async function getUser(id) {
  const cacheKey = \`user:\${id}\`;
  const cached = await redis.get(cacheKey);
  
  if (cached) return JSON.parse(cached);
  
  const user = await db.users.find(id);
  
  // Set with TTL (Time To Live) of 1 hour
  await redis.set(cacheKey, JSON.stringify(user), 'EX', 3600);
  
  return user;
}
\`\`\`

Just remember that caching adds complexity. You now have to worry about cache invalidation. There are only two hard things in Computer Science and this is one of them.
    `,
  },
  {
    id: "react-memoization-guide",
    title: "I broke my app with useMemo",
    description:
      "You probably use useMemo too much. Understanding referential equality and expensive calculations.",
    date: "10 February, 2026",
    tags: ["React", "Performance"],
    content: `
I built a Course Scheduler for a complex management system. I thought I was being smart by memoizing every button and list item.

The profiler showed that the overhead of checking dependency arrays actually took longer than just re-rendering the div.

### When to use it

Use useMemo only when:
1. The calculation is computationally expensive (filtering a list of 10000 items).
2. You need to preserve referential equality for a dependency array.

\`\`\`tsx
// UNNECESSARY
const fullName = useMemo(() => \`\${first} \${last}\`, [first, last]);

// NECESSARY (Referential Equality)
const options = useMemo(() => ({ color: 'red' }), []);

useEffect(() => {
  // If options wasn't memoized this would run on every render
  api.update(options);
}, [options]);
\`\`\`

I deleted about 50 lines of useMemo code from my project and the dashboard actually felt snappier. React is fast enough.
    `,
  },
  {
    id: "security-headers-nodejs",
    title: "Essential Security Headers",
    description:
      "Helmet.js is not optional. Protecting your Express and Next.js apps from XSS and clickjacking.",
    date: "5 February, 2026",
    tags: ["Node.js", "Security"],
    content: `
Security is often an afterthought but setting the correct HTTP headers is the easiest way to harden your application.

### Key Headers

*   **Content-Security-Policy (CSP):** Prevents XSS by restricting where scripts can load from.
*   **X-Frame-Options:** Prevents your site from being embedded in an iframe (Clickjacking).
*   **Strict-Transport-Security (HSTS):** Forces browsers to use HTTPS.

### Using Helmet in Express

\`\`\`javascript
import express from 'express';
import helmet from 'helmet';

const app = express();

// Sets all standard security headers automatically
app.use(helmet());

app.listen(3000);
\`\`\`

In Next.js you configure these in next.config.js. Do not ship to production without these headers.
    `,
  },
];
