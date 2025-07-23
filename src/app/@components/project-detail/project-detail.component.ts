import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../app.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
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

  @ViewChild('carrousel') carrouselRef?: ElementRef<HTMLDivElement>;
  private imageLoaders: Map<string, HTMLImageElement> = new Map();

  constructor(
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.data = this.route.snapshot.data['project'];
  }

  openCarrousel(imageIndex: number) {
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

    const imageUrl = this.generateImageUrl();
    const img = new Image();

    img.onload = () => {
      this.isLoadingImage = false;
      this.currentImageLoaded = true;
      this.cdRef.detectChanges();
      this.imageLoaders.set(imageUrl, img);
      console.log('loaded: ', this.isLoadingImage);
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
    if (!this.currentImageLoaded) return '';
    return this.generateImageUrl();
  }

  nextImage(): void {
    if (this.hasNextImage()) {
      this.isChangingImage = true;
      this.isLoadingImage = true;
      this.currentImageLoaded = false;

      setTimeout(() => {
        this.currentImageIndex++;
        this.isChangingImage = false;
        this.preloadCurrentImage(); // <-- Añade esta línea
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
        this.preloadCurrentImage(); // <-- Añade esta línea
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
}
