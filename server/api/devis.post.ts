import { Resend } from 'resend'

const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const {
    eventType,
    date,
    location,
    budget,
    guests,
    services,
    fullName,
    email,
    phone,
  } = body as {
    eventType: string
    date: string
    location: string
    budget: number | null
    guests: number | null
    services: string
    fullName: string
    email: string
    phone: string
  }

  if (!fullName || !email || !phone || !eventType || !date || !location || !services) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Les champs requis sont manquants',
    })
  }

  const resend = new Resend(runtimeConfig.resendApiKey)

  const emailHtml = `
    <h2>Demande de devis — JB STUDIO CAMEROUN</h2>
    <table style="border-collapse:collapse; width:100%; max-width:600px;">
      <tr><td style="padding:6px 0; font-weight:bold;">Nom complet</td><td>${fullName}</td></tr>
      <tr><td style="padding:6px 0; font-weight:bold;">Email</td><td>${email}</td></tr>
      <tr><td style="padding:6px 0; font-weight:bold;">Téléphone</td><td>${phone}</td></tr>
      <tr><td style="padding:6px 0; font-weight:bold;">Type d'événement</td><td>${eventType}</td></tr>
      <tr><td style="padding:6px 0; font-weight:bold;">Date prévue</td><td>${date}</td></tr>
      <tr><td style="padding:6px 0; font-weight:bold;">Lieu</td><td>${location}</td></tr>
      <tr><td style="padding:6px 0; font-weight:bold;">Budget indicatif</td><td>${budget ? budget.toLocaleString('fr-FR') + ' FCFA' : 'Non renseigné'}</td></tr>
      <tr><td style="padding:6px 0; font-weight:bold;">Nombre de personnes</td><td>${guests ?? 'Non renseigné'}</td></tr>
      <tr><td style="padding:6px 0; font-weight:bold;">Prestations souhaitées</td><td>${services}</td></tr>
    </table>
    <p style="margin-top:16px; color:#666;">Envoyé depuis le site JB STUDIO CAMEROUN</p>
  `

  try {
    const { data, error } = await resend.emails.send({
      from: 'JB STUDIO CAMEROUN <contact@jbstudiocameroun.com>',
      to: 'contact@jbstudiocameroun.com',
      reply_to: email,
      subject: `Nouvelle demande de devis — ${fullName}`,
      html: emailHtml,
    })

    if (error) {
      console.error('Resend error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Erreur lors de l\'envoi de l\'email',
      })
    }

    console.log('📩 Devis envoyé:', { fullName, email, phone, eventType, date })

    return {
      success: true,
      message: 'Votre demande de devis a été envoyée avec succès. Nous vous répondrons sous 24-48h.',
    }
  } catch (err) {
    console.error('Erreur Resend:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de l\'envoi de l\'email',
    })
  }
})