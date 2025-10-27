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
      lastTapTime: number;
      isZooming: boolean;
      currentQualityLevel: number;
      highQualityLoaded: boolean;
    }
  > = new Map();
  private readonly MIN_SCALE = 1;
  private readonly MAX_SCALE = 4;
  private readonly DOUBLE_TAP_DELAY = 300; // ms

  // Breakpoints para cambio de calidad de imagen
  private readonly QUALITY_BREAKPOINTS = [
    { scale: 1.0, quality: 1 }, // Calidad normal
    { scale: 2.0, quality: 2 }, // Calidad media
    { scale: 3.0, quality: 3 }, // Calidad alta
  ];

  // Cache de imágenes de alta calidad
  private highQualityImageCache: Map<string, string> = new Map();

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

    // IMPORTANTE: Limpiar cualquier estado de zoom residual
    this.imageZoomStates.clear();

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
      // Limpiar zoom states al cambiar de proyecto
      this.imageZoomStates.clear();
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        // Asegurar scroll al top después de que la vista se haya renderizado
        window.scrollTo({ top: 0, behavior: 'smooth' });

        this.setupPlantaObserver();
        this.fixImageHeights(); // Fijar alturas de imágenes para evitar cambios dinámicos
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

  /**
   * Fija el tamaño de la imagen principal SOLO en móvil para prevenir cambios dinámicos
   * cuando se muestra/oculta la barra de navegación del navegador
   */
  private fixImageHeights(): void {
    // Solo ejecutar en móvil
    if (this.fixedViewportWidth > 768) {
      return;
    }

    // Esperar a que el DOM esté listo
    setTimeout(() => {
      // Fijar la altura de la imagen principal del proyecto
      const projectLanding = document.querySelector(
        '.project-landig'
      ) as HTMLElement;

      if (projectLanding) {
        // Obtener el tamaño inicial del viewport
        const initialHeight = window.innerHeight;

        // Fijar el tamaño de manera definitiva SOLO en móvil
        projectLanding.style.height = `${initialHeight}px`;
        projectLanding.style.minHeight = `${initialHeight}px`;
        projectLanding.style.maxHeight = `${initialHeight}px`;

        // También fijar el host para evitar cambios en el contenedor principal
        const hostElement = document.querySelector(
          'app-project-detail'
        ) as HTMLElement;
        if (hostElement) {
          hostElement.style.height = `${initialHeight}px`;
          hostElement.style.minHeight = `${initialHeight}px`;
        }
      }
    }, 100);
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

  getGalleryImageUrl(imageSrc: string, imageIndex?: number): string {
    if (!imageSrc) return '';

    // Si tenemos el índice y hay zoom con alta calidad cargada, usar esa imagen
    if (imageIndex !== undefined && this.breakpoint.isMobile()) {
      const state = this.imageZoomStates.get(imageIndex);
      if (state && state.highQualityLoaded && state.scale > 1.5) {
        return this.getHighQualityImageUrl(imageSrc, state.currentQualityLevel);
      }
    }

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
        lastTapTime: 0,
        isZooming: false,
        currentQualityLevel: 1,
        highQualityLoaded: false,
      });
    }
    return this.imageZoomStates.get(imageIndex)!;
  }

  private resetZoom(imageIndex: number): void {
    const state = this.getImageState(imageIndex);
    state.scale = 1;
    state.translateX = 0;
    state.translateY = 0;
    state.lastDistance = 0;
    state.isZooming = false;
    state.currentQualityLevel = 1;
    this.cdRef.detectChanges();
  }

  /**
   * Determina el nivel de calidad necesario basado en el scale actual
   */
  private getRequiredQualityLevel(scale: number): number {
    for (let i = this.QUALITY_BREAKPOINTS.length - 1; i >= 0; i--) {
      if (scale >= this.QUALITY_BREAKPOINTS[i].scale) {
        return this.QUALITY_BREAKPOINTS[i].quality;
      }
    }
    return 1;
  }

  /**
   * Genera URL de imagen con calidad específica para zoom
   */
  private getHighQualityImageUrl(
    imageSrc: string,
    qualityLevel: number
  ): string {
    if (!imageSrc) return '';

    const cacheKey = `${imageSrc}_quality_${qualityLevel}`;

    // Verificar si ya está en caché
    if (this.highQualityImageCache.has(cacheKey)) {
      return this.highQualityImageCache.get(cacheKey)!;
    }

    let multiplier: number;
    let quality: string;

    switch (qualityLevel) {
      case 2:
        multiplier = 1.5;
        quality = 'q_auto:best';
        break;
      case 3:
        multiplier = 2.0;
        quality = 'q_auto:best';
        break;
      default:
        multiplier = 1.0;
        quality = 'q_auto:good';
    }

    const width = Math.floor(this.fixedViewportWidth * multiplier);
    const url = this.cloudinaryService.generateImageUrl(imageSrc, {
      width: width,
      crop: 'c_fill,g_auto',
      quality: quality,
    });

    // Guardar en caché
    this.highQualityImageCache.set(cacheKey, url);

    return url;
  }

  /**
   * Precarga imagen de alta calidad si es necesario
   */
  private preloadHighQualityImage(
    imageIndex: number,
    imageSrc: string,
    qualityLevel: number
  ): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const state = this.getImageState(imageIndex);

    // Solo precargar si no está ya cargada
    if (state.highQualityLoaded || qualityLevel <= state.currentQualityLevel) {
      return;
    }

    const highQualityUrl = this.getHighQualityImageUrl(imageSrc, qualityLevel);
    const img = new Image();

    img.onload = () => {
      state.highQualityLoaded = true;
      state.currentQualityLevel = qualityLevel;
      this.cdRef.detectChanges();
    };

    img.onerror = () => {
      console.warn('Error loading high quality image:', highQualityUrl);
    };

    img.src = highQualityUrl;
  }

  /**
   * Maneja el scroll fuera de la imagen para resetear zoom
   */
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (!this.breakpoint.isMobile()) return;

    // Resetear zoom en todas las imágenes si se hace scroll significativo
    this.imageZoomStates.forEach((state, imageIndex) => {
      if (state.scale > 1.1) {
        this.resetZoom(imageIndex);
      }
    });
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
      // Pinch zoom starting - SOLO prevenir cuando hay 2 dedos
      event.preventDefault();
      state.lastDistance = this.getTouchDistance(
        event.touches[0],
        event.touches[1]
      );
      state.isZooming = true;
    } else if (event.touches.length === 1) {
      // Single touch
      if (state.scale > 1.5) {
        // Solo prevenir scroll si hay zoom significativo
        event.preventDefault();
      }

      state.lastTouchX = event.touches[0].clientX;
      state.lastTouchY = event.touches[0].clientY;

      // Check for double tap
      const now = Date.now();
      const timeSinceLastTap = now - state.lastTapTime;

      if (
        timeSinceLastTap < this.DOUBLE_TAP_DELAY &&
        timeSinceLastTap > 0 &&
        state.scale > 1
      ) {
        this.resetZoom(imageIndex);
        state.lastTapTime = 0;
        event.preventDefault();
        return;
      }

      state.lastTapTime = now;
    }
  }

  onTouchMove(event: TouchEvent, imageIndex: number): void {
    if (!this.breakpoint.isMobile()) return;

    const state = this.getImageState(imageIndex);

    if (event.touches.length === 2) {
      // Pinch zoom - SOLO prevenir cuando hay 2 dedos
      event.preventDefault();
      state.isZooming = true;

      const currentDistance = this.getTouchDistance(
        event.touches[0],
        event.touches[1]
      );

      if (state.lastDistance > 0) {
        const delta = currentDistance / state.lastDistance;
        let newScale = state.scale * delta;
        newScale = Math.max(this.MIN_SCALE, Math.min(this.MAX_SCALE, newScale));

        state.scale = newScale;

        // Verificar si necesitamos cambiar la calidad de la imagen
        const requiredQuality = this.getRequiredQualityLevel(newScale);
        if (
          requiredQuality > state.currentQualityLevel &&
          this.data?.images?.[imageIndex]?.src
        ) {
          this.preloadHighQualityImage(
            imageIndex,
            this.data.images[imageIndex].src,
            requiredQuality
          );
        }

        // Reset position if zoom is back to 1
        if (newScale <= 1.05) {
          state.translateX = 0;
          state.translateY = 0;
        }
      }

      state.lastDistance = currentDistance;
      this.cdRef.detectChanges();
    } else if (event.touches.length === 1 && state.scale > 1.5) {
      // Pan SOLO cuando hay zoom significativo
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
    // Si es 1 dedo y scale <= 1.5, NO hacer nada - permitir scroll normal
  }

  onTouchEnd(event: TouchEvent, imageIndex: number): void {
    if (!this.breakpoint.isMobile()) return;

    const state = this.getImageState(imageIndex);

    if (event.touches.length < 2) {
      state.lastDistance = 0;
      // NO resetear isZooming inmediatamente - mantenerlo hasta que se confirme el final
    }

    if (event.touches.length === 0) {
      // All touches ended - manejar el estado final
      state.lastTouchX = 0;
      state.lastTouchY = 0;

      // Solo resetear isZooming después de un pequeño delay para evitar parpadeos
      setTimeout(() => {
        state.isZooming = false;
        this.cdRef.detectChanges();
      }, 100);

      // Reset zoom agresivamente si está cerca de 1
      if (state.scale < 1.2) {
        this.resetZoom(imageIndex);
      }

      // Forzar detección de cambios para actualizar las clases inmediatamente
      this.cdRef.detectChanges();
    }
  }

  getImageTransform(imageIndex: number): string {
    const state = this.getImageState(imageIndex);
    return `translate(${state.translateX}px, ${state.translateY}px) scale(${state.scale})`;
  }

  isImageZoomed(imageIndex: number): boolean {
    const state = this.imageZoomStates.get(imageIndex);
    // SOLO considerar "zoomed" si hay zoom significativo Y está activamente zooming
    return state ? state.scale > 1.8 && state.isZooming : false;
  }

  isImageZooming(imageIndex: number): boolean {
    const state = this.imageZoomStates.get(imageIndex);
    return state ? state.isZooming && state.scale > 1.2 : false;
  }
}
