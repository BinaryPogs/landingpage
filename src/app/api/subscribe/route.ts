import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const { data: existingEmail } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email)
      .single();

    if (existingEmail) {
      return NextResponse.json(
        { error: 'You\'re already on the waitlist!' },
        { status: 400 }
      );
    }

    // Insert new subscriber
    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }]);

    if (error) throw error;

    return NextResponse.json({ 
      success: true,
      message: 'Welcome to the inner circle!'
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist. Please try again.' },
      { status: 500 }
    );
  }
} 