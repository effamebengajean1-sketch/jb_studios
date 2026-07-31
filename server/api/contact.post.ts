// server/api/contact.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validation basique
  if (!body.name || !body.email || !body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Les champs nom, email et message sont requis'
    })
  }

  // TODO: À connecter avec Resend/SendGrid
  console.log('📩 Nouveau message de contact:', {
    name: body.name,
    email: body.email,
    phone: body.phone || 'Non renseigné',
    subject: body.subject,
    message: body.message
  })

  // Simuler un envoi réussi
  return {
    success: true,
    message: 'Message envoyé avec succès'
  }
})