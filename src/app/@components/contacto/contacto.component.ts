import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { EMAIL_CONFIG } from '../../config/email.config';
import { PLATFORM_ID } from '@angular/core';
import { TranslatePipe } from '../../transltate/translate.pipe';

declare var emailjs: any;
declare var grecaptcha: any;

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    TranslatePipe,
  ],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
})
export class ContactoComponent implements OnInit, OnDestroy {
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  recaptchaResponse: string = '';

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      mensaje: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadEmailJS();
      this.loadRecaptcha();
    }
  }

  ngOnDestroy() {
    // Cleanup if necessary
  }

  private loadEmailJS() {
    // Load EmailJS from CDN
    if (!isPlatformBrowser(this.platformId)) return;
    const script = document.createElement('script');
    script.src =
      'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = () => {
      emailjs.init(EMAIL_CONFIG.EMAILJS_PUBLIC_KEY);
    };
    document.head.appendChild(script);
  }

  private loadRecaptcha() {
    // Load reCAPTCHA from CDN
    if (!isPlatformBrowser(this.platformId)) return;
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${EMAIL_CONFIG.RECAPTCHA_SITE_KEY}`;
    document.head.appendChild(script);
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitError = false;

      try {
        // Verify reCAPTCHA
        const recaptchaToken = isPlatformBrowser(this.platformId)
          ? await this.verifyRecaptcha()
          : '';
        if (!recaptchaToken) {
          throw new Error('reCAPTCHA verification failed');
        }

        // Send email using EmailJS
        await this.sendEmail(recaptchaToken);

        this.submitSuccess = true;
        this.contactForm.reset();

        // Reset success message after 5 seconds
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      } catch (error) {
        console.error('Error sending email:', error);
        this.submitError = true;
      } finally {
        this.isSubmitting = false;
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private async verifyRecaptcha(): Promise<string> {
    return new Promise((resolve) => {
      grecaptcha.ready(() => {
        grecaptcha
          .execute(EMAIL_CONFIG.RECAPTCHA_SITE_KEY, { action: 'contact_form' })
          .then((token: string) => {
            resolve(token);
          })
          .catch(() => {
            resolve('');
          });
      });
    });
  }

  private async sendEmail(recaptchaToken: string): Promise<void> {
    const templateParams = {
      name: this.contactForm.value.nombre,
      email: this.contactForm.value.email,
      phone: this.contactForm.value.telefono,
      message: this.contactForm.value.mensaje,
      recaptcha_token: recaptchaToken,
      to_email: EMAIL_CONFIG.TO_EMAIL,
    };

    return new Promise((resolve, reject) => {
      emailjs
        .send(
          EMAIL_CONFIG.EMAILJS_SERVICE_ID,
          EMAIL_CONFIG.EMAILJS_TEMPLATE_ID,
          templateParams
        )
        .then(() => {
          resolve();
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  private markFormGroupTouched() {
    Object.keys(this.contactForm.controls).forEach((key) => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.invalid && field?.touched) {
      if (field.errors?.['required']) {
        return 'Este campo es requerido';
      }
      if (field.errors?.['email']) {
        return 'Ingrese un email válido';
      }
    }
    return '';
  }
}
