import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Inject,
  PLATFORM_ID,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { projects } from '../../app.routes';
import { Project } from '../../app.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WindowSizeService } from '../../window-size.service';
import { BreakpointService } from '../../breakpoint.service';
import { CloudinaryService } from '../../cloudinary.service';
import { ImagePreloadService } from '../../image-preload.service';
import { TranslationService } from '../../transltate/translation.service';
import { TranslatePipe } from '../../transltate/translate.pipe';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TranslatePipe,
    SafePipe,
  ],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  data?: Project;
  currentImageIndex: number = 0;
  openCarrouselFlag: boolean = false;
  isChangingImage: boolean = false;
  fixedWidth: number = 0; // Se calculará la primera vez
  fixedHeight: number = 0; // Se calculará la primera vez
  hasCalculatedDimensions: boolean = false; // Bandera de control
  isLoadingImage: boolean = false;
  currentImageLoaded: boolean = false;

  public plantaImageLoaded: boolean = false;
  public plantaImageError: boolean = false;
  public plantaPreviaImageLoaded: boolean = false;
  public plantaPreviaImageError: boolean = false;
  private plantaObserver: IntersectionObserver | null = null;

  // DIMENSIONES FIJAS: Se calculan UNA sola vez al inicializar
  // Esto evita recargas innecesarias de imágenes de Cloudinary cuando cambia el tamaño de la pantalla
  // (como cuando se cierra/abre la barra de navegación del navegador)
  public readonly fixedViewportWidth: number;
  public readonly fixedViewportHeight: number;

  @ViewChild('carrousel') carrouselRef?: ElementRef<HTMLDivElement>;
  private imageLoaders: Map<string, HTMLImageElement> = new Map();

  // Zoom y Pan para imágenes móviles
  private imageZoomStates: Map<
    number,
    {
      scale: number;
      translateX: number;
      translateY: number;
      lastDistance: number;
      lastTouchX: number;
      lastTouchY: number;
    }
  > = new Map();
  private readonly MIN_SCALE = 1;
  private readonly MAX_SCALE = 4;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    public windowSize: WindowSizeService,
    public breakpoint: BreakpointService,
    private cloudinaryService: CloudinaryService,
    private imagePreloadService: ImagePreloadService,
    private translationService: TranslationService
  ) {
    // CALCULAR DIMENSIONES UNA SOLA VEZ en el constructor
    // Esto evita recargas innecesarias de imágenes de Cloudinary
    this.fixedViewportWidth = this.windowSize.innerWidth();
    this.fixedViewportHeight = this.windowSize.innerHeight();
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Hacer scroll al top de la página cuando se carga el componente
      window.scrollTo(0, 0);
    }

    // Obtener el proyecto desde los datos de la ruta
    this.data = this.route.snapshot.data['project'];

    if (!this.data) {
      this.router.navigate(['/']);
    } else {
      // Precarga imágenes críticas del carrusel
      if (this.data.images) {
        const carouselUrls = this.data.images
          .slice(0, 3)
          .map((img) =>
            this.cloudinaryService.generateCarouselUrl(
              img.src,
              this.fixedWidth,
              this.fixedHeight
            )
          );
        this.imagePreloadService.preloadImages(carouselUrls);
      }

      // Precarga de planos con prioridad alta
      this.preloadPlantaImages();
    }

    // Suscribirse a los cambios de ruta para asegurar scroll al top
    this.route.params.subscribe(() => {
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
      }
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        // Asegurar scroll al top después de que la vista se haya renderizado
        window.scrollTo({ top: 0, behavior: 'smooth' });

        this.setupPlantaObserver();
        this.cdRef.detectChanges();
      }, 100);
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
    // SOLO ejecutar en el navegador para evitar errores de SSR
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

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

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    // Solo manejar eventos del teclado cuando el carrusel está abierto
    if (!this.openCarrouselFlag) {
      return;
    }

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        this.nextImage();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.prevImage();
        break;
      case 'Escape':
        event.preventDefault();
        this.closeCarrousel();
        break;
    }
  }

  getProjectDescription(): string {
    if (!this.data) {
      return '';
    }

    // Verificar si el idioma actual es inglés
    const currentLanguage = this.translationService.currentLang();

    if (currentLanguage === 'en' && this.data.descriptionEn) {
      return this.data.descriptionEn;
    }

    return this.data.description || '';
  }

  getProjectName(): string {
    if (!this.data) {
      return '';
    }

    // Verificar si el idioma actual es inglés
    const currentLanguage = this.translationService.currentLang();

    let projectName: string;
    if (currentLanguage === 'en' && this.data.nameEn) {
      projectName = this.data.nameEn;
    } else {
      projectName = this.data.name;
    }

    // Retornar el nombre en mayúsculas
    return projectName.toUpperCase();
  }

  ngOnDestroy() {
    if (this.plantaObserver) {
      this.plantaObserver.disconnect();
    }
  }

  private setupPlantaObserver() {
    if (!isPlatformBrowser(this.platformId)) return;
    const plantaContainer = document.querySelector('.planta-container');

    if (plantaContainer) {
      this.plantaObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Agregar clase para activar animaciones
              plantaContainer.classList.add('in-view');
              this.plantaObserver?.disconnect();
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: '0px 0px -100px 0px',
        }
      );

      this.plantaObserver.observe(plantaContainer);
    }
  }

  // Métodos para generar URLs de imágenes
  getMainImageUrl(): string {
    if (!this.data?.showImg) return '';
    return this.cloudinaryService.generateBackgroundUrl(
      this.data.showImg,
      this.fixedViewportWidth,
      this.fixedViewportHeight
    );
  }

  getPlantaImageUrl(): string {
    if (!this.data?.plantaSrc) {
      return '';
    }

    // Calcula el ancho real del contenedor de la planta
    let containerWidth: number;

    if (this.breakpoint.isMobile()) {
      // En móvil, usar un ancho más grande para mejor calidad
      containerWidth = Math.min(this.fixedViewportWidth * 0.9, 600); // 90% del ancho de pantalla, máximo 600px
    } else {
      // El contenedor planta-section tiene width: 50% y hay un gap de 60px
      // La imagen tiene max-width: 80% dentro del contenedor
      containerWidth = Math.floor(
        (this.fixedViewportWidth * 0.94 - 60) * 0.5 * 0.8
      );
    }

    // Si hay planta previa, ajustar el ancho para que ambas imágenes quepan mejor
    if (this.data?.plantaPreviaSrc) {
      containerWidth = Math.floor(containerWidth * 0.85); // Reducir un poco más cuando hay dos imágenes
    }

    const url = this.cloudinaryService.generatePlantaUrl(
      this.data.plantaSrc,
      containerWidth
    );

    return url;
  }

  getPlantaPreviaImageUrl(): string {
    if (!this.data?.plantaPreviaSrc) return '';

    // Calcula el ancho real del contenedor de la planta
    let containerWidth: number;

    if (this.breakpoint.isMobile()) {
      // En móvil, usar un ancho más grande para mejor calidad
      containerWidth = Math.min(this.fixedViewportWidth * 0.9, 600); // 90% del ancho de pantalla, máximo 600px
    } else {
      // Mismo cálculo que getPlantaImageUrl
      containerWidth = Math.floor(
        (this.fixedViewportWidth * 0.94 - 60) * 0.5 * 0.8
      );
    }

    // Reducir el ancho para que ambas imágenes quepan mejor
    containerWidth = Math.floor(containerWidth * 0.85);

    return this.cloudinaryService.generatePlantaUrl(
      this.data.plantaPreviaSrc,
      containerWidth
    );
  }

  onPlantaImageLoad(event: Event): void {
    this.plantaImageLoaded = true;
  }

  onPlantaImageError(event: Event): void {
    console.error('Error loading planta image:', event);
    this.plantaImageError = true;
  }

  onPlantaPreviaImageLoad(event: Event): void {
    this.plantaPreviaImageLoaded = true;
  }

  onPlantaPreviaImageError(event: Event): void {
    console.error('Error loading planta previa image:', event);
    this.plantaPreviaImageError = true;
  }

  /**
   * Precarga las imágenes de planos con prioridad alta
   * SOLO se ejecuta en el navegador para evitar errores de SSR
   */
  private preloadPlantaImages(): void {
    // SOLO ejecutar en el navegador para evitar errores de SSR
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!this.data) return;

    const plantaUrls: string[] = [];

    // Precargar planta previa si existe
    if (this.data.plantaPreviaSrc) {
      const previaUrl = this.getPlantaPreviaImageUrl();
      if (previaUrl) {
        plantaUrls.push(previaUrl);
        this.preloadImage(previaUrl, 'planta-previa');
      }
    }

    // Precargar planta del proyecto si existe
    if (this.data.plantaSrc) {
      const plantaUrl = this.getPlantaImageUrl();
      if (plantaUrl) {
        plantaUrls.push(plantaUrl);
        this.preloadImage(plantaUrl, 'planta-proyecto');
      }
    }

    // Usar el servicio de precarga para las URLs
    if (plantaUrls.length > 0) {
      this.imagePreloadService.preloadImages(plantaUrls);
    }
  }

  /**
   * Precarga una imagen individual con manejo de eventos
   * SOLO se ejecuta en el navegador para evitar errores de SSR
   */
  private preloadImage(url: string, type: string): void {
    // SOLO ejecutar en el navegador para evitar errores de SSR
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const img = new Image();

    img.onload = () => {
      // Marcar como cargada según el tipo
      if (type === 'planta-previa') {
        this.plantaPreviaImageLoaded = true;
      } else if (type === 'planta-proyecto') {
        this.plantaImageLoaded = true;
      }
    };

    img.onerror = () => {
      console.error(`Error preloading ${type} image:`, url);
      // Marcar error según el tipo
      if (type === 'planta-previa') {
        this.plantaPreviaImageError = true;
      } else if (type === 'planta-proyecto') {
        this.plantaImageError = true;
      }
    };

    img.src = url;
  }

  getGalleryImageUrl(imageSrc: string): string {
    if (!imageSrc) return '';

    if (this.breakpoint.isMobile()) {
      // En móvil, usar el ancho completo de la pantalla para mejor calidad
      return this.cloudinaryService.generateMobileUrl(
        imageSrc,
        this.fixedViewportWidth
      );
    } else {
      // Calcula el ancho real de cada columna del grid
      const containerWidth = Math.floor(
        (this.fixedViewportWidth * 0.92 - 80) / 3
      ); // 92% del ancho, menos padding y gap
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

  /**
   * Determina si un elemento de especificación debe ir a la izquierda o derecha
   * basado en su posición en la lista de elementos visibles
   */
  getSpecItemAlignment(
    elementType: 'm2' | 'location' | 'year' | 'style'
  ): 'left' | 'right' {
    const visibleElements: ('m2' | 'location' | 'year' | 'style')[] = [];

    // Construir lista de elementos visibles en orden
    if (this.data?.m2) visibleElements.push('m2');
    if (this.data?.location) visibleElements.push('location');
    if (this.data?.year) visibleElements.push('year');
    if (this.data?.mainFeature?.type === 'image') visibleElements.push('style');

    // Encontrar el índice del elemento actual
    const elementIndex = visibleElements.indexOf(elementType);

    // Si el elemento no está en la lista o no es visible, retornar 'left' por defecto
    if (elementIndex === -1) return 'left';

    // Alternar entre izquierda (índice par) y derecha (índice impar)
    return elementIndex % 2 === 0 ? 'left' : 'right';
  }

  /**
   * Métodos para manejar zoom y pan en imágenes móviles
   */

  private getImageState(imageIndex: number) {
    if (!this.imageZoomStates.has(imageIndex)) {
      this.imageZoomStates.set(imageIndex, {
        scale: 1,
        translateX: 0,
        translateY: 0,
        lastDistance: 0,
        lastTouchX: 0,
        lastTouchY: 0,
      });
    }
    return this.imageZoomStates.get(imageIndex)!;
  }

  private getTouchDistance(touch1: Touch, touch2: Touch): number {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private getTouchCenter(
    touch1: Touch,
    touch2: Touch
  ): { x: number; y: number } {
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2,
    };
  }

  onTouchStart(event: TouchEvent, imageIndex: number): void {
    if (!this.breakpoint.isMobile()) return;

    const state = this.getImageState(imageIndex);

    if (event.touches.length === 2) {
      // Pinch zoom starting
      event.preventDefault();
      state.lastDistance = this.getTouchDistance(
        event.touches[0],
        event.touches[1]
      );
    } else if (event.touches.length === 1 && state.scale > 1) {
      // Pan starting (only when zoomed)
      event.preventDefault();
      state.lastTouchX = event.touches[0].clientX;
      state.lastTouchY = event.touches[0].clientY;
    }
  }

  onTouchMove(event: TouchEvent, imageIndex: number): void {
    if (!this.breakpoint.isMobile()) return;

    const state = this.getImageState(imageIndex);

    if (event.touches.length === 2) {
      // Pinch zoom
      event.preventDefault();
      const currentDistance = this.getTouchDistance(
        event.touches[0],
        event.touches[1]
      );

      if (state.lastDistance > 0) {
        const delta = currentDistance / state.lastDistance;
        let newScale = state.scale * delta;
        newScale = Math.max(this.MIN_SCALE, Math.min(this.MAX_SCALE, newScale));

        state.scale = newScale;

        // Reset position if zoom is back to 1
        if (newScale === 1) {
          state.translateX = 0;
          state.translateY = 0;
        }
      }

      state.lastDistance = currentDistance;
      this.cdRef.detectChanges();
    } else if (event.touches.length === 1 && state.scale > 1) {
      // Pan (only when zoomed)
      event.preventDefault();
      const deltaX = event.touches[0].clientX - state.lastTouchX;
      const deltaY = event.touches[0].clientY - state.lastTouchY;

      state.translateX += deltaX;
      state.translateY += deltaY;

      // Limit pan to reasonable bounds
      const maxTranslate = 100 * state.scale;
      state.translateX = Math.max(
        -maxTranslate,
        Math.min(maxTranslate, state.translateX)
      );
      state.translateY = Math.max(
        -maxTranslate,
        Math.min(maxTranslate, state.translateY)
      );

      state.lastTouchX = event.touches[0].clientX;
      state.lastTouchY = event.touches[0].clientY;

      this.cdRef.detectChanges();
    }
  }

  onTouchEnd(event: TouchEvent, imageIndex: number): void {
    if (!this.breakpoint.isMobile()) return;

    const state = this.getImageState(imageIndex);

    if (event.touches.length < 2) {
      state.lastDistance = 0;
    }

    if (event.touches.length === 0) {
      state.lastTouchX = 0;
      state.lastTouchY = 0;

      // If scale is close to minimum, snap back to 1
      if (state.scale < 1.1) {
        state.scale = 1;
        state.translateX = 0;
        state.translateY = 0;
        this.cdRef.detectChanges();
      }
    }
  }

  getImageTransform(imageIndex: number): string {
    const state = this.getImageState(imageIndex);
    return `translate(${state.translateX}px, ${state.translateY}px) scale(${state.scale})`;
  }

  isImageZoomed(imageIndex: number): boolean {
    const state = this.imageZoomStates.get(imageIndex);
    return state ? state.scale > 1 : false;
  }
}
