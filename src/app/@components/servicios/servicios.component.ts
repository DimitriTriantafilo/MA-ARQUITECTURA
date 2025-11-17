import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  HostListener,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { WindowSizeService } from '../../window-size.service';
import { BreakpointService } from '../../breakpoint.service';
import { CloudinaryService } from '../../cloudinary.service';
import { TranslatePipe } from '../../transltate/translate.pipe';

interface ServiceItem {
  id: string;
  name: string;
  isExpanded: boolean;
  description?: string;
}

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, MatIconModule, TranslatePipe],
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
})
export class ServiciosComponent implements OnInit, OnDestroy {
  public innerWidth: number;
  public innerHeight: number;
  public servicesImageLoaded = false;

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
      // Hacer scroll al top de la página cuando se carga el componente
      window.scrollTo(0, 0);
      
      this.innerWidth = window.innerWidth;
      this.innerHeight = window.innerHeight;

      // Activar la animación de la imagen de servicios después de un delay
      setTimeout(() => {
        this.servicesImageLoaded = true;
      }, 200);
    }
  }

  ngOnDestroy() {
    // Cleanup si es necesario
  }
  services: ServiceItem[] = [
    {
      id: 'anteproyecto',
      name: 'anteproyecto',
      isExpanded: false,
    },
    {
      id: 'proyecto',
      name: 'proyecto',
      isExpanded: false,
    },
    {
      id: 'direccion-obra',
      name: 'direccionObra',
      isExpanded: false,
    },
  ];

  toggleService(serviceId: string): void {
    const selectedService = this.services.find((s) => s.id === serviceId);

    if (selectedService) {
      // Si el servicio seleccionado ya está abierto, cerrarlo
      if (selectedService.isExpanded) {
        selectedService.isExpanded = false;
      } else {
        // Si está cerrado, primero cerrar todos los demás
        const currentlyExpanded = this.services.find((s) => s.isExpanded);

        if (currentlyExpanded) {
          // Si hay uno abierto, cerrarlo primero y luego abrir el nuevo después de un delay
          currentlyExpanded.isExpanded = false;

          setTimeout(() => {
            selectedService.isExpanded = true;
          }, 400); // Delay de 300ms para que se complete la animación de cierre
        } else {
          // Si no hay ninguno abierto, abrir directamente
          selectedService.isExpanded = true;
        }
      }
    }
  }

  getServicesImageUrl(): string {
    if (!this.innerWidth) return '';

    // Optimizar el cálculo para mejor calidad
    let imageWidth: number;
    let imageHeight: number;

    if (this.innerWidth <= 768) {
      // En móvil, usar un ancho más grande para mejor calidad
      imageWidth = Math.min(Math.floor(this.innerWidth * 0.8), 400);
      imageHeight = Math.floor(imageWidth * 0.75); // Aspect ratio 4:3
    } else if (this.innerWidth <= 1024) {
      // En tablet, usar un ancho proporcional pero más grande
      imageWidth = Math.min(Math.floor(this.innerWidth * 0.6), 500);
      imageHeight = Math.floor(imageWidth * 0.75);
    } else {
      // En desktop, usar un ancho más grande para mejor calidad
      imageWidth = Math.min(Math.floor(this.innerWidth * 0.5), 600);
      imageHeight = Math.floor(imageWidth * 0.75);
    }

    return this.cloudinaryService.generateGalleryUrl(
      'v1755638017/ibkmmeta5d4lmg5xo8j7.jpg',
      imageWidth
    );
  }
}
