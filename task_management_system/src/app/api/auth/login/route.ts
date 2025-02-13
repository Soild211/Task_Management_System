import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { verifyPassword } from '@/lib/auth/password';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Find user by email
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (user.length === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Verify password
    const isValidPassword = await verifyPassword(user[0].password, password);

    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // TODO: Implement session management (e.g., JWT)

    return NextResponse.json({ user: { id: user[0].id, name: user[0].name, email: user[0].email } }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
