import { environment } from '../../environments/environment';

export const EMAIL_CONFIG = {
  // EmailJS Configuration
  EMAILJS_PUBLIC_KEY: environment.emailjs.publicKey,
  EMAILJS_SERVICE_ID: environment.emailjs.serviceId,
  EMAILJS_TEMPLATE_ID: environment.emailjs.templateId,

  // reCAPTCHA Configuration
  RECAPTCHA_SITE_KEY: environment.recaptcha.siteKey,

  // Email Configuration
  TO_EMAIL: environment.email.toEmail,
};
