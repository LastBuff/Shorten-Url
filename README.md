# Smart URL Shortener

A high-performance, lightweight URL shortener built with **Next.js (App Router)** and **TypeScript**, featuring **Bijective Base62 Encoding** and an in-memory **Sliding Window Rate Limiter**.

---

## Key Features

* **Bijective Base62 Encoding:** Converts numeric auto-increment IDs into unique 6-character short codes (`0-9`, `a-z`, `A-Z`) without collisions.
* **Sliding Window Rate Limiting:** Enforces IP-based request throttling (5 requests/minute) to mitigate spam and DoS attacks.
* **Low-Latency Redirection:** Dynamic HTTP 302 redirection routes mapping short codes directly to target destinations.
* **Type-Safe Full-Stack:** Strict TypeScript schema and native Web APIs without heavy external runtime dependencies.

---

## Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Runtime/Core Logic:** Node.js native Data Structures (`Map`, `BigInt`)

---

## System Architecture & Algorithm

### Base62 Encoding Mechanism
Instead of generating random strings that require database collision lookups, the system computes short codes deterministically using Base62 conversion:
$$\text{ID} \rightarrow \text{Base62 String}$$
* Base Alphabet: `0-9a-zA-Z` (Length 62)
* Guarantees unique mapping and predictable short URL length.

### Rate Limiter Flow
Tracks request timestamps per IP address within a configurable sliding window:
1. Filters out timestamps older than the window frame (60 seconds).
2. If remaining active timestamps $\ge$ limit, returns `429 Too Many Requests`.
3. Appends current timestamp and processes request if within limits.

---

## Getting Started

### Prerequisites
* Node.js 18.17+ or later
* npm / yarn / pnpm

### Installation & Run

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/LastBuff/Shorten-Url.git
   cd Shorten-Url
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.