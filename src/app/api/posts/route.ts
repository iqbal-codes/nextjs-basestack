import { and, desc, eq, like, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { auth } from "@/lib/auth";

// GET /api/posts - Fetch posts with pagination and filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = Math.max(1, Number(searchParams.get("page") ?? 1));
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? 10)));
    const search = searchParams.get("search") ?? "";
    const authorId = searchParams.get("authorId") ?? undefined;
    const publishedParam = searchParams.get("published");

    const offset = (page - 1) * limit;

    // Build conditions
    const conditions = [];

    if (search) {
      conditions.push(like(posts.title, `%${search}%`));
    }

    if (authorId) {
      conditions.push(eq(posts.authorId, authorId));
    }

    if (publishedParam !== null) {
      conditions.push(eq(posts.published, publishedParam === "true"));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [postsResult, countResult] = await Promise.all([
      db.query.posts.findMany({
        where: whereClause,
        orderBy: [desc(posts.createdAt)],
        limit,
        offset,
      }),
      db.select({ count: sql<number>`count(*)` }).from(posts).where(whereClause),
    ]);

    return NextResponse.json({
      posts: postsResult,
      total: Number(countResult[0]?.count ?? 0),
      page,
      limit,
    });
  } catch (error) {
    console.error("GET /api/posts error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const [post] = await db
      .insert(posts)
      .values({
        title: body.title,
        content: body.content,
        published: body.published ?? false,
        tags: body.tags ?? [],
        authorId: session.user.id,
      })
      .returning();

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("POST /api/posts error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
