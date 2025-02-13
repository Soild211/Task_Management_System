import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const allProjects = await db.select().from(projects);
    return NextResponse.json(allProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, userId } = await request.json();

    if (!name || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newProject = await db.insert(projects).values({
      name,
      description,
      userId,
    }).returning();

    return NextResponse.json(newProject[0], { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...updates } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing project ID' }, { status: 400 });
    }

    const updatedProject = await db.update(projects)
      .set(updates)
      .where(eq(projects.id, id))
      .returning();

    if (updatedProject.length === 0) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(updatedProject[0]);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing project ID' }, { status: 400 });
    }

    await db.delete(projects).where(eq(projects.id, id));

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
