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
    name: 'BNB',
    m2: '29',
    location: 'Parque Patricios',
    year: 2023,
    showImg: 'v1747137660/xzdrqiss0g7gjvwb7krk.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1747137660/xzdrqiss0g7gjvwb7krk.jpg',
    },
    rowSpan: 3, // Ocupa 2 filas según el diseño
    images: [
      { src: 'v1747137658/kc9soy8lwlnz8udcgxsq.jpg' },

      { src: 'v1747137657/rw4kewrndyix1fcmgaw6.jpg' },

      { src: 'v1747138404/mfvztcciazl1mer0rpcm.jpg' },

      { src: 'v1754400082/ylf5ruj0vt5xzb4se2ju.jpg' },

      { src: 'v1747138803/q8hjyxcao6dtfhp3iw6n.jpg' },

      { src: 'v1747137658/ffftkif5tkqxhidiqtcl.jpg' },

      { src: 'v1754399217/l8mbc8gx3eanorwebmt3.jpg' },

      { src: 'v1747138404/llz2ufvubih4kquumbmb.jpg' },

      { src: 'v1747137654/il6dr72dbbmmjchgmsw5.jpg' },
      { src: 'v1754400083/lnsotxqxbcqx7rq3h1q6.jpg' },

      { src: 'v1747137658/nymxr90aq2dinh7mr3s3.jpg' },

      { src: 'v1754400083/cv1wjrt0bl4xrrpg7aws.jpg' },

      { src: 'v1747137654/xxf7qwiofexsqcxf5vqx.jpg' },

      { src: 'v1747138405/syfuajj04ndfw9sia0le.jpg' },

      { src: 'v1754400083/eb55eqkui7bu7aumeocc.jpg' },
    ],
    description:
      'Este monoambiente en el barrio de Caballito, destinado a alquiler temporario, fue concebido para integrar de forma armónica y confortable las áreas de dormir, comer, trabajar y estar en un único ambiente, optimizando al máximo su funcionalidad. Se diseñó una plataforma integral de madera de inspiración japonesa que incorpora cama y sofá con guardado inferior, resolviendo la ausencia de placard. El área de trabajo se ubicó junto a un muro, con módulos de almacenamiento y espacio de colgado adicional. La pureza de líneas, la sencillez formal y la atención al detalle, combinadas con texturas cálidas de madera, configuran un estilo Japandi contemporáneo, equilibrado y acogedor, ideal para un uso residencial',
    descriptionEn:
      'This studio apartment in Caballito neighborhood, designed for temporary rental, was conceived to harmoniously and comfortably integrate sleeping, dining, working and living areas in a single space, maximizing its functionality. An integral wooden platform inspired by Japanese design was designed, incorporating a bed and sofa with lower storage, solving the lack of wardrobe. The work area was located next to a wall, with storage modules and additional hanging space. The purity of lines, formal simplicity and attention to detail, combined with warm wood textures, create a contemporary, balanced and cozy Japandi style, ideal for residential use.',
    plantaSrc: 'v1755786054/broeewc34haztfuuvcri.png',
  },

  {
    name: 'REFORMA MIGUELETES',
    nameEn: 'MIGUELETES RENOVATION',
    m2: '42',
    location: 'Colegiales',
    year: 2024,
    showImg: 'v1747070360/xaks7ffpmupmhqrs0xwc.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1747070360/xaks7ffpmupmhqrs0xwc.jpg',
    },
    rowSpan: 2, // Ocupa 2 filas según el diseño
    images: [
      { src: 'v1747070360/xaks7ffpmupmhqrs0xwc.jpg' },

      { src: 'v1747070361/yycsudwe33lpzzmtuqzt.jpg' },

      { src: 'v1747070362/fvng0bg6ednkwp77safb.jpg' },

      { src: 'v1747070359/r5xduhgpwbdf69zwuxme.jpg' },

      { src: 'v1754398164/efkgazr2lcvntdnxqgzp.jpg' },

      { src: 'v1747070358/guw0kq7ammadmwj5nunj.jpg' },

      { src: 'v1754398087/g0zj4am5hofhbxkg4she.jpg' },

      { src: 'v1747070355/xhzfknrhddwdsxqgawpx.jpg' },

      { src: 'v1747070356/qe3xqzbrry0zi6cukb0v.jpg' },

      { src: 'v1754398038/c4ueeffq8uhxcndolsvg.jpg' },

      { src: 'v1747070355/unbtgrxfkpsrnxv3bfmc.jpg' },

      { src: 'v1747070353/xb8m6kf6xhmxcfs4bpeg.jpg' },

      { src: 'v1754398479/qjsj7hrbufkaamin2skc.jpg' },

      { src: 'v1747070353/wsebqq7du9a8xvtrc1p5.jpg' },

      { src: 'v1747070353/ab4nejhthqtyi2yruiwc.jpg' },
    ],
    plantaPreviaSrc: 'v1755786105/khmzqngtdf4uxkjsmb9y.png',
    plantaSrc: 'v1755786123/gzmzzmnioaepnhd2lmxo.png',
    description:
      'Este departamento de dos ambientes fue intervenido para ampliar tanto su espacio físico como su percepción visual. Se integró el balcón a la cocina, generando mayor luminosidad y una sensación de amplitud en el living-comedor. En el dormitorio, se incorporó un placard a medida y un maquillador con espacio de guardado adicional. La selección de tonos tierra y madera en los muebles y muros unifica el conjunto, consolidando el estilo mediterráneo buscado.',
    descriptionEn:
      'This two-room apartment was intervened to expand both its physical space and visual perception. The balcony was integrated into the renovation, generating greater luminosity and a sense of spaciousness in the living-dining room. In the bedroom, a custom wardrobe and a makeup area with additional storage space were incorporated. The selection of earth tones and wood in furniture and walls unifies the whole, consolidating the sought-after Mediterranean style.',
  },
  {
    name: 'AYACUCHO',
    m2: '140',
    location: 'Recoleta',
    showImg: 'v1747245990/cdpluavxjbgdb6mhjebp.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1747245990/cdpluavxjbgdb6mhjebp.jpg',
    },
    rowSpan: 2, // Ocupa 1 fila según el diseño

    images: [
      { src: 'v1747073706/uhzeusfutead2r7aq9bb.jpg' },

      { src: 'v1747073688/bhyoks5gm1epp2kgwln6.jpg' },

      { src: 'v1747073700/mfdhppqavacyj27rxklq.jpg' },

      { src: 'v1747073704/hsebzekpxim4thlxfbny.jpg' },

      { src: 'v1747073707/ikn5v2sg0m69qvtwq3wt.jpg' },

      { src: 'v1754411408/hux0k92gr78fqsa0qglv.jpg' },

      { src: 'v1747073703/gsd7i6g5luyhaofsxide.jpg' },

      { src: 'v1747073686/hkhuxs0z0zuqugizh1tc.jpg' },

      { src: 'v1747073718/xog7x2igrydfa0q25spm.jpg' },

      { src: 'v1747076372/ec6r76rbx9cougkt1nc2.jpg' },

      { src: 'v1747076372/c7nv5sq89njdoliwlln4.jpg' },

      { src: 'v1747076524/ciqtkfoyir9svgbdh16j.jpg' },

      { src: 'v1747076524/xrt4viw2oodjf8ufs7d8.jpg' },

      { src: 'v1747076527/nsisxbt5zkbfozdpwvsb.jpg' },

      { src: 'v1747076525/prvwm98ro2meeve3tict.jpg' },
    ],
    plantaPreviaSrc: 'v1755785779/v0obc3siwuvf3ayf4kup.png',
    plantaSrc: 'v1755785797/p9w9h9japwlhk0rldvpz.png',
    description:
      'Este departamento de época en Recoleta fue renovado integralmente para optimizar funcionalidad, luminosidad y confort. La cocina se reconfiguró para integrar todos los elementos, ganar almacenamiento y unificar el espacio con una paleta blanca. El baño intermedio se amplió y el de la suite se modernizó con revestimientos símil Calacatta y pisos símil cemento. Los muebles en madera otorgan la calidez necesaria. Además se resolvieron necesidades de almacenamiento y confort en las áreas de living y dormitorios. En estos últimos, se reubicaron tomacorrientes y se diseñaron muebles específicos complementándolos con los existentes para optimizar el uso cotidiano y la armonía espacial',
    descriptionEn:
      'This period apartment in Recoleta was completely renovated to optimize functionality, luminosity and comfort. The renovation was reconfigured to integrate all elements, gain storage and unify the space with a white palette. The intermediate bathroom was expanded and the suite one was modernized with Calacatta-like coverings and cement-like floors. Wooden furniture provides the necessary warmth. In addition, storage and comfort needs were resolved in the living and bedroom areas. In the latter, outlets were relocated and specific furniture was designed, complementing the existing ones to optimize daily use and spatial harmony',
  },
  {
    name: 'CASA WIM',
    nameEn: 'WIM HOUSE',
    m2: '225',
    location: 'San Andrés de Giles',
    year: 2025,
    showImg: 'v1754942701/ipo4oxlyv7kdjxz4gt4r.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1754942701/ipo4oxlyv7kdjxz4gt4r.jpg',
    },
    rowSpan: 3,
    description:
      'Ubicada en un entorno rural, Casa WIM fue proyectada con una fuerte intención de abrirse al paisaje y aprovechar al máximo las orientaciones naturales. Una gran galería se convierte en el elemento articulador del proyecto, conectando todos los espacios interiores y permitiendo que el exterior forme parte activa de la vida diaria. El lenguaje mediterráneo, con sus líneas simples y materiales nobles, le otorga a la casa una identidad moderna, pero a la vez profundamente arraigada al espíritu del campo. Los interiores dialogan con el entorno a través de una estética limpia y atemporal, generando una atmósfera serena y luminosa, donde el verde se vuelve protagonista. Casa WIM es un refugio contemporáneo que valora lo esencial: la conexión con la naturaleza, la funcionalidad de los espacios y la calidez del habitar.',
    descriptionEn:
      'Located in a rural environment, Casa WIM was designed with a strong intention to open up to the landscape and make the most of natural orientations. A large gallery becomes the articulating element of the project, connecting all interior spaces and allowing the exterior to be an active part of daily life. The Mediterranean language, with its simple lines and noble materials, gives the house a modern identity, but at the same time deeply rooted in the spirit of the countryside. The interiors dialogue with the environment through a clean and timeless aesthetic, generating a serene and luminous atmosphere, where green becomes the protagonist. Casa WIM is a contemporary refuge that values the essential: connection with nature, functionality of spaces and the warmth of living.',
    images: [
      { src: 'v1754942701/ipo4oxlyv7kdjxz4gt4r.jpg' },

      { src: 'v1754942700/cnlbng5zeuldvats1dep.jpg' },

      { src: 'v1754942701/icfe2sf9zjxyee0pmbwn.jpg' },

      { src: 'v1754942701/alm76iyqszg3dog59vl6.jpg' },

      { src: 'v1754942706/znslysdvx8wxarqjyc9g.jpg' },

      { src: 'v1754942706/qwttfs7bu4zjs0nuxdy9.jpg' },

      { src: 'v1754942700/k6m1txwyfcebsdlbsfeq.jpg' },

      { src: 'v1754942705/kj4frxsxpzmcopquyecw.jpg' },

      { src: 'v1754942699/hywldvagdoinyqgslxz3.jpg' },

      { src: 'v1754942700/t3l4wwzbzuyy3odaoa15.jpg' },

      { src: 'v1754942700/s7ihoop183rmfzei7e4d.jpg' },

      { src: 'v1754942700/zrzcc72idrzugljdb7lb.jpg' },

      { src: 'v1754942699/qaxo5j19r0abkk0y74mi.jpg' },

      { src: 'v1754942699/m8k8rmsxt7poc0ef6cv3.jpg' },

      { src: 'v1754943728/i4rpc8xbzbqlkycyqgkz.jpg' },

      { src: 'v1754943742/hlr9gyihxhudrkeuirnz.jpg' },

      { src: 'v1754943728/kxv87yobg7pqhrfj0ybz.jpg' },

      { src: 'v1754943730/x64hqjz7yvee6wcr8pk4.jpg' },

      { src: 'v1754943740/untubdcypuwcr8z3yaju.jpg' },

      { src: 'v1754943732/gfzazt0d2zblsyjp3ixv.jpg' },

      { src: 'v1754942710/kgqwwhhsxxpevnytvu2s.jpg' },
      { src: 'v1754942707/xebsg3obuupbdhvs1coy.jpg' },

      { src: 'v1754942708/nocavyuqifu3zthpt6wm.jpg' },

      { src: 'v1754942709/eyphrb92glngxmenfmv2.jpg' },

      { src: 'v1754942709/dkqjzoxwupgqeeldevbq.jpg' },

      { src: 'v1754942710/kedil1adxxk2c2gzao0g.jpg' },

      { src: 'v1754942714/vh2jatbl5c4qbqqyrkkd.jpg' },

      { src: 'v1754942713/n662j67ihbtgolxhzzgt.jpg' },

      { src: 'v1754942712/uef2jxgeqxgeqau2b3wz.jpg' },

      { src: 'v1754942712/uef2jxgeqxgeqau2b3wz.jpg' },

      { src: 'v1754942716/uwoajkisacvyuao7kbep.jpg' },

      { src: 'v1754942712/ef0otkazazyvtney9tgr.jpg' },

      { src: 'v1754942710/zbmioplqxhxgmuejdabd.jpg' },

      { src: 'v1754942711/rio5nkpmjmvxtxp2dqte.jpg' },
    ],

    plantaSrc: 'v1755786648/o6xjd9pty6fmovr82uki.png',
  },

  {
    name: 'REFORMA SANFER',
    nameEn: 'SANFER RENOVATION',
    m2: '104',
    location: 'San Fernando',
    year: 2025,
    showImg: 'v1754488157/ok303c1bzfm14dtmio5i.jpg',
    rowSpan: 3,
    mainFeature: {
      type: 'image',
      link: 'v1754488157/ok303c1bzfm14dtmio5i.jpg',
    },

    images: [
      {
        src: 'v1754488157/ok303c1bzfm14dtmio5i.jpg',
      },

      {
        src: 'v1754489409/frmnllkumg1734je5ut2.jpg',
      },

      {
        src: 'v1754487768/vvhf2vjt1iuersw5egzq.jpg',
      },

      {
        src: 'v1754487771/joysxd5ffba0xlcleonl.jpg',
      },

      {
        src: 'v1754487765/zy0tga7kyoecvu7mwddz.jpg',
      },

      {
        src: 'v1754487765/yynekfoj1uofvqw5qbpn.jpg',
      },

      {
        src: 'v1754426272/y4wu2k4zhdgojclsei8f.jpg',
      },

      {
        src: 'v1754487763/zqgo3mrij8k7gwjqd1tv.jpg',
      },

      {
        src: 'v1754487765/jkprj2zetiapdfikkws6.jpg',
      },

      {
        src: 'v1754426259/hgwhwj3gfs79vkoezeqe.jpg',
      },

      {
        src: 'v1754487771/zvn2bcfdv7hf6akui5cz.jpg',
      },

      {
        src: 'v1754487757/dcqy8qi6dgpovlyw3fka.jpg',
      },

      {
        src: 'v1754487768/p2lrhf4ybqkeo1e478uf.jpg',
      },

      {
        src: 'v1754487757/hbdr3zsej1luysswncok.jpg',
      },

      {
        src: 'v1754487754/jxizdwfwqbwhawct9qa9.jpg',
      },

      {
        src: 'v1754487757/vm6fbgbxv167iqunibck.jpg',
      },

      {
        src: 'v1754487766/hhsre4d3jqgkzemta6in.jpg',
      },

      {
        src: 'v1754487758/benkloncyfayusf2a5zs.jpg',
      },
    ],
    plantaSrc: 'v1755785968/argb0r1hhjunblffnnym.png',
    plantaPreviaSrc: 'v1755785951/ip5pn2xzcn8c0wkkprxw.png',
    description:
      'Este departamento en San Fernando fue sometido a una transformación integral. La cocina se amplió e integró con el lavadero, permitiendo incorporar al interior las vistas panorámicas de la ciudad. La paleta cromática seleccionada aporta serenidad y modernidad, reforzando la luminosidad del conjunto. En el baño en suite, la reubicación estratégica de los artefactos permitió incorporar una doble bacha y optimizar su funcionalidad a la vez que se potenció la amplitud mediante el uso de tonos claros. El baño intermedio y el toilette mantuvieron la coherencia cromática, incorporando porcelanato símil terrazo que añade textura y tridimensionalidad a los espacios.',
    descriptionEn:
      'This apartment in San Fernando underwent a comprehensive transformation. The renovation was expanded and integrated with the laundry room, allowing the incorporation of panoramic city views into the interior. The selected color palette brings serenity and modernity, reinforcing the luminosity of the whole. In the en-suite bathroom, the strategic relocation of fixtures allowed the incorporation of a double sink and optimize its functionality while enhancing spaciousness through the use of light tones. The intermediate bathroom and toilet maintained chromatic coherence, incorporating terrazo-like porcelain that adds texture and three-dimensionality to the spaces.',
  },

  {
    name: 'RIVERA',
    m2: '35',
    location: 'Villa Urquiza',
    showImg: 'v1754406923/wyy8nbmmub32u1vmbdnk.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1754406923/wyy8nbmmub32u1vmbdnk.jpg',
    },
    rowSpan: 2, // Ocupa 1 fila según el diseño

    images: [
      { src: 'v1754406923/wyy8nbmmub32u1vmbdnk.jpg' },

      { src: 'v1754406924/jllskno9sjoua1kivsyh.jpg' },

      { src: 'v1754406923/h8cc8wtprf66rcm1haof.jpg' },

      { src: 'v1754406923/xbptcyaf4xmsfifasgfq.jpg' },

      { src: 'v1754406923/udajnmvodc0eukoisb37.jpg' },

      { src: 'v1754406924/atkswrjoiqgcj0vdirlu.jpg' },

      { src: 'v1754406924/zunefg6jiwf4h2ckugko.jpg' },

      { src: 'v1754406925/ml4be44odcc5covaeol2.jpg' },

      { src: 'v1754406925/e99rbcnrdh2qbocmjchp.jpg' },

      { src: 'v1754406923/pexpwa9agkyoqzohqumn.jpg' },

      { src: 'v1754406925/vffb0tdyjutdzz5i1ior.jpg' },

      { src: 'v1754406925/i5nirr5mfokil4msc94z.jpg' },

      { src: 'v1754406925/c7ckpdq8r6d0kuzxizij.jpg' },

      { src: 'v1754406925/kfjalqbqttmw6gqnm4zc.jpg' },

      { src: 'v1754406924/mdfft5fzn0rowm2nh4km.jpg' },

      { src: 'v1754406924/kc7bl7kvr7z8pohiw65y.jpg' },
    ],
    plantaSrc: 'v1755785866/lwe6gyvcvi4nan0b9nkp.png',
    plantaPreviaSrc: 'v1755785850/ne3ijqntce8hxisqyayi.png',
    description:
      'En esta reforma se reorganizaron los espacios comunes para integrarlos a la cocina, generando una mayor amplitud visual y funcional, al tiempo que se otorgó mayor privacidad a la habitación y al baño. A pedido de la clienta, se incorporó una paleta de azules que recorre todo el departamento, combinada con tonos madera que aportan calidez y refuerzan una sensación de calma y equilibrio en los ambientes. Sumamos vigas de madera en los clielorrasos del living que completan el estilo mediterráneo del conjunto.',
    descriptionEn:
      "In this renovation, common spaces were reorganized to integrate them into the renovation, generating greater visual and functional spaciousness, while providing greater privacy to the bedroom and bathroom. At the client's request, a palette of blues was incorporated throughout the apartment, combined with wood tones that provide warmth and reinforce a sense of calm and balance in the environments. We added wooden beams in the living room ceilings that complete the Mediterranean style of the whole.",
  },

  {
    name: 'REFORMA IGOR',
    nameEn: 'IGOR RENOVATION',
    m2: '260',
    location: 'Villa Ballester',
    showImg: 'v1754402953/j9nvyhxngxppr4mr99dv.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1754402953/j9nvyhxngxppr4mr99dv.jpg',
    },
    rowSpan: 3, // Ocupa 2 filas según el diseño
    images: [
      { src: 'v1754402953/j9nvyhxngxppr4mr99dv.jpg' },

      { src: 'v1754402955/byhaoyou4ac7yoqqbebq.jpg' },

      { src: 'v1754402952/x4izzs0flz2vulenxdf2.jpg' },

      { src: 'v1754402952/fqp1qkauqobjyqunqe1g.jpg' },

      { src: 'v1754402953/bvfnhgovwuau2o9cezbt.jpg' },

      { src: 'v1754402961/b19jtrnhsngsey7icvwn.jpg' },

      { src: 'v1754402964/avtzovwhyyelxsubzdnd.jpg' },

      { src: 'v1754402963/b0uxfz0dod3nuxytjv1g.jpg' },

      { src: 'v1754402970/pqgjemptcfoafqwx5vyc.jpg' },

      { src: 'v1754402969/otwppdhntkctxjxq8kld.jpg' },

      { src: 'v1754402970/cgeeoryi1wncovarvedd.jpg' },

      { src: 'v1754402953/zoc3x7a3ejhvvbyxfisl.jpg' },

      { src: 'v1754402955/xufwbczcnyfbpjjjylgq.jpg' },

      { src: 'v1754402971/v7yjaqvnlnressj6gu1x.jpg' },

      { src: 'v1754402950/y3r88f5fossqjkvhbhur.jpg' },

      { src: 'v1754402951/wxjottwl31mb2ytsg3bi.jpg' },

      { src: 'v1754402962/gvtxrcihmygkwtmyxame.jpg' },
    ],
    plantaSrc: 'v1755786023/kfqjwhub0yr7xfc2uwyz.png',
    plantaPreviaSrc: 'v1755786005/kxngzutffiovu6yb9lfg.png',
    description:
      'En Villa Ballester, esta casa y su quincho fueron repensados como un todo, buscando que cada espacio ganara en funcionalidad, calidez y carácter. La intervención abarcó cocina, baños, pisos y el quincho, con una mirada integral que equilibrara lo existente con lo nuevo. La cocina se abrió hacia el living-comedor mediante una barra de encuentro, con mesadas de cuarzo que aportan modernidad y frentes que dialogan con la estética original de la vivienda. Los baños fueron renovados con un lenguaje sereno y cálido. En el de las niñas, los tonos claros amplifican el espacio y transmiten frescura. El quincho, completamente demolido y reconstruido, ahora ofrece confort en cualquier estación gracias a su aislamiento térmico. Su lenguaje estético se inspira en la simplicidad escandinava, con una cocina y un sector de parrilla que respiran claridad y orden. El baño, reubicado para optimizar la circulación, adopta una paleta neutra que integra de forma sutil y coherente todo el conjunto.',
    descriptionEn:
      "In Villa Ballester, this house and its quincho were rethought as a whole, seeking that each space would gain in functionality, warmth and character. The intervention covered renovation, bathrooms, floors and the quincho, with an integral approach that balanced the existing with the new. The renovation opened towards the living-dining room through a meeting bar, with quartz countertops that bring modernity and fronts that dialogue with the original aesthetics of the house. The bathrooms were renovated with a serene and warm language. In the girls' one, light tones amplify the space and convey freshness. The quincho, completely demolished and rebuilt, now offers comfort in any season thanks to its thermal insulation. Its aesthetic language is inspired by Scandinavian simplicity, with a renovation and a grill area that breathe clarity and order. The bathroom, relocated to optimize circulation, adopts a neutral palette that subtly and coherently integrates the whole.",
  },
  {
    name: 'REFORMA FRENCH',
    nameEn: 'FRENCH RENOVATION',
    m2: '98',
    rowSpan: 2,
    year: 2024,
    location: 'Recoleta',
    showImg: 'v1754419115/o07v2lkp0sfdxcpobia5.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1754419115/o07v2lkp0sfdxcpobia5.jpg',
    },

    images: [
      { src: 'v1754419115/o07v2lkp0sfdxcpobia5.jpg' },

      { src: 'v1754417356/rrddorun77k8bq7khicw.jpg' },

      { src: 'v1754417377/kn5aef59bs8xnpaas6en.jpg' },

      { src: 'v1754417389/oxubr2odwk8izyvxyg4y.jpg' },

      { src: 'v1754417380/xldv9zkni4bqzklcqdnh.jpg' },

      { src: 'v1754417384/ooe87nnnmxtq0tqzmcat.jpg' },

      { src: 'v1754417383/vdv1wc5tkmmmfqemhtdz.jpg' },

      { src: 'v1754417384/iq8kxiatptfulv6h50zz.jpg' },

      { src: 'v1754417384/iq8kxiatptfulv6h50zz.jpg' },

      { src: 'v1754417378/zds86sv2u9uo5ywgdp6o.jpg' },

      { src: 'v1754419117/xhqz0vldfz20n8vorwgd.jpg' },

      { src: 'v1754419117/xhqz0vldfz20n8vorwgd.jpg' },

      { src: 'v1754417391/iq6ypv3xytowr3ckczcm.jpg' },

      { src: 'v1754417332/dmdjo6o9iqso9gkifsch.jpg' },

      { src: 'v1754419119/prq5xnvfmtb6ggvfs00e.jpg' },

      { src: 'v1754419116/qregldrxjhmvgmj4loav.jpg' },
    ],
    plantaSrc: 'v1755785703/gdkglo8b98oaiwo2phsc.png',
    description:
      'La intervención consistió en una actualización integral del espacio, reemplazando el parquet original por porcelanatos símil madera en todo el departamento, incluidos los baños. Esta elección de revestimiento, aplicada de manera continua, contribuye a una percepción de mayor amplitud y coherencia visual en cada ambiente. En los baños, se optó por revestimientos en tonos beige y neutros, aportando una atmósfera cálida y serena. El patio fue completamente renovado, incorporando un nuevo sistema de techado en Kiri natural y un cielorraso en chapa traslúcida. El espacio se complementa con mobiliario a medida —incluyendo sillón y mesa— pensado para adaptarse a distintas situaciones de uso, tanto sociales como cotidianas.',
    descriptionEn:
      'The intervention consisted of a comprehensive space update, replacing the original parquet with wood-like porcelain tiles throughout the apartment, including bathrooms. This coating choice, applied continuously, contributes to a perception of greater spaciousness and visual coherence in each environment. In the bathrooms, beige and neutral coverings were chosen, providing a warm and serene atmosphere. The patio was completely renovated, incorporating a new natural Kiri roofing system and a translucent sheet ceiling. The space is complemented with custom furniture —including sofa and table— designed to adapt to different usage situations, both social and daily.',
  },

  {
    name: 'CAFÉ INFANTA VICTORIA',
    m2: '290',
    location: 'Villa Ballester',
    showImg: 'v1754421886/jxppbimotom9kg22bgox.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1754421886/jxppbimotom9kg22bgox.jpg',
    },
    rowSpan: 2, // Ocupa 1 fila según el diseño

    images: [
      { src: 'v1754421886/jxppbimotom9kg22bgox.jpg' },

      { src: 'v1754421886/aiqqqdqyqnnabpxrqb5y.jpg' },

      { src: 'v1754421904/pljj8eby6iwily4deuvz.jpg' },

      { src: 'v1754421888/bzzzxih1khcti9ot4hbu.jpg' },

      { src: 'v1754421894/e4puwmo7e3toseoxo5fm.jpg' },

      { src: 'v1754421896/gylpxkjs0khshllesnha.jpg' },

      { src: 'v1754421895/fhou41efkqjjpuos7gzs.jpg' },

      { src: 'v1754421897/agntmzvjmngvsnc9afft.jpg' },

      { src: 'v1754421900/vdsfp6pw5ttlyl4wil4q.jpg' },

      { src: 'v1754421904/osk08i45q1tjqrhqxx2p.jpg' },

      { src: 'v1754421910/homzbvchirifnzcywnga.jpg' },

      { src: 'v1754421888/ui2g7betbtvdvxzjao1j.jpg' },

      { src: 'v1754421887/afqqtiufrzrphndlaboa.jpg' },

      { src: 'v1754421903/qbx7ku6bzdkqlpwjx6so.jpg' },

      { src: 'v1754421911/vzcyvlkhrzaytyharmny.jpg' },
    ],
    plantaSrc: 'v1755785737/xon2qoujt0ocarpd3z77.png',
    description:
      'Ubicada en una casona antigua del centro de Villa Ballester, esta cafetería se diseñó en sintonía con la identidad del edificio, realzando su carácter original y sumando elementos contemporáneos. Intentando mantener la identidad del lugar, recuperamos la bovedilla existente y los pisos de madera fueron restaurados, contrastandolos con calcáreos en el área posterior.Los toques modernos se fueron generando con el nuevo mobiliario y el mostrador con tono menta, otorgando serenidad y personalidad. Hacia el fondo, una pared del mismo color refuerza la idea y el carácter del ambiente. El hierro y la vegetación, presentes en detalles sobre la barra y el muro principal, introducen un contraste moderno que dialoga con lo histórico, aportando frescura y vitalidad al conjunto.',
    descriptionEn:
      "Located in an old house in the center of Villa Ballester, this café was designed in harmony with the building's identity, enhancing its original character and adding contemporary elements. Trying to maintain the place's identity, we recovered the existing vault and the wooden floors were restored, contrasting them with limestone in the back area. Modern touches were generated with the new furniture and the mint-toned counter, providing serenity and personality. Towards the back, a wall of the same color reinforces the idea and character of the environment. Iron and vegetation, present in details on the bar and main wall, introduce a modern contrast that dialogues with the historical, bringing freshness and vitality to the whole.",
  },
  {
    name: 'CONSULTORIO DEVOTO',
    m2: '31',
    location: 'Villa Devoto',
    showImg: 'v1747140741/kqv2bfmtj1objuywa253.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1747140741/kqv2bfmtj1objuywa253.jpg',
    },
    rowSpan: 3, // Ocupa 1 fila según el diseño

    images: [
      { src: 'v1747140771/vp10nafthnmi4hitjkle.jpg' },

      { src: 'v1747140741/s1zflcupnj2r3nkkdy7d.jpg' },

      { src: 'v1747140741/cbkrgqcmjduyyg3cqlbg.jpg' },

      { src: 'v1747140764/nzflpy3onpsm9g7fho6v.jpg' },

      { src: 'v1747140770/xs1zbosgelx4r4gm70uo.jpg' },

      { src: 'v1747140770/et58yl27v3te2ldjkoec.jpg' },

      { src: 'v1747140772/jcwwry5yyfw6uyeueute.jpg' },
    ],
    plantaSrc: 'v1755785624/z3rbalszv4wnnuwl62cb.png',
    description:
      'En este proyecto se integraron, en un espacio reducido, un consultorio de psicología y una vivienda, optimizando cada metro cuadrado con soluciones funcionales y estéticamente armoniosas. Un mueble multifuncional oculta cama y placard, incorpora un sofá desmontable y se complementa con una mesa de uso dual y una biblioteca de gran capacidad. Los tonos cálidos de la madera aportan la serenidad y calidez necesarias para vincular el ámbito profesional con el doméstico.',
    descriptionEn:
      'In this project, a psychology office and a residence were integrated in a reduced space, optimizing every square meter with functional and aesthetically harmonious solutions. A multifunctional piece of furniture hides bed and wardrobe, incorporates a removable sofa and is complemented with a dual-use table and a high-capacity library. The warm tones of wood provide the serenity and warmth necessary to link the professional with the domestic sphere.',
  },

  {
    name: 'REFORMA GURU',
    nameEn: 'GURU RENOVATION',
    m2: '120',
    location: 'Villa Crespo',
    year: 2024,
    showImg: 'v1754416489/geodafztsk0ehnj9zofc.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1754416489/geodafztsk0ehnj9zofc.jpg',
    },
    rowSpan: 2, // Ocupa 1 fila según el diseño

    images: [
      { src: 'v1754416489/geodafztsk0ehnj9zofc.jpg' },

      { src: 'v1754416603/pfhelmw1d4mwfexzvsqz.jpg' },

      { src: 'v1747080532/btirphuw4atudeissvgj.jpg' },

      { src: 'v1747080534/ua8mwn0cf6roz1hdvujd.jpg' },

      { src: 'v1747080532/gfzt35eatzfkuggs7tzh.jpg' },

      { src: 'v1747080540/lqu49uxglnfqtdvk9uv1.jpg' },

      { src: 'v1747248674/lnzs8hvn7sfi4eixhsik.jpg' },

      { src: 'v1754416710/iuml7kddbclbdme134mi.jpg' },

      { src: 'v1754416711/gzngfqwmhdxixj4qzwhq.jpg' },

      { src: 'v1754416711/u3hrcyxxpr2qcqxpc2vr.jpg' },

      { src: 'v1747080542/n2srvzl0inrsx1u7yndm.jpg' },
    ],
    plantaSrc: 'v1755785680/suo2g3xhd8q1z4eoqukz.png',
    description:
      'La reforma optimizó la cocina integrando un area de coffee break a pedido del cliente, comedor diario y lavadero en un solo ambiente, mediante la reubicación del área y la redefinición de circulaciones.  En el living, una gran biblioteca a medida alberga la colección de libros del cliente, que funciona a su vez como divisor con el comedor. El dormitorio para dos niños incorpora zona de juego y un mueble cama multifuncional con guardado, resuelto en tonos azules que aportan vida al espacio.',
    descriptionEn:
      "The renovation optimized the renovation by integrating a coffee break area at the client's request, daily dining room and laundry room in a single environment, through the relocation of the area and the redefinition of circulations. In the living room, a large custom library houses the client's book collection, which also functions as a divider with the dining room. The bedroom for two children incorporates a play area and a multifunctional bed furniture with storage, resolved in blue tones that bring life to the space.",
  },

  {
    name: 'REFORMA SEGUI',
    nameEn: 'SEGUI RENOVATION',
    m2: '28',
    location: 'Palermo',
    showImg: 'v1747141705/uw6syhkdbs8uj2ccbity.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1747141705/uw6syhkdbs8uj2ccbity.jpg',
    },
    rowSpan: 2, // Ocupa 1 fila según el diseño

    images: [
      { src: 'v1747141707/a3qryt4psy9fkadfzql0.jpg' },

      { src: 'v1747141711/elglwlylfcktuqajvcxc.jpg' },

      { src: 'v1747141705/wwcfro77d2zvrwk0se0v.jpg' },

      { src: 'v1747141707/njuf4ww6lzrenqcc9pak.jpg' },

      { src: 'v1747141708/wekjcrywboofyluzgydj.jpg' },

      { src: 'v1747141709/r23jtt2dix6velwype8b.jpg' },

      { src: 'v1747141708/krvuvy9q8gtnnr1c1dcj.jpg' },
    ],
    plantaPreviaSrc: 'v1755785578/ikqefu6xraztxjin2fdn.png',
    plantaSrc: 'v1755785597/wtqzr1gtft1inppx3rj5.png',
    description:
      'En este departamento de tres ambientes se optimizó la funcionalidad de la cocina y se renovó por completo el baño. La supresión de la habitación de servicio y la reubicación del lavadero permitieron ampliar significativamente la cocina, que se resolvió con una paleta clara con algunos detalles en madera para darle modernidad. En el baño, los revestimientos en tonos tierra crean una atmósfera serena, equilibrada por una mesada y estantería en guatambú natural junto a un mueble blanco laqueado, generando armonía entre calma y modernidad.',
    descriptionEn:
      'In this three-room apartment, the functionality of the renovation was optimized and the bathroom was completely renovated. The suppression of the service room and the relocation of the laundry room allowed to significantly expand the renovation, which was resolved with a clear palette with some wood details to give it modernity. In the bathroom, earth-tone coverings create a serene atmosphere, balanced by a natural guatambú countertop and shelf next to a white lacquered piece of furniture, generating harmony between calm and modernity.',
  },

  {
    name: 'CASA F',
    nameEn: 'F HOUSE',
    description:
      'En un barrio cerrado, esta vivienda unifamiliar tuvo su origen en el dialogo entre la casa y su entorno, priorizando sus orientaciones y su morfología peculiar. Su ubicación fue dispuesta para abrazar un gran árbol troncal del terreno que resguarda el living-comedor generando privacidad hacia la calle, pero permitiendo a su vez abrirse al frente. La distribución está dividida en tres volúmenes: área privada con habitaciones, área común de esparcimiento y nexo articulante de la casa, y un área de servicios más próximo al ingreso. El volumen central destaca del resto por su mayor altura y es permeable para ambos extremos del terreno. Esto último, sumado a carpinterías corredizas que se acumulan, permite una dialogo entre el frente y el fondo, conviviendo así en un mismo gran espacio. Las áreas sociales se orientaron al noreste, privilegiando la entrada de luz natural durante todo el día, mientras que circulaciones y servicios se dispusieron hacia el suroeste, resguardando la intimidad de los espacios principales. Desde cualquier ambiente es posible enmarcar el paisaje: el árbol en el acceso o la calma del fondo privado. Los elementos naturales en el exterior fueron un punto clave en el diseño: Un muro de piedra autóctona que acompaña el ingreso, sumado a una gran puerta de madera maciza de piso a techo escondida, sirven para aportar textura, calidez y contemporaneidad al conjunto, completando así una vivienda que se vuelve una con su entorno.',
    descriptionEn:
      'In a gated community, this single-family home originated from the dialogue between the house and its environment, prioritizing its orientations and peculiar morphology. Its location was arranged to embrace a large trunk tree from the land that protects the living-dining room, generating privacy towards the street while allowing it to open to the front. The distribution is divided into three volumes: private area with bedrooms, common recreation area and articulating nexus of the house, and a services area closer to the entrance. The central volume stands out from the rest due to its greater height and is permeable to both ends of the land. This, added to sliding carpentry that accumulates, allows a dialogue between the front and back, thus coexisting in the same great space. The social areas were oriented to the northeast, privileging the entry of natural light throughout the day, while circulations and services were arranged towards the southwest, protecting the intimacy of the main spaces. From any environment it is possible to frame the landscape: the tree at the access or the calm of the private background. The natural elements on the exterior were a key point in the design: A wall of native stone that accompanies the entrance, added to a large solid wood door from floor to ceiling hidden, serve to provide texture, warmth and contemporaneity to the whole, thus completing a home that becomes one with its environment.',
    m2: '150',
    location: 'Exaltación de la Cruz - Barrio Amarylis',
    showImg: 'v1747144222/id7azvdhqntcf1kji9ng.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1747144222/id7azvdhqntcf1kji9ng.jpg',
    },
    rowSpan: 2, // Ocupa 1 fila según el diseño

    images: [
      { src: 'v1747144222/id7azvdhqntcf1kji9ng.jpg' },

      { src: 'v1747144132/upjnf83depf0scax2sao.jpg' },

      { src: 'v1747248418/neq6uwcbuapjyy4gav7c.jpg' },

      { src: 'v1747144215/tokwzsywjurmkjbs7xxi.jpg' },

      { src: 'v1747144968/xbgj74txhntr0picvhd3.jpg' },

      { src: 'v1747144969/xvfb0bxewna4synp1uye.jpg' },

      { src: 'v1747144970/jgk1vcclfziznl9qmxt5.jpg' },
    ],
    plantaSrc: 'v1755785892/im3pldsi5y6xhieucrh5.png',
  },
  {
    name: 'REFORMA UGARTE',
    nameEn: 'UGARTE RENOVATION',
    year: 2022,
    description:
      'El diseño de esta cocina partió de una premisa clara por parte de los clientes: intervenir con la menor obra posible, sabiendo que debían continuar habitando la vivienda durante el proceso. Se mantuvo la disposición general del área de trabajo, reorganizándola para optimizar su uso. La bacha y el anafe se separaron, liberando así mayor espacio de trabajo y espacio para un lavavajillas bajo mesada, mientras que la heladera y el horno se ubicaron en ambos extremos, encuadrando el espacio. Esto permitió generar una alacena superior central de gran capacidad, duplicando el guardado sin reducir la sensación de amplitud. El blanco, elegido para mobiliario y muros, aporta luminosidad y refuerza la idea de espacio abierto. En los pisos, se colocó un revestimiento SPC sobre los existentes, evitando obra húmeda y agilizando la ejecución. Finalmente, el área de TV fue replanteada, haciendo un mueble integral con múltiples funciones de guardado y coffee-break, estableciendo un nuevo punto focal que complementa el espacio.',
    descriptionEn:
      'The design of this kitchen started from a clear premise from the clients: intervene with the least possible work, knowing that they had to continue living in the home during the process. The general layout of the work area was maintained, reorganizing it to optimize its use. The sink and stove were separated, thus freeing up more workspace and space for an under-counter dishwasher, while the refrigerator and oven were located at both ends, framing the space. This allowed generating a central upper pantry of great capacity, doubling storage without reducing the feeling of spaciousness. White, chosen for furniture and walls, provides luminosity and reinforces the idea of open space. On the floors, an SPC covering was placed over the existing ones, avoiding wet work and speeding up execution. Finally, the TV area was redesigned, making an integral piece of furniture with multiple storage and coffee-break functions, establishing a new focal point that complements the space.',
    m2: '18',
    location: '',
    showImg: 'v1747142269/zj56bhsy0rmzdx0akxf9.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1747142269/zj56bhsy0rmzdx0akxf9.jpg',
    },
    rowSpan: 2, // Ocupa 1 fila según el diseño

    images: [
      { src: 'v1747142269/zj56bhsy0rmzdx0akxf9.jpg' },

      { src: 'v1747142268/drxul3mlgkzomouyffqv.jpg' },

      { src: 'v1747142268/dv73ki51qfus84twar5q.jpg' },

      { src: 'v1747142269/sxsvdwqmhd4blmb130dc.jpg' },

      { src: 'v1747142266/j05qmj1wgntd6bzdv6ey.jpg' },

      { src: 'v1747142267/vvxfowj2xfbzo9erq6es.jpg' },
    ],
    plantaSrc: 'v1755785551/pigvzs9wcrkxled4cogb.png',
  },
  {
    name: 'REFORMA SANTANA',
    nameEn: 'SANTANA RENOVATION',
    m2: '23',
    year: 2022,
    rowSpan: 2,
    location: 'Villa Urquiza',
    showImg: 'v1754412407/rx2hiekjplsl0awx43oe.jpg',
    mainFeature: {
      type: 'image',
      link: 'v1754412407/rx2hiekjplsl0awx43oe.jpg',
    },

    images: [
      {
        src: 'v1754412407/rx2hiekjplsl0awx43oe.jpg',
      },

      {
        src: 'v1754412403/jjmijyrlyjvyqjossnf1.jpg',
      },

      {
        src: 'v1754412403/xmzd8yvr8az3qtitmohz.jpg',
      },

      {
        src: 'v1754412404/vjleviywcbuahiiqnibw.jpg',
      },

      {
        src: 'v1754412378/nzvq8tecx6lyyegu1xzx.jpg',
      },

      {
        src: 'v1754412378/xjzmqsyzoedhfearqw4c.jpg',
      },
    ],
    plantaSrc: 'v1755785516/dzi1owb9ehyxxvxeakki.png',
    description:
      'Ubicada en la planta baja de la vivienda, esta cocina requería mayor espacio de guardado y una mejor entrada de luz. La eliminación de un baño de servicio permitió ampliarla, integrando un nuevo sector para la heladera dentro de la cocina y generando un respaldo para el lavadero contiguo.El antiguo lugar de la heladera se transformó en un rincón de coffee break, que complementa al comedor diario y suma un gesto de confort cotidiano.La combinación de tonos blancos, piedras claras y madera aporta luminosidad y calidez, equilibrando funcionalidad y estética.',
    descriptionEn:
      'Located on the ground floor of the house, this renovation required more storage space and better light entry. The elimination of a service bathroom allowed it to be expanded, integrating a new sector for the refrigerator within the renovation and generating a backing for the adjacent laundry room. The old refrigerator location was transformed into a coffee break corner, which complements the daily dining room and adds a gesture of daily comfort. The combination of white tones, light stones and wood provides luminosity and warmth, balancing functionality and aesthetics.',
  },

  // {
  //   name: 'FERRETI',
  //   m2: '',
  //   location: '',
  //   showImg: 'v1747145251/gpnv7jqyzq09hbtimolj.jpg',
  //   mainFeature: {
  //     type: 'image',
  //     link: 'v1747145251/gpnv7jqyzq09hbtimolj.jpg',
  //   },
  //   rowSpan: 2, // Ocupa 1 fila según el diseño
  //   images: [
  //     {
  //       src: 'v1747145249/f2hxm8tsse8c3vzuoef8.jpg',
  //     },
  //     {
  //       src: 'v1747145256/jdsglb6hu39lh3tre4m6.jpg',
  //     },
  //     {
  //       src: 'v1747145251/gpnv7jqyzq09hbtimolj.jpg',
  //     },
  //     {
  //       src: 'v1747145250/cvl6unxgvpupnmfe7l3e.jpg',
  //     },
  //   ],
  //   description: 'hola',
  // },
];

export const routes: Routes = [
  {
    path: 'contacto',
    loadComponent: () =>
      import('./@components/contacto/contacto.component').then(
        (m) => m.ContactoComponent
      ),
  },
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
  {
    path: 'servicios',
    loadComponent: () =>
      import('./@components/servicios/servicios.component').then(
        (m) => m.ServiciosComponent
      ),
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
