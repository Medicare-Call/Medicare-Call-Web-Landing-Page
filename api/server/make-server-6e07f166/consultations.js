const CONSULT_NOTIFY_EMAIL = process.env.CONSULT_NOTIFY_EMAIL || 'medicare924@gmail.com';
const MAIL_FROM = process.env.MAIL_FROM || 'onboarding@resend.dev';
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

function getKstTimestamp() {
  const now = new Date();
  const datePart = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
  const timePart = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now);
  return `${datePart} ${timePart} (KST)`;
}

async function sendDiscordWebhook({ name, phone, message, submittedAt }) {
  if (!DISCORD_WEBHOOK_URL) return;

  const content = [
    '📩 **새 상담 신청 접수**',
    `- 신청시각: ${submittedAt}`,
    `- 이름: ${name}`,
    `- 연락처: ${phone}`,
    `- 문의내용: ${message || '(없음)'}`,
  ].join('\n');

  const resp = await fetch(DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Failed to send Discord webhook: ${resp.status} ${errText}`);
  }
}

async function sendConsultationEmail({ name, phone, message, submittedAt }) {
  if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY is not set on the server');

  const subject = `[메디케어콜 상담신청] ${name} / ${phone}`;
  const text = `새 상담 신청이 접수되었습니다.\n\n신청시각: ${submittedAt}\n이름: ${name}\n연락처: ${phone}\n문의내용: ${message || '(없음)'}`;

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: MAIL_FROM,
      to: [CONSULT_NOTIFY_EMAIL],
      subject,
      text,
    }),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Failed to send consultation email: ${resp.status} ${errText}`);
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

  try {
    const { name, phone, message } = req.body || {};
    if (!name || !phone) {
      return res.status(400).json({ success: false, error: '필수 정보를 모두 입력해주세요.' });
    }

    const submittedAt = getKstTimestamp();

    await sendConsultationEmail({
      name,
      phone,
      message: message || '',
      submittedAt,
    });

    // 디스코드 웹훅은 선택 사항: 실패해도 상담 신청 자체는 성공 처리
    try {
      await sendDiscordWebhook({
        name,
        phone,
        message: message || '',
        submittedAt,
      });
    } catch (discordError) {
      console.log(`Discord webhook send failed: ${discordError}`);
    }

    return res.status(200).json({ success: true, message: '상담 신청이 완료되었습니다.' });
  } catch (error) {
    const debug = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ success: false, error: '상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.', debug });
  }
}
