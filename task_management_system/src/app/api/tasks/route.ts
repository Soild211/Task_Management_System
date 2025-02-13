import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tasks } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const allTasks = await db.select().from(tasks);
    return NextResponse.json(allTasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, userId, projectId, priority, dueDate } = await request.json();

    if (!title || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newTask = await db.insert(tasks).values({
      title,
      description,
      userId,
      projectId,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
    }).returning();

    return NextResponse.json(newTask[0], { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...updates } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing task ID' }, { status: 400 });
    }

    const updatedTask = await db.update(tasks)
      .set(updates)
      .where(eq(tasks.id, id))
      .returning();

    if (updatedTask.length === 0) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(updatedTask[0]);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing task ID' }, { status: 400 });
    }

    await db.delete(tasks).where(eq(tasks.id, id));

    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
