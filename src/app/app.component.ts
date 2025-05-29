import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './@components/topbar/topbar.component';
import { ProjectDisplayComponent } from './@components/project-display/project-display.component';
import { CommonModule } from '@angular/common';
import { NosotrosComponent } from './@components/nosotros/nosotros.component';
import { ProjectDetailDialogComponent } from './@components/project-detail-dialog/project-detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CloudinaryModule } from '@cloudinary/ng';
import { CloudinaryService } from './cloudinary.service';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    TopbarComponent,
    ProjectDisplayComponent,
    NosotrosComponent,
    CloudinaryModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showWelcome = true;

  constructor(
    private dialog: MatDialog,
    private cloudinaryService: CloudinaryService
  ) {
    setTimeout(() => {
      this.showWelcome = false;
    }, 6000); // Se oculta después de 3 segundos
  }

  ngOnInit() {
    this.optimizeProjectImages();
  }

  optimizeProjectImages() {
    this.projects = this.projects.map((project) => ({
      ...project,
      showImg: this.cloudinaryService.getOptimizedThumbnail(project.showImg),
      mainFeature: {
        ...project.mainFeature,
        link: this.cloudinaryService.getOptimizedDetailImage(
          project.mainFeature.link
        ),
      },
      images: project.images.map((img) => ({
        src: this.cloudinaryService.getOptimizedGalleryImage(img.src),
      })),
    }));
  }

  scrollToItem(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Asegúrate de que se ajuste el scroll en caso de que haya un encabezado fijo
      const headerOffset = 0; // Cambia este valor según la altura de tu encabezado
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }

  openProjectDetail(project: Project) {
    console.log(project);
    let dialogRef = this.dialog.open(ProjectDetailDialogComponent, {
      width: '100%',
      data: project,
      panelClass: 'full-width-dialog',
      maxWidth: '100%',
      enterAnimationDuration: '500ms',
      height: '100%',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  projects: Project[] = [
    // {
    //   name: 'Prueba 1',
    //   m2: '90m2',
    //   location: 'santa Teresa',
    //   showImg:
    //     'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //   mainFeature: {
    //     type: 'image',
    //     link: '12',
    //   },
    //   images: [
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       description:
    //         'Esta Imágen muestra la fachada del edificio, trabajado con mucho cariño por obreros apacionados, diseñado para el confort y etc',
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       description:
    //         'Esta Imágen muestra la fachada del edificio, trabajado con mucho cariño por obreros apacionados, diseñado para el confort y etc',
    //       rowSpan: 3,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       colSpan: 2,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       featured: true,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       colSpan: 2,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 4,
    //       colSpan: 1,
    //     },
    //   ],
    //   description: 'hola',
    // },
    {
      name: 'Reforma Migueletes',
      m2: '42m2',
      location: 'Colegiales',
      showImg:
        'https://res.cloudinary.com/dskkynwxb/image/upload/v1747070360/xaks7ffpmupmhqrs0xwc.jpg',
      mainFeature: {
        type: 'image',
        link: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747070360/xaks7ffpmupmhqrs0xwc.jpg',
      },
      colSpan: 2,
      images: [
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747070361/yycsudwe33lpzzmtuqzt.jpg',
          rowSpan: 4,
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747070362/fvng0bg6ednkwp77safb.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747070359/r5xduhgpwbdf69zwuxme.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747070358/guw0kq7ammadmwj5nunj.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747070355/xhzfknrhddwdsxqgawpx.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747070356/qe3xqzbrry0zi6cukb0v.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747070355/unbtgrxfkpsrnxv3bfmc.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747070353/xb8m6kf6xhmxcfs4bpeg.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747070352/ghxja1kt6ljtniurnxwg.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747070353/wsebqq7du9a8xvtrc1p5.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747070353/ab4nejhthqtyi2yruiwc.jpg',
        },
      ],

      description: 'hola',
    },
    {
      name: 'Reforma BNB',
      m2: '29m2',
      location: 'Parque Patricios',
      showImg:
        'https://res.cloudinary.com/dskkynwxb/image/upload/v1747137660/xzdrqiss0g7gjvwb7krk.jpg',
      mainFeature: {
        type: 'image',
        link: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747137660/xzdrqiss0g7gjvwb7krk.jpg',
      },
      rowSpan: 3,
      images: [
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747137658/kc9soy8lwlnz8udcgxsq.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747137657/rw4kewrndyix1fcmgaw6.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747138404/mfvztcciazl1mer0rpcm.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747138803/q8hjyxcao6dtfhp3iw6n.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747137658/ffftkif5tkqxhidiqtcl.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747138404/llz2ufvubih4kquumbmb.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747137654/il6dr72dbbmmjchgmsw5.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747137658/nymxr90aq2dinh7mr3s3.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747137654/xxf7qwiofexsqcxf5vqx.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747138405/syfuajj04ndfw9sia0le.jpg',
        },
      ],
      description: 'hola',
    },
    {
      name: 'Casa Igor',
      m2: 'm2',
      location: 'Villa Ballester',
      showImg:
        'https://res.cloudinary.com/dskkynwxb/image/upload/v1747143609/qqe5bsjfzwd03max8c9x.jpg',
      mainFeature: {
        type: 'image',
        link: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747143609/qqe5bsjfzwd03max8c9x.jpg',
      },
      rowSpan: 3,
      images: [
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747143603/e5iabncljah0gz0xwkfu.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747143609/qqe5bsjfzwd03max8c9x.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747143601/ra3tqmghwccjicaehtl6.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747143602/genguao2dtakapztcs5r.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747143601/ul9jqmf6lyddofzgrjs6.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747143611/atbtlycobmt7i7bb9arc.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747143601/oqwrawzslop8f7ghafg9.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747143611/kbaps8ovcy3dkuei7kdu.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747143600/je40eejmgvkd6z3djqzu.jpg',
        },
      ],
      description: 'hola',
    },
    {
      name: 'Reforma Rivera',
      m2: 'm2',
      location: 'Villa Urquiza',
      showImg:
        'https://res.cloudinary.com/dskkynwxb/image/upload/v1747077944/lenbzej6vc7ro5raomzg.jpg',
      mainFeature: {
        type: 'image',
        link: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747077944/lenbzej6vc7ro5raomzg.jpg',
      },
      images: [
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747077953/fkitclb294m4ctluhetg.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747077951/a6zjawtwi3llw8awfzab.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747077942/w8gxr0fbxpywdmq9scsl.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747077943/ajrcuqy5uhele0umuf3v.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747077941/tjwzx0k8jksungxrox4u.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747079981/fyhv6ti7cczxjxbyygzg.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747077941/ybfyzl50w78s5rx8soxa.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747077940/geneftasykbhk98ue7rq.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747077939/msw6baxm0d5ggbdpzvjh.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747077940/zo3ypejyijjzr5c5ncph.jpg',
        },
      ],
      description: 'hola',
    },
    // {
    //   name: 'Prueba 2',
    //   m2: '90m2',
    //   location: 'santa Teresa',
    //   showImg:
    //     'https://res.cloudinary.com/dx5amezzl/image/upload/v1740494264/casa_linda_p30hjf.jpg',
    //   mainFeature: {
    //     type: 'image',
    //     link: '12',
    //   },
    //   images: [
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       description:
    //         'Esta Imágen muestra la fachada del edificio, trabajado con mucho cariño por obreros apacionados, diseñado para el confort y etc',
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       description:
    //         'Esta Imágen muestra la fachada del edificio, trabajado con mucho cariño por obreros apacionados, diseñado para el confort y etc',
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 2,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       featured: true,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //   ],
    //   description: 'hola',
    // },
    {
      name: 'Reforma Ayacucho',
      m2: 'm2',
      location: 'Recoleta',
      showImg:
        'https://res.cloudinary.com/dskkynwxb/image/upload/v1747245990/cdpluavxjbgdb6mhjebp.jpg',
      mainFeature: {
        type: 'image',
        link: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747245990/cdpluavxjbgdb6mhjebp.jpg',
      },
      images: [
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747073697/to3laei5fcy1nf8mopys.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747073688/bhyoks5gm1epp2kgwln6.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747073700/mfdhppqavacyj27rxklq.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747073704/hsebzekpxim4thlxfbny.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747073707/ikn5v2sg0m69qvtwq3wt.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747073703/gsd7i6g5luyhaofsxide.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747073686/hkhuxs0z0zuqugizh1tc.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747073718/xog7x2igrydfa0q25spm.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747076372/ec6r76rbx9cougkt1nc2.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747076372/c7nv5sq89njdoliwlln4.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747076524/ciqtkfoyir9svgbdh16j.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747076524/xrt4viw2oodjf8ufs7d8.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747076527/nsisxbt5zkbfozdpwvsb.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747076525/prvwm98ro2meeve3tict.jpg',
        },
      ],
      description: 'hola',
    },

    {
      name: 'Consultorio Devoto',
      m2: 'm2',
      location: 'Villa Devoto',
      showImg:
        'https://res.cloudinary.com/dskkynwxb/image/upload/v1747140741/kqv2bfmtj1objuywa253.jpg',
      mainFeature: {
        type: 'image',
        link: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747140741/kqv2bfmtj1objuywa253.jpg',
      },
      images: [
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747140771/vp10nafthnmi4hitjkle.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747140741/s1zflcupnj2r3nkkdy7d.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747140741/cbkrgqcmjduyyg3cqlbg.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747140764/nzflpy3onpsm9g7fho6v.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747140770/xs1zbosgelx4r4gm70uo.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747140770/et58yl27v3te2ldjkoec.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747140772/jcwwry5yyfw6uyeueute.jpg',
        },
      ],
      description: 'hola',
    },

    {
      name: 'Reforma Guru',
      m2: 'm2',
      location: '',
      showImg:
        'https://res.cloudinary.com/dskkynwxb/image/upload/v1747080530/mdpak2fkikue0mtmkxkl.jpg',
      mainFeature: {
        type: 'image',
        link: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747080530/mdpak2fkikue0mtmkxkl.jpg',
      },
      images: [
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747080530/mdpak2fkikue0mtmkxkl.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747080531/xwloy0zqtrxgdsgkgbjb.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747080532/btirphuw4atudeissvgj.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747080534/ua8mwn0cf6roz1hdvujd.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747080532/gfzt35eatzfkuggs7tzh.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747080540/lqu49uxglnfqtdvk9uv1.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747248674/lnzs8hvn7sfi4eixhsik.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747080531/ookl4k6zkuud9flovecx.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747080542/n2srvzl0inrsx1u7yndm.jpg',
        },
      ],
      description: 'hola',
    },
    {
      name: 'Casa F',
      m2: 'm2',
      colSpan: 2,
      rowSpan: 3,
      location: '',
      showImg:
        'https://res.cloudinary.com/dskkynwxb/image/upload/v1747144222/id7azvdhqntcf1kji9ng.jpg',
      mainFeature: {
        type: 'image',
        link: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747144222/id7azvdhqntcf1kji9ng.jpg',
      },
      images: [
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747144132/upjnf83depf0scax2sao.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747248418/neq6uwcbuapjyy4gav7c.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747144215/tokwzsywjurmkjbs7xxi.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747144968/xbgj74txhntr0picvhd3.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747144969/xvfb0bxewna4synp1uye.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747144970/jgk1vcclfziznl9qmxt5.jpg',
        },
      ],
      description: 'hola',
    },
    {
      name: 'Infanta Victoria',
      m2: 'm2',
      location: 'Villa Ballester',
      colSpan: 2,
      rowSpan: 3,
      showImg:
        'https://res.cloudinary.com/dskkynwxb/image/upload/v1747246679/rrggfmn41sizjyoipk6e.jpg',
      mainFeature: {
        type: 'image',
        link: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747246679/rrggfmn41sizjyoipk6e.jpg',
      },
      images: [
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747139337/ecsywkrh9gfg4523y73r.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747139344/cb6vv7l6rksdq34b8juz.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747139345/h5xvpoq0cuosucxat055.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747139337/pi4jmhxkrovqqaxdupvc.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747139340/ysqtyzk2eyvp9isiikln.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747139343/tiy66g9aptrgeifobopu.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747139340/i7xcmrnplq6whti9lttu.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747139342/svsgvi5lceuirgl7euid.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747139386/ydq9li1ujb3fk6bt0nzh.jpg',
        },
      ],
      description: 'hola',
    },
    {
      name: 'Reforma Segui',
      m2: 'm2',
      location: '',
      showImg:
        'https://res.cloudinary.com/dskkynwxb/image/upload/v1747141705/uw6syhkdbs8uj2ccbity.jpg',
      mainFeature: {
        type: 'image',
        link: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747141705/uw6syhkdbs8uj2ccbity.jpg',
      },
      images: [
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747141707/a3qryt4psy9fkadfzql0.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747141711/elglwlylfcktuqajvcxc.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747141705/wwcfro77d2zvrwk0se0v.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747141707/njuf4ww6lzrenqcc9pak.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747141708/wekjcrywboofyluzgydj.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747141709/r23jtt2dix6velwype8b.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747141708/krvuvy9q8gtnnr1c1dcj.jpg',
        },
      ],
      description: 'hola',
    },

    {
      name: 'Cocina Ugarte',
      m2: 'm2',
      location: '',
      showImg:
        'https://res.cloudinary.com/dskkynwxb/image/upload/v1747142269/zj56bhsy0rmzdx0akxf9.jpg',
      mainFeature: {
        type: 'image',
        link: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747142269/zj56bhsy0rmzdx0akxf9.jpg',
      },
      images: [
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747142269/zj56bhsy0rmzdx0akxf9.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747142268/drxul3mlgkzomouyffqv.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747142268/dv73ki51qfus84twar5q.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747142269/sxsvdwqmhd4blmb130dc.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747142266/j05qmj1wgntd6bzdv6ey.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747142267/vvxfowj2xfbzo9erq6es.jpg',
        },
      ],
      description: 'hola',
    },

    {
      name: 'Reforma Ferreti',
      m2: 'm2',
      location: '',
      showImg:
        'https://res.cloudinary.com/dskkynwxb/image/upload/v1747145251/gpnv7jqyzq09hbtimolj.jpg',
      mainFeature: {
        type: 'image',
        link: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747145251/gpnv7jqyzq09hbtimolj.jpg',
      },
      images: [
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747145249/f2hxm8tsse8c3vzuoef8.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747145256/jdsglb6hu39lh3tre4m6.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747145251/gpnv7jqyzq09hbtimolj.jpg',
        },
        {
          src: 'https://res.cloudinary.com/dskkynwxb/image/upload/v1747145250/cvl6unxgvpupnmfe7l3e.jpg',
        },
      ],
      description: 'hola',
    },
    // {
    //   name: 'Prueba 3',
    //   m2: '10m2',
    //   location: 'santa Teresa',
    //   showImg:
    //     'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQA/AMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAIDBAYHAQj/xABKEAACAQMDAQYCBwQGCAQHAQABAgMABBEFEiExBhMiQVFhFHEjMkKBkaHRBxWxwRYzUnKy8CRDYnOCkqLhRFOT8Sc0RWODwtIX/8QAGgEAAwEBAQEAAAAAAAAAAAAAAAECAwQFBv/EAC8RAAICAQQBAgMGBwAAAAAAAAABAhEDBBIhMVETQSIy8BRSYZHR4QUjM0JxgcH/2gAMAwEAAhEDEQA/AMrrl3bd2ttbJ/osLtskcAgHHAx7j19KCrOk9mHKCQxhVkWRuuMY2/eTj2Bqa5HxFoUhdgbZsCHw48uV8zn0Of5VFLoV5Famd12P4WKA5PiBI/w9Pf7q2dtma4JTJazz3NrDmHMYYSljjcFOePfBFV5bS7bSYLuONjCkfLryB1ANV3k2TbtrIXUY++jlpBqk+gXDxN3VmAWBXndgHg/5/DzXZRb0Wa0vbNtMe2aXbGu4x8HOeR5dBV2+sk1IJJp7RZijTvZJlyWbkhSxPO0BhgevyrMNazxor27ZLrvBV+VwOQflRPs7qU1uxLTNEiuskimPeCcbc8c85/hTT9mIJ9mImsNTiluLlLdGbG1gR15XGegODyPauj2t3a3RY2lxHNtPOxs1htX1LT1kaApG9nKoYKnjeGQcqxPpk88c8UI0W2uba+ltYDLGly2EnTCuuPFgc4PoflWkZbCWjr3fsOBkcedUNU1/92L9IsbOwATc+MHPn+fNLs9LcXto3xYUyrglkXA5yQPwwc+eaZqugG91SyugAY0DCTIByuD4efIkj8/Wtm+CQVYa9D2lF1crZuUtImUBSGLN1VlPqCMiuZm1vtStbK4jjjePukRzHxtIwvPPsPuo/q1hqmiay76fKbZmXvUgjfCE55HPQ+xzVbsnqUcE0KKAqXEUAlMgwMBgenmT6+f5Vzyd9miIp7l7PW4ZbbdcIvdyNGM7QQuDyPPqT8/eutaHqEWoIRt7q5QfTQk5KH7vbH4iuZy3Mt9rV3JDaW1uUm7wOvgL89MgnAwAP+EVs+zdrJFJBfQuiXM02y4UKwWcfM55AOeODx6cuL9hNG1RABzVWeLJJFEY4OG205bU93yeSfSqUqFRhO23eW/Z68kjLqwAHhIGfY+1cebv2RviGZCcbFYnx4OAMfea6z2gF/f39zE7BLKAlTC1wF7049MfqD5dMVznVe8vFUyspto1LiVTwF3bc8cjp8/apyOxrgL6DqDGFdKit+7sZZds0kgy7AjgegX/ALVUu7600n4q17hpBcNtZ9wLRYAAXd58cenGPKvNPa4XSWWytUfeymOVz9bB+fPJ64p6xRL3yGdphEWkCkZChs+Fm6HrkmhN0A21hsWspY7OJpZVI71yQT4sgAZHSqGu2KWbwxSiRu8XfkKBuPnn9K0Wk2enyXotTJO80IctN3e1CrFQpHsDnOfPnjoKWvFO0WrxJYsXWFe6jWYbCzLySc9c0PoAn2LWOG+u7aF8lo0kwDkgemeg+XlW2t7cjJYedcmhsdQsifg5llDKDOIGK9eQAcYPkeK6r2R1JtX01XlikWWHakjyLjecdQPKtcc+KJcQlFBkcCpmtyq81fgjTHNK4QY8NVvCgLKtVZMgGiTqCSTxVOdUGMnNaohg7xM3A4pk8XGfOrbFVHhGKqzybqtMlooOuKi5qzsL+VPFscD9KLCjkMtvexl7qe3nVgw8YTwk+X3nrRdNeefTpIZo4ZGyVifkujBQd2fMZP8AnFE9P0C4/dlw9xc913YBkEkbeAYwcevQVnr+xeyaRoLiCYAHAiYElfM/iK8+tqs6OympLyW/fyHb3SCPvBgAZ9en35q2Lmb9y7Yblu7B3SQBwQo9So5H317ZTWB+EF5brIogljY5IIOMhgfUEYqy2lQx9mlvmLrcs2zu/I8+X/epGVJrcQIzd6pK9AhJDA+ft1p9v3ccgn3/AHg8qfL2zz+VV5QYCwCjBGW5OPlTNssm3YRnb0x5D+JqWBrtKuI72Fofh7eSaOMkwnwGRSfrL5+Hgn9KIaTDLbiSdI44o1ncxm4YbQ+7gbjz+XOayukTm0aF3K27LICtwqndEM8keXnXRuydvaalpqpkd+d4kBTaCpbjp59OPKtYcslhLsp+8ZNZnkuLpWhaJcxN9ZcdR05xkDjzx61ZbtBPHqk1sLYSKsLSKF4JCg/VJwrdPUYrQaZaW9nAlvawiKNR9UVmu0FhPaaol0yRS280jbkJPhTb1z5c/wCLitRGNnlGn61DLc95LaXB3lpWI2k8qTjIAHXj0qt2fstGutDszPO8d93Vu0TPwAQVyRnjg59qMasHvNTt4bpEhUKVZYGDoAABjJGAT1+7NLSLCCLstbXqQzQJ8FHI4kOQWVhggeuB1rFrkoJwdkpnmfv7Z5XuJVdpZIMBevBxyox0JyOeT5DaaZpc2lQLbpO0kEaAIrLynsD6VU7IdobXVdJjeyneUQ4idpE2kkAEflWijy43M2fal1yBFaByC32R1qG+1SG2Dws6rc7C0auh2t9/4Zq65SNMMPCxwRXNtXu7i37SRTmOcWmwmERlcyDJwOBnnPFLsaB3aBm1q1M9zp0cNrGXkedCG3vjZjIP35PpWTnnsU0SGHuZGtEiYrI6gOJARhT7Hpg48j5VsdMLsuqX3aCWMWdzM1uYHGFDh8DIx15HX0oP22vNN/djadpU8cji4wx4HPJ49eAc/wDemxAzTNUnVLtG04vZiIPEVbaVzjBJ/lU9lqy2kUWIUuHP04XcFZ9x3AZzyu0g5NHf2bfEPcXFrqO9mEe+NnG0nw8e4AHGKES3lhY2lnBe24aVowyKgyNhxjnyO0LmgdBeeKLSNJt9UnRozeygPbLhmVjywyCRzgfKoorDR9S1rTZ5RcWtw30kcCx7l8POGbGB9U81pLk22uWOjJFEhhljllUHO1CiqOT16O34ChHaLWNP0zS7iJZjO0rYhgRt23jgE/2TzxVkl6HTHtheyRJ3zSoFtoym1FI6FsDHvgZNO7Cw31olzbXiuwD7u9dwxYn5D8M+Q96xb61Ommw3HxN9DZTyMsYL5JyeSSOAPTyronZy4i/d0CxvEzKoLiNtwBqotNiYfTI5pk8g2nnmmC4B4qC456GrSEU55Gxx61Ei7wS1TOnHNQuCo4rVMmiGaNVHvVCRSWq8wZz0NJLUseQaHNIKKsUW1ulWdufKrkdjI/Crx61aXTJQo4rN5EPacQk1/ULK3aFJI45mDxypEgOffnPXrxU9nbWPaJRFDEsdzwsbKhCOc+YzwBxkeZBPpQlktbuE9xOBKx3JEFK84xtz0+/8q0nYv4aytVv++/0sAiSAIFdUBzuVvqk4P1eSfbFcybfZrQGvNOuLfQZp/DsgumjJHVGHh8+ed35iqMdzPLaTwxswgi2MVPPn0FaDV5Yrvs/qtxFIwjkvgyo3GVLx9Aec5/I02C0VOz2u3DjwiGGMKMeE5Bz+dJ/NwNDdX0YfHQoxiSFlDju1PCEkcD08P50OvLOKG5SKyWTbJtKu7HAyOc/xHPnWgvngXtJJHcBVtFAiOVYlMZyARnAyePbFerBJp9xqEs1o4iRtj58aMQFIPPGNr+WD86KTEZEO+C/B2cn0KngrnyJ/jXR+wl/HpFhJcX0yQo7kR7psgnzAGM/M0IbVLDTGurZLeKR+6Xa5G3Izypzx55B/HFWOzegy6ppk4aKV3lDPFJKoVVkzyAR09yKuCUXwSzqVtfieJXjZWUgMHU5Bqw00dxGYrlA8Z+yelZTsy0tjp/w80JdlJwkcexUIOGBY9eeeM9amfWZ45CkktipB4GGJx+NaSnBfMJRk+i/Po8UlxO9vBbLPdFd0kkQYBRxgDjPB4BPWglvaXyfs+hBuFxBBtWMDwvh/tZznpRCPWpgcrLZHnP2v1qlaXFzBo37uNxaSZLfSFWBOXLdM+9ZPLj8lqE/Be7F6ImlS6hDbCX4d2VhuGBnrxznPiI5Hl1A4rYwKyDHlWVXtDdKeDZexw361J/SW6PRbTI8xuqXlh5RXpy8Gl1O0F9p09qxcCVCvgcqefcVx+6vLqfXbXS5JMXOmKyNcpIVJQA4UkcjHHP5em8Paa8xwLTPly3X8axusaE2p3r3Yure3mk3bzGj/AEufXmo9SH3kGyXgzkWrmHT/AIO4vhJGZJSXdN2SSCgTOdwJDE5oxoMGh3EN1qssDyRI2JVYBWOQAcDk5weMY/KlddkYpo4VW8t0ZFAZzGTuOCuQM8ZGOnp86uaLo0+k/DgXlpcNA5O6WNl3g9BgN645p+pHyGyXgyGk60LHVYbqEzxGOPhdxZnbb555Ck+ldA0LS01S3t5j8JseNRImN5Y4UL6ehPtwOlAp+ysM7lzLArCPYpVGBBwBuPt7Ua0K2i0O1ZLT4RZwMLMsjZHzBzk+9G+Pke2Xgu9oxZ6FFY28mO6WO476NGzldqDA5z6dT0BrLajpul6vFc6tbRXNxJamPMMRUODnjgD6v3UUlsRJq9vfzXNmwSGSORCSe9LjBZvwH4fOpraOG2vbieKW3+kHEbSMFXgemOOPzp+pHyLZLwZ6Ts6mqCdl05o2SZ+kzbCfJcEZxzx/7UR/ZxaXGnXmo2MsRCoeWXJXI+Z/zitHBq628JSNLTvCu0yB24GcnA8qpWl9cWupTXZezYycKhVhtGAMdcZ4zn7qI5YL3E4S8B1rmJbgW5cd6ei+dT5ZxyMVk3uLg3/xQubRR3m7btbP459qJnXZPrGWxB9CH/Wtlng/cn05eAz3RbpUq2DsOBQJO0pjPMunH7n/AFqyvbEIMbrA/Iv+tJ5fDDZXaDEemYOSKtJaBR0FZ3+mYJ5exH/E1XNF16bVbxIYDaum76Rk3HaPxqNzfY6QaEJHQV4beUnILUUKrGg4+6otzHkKuP71SmB8xve2twVljSOzutpMnd/1b/d70PtZpFkMplt2ERLhJsgcH0Hka8kt3j2qwOGHUqf8n5/KrK6c7Qo5iJUghS3RuvGR/nio3NsdEs2pJNpDJNCve3M4lVl47obhkY8xgdPLmj0FyJtLvrcxDEt1aLnPQEAD+FZS5iKRWqKP6t2VvTHHSr8lzM2oPFAjsryRnYE3E7emP51SYzsOrdmYdWUblkQd8DkeE4GMg44/CgvaK3stIsLm3khijljEZhZ5NwlY7lw3z2D86O6VeakbaOSeSTfIgLiUABT6HzOP8mqUx021upLtYI571ySzqgHn6+XWtXRC7Mwmg6lr2orcz2S2cXhEpbjeAeQMeWPP5VptMtLTQdPWyS4kuFU57vd4cny9PuqGe+nuBgvtj/sL/nmoxwOePnWbb9jRQvstz300ibV2pGPspwKE3hXG/wAxVwqzDCLn3qFrMu43+dYSwym+ToU4wXAIt+0ulxzPDNcqsinBG0nH4UZTtD2f2gfHr/6T/pXOYNPE/aXVU8klXPsOf0ru1nomlNbx+CT6g8Jkb0+dcOo00YtWdGLPJoxx7R6ATiO9J9hC/wCnzp0PaTQYpleSfegOWUxOMj8K00WhWJ1+7BjbAs4MfSN/blq2/Z7TSjq0BORjlya5ngh+P5/sa+q39fuY9u0eiSpJcrL3dsHC7xGxUE9BnFO/pHoUYz8WefSF/wBKtWWmwRJ8CI/ol1GEFQ3TwNn+FHNU0WwjsJSIT1X7Z/tCplpoJrv6/wBAszMxP2m0WFN7zSAD7TQOB7c4qfTNc0zVI2ks3eVAdpZImIz6dKJ9p9B079x3ZSFg6oGHjaqP7HLNP3A7bE5uGOfwraGlisbkjKeZ7i9qF3Zpp+4W8yFMs7mNuRj5VkLrtXpa52mbHkTEw/lXYtSt0ewnXjmNh+RrAwWDtbRBZNqLEo6H0+dTKChPaxwnuXBjD2s05mI3vn+4av2ev6VKFMkzKGGcd0xOOnkKnaznjs1dGG3BxyfWrPYnTbWe4kM8W8m3DHkjnvHz0olDG4t+DRTkqHw63okbKzSSFQeR8PJ//NNuu0fZ5pC8UzKDztET8flWp1TSrBdNfZD9UjHiPB3DpzUz6Lp7ctb5JH9tv1rlqC8/mv0K3yv6/U583aXSprg29lIZZApJGwjj7/uqGXUFY8Iw+6oG0+FP2lXsMSYj+HbAznn6OjsmnID9Wvc02ljsTRwZc8raYCa8Q9VP/LUE19HGudrY+VHX09RnwUM1CwUJjbgk4rpeFxRhvsowyy3jqIxtQnGTXUOw9kNP0uW67ssQpJ5xk1jdL0/YFP2mwBir3artPPosY0e3i+ieH6QNJ9YH1xz08sihKkKbOiXusW9tJBCPpJJv6vadwPHX5VHLrem2793cajarIB4gJOhrg93qt3c7Xubl2xgIgOAo8hgfzrxdR2qAkUWAOSwBJNNMzs2dx2X0W6wzalcbgCPG3GDk+nvVWPsPp6xd3BrOxTwwI3ZPzz/nmrS2+s9e5Lf3oGH8KRXUx9e2j/5HFcC1OT7qO77PDyyKDsFbSb4pby2kgfBAWMl0IIOUYsdp49+M0bextez9uX0zSGnlPV+pP95uv5fhQbvbpT4rdAfaXb/EVbg1nUYMBI2IH2e9DfyrWOqa+aJEtP4ZQudSvrxz8SzKP/Kibaq/d1P31HHuDNueTk5A2A4GB5ijTdobO48OpaTI7ebhV/WnQ2+g3sw+Dvnt5z0hlJU/g3X7q6IZoS9zJwlH2B0IkY+FlH96M/rV+2gkJbeIiA2OJM5/KiZ066t0+jXvB6xsM/gf1qHvFEhWV2RieBLCRn5ZHP3V0RjF8mbmxJHwQsJA/wBkj9aYgU8gPw3/AJZq0oTOGaIf3lK1Vg7rYfHD9c/6z3+dWkhXZznT8L2w1UeIhpl42/7Xn+ddqS3bvre6Td3Qgwy7GycflXEoHEfa/VD4f64dfnXcbIx/AwqJIcmPp3mM15+sipQR04G42yjDqEC9oL0MzgrZwAqQcjxy8/KiDX8O3J3EcdFJ61gtdmSLtffbNrH4KEYByB45KuWeuLa2xS6sbefxACUZB69DXGtM5RTs2eRJhEYXWJQittfUIGGQePo3o1rEo+CnXEn1kPMZH2h+lZu0vIrjWBJEsaL8db8K3H9W9E+0VzD+7L2RnjkX4kBPETgeHp+dVPDbUSVP3CWrSxzaZdxFXBeJh9Q88Vnv2PyhezJ8Lczt0Un0qnqmpoyutsqBAhywckHj8qd+yWRP6NNkop79uHbB6Ct44HCDiyHNSfB0G+u1FrONsnETN/Vt6etc8mvVht4AZJlBReik54FbO/kj+EuMvEPoH/1nsfesDdKstla7JEJ2r9sf2fnXDqo1JM6dOlVA9dRk3BYncKE80PqfeifZfUI7W7y2/L23khOfpHz/ABoVb28bNnwHMY+17n3q3oqKb6MArgWrfa/+41ZJ/BJvwb7VvSNPq+s27adMqiUfVwTGf7QqT+kEEsipEswJO0ZQjmhOsJGuny5aPPH2z6ivbS1czRSLFlO+bxDOPrGsoSxyRu8cUZWxuTcftEu55QQzQN4QCf7A/nWzcIw5WTPn4DWN02HZ+0C4EqhPosYbj7Udbh1iHR4h/wDkr6XA1sSR4WRXJg19jllCPkc4KHz/APaqMsQkuMlWCoM/UNED3fxEoMkWdqkfSfP3rwxRiKU74slD/rPb51WWXFChEguLqPT9PuL0qdkEJkGRjLdFHPuQK5fdajc3bb7uV5pdoUu5yTWv7eXXw3Zy2tQwDXLqxIP2EAP+LH4Vgd5ccAEA4zWLJlyyw0pzhvyr1HOODF94qpIxX2HHXimrIw4x+YpE0dcOu9qrZcnTbRx6rIw/lQ5v2h38QKyWWnnxc4vMEf8ATWhAxIG2pkZxznyq3o/ZjSo9Rt54bRVkZWJbex5I9CcevlXh48ik6kj2JRcY2jJ//wCj3AHi0yJv7t0p/SpD+0TvFXfobnH9mWI5/OjDdldMvrq4muYn73vSCVfA446UMXsZpE2tX0Bik2RRxFcPzznPl7VvF4aszayHsXbe0m8MnZ64+eI2/gat/vzSrxdr9nLrn6wFqCD91QN+zzRychrpP7rr/Nao6x2V0jRLMXDy6hKruEx3sSY6+ZQVO7FN0impxVhM6vp9spNtb6zY48ktnKf8pBH4VDJ2/gtlPxDm5T7StavEx+4jBp/Y6Oxazv8A4aOcRho//mGVzk+mBXmo6ZDLJuCB49w+sq1nDUPHkcEJ44zjbRZ0ztj2Y1HZ3FybOX+wTsA+7p+VFYprBQCNRYg85JHOfurm1xpEPJkhhbz2lOKp9nrcy9tRpbTXEdo0JcxwzMnITI5FepHVSqzklgSN5/Rjs4b2e9+JmE9w26RhN18/StMt9F3IjW/4C7QeMgfhXK+zCXV8t/3t3M3c3jxqWcngUZubG6gsLmWO5mBSF2B3nyBqpOclyrISUemayew0+5vJrua7laWeEQv9JxtU5GOOOp5pDT7AQmCS8umibBIllJJ59fMe1VbDsWJrWF217WtzoCcXAx5dOKF6voM+nai1vFrGryRiFH5u8YJLjrt9hXNLVqC6So2WFydWw1HY6bDu238xPeCQl33EkAgckejGp3Nk8MkTaiwR8EgEDp08qwmp215bRROl5qTMZUHivNwHiGcjbz1oHdDUYp5VF1IwVjz3j5/xUR1CyVNJDeNwe22dXuDp91bPBLfsUkGGwQP5UtDh0/QLL4XTLsxwFi30h3c/MiuY29petcNG13PwccSv+ta3SezD3cEwk1DUPopGUETNwM0T1rXDQlp15NbJq8UkbrJqKbXUqcAdD18qDNZaK2A+q3BC8Ad8en4Vl9T0K5gumii1G9K7cjL5PWh1zYXNnIVF7dOGjBOZCCAXA4PlxULULI+Yot4ZQ6Zt/wB2aGf6u/uF8uJj+lT21lpEBDJfSb1Tuwd/OCSfT3NBoNGgaBmN3qqN5INRPP8A0UIW0CbzLdaucSOBt1DA4/4KxWuwu6SNfsuW+2b8zWkqSqboFTgkhfq859OK8l1G2P19SOOeMD1+VYPS7c3msRWUN1qab4pGcS3feKQMYxwKuX+g3MTYF3OR7ua6cKx5I/DBHPlUoSpthlYNCh1mTVVvXF5Iu1pN/GOPLH+yKvNq2nE4OrgEdRuH6VynW3u9L1qKMPLKr2zNsPiGd2M4JxUDaqZE2NI8UhOd3cbc+3h4rtTkuEqOak+Tq3x2l5LjUwWIGfEP0qGXWtKRGRtXTBHIMi/pXHO677cst8Zyw4DSkYPr5VUe0nt3baksg8mABBFPe32Kn7Gn7Z6jbXurILZxNBaxLGhDZBHWgqurNvAYFR5GqG7ZyVZOMe9eLJtdOcEjpzz+FRdslklwW3lQcnHnyRXiyKVHOPanyNlRIMA4GM5B/jVRwxY+I/hVIaO5i4Utjw558/arWqdobnRLu0h+FDB1+ikRN2cj58nrxx0oNBNumXKY3edH7vutbubGCRCqx7jKHyuY+m78QQDXgxqL5PYy8xJtAuk1OGSeNHUFySSOM55wfuplopHaTU/9zD/+1FtKa3S2ZLYx7A7ABTkYzWb1PW4dH7R6g01vLIrQw8x44+tWuPG5JpdmcpbabNFgnrWb7fQRSaEvfjwi4TqceRHvVO17cCd5EWJEkAO1XThsdPFniit/b3PabsnFJC0VrLJh3JO5UwfEMj5Hmm8TxyW7gampxbRnux2xLXU0hYsu+PBIx0z60YEIZiSMYYefWhGkothaTxx3CXETd26SwsSrg56E81eguFPGWALDOWrCUP5jZUflKOoW4UNjf0P2az3ZtP8A4lJ/uW6/7qjV7PuZxFExGDyeKC6Ce4/aD8TL4YI4n3Oeg+i9a7Y/03fg58r5QU7ARBk1U4/+oy/xrU6jAP3PfnH/AIaT/CaCdgolWPUSDkPeO649DzWs1NAND1A4/wDCy/4DXqxa9Nf4OJrk0Wh2gNjbtKP9WuF+4UE7T2sL63JxtItYiMf3pKnsdfuIbOAjSrlwsagkFT5D3oRqWq/HapNOYZoNsMSEMMYOZT/KvF1uO9PKuzr0+VLMrM/2jjmmNoITtRJgX9+VxQPU7U/H3GcDxn0rSahC08G/xuInQnHI+uvWhmqMVv7lBzhz0J4rLRutOkdWdXlZJbqkV3J4/teZFbTs/J9HejPSdv41jJDieRtzZ3etHuz10R8duIAM5AyfOpyKnuJS9ixeyCC9kddu7bg5HvWc19u9LvgDEK9PPxijl7MHmZuD8hnzoDr8gjsLqcAEx24bb06PmnpW3IvKkohrSXEbM7+JiMDPlVGa2jkilkH1xcOfzFPiL9ws8al9ygqicliegFDotcsoFuI7qOYEXDg4xweuK8pYMtyo7nONp2W+yMQHa61EmM9xNx6/VrX6zaISWUfdWQ7MajY3Xam0FnuZu5lYluMDC1uL07h719L/AA+MljVnj6tp5Gca7djuu0Vnxz8IxwT0G40FMmMMYyfdCGB/CtX23tRL2jgJYIBZnxHyO40AFqsihFmV/wC6MZNd0pxujkRQAikhPRvupaha21o1oY9yhs78eZxUs2nqWJSRVboQarXUN1KEXcCFBAwD6UuAsq3SlgOGZ84GecCq5CwEgEM2cAFeBViAXCMFlUFQT1449cedVHeWOZzIrYLEjK8Y+dKg4LkcRmjDd0rADAwx5NSKCihcMMcYDioba+APVefIeVTnUo8nwGgfBuNUurrT499tHIzpy0jDwIvyyM1lh2puLi6eFg1ysxICSEspyfnxx99a1tTnJwltCo9G5zWftNHt7W/W8Qnvg5k+twCfbFebGOL+9nRky/FaZv8AswNJstNiF1dNFc7cOtrJJtHOQPD/AN6G69D8Vqt1JYRXk0Dxx4YxOxJGc/W59Krr2g1WMgR3Kj5JXh7Qagc/6acnrtArPG44p7o/9DJljkjTPdG0BhMs13b6ijK25Vitx+ZP6VqJbeSOWJtPt7u2gVDutwqiNic8ldy5PNZA6xek5N7N+NRPqk7DBupmx/tmjJL1ZbpBDNHGqijRzWlxNPcNMvcIyqF5XPh9tx9fWqrQxQcmWWRgc5IUCs7JdSMcmRz82qPvZGH1mI9zQlH8QeqfgKXKg5+u3zaszrUGriXv7BiyswXu1UeHA65oidx6jP8AxV6I+BuQY+dbRnBdqzKWVyC3Zm9fRbZonCy94wbdLLjHAGPPNaT+kFvfWc9tK9vAk0bR7zLnGQRnGPesSFjC5EYYj8qfHIqjAAx6bR+tXLVSqkiVI0tsGgVIx2tjG1cAbX6f+pV20ljt7l7lu0NlPKyKmZrd3AAJIx9L/tGsmtweqqM+WAKRuW815+Yz+Fcrd9o19dmvv9UiuLdoG1jT+7dlMgisyrHDA8HvDjpQq8bTpJJJRdIS7knDY/lQTvSoJBDZ65ArwvuH1c0JpKkg+0PwGGksJHYteRpnnmSgnae4urS0V9Iu0lladnKoBxkcGnA5OSij7xSZVdTuRST7Zppx942J6iTVUXNNvDNZx/E3qi4K5ky20AnnHSpZ1guLK4t5b6FBOuzeTvxyPLFC1hRR9lceWKQRD4u7QA/7NVGcIu1EPXk1QW0m0g0+UTJqmnSsrhwZrAEqfYhgfzpfAabLNNK+rWpaVy7lY5V5PyloQY0J+qPuGKSpGDxGKHLG/Zgs8kaPSrex0zU4b5dThmMSMndYkH1sc5Z29PSjNz2ijbhFhYe0v/asGUiJyYx+NNKRqPb51rDOo9WTLJu7Q/tuLnVnW5s0AkjVV7tTu3eLOc8evSqHZ22ENq8uqQOLiQkbTkKqjpxVxk3DBbr79KYbVHGCxI9M1c8mOa5sysdJHZgfQ4HyNV2dVPDLj0IxXjWkUYxg49AKaYkHQZ++sofD0wbZDcyRFQGxgnBC5P8AGoZEhkBKiMenJT+FTuiDgp+dRmKNh5g10RysW4qR6fbTS91c28SA8icEnPscYqu+gOGOyKR18jHIcfwq+1uB0bPypoWVeEmkUeiuRWiyhuCBcBd245+Rrw3BIBGQPlVbK/Zw3zzTy7dNqgewrn9NBZL34U5yRS74nnnH3VX8QPBP40/lhjJI88mnsQrH/EMM5zXofeAfP3pgZRwMEe5qRWHl/CjaAtzH7P317llXgZNetI3lmmBj1wc+xxRtAem/7TNj2FP3HoGY49ajEm0ccfM04SkgZP480bRkiqcfWNMLYbAJxTTLj7Q/Commbf8Aa/CltAsLIcnAzivdzkZPFQq+3oDu9XPWkbgtwy/gKNoWTjcfM16zFV6nNQKxHiB49K8Lsxxtz99G0OScuvmOfSvMtn6px7VCSwGNv4mmoMt0UUbA5LRf1LAe9NMmT4SzVAfENpb78V4IUXxISCPWjYBP3pz0Ofc16HY/ZI++os7hn0pcP5/9VGwZMhyMliT6UiV6Z5+dR7h1IwfavDKDxk4/vUbAJQSBgDIpu7B+sQfSoviEB25pPMhPAFGxCHmQg85psk6Y6Y4pnejyH4UwyE/VzT2iPTKrHA201wc/2aX1jlhmombPkce1FAOHPUYPqKawbJzg0wuQx5P40t6+Z5ppCLG0b+lNlYofCaVKqA9jcsCeMinkkYwevJpUqYCByDwKSDwnrSpUhkZZs4yakRi0qoemOo60qVAxzqMjivW6UqVICPA70L5GnRgFjnn515SpgOxkD0B6V6zFVIAArylQNETSt607A2586VKgBIMcivMlic17SoAfEgPXP401/A+1elKlSJI5WbdgMQMVG0jDpxSpUAeF2J5NOzSpUAeuOvtUTHivaVADcn1p8MzjdzSpUAPZywyaYBk0qVMGMkOCeBXgGa8pUEH/2Q==',
    //   mainFeature: {
    //     type: 'image',
    //     link: '12',
    //   },
    //   images: [
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       description:
    //         'Esta Imágen muestra la fachada del edificio, trabajado con mucho cariño por obreros apacionados, diseñado para el confort y etc',
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       colSpan: 2,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       colSpan: 2,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //   ],
    //   description: 'hola',
    // },

    // {
    //   name: 'Prueba 4',
    //   m2: '2km',
    //   rowSpan: 3,
    //   location: 'santa Teresa',
    //   showImg:
    //     'data:image/jpeg;base64,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',
    //   mainFeature: {
    //     type: 'image',
    //     link: '12',
    //   },
    //   images: [
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       description:
    //         'Esta Imágen muestra la fachada del edificio, trabajado con mucho cariño por obreros apacionados, diseñado para el confort y etc',
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       colSpan: 2,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       colSpan: 2,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //   ],
    //   description: 'hola',
    // },

    // {
    //   name: 'Prueba 4',
    //   m2: '2km',
    //   colSpan: 2,
    //   location: 'santa Teresa',
    //   showImg:
    //     'data:image/jpeg;base64,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',
    //   mainFeature: {
    //     type: 'image',
    //     link: '12',
    //   },
    //   images: [
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       description:
    //         'Esta Imágen muestra la fachada del edificio, trabajado con mucho cariño por obreros apacionados, diseñado para el confort y etc',
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       colSpan: 2,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       colSpan: 2,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //   ],
    //   description: 'hola',
    // },

    // {
    //   name: 'Prueba 1',
    //   m2: '90m2',
    //   location: 'santa Teresa',
    //   showImg:
    //     'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //   mainFeature: {
    //     type: 'image',
    //     link: '12',
    //   },
    //   images: [
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       description:
    //         'Esta Imágen muestra la fachada del edificio, trabajado con mucho cariño por obreros apacionados, diseñado para el confort y etc',
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       colSpan: 2,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       colSpan: 2,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //   ],
    //   description: 'hola',
    // },

    // {
    //   name: 'Prueba 1',
    //   m2: '90m2',
    //   rowSpan: 3,
    //   location: 'santa Teresa',
    //   showImg:
    //     'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //   mainFeature: {
    //     type: 'image',
    //     link: '12',
    //   },
    //   images: [
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       description:
    //         'Esta Imágen muestra la fachada del edificio, trabajado con mucho cariño por obreros apacionados, diseñado para el confort y etc',
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       colSpan: 2,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       colSpan: 2,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //   ],
    //   description: 'hola',
    // },

    // {
    //   name: 'Prueba 1',
    //   m2: '90m2',
    //   location: 'santa Teresa',
    //   showImg:
    //     'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //   mainFeature: {
    //     type: 'image',
    //     link: '12',
    //   },
    //   images: [
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       description:
    //         'Esta Imágen muestra la fachada del edificio, trabajado con mucho cariño por obreros apacionados, diseñado para el confort y etc',
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       colSpan: 2,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       colSpan: 2,
    //     },
    //     {
    //       src: 'https://img.freepik.com/vector-gratis/casa-encantadora-ilustracion-arbol_1308-176337.jpg',
    //       rowSpan: 3,
    //       colSpan: 1,
    //     },
    //   ],
    //   description: 'hola',
    // },
  ];
  title = 'ma-arquitectura-landing';

  isHidden = false;
  lastScrollTop = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > this.lastScrollTop) {
      // Scrolling Down - Ocultar
      this.isHidden = true;
    } else {
      // Scrolling Up - Mostrar
      this.isHidden = false;
    }

    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Evita valores negativos
  }
}

export interface Project {
  name: string;
  m2: string;
  location: string;
  showImg: string;
  mainFeature: {
    type: 'image' | 'video';
    link: string;
  };
  images: Image[];
  description: string;
  rowSpan?: number;
  colSpan?: number;
}

export interface Image {
  rowSpan?: number;
  colSpan?: number;
  src: string;
  description?: string;
  featured?: boolean;
}
