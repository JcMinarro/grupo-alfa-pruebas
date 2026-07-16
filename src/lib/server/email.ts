import { Resend } from 'resend';
import { getServerEnv } from './env';

const templates = {
    membership_welcome: {
        subject: 'Bienvenido a Club Alfa',
        text: 'Tu membresía de Club Alfa está activa. Ya puedes acceder al área privada de miembros.'
    },
    membership_renewal: {
        subject: 'Membresía de Club Alfa renovada',
        text: 'La renovación anual de tu membresía de Club Alfa se ha confirmado correctamente.'
    },
    payment_failed: {
        subject: 'Acción necesaria en tu membresía de Club Alfa',
        text: 'No hemos podido procesar el pago de tu membresía. Actualiza tus datos de facturación para mantener el acceso.'
    },
    membership_canceled: {
        subject: 'Membresía de Club Alfa cancelada',
        text: 'La cancelación de tu membresía de Club Alfa se ha procesado correctamente.'
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
        text: `${template.text}\n\nEstado de la membresía: ${attributes.membershipStatus ?? 'desconocido'}\nOrigen de alta: ${attributes.initialAcquisitionSource ?? 'direct'}`
    });

    return { sent: true };
}
