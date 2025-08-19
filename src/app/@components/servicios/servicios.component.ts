import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { WindowSizeService } from '../../window-size.service';
import { BreakpointService } from '../../breakpoint.service';
import { CloudinaryService } from '../../cloudinary.service';

interface ServiceItem {
  id: string;
  name: string;
  isExpanded: boolean;
  description?: string;
}

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
})
export class ServiciosComponent implements OnInit, OnDestroy {
  public innerWidth: number;
  public innerHeight: number;

  constructor(
    public windowSize: WindowSizeService,
    public breakpoint: BreakpointService,
    private cloudinaryService: CloudinaryService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.innerWidth = this.windowSize.innerWidth();
    this.innerHeight = this.windowSize.innerHeight();
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.innerWidth = window.innerWidth;
      this.innerHeight = window.innerHeight;
    }
  }

  ngOnDestroy() {
    // Cleanup si es necesario
  }
  services: ServiceItem[] = [
    {
      id: 'anteproyecto',
      name: 'ANTEPROYECTO',
      isExpanded: false,
      description: 'Descripción del anteproyecto...',
    },
    {
      id: 'proyecto-ejecutivo',
      name: 'PROYECTO EJECUTIVO',
      isExpanded: false,
      description: 'Descripción del proyecto ejecutivo...',
    },
    {
      id: 'interiorismo',
      name: 'INTERIORISMO',
      isExpanded: false,
      description: 'Descripción del interiorismo...',
    },
    {
      id: 'direccion-obra',
      name: 'DIRECCIÓN DE OBRA',
      isExpanded: false,
      description: 'Descripción de la dirección de obra...',
    },
  ];

  toggleService(serviceId: string): void {
    const selectedService = this.services.find((s) => s.id === serviceId);

    if (selectedService) {
      // Si el servicio seleccionado ya está abierto, cerrarlo
      if (selectedService.isExpanded) {
        selectedService.isExpanded = false;
      } else {
        // Si está cerrado, cerrar todos los demás y abrir este
        this.services.forEach((service) => {
          service.isExpanded = false;
        });
        selectedService.isExpanded = true;
      }
    }
  }

  getServicesImageUrl(): string {
    if (!this.innerWidth) return '';

    // Calcula el ancho para la imagen de servicios (aproximadamente 40% del ancho de pantalla)
    const imageWidth = Math.floor(this.innerWidth * 0.4);
    const imageHeight = 400; // Altura fija como está en el CSS

    return this.cloudinaryService.generateGalleryUrl(
      'v1754422999/vc5ib3vcwwprcmkl2nbc.jpg',
      imageWidth
    );
  }
}
