import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../app.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WindowSizeService } from '../../window-size.service';
import { BreakpointService } from '../../breakpoint.service';
import { CloudinaryService } from '../../cloudinary.service';
import { ImagePreloadService } from '../../image-preload.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  data?: Project;
  currentImageIndex: number = 0;
  openCarrouselFlag: boolean = false;
  isChangingImage: boolean = false;
  fixedWidth: number = 0; // Se calculará la primera vez
  fixedHeight: number = 0; // Se calculará la primera vez
  hasCalculatedDimensions: boolean = false; // Bandera de control
  isLoadingImage: boolean = false;
  currentImageLoaded: boolean = false;
  public innerWidth: number;
  public innerHeight: number;

  @ViewChild('carrousel') carrouselRef?: ElementRef<HTMLDivElement>;
  private imageLoaders: Map<string, HTMLImageElement> = new Map();

  constructor(
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    public windowSize: WindowSizeService,
    public breakpoint: BreakpointService,
    private cloudinaryService: CloudinaryService,
    private imagePreloadService: ImagePreloadService
  ) {
    this.innerWidth = this.windowSize.innerWidth();
    this.innerHeight = this.windowSize.innerHeight();
  }

  ngOnInit() {
    this.data = this.route.snapshot.data['project'];
    // Ya no es necesario asignar innerWidth/innerHeight manualmente
    // Precarga imágenes críticas del carrusel
    if (this.data?.images) {
      const carouselUrls = this.data.images
        .slice(0, 3)
        .map((img) =>
          this.cloudinaryService.generateCarouselUrl(
            img.src,
            this.fixedWidth,
            this.fixedHeight
          )
        );
      this.imagePreloadService.preloadCarouselImages(carouselUrls);
    }
  }

  /**
   * Cierra el carrusel de imágenes.
   *
   * Este método se encarga de cerrar el carrusel de imágenes, restableciendo los flags
   * relacionados con la visualización y carga de imágenes. Además, reinicia el estado de carga
   * de la imagen actual y oculta el carrusel.
   */
  closeCarrousel() {
    this.openCarrouselFlag = false;
    this.isLoadingImage = false;
    this.currentImageLoaded = false;
  }
  openCarrousel(imageIndex: number) {
    if (this.breakpoint.isMobile()) {
      return;
    }
    this.currentImageIndex = imageIndex;
    this.openCarrouselFlag = true;
    this.isLoadingImage = true;
    this.currentImageLoaded = false;

    setTimeout(() => {
      this.calculateInitialDimensions();
      // Precargar la imagen después de calcular dimensiones
      this.preloadCurrentImage();
    }, 10);
  }

  private calculateInitialDimensions() {
    if (this.carrouselRef?.nativeElement && !this.hasCalculatedDimensions) {
      const element = this.carrouselRef.nativeElement;
      this.fixedWidth = element.offsetWidth;
      this.fixedHeight = element.offsetHeight;
      this.hasCalculatedDimensions = true;
    }
  }

  private preloadCurrentImage() {
    if (!this.data?.images?.[this.currentImageIndex]?.src) {
      this.isLoadingImage = false;
      return;
    }

    const imageUrl = this.getCurrentImageUrl();
    const img = new Image();

    img.onload = () => {
      // Esperar un poco más para que el background-image se renderice
      setTimeout(() => {
        this.isLoadingImage = false;
        this.currentImageLoaded = true;
        this.cdRef.detectChanges();
        this.imageLoaders.set(imageUrl, img);
      }, 100); // Pequeño delay para asegurar que el background-image esté visible
    };

    img.onerror = () => {
      this.isLoadingImage = false;
      this.cdRef.detectChanges();
    };

    img.src = imageUrl;
  }

  private generateImageUrl(): string {
    if (!this.data?.images?.[this.currentImageIndex]?.src) return '';
    return `https://res.cloudinary.com/dskkynwxb/c_fill,g_auto,h_${
      this.fixedHeight
    },w_${this.fixedWidth}/q_auto:good/f_auto/${
      this.data.images[this.currentImageIndex].src
    }`;
  }

  getCurrentImageUrl(): string {
    if (!this.data?.images || this.currentImageIndex >= this.data.images.length)
      return '';

    const currentImage = this.data.images[this.currentImageIndex];
    return this.cloudinaryService.generateCarouselUrl(
      currentImage.src,
      this.fixedWidth,
      this.fixedHeight
    );
  }

  nextImage(): void {
    if (this.hasNextImage()) {
      this.isChangingImage = true;
      this.isLoadingImage = true;
      this.currentImageLoaded = false;

      setTimeout(() => {
        this.currentImageIndex++;
        this.isChangingImage = false;
        this.preloadCurrentImage();
      }, 300);
    }
  }

  prevImage(): void {
    if (this.hasPrevImage()) {
      this.isChangingImage = true;
      this.isLoadingImage = true;
      this.currentImageLoaded = false;

      setTimeout(() => {
        this.currentImageIndex--;
        this.isChangingImage = false;
        this.preloadCurrentImage();
      }, 300);
    }
  }

  hasNextImage(): boolean {
    return (
      !!this.data?.images &&
      this.currentImageIndex < this.data.images.length - 1
    );
  }

  hasPrevImage(): boolean {
    return !!this.data?.images && this.currentImageIndex > 0;
  }

  handleBackdropClick(event: MouseEvent): void {
    // Verifica si el clic fue directamente en el backdrop (no en hijos)
    if (event.target === event.currentTarget) {
      this.openCarrouselFlag = false;
    }
  }

  ngOnDestroy() {}

  // Métodos para generar URLs de imágenes
  getMainImageUrl(): string {
    if (!this.data?.showImg || !this.innerWidth || !this.innerHeight) return '';
    return this.cloudinaryService.generateBackgroundUrl(
      this.data.showImg,
      this.innerWidth,
      this.innerHeight
    );
  }

  getGalleryImageUrl(imageSrc: string): string {
    if (!imageSrc || !this.innerWidth) return '';

    if (this.breakpoint.isMobile()) {
      return this.cloudinaryService.generateMobileUrl(
        imageSrc,
        this.innerWidth
      );
    } else {
      // Calcula el ancho real de cada columna del grid
      const containerWidth = Math.floor((this.innerWidth * 0.92 - 80) / 3); // 92% del ancho, menos padding y gap
      return this.cloudinaryService.generateGalleryUrl(
        imageSrc,
        containerWidth
      );
    }
  }

  /**
   * Calcula dinámicamente las filas que debe ocupar una imagen basado en su proporción
   */
  calculateImageRows(image: any, index: number): number {
    // Si la imagen está marcada como destacada, ocupa más filas
    if (image.featured) {
      return 3; // 3 filas para imágenes destacadas
    }

    // Si tiene rowSpan definido, lo usa
    if (image.rowSpan) {
      return image.rowSpan;
    }

    // Calcula basado en la proporción de la imagen
    // Para imágenes más anchas que altas, menos filas
    // Para imágenes más altas que anchas, más filas
    const aspectRatio = this.getImageAspectRatio(image);

    if (aspectRatio > 1.8) {
      // Imagen muy ancha (panorámica)
      return 1;
    } else if (aspectRatio > 1.4) {
      // Imagen ancha
      return 1;
    } else if (aspectRatio < 0.7) {
      // Imagen muy alta
      return 3;
    } else if (aspectRatio < 0.9) {
      // Imagen alta
      return 2;
    } else {
      // Imagen cuadrada o ligeramente rectangular
      return 1;
    }
  }

  /**
   * Obtiene la proporción de una imagen (ancho/alto)
   * Si no está disponible, usa una proporción por defecto
   */
  private getImageAspectRatio(image: any): number {
    // Si la imagen tiene dimensiones definidas, las usa
    if (image.width && image.height) {
      return image.width / image.height;
    }

    // Si no, intenta calcular basado en el nombre o usa un valor por defecto
    // Puedes agregar lógica específica aquí si conoces las proporciones de tus imágenes
    return 1.3; // Proporción por defecto (ligeramente ancha)
  }

  /**
   * Calcula las columnas que debe ocupar una imagen
   */
  calculateImageColumns(image: any, index: number): number {
    // Si la imagen está marcada como destacada, ocupa más columnas
    if (image.featured) {
      return 3; // 3 columnas para imágenes destacadas
    }

    // Si tiene colSpan definido, lo usa
    if (image.colSpan) {
      return image.colSpan;
    }

    // Por defecto, una columna
    return 1;
  }
}
