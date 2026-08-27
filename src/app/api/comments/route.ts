import { NextResponse } from 'next/server';
import db from '@/lib/db';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

function escapeHtml(unsafe: string) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

export async function GET() {
  try {
    const comments = await db.comment.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, content } = await request.json();

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    
    if (!content || typeof content !== 'string' || content.trim() === '') {
      return NextResponse.json({ error: 'Comment content is required' }, { status: 400 });
    }

    if (content.length > 500) {
      return NextResponse.json({ error: 'Comment is too long' }, { status: 400 });
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = email ? escapeHtml(email.trim()) : null;
    const safeContent = escapeHtml(content.trim());
    const id = crypto.randomUUID();

    const newComment = await db.comment.create({
      data: {
        id,
        name: safeName,
        email: safeEmail,
        content: safeContent,
      }
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
