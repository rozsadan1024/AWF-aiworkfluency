import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, phone, message, source, locale } = body;

    if (!name || !email || !company) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Try to store in Supabase (graceful — won't fail the request if table missing)
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (supabaseUrl && supabaseKey) {
        const res = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
          method: 'POST',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({
            name,
            email,
            company,
            phone: phone || null,
            message: message || null,
            source: source || 'eu-compliance-assessment',
            locale: locale || 'hu',
          }),
        });
        if (!res.ok) {
          const err = await res.text();
          console.warn('Supabase insert warning:', err);
        }
      }
    } catch (dbErr) {
      console.warn('Supabase insert failed (non-critical):', dbErr);
    }

    // 2. Send email notification via SMTP
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const notifyEmail = process.env.CONTACT_NOTIFY_EMAIL || 'hello@aiworkfluency.com';

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort) || 587,
        secure: Number(smtpPort) === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: `"AI Work Fluency" <${smtpUser}>`,
        to: notifyEmail,
        subject: `[Contact Form] ${company} — ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Source:</strong> ${source || 'EU Compliance Assessment'}</p>
          <hr />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Company:</strong> ${company}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${message ? `<p><strong>Message:</strong><br/>${message}</p>` : ''}
          <hr />
          <p style="color: #999; font-size: 12px;">Sent from aiworkfluency.com contact form (${locale}) — ${new Date().toISOString()}</p>
        `,
      });
    } else {
      // No SMTP: log the submission so it's not lost
      console.log('=== CONTACT FORM SUBMISSION (no SMTP configured) ===');
      console.log(JSON.stringify({ name, email, company, phone, message, source, locale, ts: new Date().toISOString() }, null, 2));
      console.log('====================================================');
      console.warn('Set SMTP_HOST, SMTP_USER, SMTP_PASS env vars to enable email notifications.');
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
