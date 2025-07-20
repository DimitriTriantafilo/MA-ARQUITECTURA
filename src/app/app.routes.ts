import { Routes } from '@angular/router';
// import { ProjectDetailComponent } from './project-detail/project-detail.component';
// import { HomeComponent } from './home/home.component';
import { Project } from './app.component';
import { ProjectListComponent } from './@components/project-list/project-list.component';
import { NosotrosComponent } from './@components/nosotros/nosotros.component';
import { HomeComponent } from './@components/home/home.component';
import { ProjectDetailComponent } from './@components/project-detail/project-detail.component';

export const projects: Project[] = [
  {
    name: 'Reforma Migueletes',
    m2: '42',
    location: 'Colegiales',
    showImg: 'v1747070360/xaks7ffpmupmhqrs0xwc.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1747070360/xaks7ffpmupmhqrs0xwc.jpg',
    },
    images: [
      {
        src: 'v1747070361/yycsudwe33lpzzmtuqzt.jpg',
        rowSpan: 4,
      },
      {
        src: 'v1747070362/fvng0bg6ednkwp77safb.jpg',
      },
      {
        src: 'v1747070359/r5xduhgpwbdf69zwuxme.jpg',
      },
      {
        src: 'v1747070358/guw0kq7ammadmwj5nunj.jpg',
      },
      {
        src: 'v1747070355/xhzfknrhddwdsxqgawpx.jpg',
      },
      {
        src: 'v1747070356/qe3xqzbrry0zi6cukb0v.jpg',
      },
      {
        src: 'v1747070355/unbtgrxfkpsrnxv3bfmc.jpg',
      },
      {
        src: 'v1747070353/xb8m6kf6xhmxcfs4bpeg.jpg',
      },
      {
        src: 'v1747070352/ghxja1kt6ljtniurnxwg.jpg',
      },
      {
        src: 'v1747070353/wsebqq7du9a8xvtrc1p5.jpg',
      },
      {
        src: 'v1747070353/ab4nejhthqtyi2yruiwc.jpg',
      },
    ],

    description: 'hola',
  },
  {
    name: 'Reforma BNB',
    m2: '29',
    location: 'Parque Patricios',
    showImg: 'v1747137660/xzdrqiss0g7gjvwb7krk.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1747137660/xzdrqiss0g7gjvwb7krk.jpg',
    },
    rowSpan: 4,
    images: [
      {
        src: 'v1747137658/kc9soy8lwlnz8udcgxsq.jpg',
      },
      {
        src: 'v1747137657/rw4kewrndyix1fcmgaw6.jpg',
      },
      {
        src: 'v1747138404/mfvztcciazl1mer0rpcm.jpg',
      },
      {
        src: 'v1747138803/q8hjyxcao6dtfhp3iw6n.jpg',
      },
      {
        src: 'v1747137658/ffftkif5tkqxhidiqtcl.jpg',
      },
      {
        src: 'v1747138404/llz2ufvubih4kquumbmb.jpg',
      },
      {
        src: 'v1747137654/il6dr72dbbmmjchgmsw5.jpg',
      },
      {
        src: 'v1747137658/nymxr90aq2dinh7mr3s3.jpg',
      },
      {
        src: 'v1747137654/xxf7qwiofexsqcxf5vqx.jpg',
      },
      {
        src: 'v1747138405/syfuajj04ndfw9sia0le.jpg',
      },
    ],
    description: 'hola',
  },
  {
    name: 'Casa Igor',
    m2: '',
    location: 'Villa Ballester',
    showImg: 'v1747143609/qqe5bsjfzwd03max8c9x.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1747143609/qqe5bsjfzwd03max8c9x.jpg',
    },
    rowSpan: 4,
    images: [
      {
        src: 'v1747143603/e5iabncljah0gz0xwkfu.jpg',
      },
      {
        src: 'v1747143609/qqe5bsjfzwd03max8c9x.jpg',
      },
      {
        src: 'v1747143601/ra3tqmghwccjicaehtl6.jpg',
      },
      {
        src: 'v1747143602/genguao2dtakapztcs5r.jpg',
      },
      {
        src: 'v1747143601/ul9jqmf6lyddofzgrjs6.jpg',
      },
      {
        src: 'v1747143611/atbtlycobmt7i7bb9arc.jpg',
      },
      {
        src: 'v1747143601/oqwrawzslop8f7ghafg9.jpg',
      },
      {
        src: 'v1747143611/kbaps8ovcy3dkuei7kdu.jpg',
      },
      {
        src: 'v1747143600/je40eejmgvkd6z3djqzu.jpg',
      },
    ],
    description: 'hola',
  },
  {
    name: 'Reforma Rivera',
    m2: '',
    location: 'Villa Urquiza',
    showImg: 'v1747077944/lenbzej6vc7ro5raomzg.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1747077944/lenbzej6vc7ro5raomzg.jpg',
    },
    images: [
      {
        src: 'v1747077953/fkitclb294m4ctluhetg.jpg',
      },
      {
        src: 'v1747077951/a6zjawtwi3llw8awfzab.jpg',
      },
      {
        src: 'v1747077942/w8gxr0fbxpywdmq9scsl.jpg',
      },
      {
        src: 'v1747077943/ajrcuqy5uhele0umuf3v.jpg',
      },
      {
        src: 'v1747077941/tjwzx0k8jksungxrox4u.jpg',
      },
      {
        src: 'v1747079981/fyhv6ti7cczxjxbyygzg.jpg',
      },
      {
        src: 'v1747077941/ybfyzl50w78s5rx8soxa.jpg',
      },
      {
        src: 'v1747077940/geneftasykbhk98ue7rq.jpg',
      },
      {
        src: 'v1747077939/msw6baxm0d5ggbdpzvjh.jpg',
      },
      {
        src: 'v1747077940/zo3ypejyijjzr5c5ncph.jpg',
      },
    ],
    description: 'hola',
  },
  {
    name: 'Reforma Ayacucho',
    m2: '',
    location: 'Recoleta',
    showImg: 'v1747245990/cdpluavxjbgdb6mhjebp.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1747245990/cdpluavxjbgdb6mhjebp.jpg',
    },
    images: [
      {
        src: 'v1747073697/to3laei5fcy1nf8mopys.jpg',
      },
      {
        src: 'v1747073688/bhyoks5gm1epp2kgwln6.jpg',
      },
      {
        src: 'v1747073700/mfdhppqavacyj27rxklq.jpg',
      },
      {
        src: 'v1747073704/hsebzekpxim4thlxfbny.jpg',
      },
      {
        src: 'v1747073707/ikn5v2sg0m69qvtwq3wt.jpg',
      },
      {
        src: 'v1747073703/gsd7i6g5luyhaofsxide.jpg',
      },
      {
        src: 'v1747073686/hkhuxs0z0zuqugizh1tc.jpg',
      },
      {
        src: 'v1747073718/xog7x2igrydfa0q25spm.jpg',
      },
      {
        src: 'v1747076372/ec6r76rbx9cougkt1nc2.jpg',
      },
      {
        src: 'v1747076372/c7nv5sq89njdoliwlln4.jpg',
      },
      {
        src: 'v1747076524/ciqtkfoyir9svgbdh16j.jpg',
      },
      {
        src: 'v1747076524/xrt4viw2oodjf8ufs7d8.jpg',
      },
      {
        src: 'v1747076527/nsisxbt5zkbfozdpwvsb.jpg',
      },
      {
        src: 'v1747076525/prvwm98ro2meeve3tict.jpg',
      },
    ],
    description: 'hola',
  },

  {
    name: 'Consultorio Devoto',
    m2: '',
    location: 'Villa Devoto',
    showImg: 'v1747140741/kqv2bfmtj1objuywa253.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1747140741/kqv2bfmtj1objuywa253.jpg',
    },
    images: [
      {
        src: 'v1747140771/vp10nafthnmi4hitjkle.jpg',
      },
      {
        src: 'v1747140741/s1zflcupnj2r3nkkdy7d.jpg',
      },
      {
        src: 'v1747140741/cbkrgqcmjduyyg3cqlbg.jpg',
      },
      {
        src: 'v1747140764/nzflpy3onpsm9g7fho6v.jpg',
      },
      {
        src: 'v1747140770/xs1zbosgelx4r4gm70uo.jpg',
      },
      {
        src: 'v1747140770/et58yl27v3te2ldjkoec.jpg',
      },
      {
        src: 'v1747140772/jcwwry5yyfw6uyeueute.jpg',
      },
    ],
    description: 'hola',
  },

  {
    name: 'Reforma Guru',
    m2: '',
    location: '',
    showImg: 'v1747080530/mdpak2fkikue0mtmkxkl.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1747080530/mdpak2fkikue0mtmkxkl.jpg',
    },
    images: [
      {
        src: 'v1747080530/mdpak2fkikue0mtmkxkl.jpg',
      },
      {
        src: 'v1747080531/xwloy0zqtrxgdsgkgbjb.jpg',
      },
      {
        src: 'v1747080532/btirphuw4atudeissvgj.jpg',
      },
      {
        src: 'v1747080534/ua8mwn0cf6roz1hdvujd.jpg',
      },
      {
        src: 'v1747080532/gfzt35eatzfkuggs7tzh.jpg',
      },
      {
        src: 'v1747080540/lqu49uxglnfqtdvk9uv1.jpg',
      },
      {
        src: 'v1747248674/lnzs8hvn7sfi4eixhsik.jpg',
      },
      {
        src: 'v1747080531/ookl4k6zkuud9flovecx.jpg',
      },
      {
        src: 'v1747080542/n2srvzl0inrsx1u7yndm.jpg',
      },
    ],
    description: 'hola',
  },
  {
    name: 'Casa F',
    m2: '',
    rowSpan: 4,
    location: '',
    showImg: 'v1747144222/id7azvdhqntcf1kji9ng.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1747144222/id7azvdhqntcf1kji9ng.jpg',
    },
    images: [
      {
        src: 'v1747144132/upjnf83depf0scax2sao.jpg',
      },
      {
        src: 'v1747248418/neq6uwcbuapjyy4gav7c.jpg',
      },
      {
        src: 'v1747144215/tokwzsywjurmkjbs7xxi.jpg',
      },
      {
        src: 'v1747144968/xbgj74txhntr0picvhd3.jpg',
      },
      {
        src: 'v1747144969/xvfb0bxewna4synp1uye.jpg',
      },
      {
        src: 'v1747144970/jgk1vcclfziznl9qmxt5.jpg',
      },
    ],
    description: 'hola',
  },
  {
    name: 'Infanta Victoria',
    m2: '',
    location: 'Villa Ballester',
    rowSpan: 4,
    showImg: 'v1747246679/rrggfmn41sizjyoipk6e.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1747246679/rrggfmn41sizjyoipk6e.jpg',
    },
    images: [
      {
        src: 'v1747139337/ecsywkrh9gfg4523y73r.jpg',
      },
      {
        src: 'v1747139344/cb6vv7l6rksdq34b8juz.jpg',
      },
      {
        src: 'v1747139345/h5xvpoq0cuosucxat055.jpg',
      },
      {
        src: 'v1747139337/pi4jmhxkrovqqaxdupvc.jpg',
      },
      {
        src: 'v1747139340/ysqtyzk2eyvp9isiikln.jpg',
      },
      {
        src: 'v1747139343/tiy66g9aptrgeifobopu.jpg',
      },
      {
        src: 'v1747139340/i7xcmrnplq6whti9lttu.jpg',
      },
      {
        src: 'v1747139342/svsgvi5lceuirgl7euid.jpg',
      },
      {
        src: 'v1747139386/ydq9li1ujb3fk6bt0nzh.jpg',
      },
    ],
    description: 'hola',
  },
  {
    name: 'Reforma Segui',
    m2: '',
    location: '',
    showImg: 'v1747141705/uw6syhkdbs8uj2ccbity.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1747141705/uw6syhkdbs8uj2ccbity.jpg',
    },
    images: [
      {
        src: 'v1747141707/a3qryt4psy9fkadfzql0.jpg',
      },
      {
        src: 'v1747141711/elglwlylfcktuqajvcxc.jpg',
      },
      {
        src: 'v1747141705/wwcfro77d2zvrwk0se0v.jpg',
      },
      {
        src: 'v1747141707/njuf4ww6lzrenqcc9pak.jpg',
      },
      {
        src: 'v1747141708/wekjcrywboofyluzgydj.jpg',
      },
      {
        src: 'v1747141709/r23jtt2dix6velwype8b.jpg',
      },
      {
        src: 'v1747141708/krvuvy9q8gtnnr1c1dcj.jpg',
      },
    ],
    description: 'hola',
  },

  {
    name: 'Cocina Ugarte',
    m2: '',
    location: '',
    showImg: 'v1747142269/zj56bhsy0rmzdx0akxf9.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1747142269/zj56bhsy0rmzdx0akxf9.jpg',
    },
    images: [
      {
        src: 'v1747142269/zj56bhsy0rmzdx0akxf9.jpg',
      },
      {
        src: 'v1747142268/drxul3mlgkzomouyffqv.jpg',
      },
      {
        src: 'v1747142268/dv73ki51qfus84twar5q.jpg',
      },
      {
        src: 'v1747142269/sxsvdwqmhd4blmb130dc.jpg',
      },
      {
        src: 'v1747142266/j05qmj1wgntd6bzdv6ey.jpg',
      },
      {
        src: 'v1747142267/vvxfowj2xfbzo9erq6es.jpg',
      },
    ],
    description: 'hola',
  },

  {
    name: 'Reforma Ferreti',
    m2: '',
    location: '',
    showImg: 'v1747145251/gpnv7jqyzq09hbtimolj.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1747145251/gpnv7jqyzq09hbtimolj.jpg',
    },
    images: [
      {
        src: 'v1747145249/f2hxm8tsse8c3vzuoef8.jpg',
      },
      {
        src: 'v1747145256/jdsglb6hu39lh3tre4m6.jpg',
      },
      {
        src: 'v1747145251/gpnv7jqyzq09hbtimolj.jpg',
      },
      {
        src: 'v1747145250/cvl6unxgvpupnmfe7l3e.jpg',
      },
    ],
    description: 'hola',
  },
];

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'proyectos',
    component: ProjectListComponent,
  },
  {
    path: 'estudio',
    component: NosotrosComponent,
  },
  ...projects.map((project) => ({
    path: generateSlug(project.name),
    component: ProjectDetailComponent,
    data: { project },
  })),

  { path: '**', redirectTo: '' },
];

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
