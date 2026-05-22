import { Resend } from 'resend';
import { getServerEnv } from './env';

const templates = {
    membership_welcome: {
        subject: 'Welcome to Club Alfa',
        text: 'Your Club Alfa membership is active. You can now access the private member area.'
    },
    membership_renewal: {
        subject: 'Club Alfa membership renewed',
        text: 'Your Club Alfa annual membership renewal has been confirmed.'
    },
    payment_failed: {
        subject: 'Action needed for your Club Alfa membership',
        text: 'We could not process your membership payment. Please update your billing details.'
    },
    membership_canceled: {
        subject: 'Club Alfa membership canceled',
        text: 'Your Club Alfa membership cancellation has been processed.'
    }
};

export async function sendMembershipEmail({ type, to, attributes = {} }) {
    const env = getServerEnv();
    const template = templates[type];

    if (!env.resendApiKey || !to || !template) {
        return { sent: false };
    }

    const resend = new Resend(env.resendApiKey);

    await resend.emails.send({
        from: env.resendFromEmail,
        to,
        subject: template.subject,
        text: `${template.text}\n\nMembership status: ${attributes.membershipStatus ?? 'unknown'}\nAcquisition source: ${attributes.initialAcquisitionSource ?? 'direct'}`
    });

    return { sent: true };
}
