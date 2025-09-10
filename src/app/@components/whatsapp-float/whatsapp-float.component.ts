import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-whatsapp-float',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './whatsapp-float.component.html',
  styleUrls: ['./whatsapp-float.component.scss'],
})
export class WhatsappFloatComponent {
  showWhatsAppModal = false;

  // URL del QR de WhatsApp - usando la imagen local
  whatsappQRUrl = 'assets/whatsapp qr.jpeg';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  openWhatsAppModal() {
    this.showWhatsAppModal = true;
  }

  closeWhatsAppModal() {
    this.showWhatsAppModal = false;
  }

  openWhatsAppChat() {
    // Abrir WhatsApp directamente
    const phoneNumber = '5491130278757'; // Número sin espacios ni caracteres especiales
    const message = encodeURIComponent(
      'Hola! Me gustaría contactarme con ustedes.'
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    if (isPlatformBrowser(this.platformId)) {
      window.open(whatsappUrl, '_blank');
    }
  }
}
