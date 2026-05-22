import { db } from "./index";
import { posts, profiles, users } from "./schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Create a test user
  const [user] = await db
    .insert(users)
    .values({
      name: "John Doe",
      email: "john@example.com",
      emailVerified: true,
      image: "https://avatars.githubusercontent.com/u/1?v=4",
    })
    .returning();

  console.log("✅ Created user:", user.name);

  // Create profile
  const [profile] = await db
    .insert(profiles)
    .values({
      userId: user.id,
      bio: "Full-stack developer passionate about building great products.",
      website: "https://example.com",
      location: "San Francisco, CA",
    })
    .returning();

  console.log("✅ Created profile for:", user.name);

  // Create some posts
  const postData = [
    {
      title: "Getting Started with Next.js 15",
      content:
        "Next.js 15 brings exciting new features including React Server Components, improved caching, and more.",
      published: true,
      authorId: user.id,
      tags: ["nextjs", "react", "tutorial"],
    },
    {
      title: "Building Type-Safe APIs with Drizzle ORM",
      content:
        "Drizzle ORM provides a type-safe way to interact with your database while maintaining full SQL power.",
      published: true,
      authorId: user.id,
      tags: ["drizzle", "typescript", "database"],
    },
    {
      title: "Draft: Advanced Authentication Patterns",
      content:
        "This post is still a draft exploring advanced authentication patterns with Better Auth.",
      published: false,
      authorId: user.id,
      tags: ["auth", "security"],
    },
  ];

  const createdPosts = await db.insert(posts).values(postData).returning();
  console.log(`✅ Created ${createdPosts.length} posts`);

  console.log("🎉 Seeding complete!");
}

seed()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
