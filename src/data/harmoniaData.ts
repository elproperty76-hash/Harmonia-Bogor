export interface UnitFinancials {
  initialInvestment: number;
  rentPerRoomMonthly: number;
  grossMonthlyIncome: number;
  ijarohFeeMonthly: number;
  totalOperationalMonthly: number;
  netProfitMonthly: number;
  netProfitYearlyManaged: number;
  netProfitYearlySelf: number;
  roiManagedPercent: number;
  capitalGainPercent: number;
  totalRoiPercent: number;
}

export interface UnitTypeSpec {
  id: string;
  name: string;
  category: string;
  shortLabel: string;
  unitCount: number;
  landArea: string;
  buildingArea: string;
  bedroomsLabel: string;
  bathroomsLabel: string;
  roomCount: number;
  floors: string;
  highlights: string[];
  description: string;
  exteriorImage: string;
  interiorImage: string;
  bathroomImage: string;
  floorplans: {
    label: string;
    image: string;
  }[];
  siteplanColor: string;
  financials: UnitFinancials;
}

export const WHATSAPP_NUMBER = '6281315167887';
export const WHATSAPP_DISPLAY = '+62 813-1516-7887';
export const ADMIN_EMAIL = 'harmoniagroups@harmoniasyariah.com';
export const BOOKLET_PDF_PATH =
  '/assets/aistudio/BOOKLET_-_Harmonia_Student_House__Bogor__compressed_1d1ac4e4.pdf';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export const HERO_STORIES = [
  {
    id: 'facade',
    title: 'Tropical Contemporary',
    subtitle: 'Kawasan Ring 1 Kampus IPB Dramaga',
    image: '/assets/harmonia/webp/hero-cover.webp',
  },
  {
    id: 'apartkost',
    title: 'Apartkost 4 Kamar',
    subtitle: 'Type Kencana & Type Gede · SHM',
    image: '/assets/harmonia/webp/unit-apartkost.webp',
  },
  {
    id: 'rukost9',
    title: 'Rukost 9 Kamar',
    subtitle: 'Type Salak 3 Lantai · ROI hingga 17,17%',
    image: '/assets/harmonia/webp/unit-rukost9.webp',
  },
  {
    id: 'interior',
    title: 'Kamar Full Furnish',
    subtitle: 'Siap huni untuk mahasiswa IPB',
    image: '/assets/harmonia/webp/interior-bedroom-tall.webp',
  },
];

export const FOUR_PILLARS = [
  {
    number: '01',
    title: 'Lokasi Strategis',
    detail: 'Hanya ± 4 menit (1,4 km) menuju Pintu Belakang Kampus IPB Dramaga.',
  },
  {
    number: '02',
    title: 'Desain Tropical',
    detail: 'Konsep Tropical Contemporary modern minimalis sesuai preferensi mahasiswa.',
  },
  {
    number: '03',
    title: 'Fasilitas Lengkap',
    detail: 'Unit siap huni full furnish dengan Wi-Fi, dapur bersama, dan parkir luas.',
  },
  {
    number: '04',
    title: 'Legalitas Aman',
    detail: 'Sertifikat Hak Milik (SHM) dan akad sesuai prinsip syariah serta hukum RI.',
  },
];

export const LOCATION_ACCESS = [
  { label: 'IPB Dramaga', time: '± 4 Menit', note: '1,4 km via Jl. Alternatif IPB' },
  { label: 'Area Kuliner', time: '± 1 Menit', note: 'Pusat jajanan & kebutuhan harian' },
  { label: 'ATM Center', time: '± 1 Menit', note: 'Akses perbankan terdekat' },
  { label: 'Pusat Perbelanjaan', time: '± 3 Menit', note: 'Belanja kebutuhan bulanan' },
  { label: 'Kawasan Wisata', time: '± 3 Menit', note: 'Lingkungan asri Dramaga' },
  { label: 'Stasiun Kereta', time: '± 18 Menit', note: 'Konektivitas KRL Jabodetabek' },
];

export const ADVANTAGES = [
  {
    title: 'One Gate System',
    description: 'Sistem keamanan kawasan terpadu dengan akses satu gerbang terkontrol.',
  },
  {
    title: 'Full Furnish Siap Huni',
    description: 'Setiap kamar dilengkapi tempat tidur, meja belajar, lemari, dan kamar mandi dalam.',
  },
  {
    title: 'Target Market Jelas',
    description: 'Didukung 38.000+ mahasiswa aktif dan 3.600+ mahasiswa baru IPB setiap tahun.',
  },
  {
    title: 'ROI Tinggi & Berkelanjutan',
    description: 'Potensi sewa pasif rutin ditambah estimasi capital gain properti 5% per tahun.',
  },
  {
    title: 'Parkir Umum yang Luas',
    description: 'Area parkir terencana untuk menampung mobil maupun motor penghuni kost.',
  },
  {
    title: 'Desain Modern Tropical',
    description: 'Fasad Tropical Contemporary berkelas yang menjaga nilai sewa dan estetika aset.',
  },
  {
    title: 'CCTV Kawasan 24 Jam',
    description: 'Pengawasan kamera aktif 24 jam di seluruh titik strategis lingkungan.',
  },
  {
    title: 'Security Siaga 24 Jam',
    description: 'Petugas keamanan profesional menjaga ketertiban dan kenyamanan penghuni.',
  },
];

export const OCCUPANCY_STRATEGIES = [
  {
    title: 'Hadir di Platform Kost',
    description: 'Pemasaran aktif di platform pencari kost terkemuka seperti Mamikos.',
  },
  {
    title: 'Promosi Kamar Aktif',
    description: 'Kampanye digital terjadwal melalui berbagai kanal media sosial mahasiswa.',
  },
  {
    title: 'Peningkatan Layanan',
    description: 'Tim manajemen berpengalaman sejak 2021 menjaga kepuasan dan retensi penghuni.',
  },
  {
    title: 'Shuttle ke Kampus',
    description: 'Layanan antar-jemput shuttle untuk memudahkan mobilitas harian menuju IPB.',
  },
];

export const OWNERSHIP_PILLARS = [
  {
    title: 'Sertifikat Hak Milik (SHM)',
    description:
      'Kepemilikan penuh atas sebidang tanah dan bangunan untuk pilihan Apartkost 4 kamar, Rukost 5 kamar, Rukost 9 kamar, maupun Ruko.',
  },
  {
    title: 'Pembayaran Prinsip Syariah',
    description:
      'Tersedia skema cash keras maupun cicilan fleksibel yang dirancang murni sesuai syariah: tanpa riba, tanpa KPR bank, dan tanpa gharar.',
  },
  {
    title: 'Legalitas & Pengelolaan Terjamin',
    description:
      'Dikembangkan oleh Isykariman Property Syariah dan dikelola mengacu pada prinsip syariah serta ketentuan hukum positif di Indonesia.',
  },
];

export const UNIT_TYPES: UnitTypeSpec[] = [
  {
    id: 'kencana',
    name: 'Type Kencana',
    category: 'Apartkost 4 Kamar',
    shortLabel: 'Kencana (4 Kmr)',
    unitCount: 8,
    landArea: '32,5 m²',
    buildingArea: '65 m²',
    bedroomsLabel: '4 Kamar Tidur',
    bathroomsLabel: '4 Kamar Mandi',
    roomCount: 4,
    floors: '2 Lantai (Tangga Tengah Bersama)',
    highlights: ['SHM', 'Full Furnish', 'Dapur Bersama', 'Blok C1–C8'],
    description:
      'Konsep dua unit dalam satu bangunan dengan tangga bersama di tengah. Pembagian ruang efisien untuk investor pemula yang menginginkan aset kost produktif.',
    exteriorImage: '/assets/harmonia/webp/unit-apartkost.webp',
    interiorImage: '/assets/harmonia/webp/interior-bedroom-desk.webp',
    bathroomImage: '/assets/harmonia/webp/interior-bathroom.webp',
    floorplans: [
      { label: 'Denah Lantai 1 (9,00 m × 9,00 m)', image: '/assets/harmonia/webp/denah-apartkost-1.webp' },
      { label: 'Denah Lantai 2 (9,00 m × 9,00 m)', image: '/assets/harmonia/webp/denah-apartkost-2.webp' },
    ],
    siteplanColor: '#06B6D4',
    financials: {
      initialInvestment: 687598081,
      rentPerRoomMonthly: 1300000,
      grossMonthlyIncome: 5200000,
      ijarohFeeMonthly: 1000000,
      totalOperationalMonthly: 1000000,
      netProfitMonthly: 4200000,
      netProfitYearlyManaged: 50400000,
      netProfitYearlySelf: 62400000,
      roiManagedPercent: 7.33,
      capitalGainPercent: 5.0,
      totalRoiPercent: 12.33,
    },
  },
  {
    id: 'gede',
    name: 'Type Gede',
    category: 'Apartkost 4 Kamar',
    shortLabel: 'Gede (4 Kmr)',
    unitCount: 10,
    landArea: '32,5 m²',
    buildingArea: '65 m²',
    bedroomsLabel: '4 Kamar Tidur',
    bathroomsLabel: '4 Kamar Mandi',
    roomCount: 4,
    floors: '2 Lantai (Tangga Tengah Bersama)',
    highlights: ['SHM', 'Full Furnish', 'Dapur Bersama', 'Blok D1–D10'],
    description:
      'Varian Apartkost 4 kamar dengan tarif sewa premium Rp 1,6 juta/kamar yang mengoptimalkan arus kas bulanan di kawasan Blok D.',
    exteriorImage: '/assets/harmonia/webp/unit-apartkost.webp',
    interiorImage: '/assets/harmonia/webp/interior-bedroom-tall.webp',
    bathroomImage: '/assets/harmonia/webp/interior-bathroom.webp',
    floorplans: [
      { label: 'Denah Lantai 1 (9,00 m × 9,00 m)', image: '/assets/harmonia/webp/denah-apartkost-1.webp' },
      { label: 'Denah Lantai 2 (9,00 m × 9,00 m)', image: '/assets/harmonia/webp/denah-apartkost-2.webp' },
    ],
    siteplanColor: '#2563EB',
    financials: {
      initialInvestment: 737598081,
      rentPerRoomMonthly: 1600000,
      grossMonthlyIncome: 6400000,
      ijarohFeeMonthly: 1000000,
      totalOperationalMonthly: 1000000,
      netProfitMonthly: 5400000,
      netProfitYearlyManaged: 64800000,
      netProfitYearlySelf: 76800000,
      roiManagedPercent: 8.79,
      capitalGainPercent: 5.0,
      totalRoiPercent: 13.79,
    },
  },
  {
    id: 'pangrango',
    name: 'Type Pangrango',
    category: 'Rumah Kost 5 Kamar',
    shortLabel: 'Pangrango (5 Kmr)',
    unitCount: 5,
    landArea: '54 m²',
    buildingArea: '101 m²',
    bedroomsLabel: '5 Kamar Tidur',
    bathroomsLabel: '5 Kamar Mandi',
    roomCount: 5,
    floors: '2 Lantai (Akses & Tangga Pribadi)',
    highlights: ['SHM', 'Full Furnish', 'Akses Pribadi', 'Blok A1–A5'],
    description:
      'Setiap unit rumah kost memiliki pintu masuk dan tangga pribadi dalam satu kepemilikan penuh, memberi privasi dan keleluasaan pengelolaan.',
    exteriorImage: '/assets/harmonia/webp/unit-rukost5.webp',
    interiorImage: '/assets/harmonia/webp/interior-bedroom-desk.webp',
    bathroomImage: '/assets/harmonia/webp/interior-bathroom.webp',
    floorplans: [
      { label: 'Denah Lantai 1 (6,00 m × 9,00 m)', image: '/assets/harmonia/webp/denah-rukost5-1.webp' },
      { label: 'Denah Lantai 2 (6,00 m × 9,00 m)', image: '/assets/harmonia/webp/denah-rukost5-2.webp' },
    ],
    siteplanColor: '#D946EF',
    financials: {
      initialInvestment: 888670034,
      rentPerRoomMonthly: 1800000,
      grossMonthlyIncome: 9000000,
      ijarohFeeMonthly: 1250000,
      totalOperationalMonthly: 1250000,
      netProfitMonthly: 7750000,
      netProfitYearlyManaged: 93000000,
      netProfitYearlySelf: 108000000,
      roiManagedPercent: 10.47,
      capitalGainPercent: 5.0,
      totalRoiPercent: 15.47,
    },
  },
  {
    id: 'salak',
    name: 'Type Salak',
    category: 'Rumah Kost 9 Kamar',
    shortLabel: 'Salak (9 Kmr)',
    unitCount: 6,
    landArea: '55 m²',
    buildingArea: '157 m²',
    bedroomsLabel: '9 Kamar Tidur',
    bathroomsLabel: '9 Kamar Mandi',
    roomCount: 9,
    floors: '3 Lantai (Akses & Tangga Pribadi)',
    highlights: ['SHM', 'Full Furnish', 'ROI Tertinggi 17,17%', 'Blok B1–B6'],
    description:
      'Flagship aset investasi 3 lantai dengan 9 kamar tidur & 9 kamar mandi dalam. Menghadirkan pendapatan bersih hingga Rp 167,4 juta/tahun.',
    exteriorImage: '/assets/harmonia/webp/unit-rukost9.webp',
    interiorImage: '/assets/harmonia/webp/interior-wardrobe.webp',
    bathroomImage: '/assets/harmonia/webp/interior-bathroom.webp',
    floorplans: [
      { label: 'Denah Lantai 1 (5,00 m × 11,00 m)', image: '/assets/harmonia/webp/denah-rukost9-1.webp' },
      { label: 'Denah Lantai 2 & 3 (5,00 m × 11,00 m)', image: '/assets/harmonia/webp/denah-rukost9-2.webp' },
    ],
    siteplanColor: '#EAB308',
    financials: {
      initialInvestment: 1376000000,
      rentPerRoomMonthly: 1800000,
      grossMonthlyIncome: 16200000,
      ijarohFeeMonthly: 2250000,
      totalOperationalMonthly: 2250000,
      netProfitMonthly: 13950000,
      netProfitYearlyManaged: 167400000,
      netProfitYearlySelf: 194400000,
      roiManagedPercent: 12.17,
      capitalGainPercent: 5.0,
      totalRoiPercent: 17.17,
    },
  },
  {
    id: 'ruko',
    name: 'Ruko Halimun',
    category: 'Unit Ruko Harmonia',
    shortLabel: 'Ruko (2 Lantai)',
    unitCount: 4,
    landArea: '36 m²',
    buildingArea: '62 m²',
    bedroomsLabel: '2 Area Display',
    bathroomsLabel: '1 Kamar Mandi',
    roomCount: 1,
    floors: '2 Lantai Komersial',
    highlights: ['SHM', '2 Area Display', 'Parkir Langsung', 'Blok R1–R4'],
    description:
      'Berada di muka kawasan Harmonia tepat di tepi Jalan Umum 6 m. Ideal untuk kafe, minimarket, laundry, maupun kantor di tengah ratusan mahasiswa.',
    exteriorImage: '/assets/harmonia/webp/unit-ruko.webp',
    interiorImage: '/assets/harmonia/webp/unit-ruko-street.webp',
    bathroomImage: '/assets/harmonia/webp/interior-bathroom.webp',
    floorplans: [
      { label: 'Denah Lantai 1 (4,50 m × 8,00 m)', image: '/assets/harmonia/webp/denah-ruko-1.webp' },
      { label: 'Denah Lantai 2 (4,50 m × 8,00 m)', image: '/assets/harmonia/webp/denah-ruko-2.webp' },
    ],
    siteplanColor: '#EF4444',
    financials: {
      initialInvestment: 575580023,
      rentPerRoomMonthly: 2500000,
      grossMonthlyIncome: 2500000,
      ijarohFeeMonthly: 250000,
      totalOperationalMonthly: 250000,
      netProfitMonthly: 2250000,
      netProfitYearlyManaged: 27000000,
      netProfitYearlySelf: 30000000,
      roiManagedPercent: 4.69,
      capitalGainPercent: 5.0,
      totalRoiPercent: 9.69,
    },
  },
];

export const IJAROH_INCLUSIONS = [
  'Biaya Iklan & Pemasaran Unit',
  'Biaya IPL Kawasan',
  'Biaya Utilitas (Wi-Fi / Internet)',
  'Biaya House Keeping',
  'Biaya Perawatan / Maintenance',
];

export const GALLERY_ITEMS = [
  {
    src: '/assets/harmonia/webp/hero-wide.webp',
    title: 'Fasad Tropical Contemporary',
    caption: 'Harmonia Student House Dramaga-Bogor',
  },
  {
    src: '/assets/harmonia/webp/unit-rukost9-wide.webp',
    title: 'Deretan Rukost 3 Lantai',
    caption: 'Type Salak 9 Kamar · Akses Pribadi',
  },
  {
    src: '/assets/harmonia/webp/interior-bedroom-tall.webp',
    title: 'Kamar Tidur Full Furnish',
    caption: 'Lengkap tempat tidur, meja belajar, dan lemari',
  },
  {
    src: '/assets/harmonia/webp/interior-bathroom.webp',
    title: 'Kamar Mandi Dalam Modern',
    caption: 'Sanitair modern dengan shower & wastafel',
  },
  {
    src: '/assets/harmonia/webp/unit-ruko-street.webp',
    title: 'Zona Komersial Ruko Halimun',
    caption: 'Akses jalan umum 6 meter dengan parkir mobil',
  },
  {
    src: '/assets/harmonia/webp/gallery-aerial.webp',
    title: 'Perspektif Kawasan Harmonia',
    caption: 'Lingkungan tertata rapi dengan One Gate System',
  },
];

export interface ProjectCaseStudy {
  id: string;
  category: 'Hunian Kost' | 'Komersial' | 'Interior & Fasad';
  title: string;
  subtitle: string;
  shortDescription: string;
  image: string;
  unitReference: string;
  metrics: {label: string; value: string}[];
  caseStudy: {
    challenge: string;
    solution: string;
    outcome: string;
  };
}

export const PROJECT_GALLERY_ITEMS: ProjectCaseStudy[] = [
  {
    id: 'cluster-salak',
    category: 'Hunian Kost',
    title: 'Cluster Rukost Salak 9 Kamar',
    subtitle: 'Blok B1–B6 · 3 Lantai Akses Pribadi',
    shortDescription:
      'Hunian kost 3 lantai dengan 9 kamar tidur dan 9 kamar mandi dalam untuk arus kas investor maksimal.',
    image: '/assets/harmonia/webp/unit-rukost9.webp',
    unitReference: 'Type Salak - Rumah Kost 9 Kamar',
    metrics: [
      {label: 'Luas Tanah / Bangunan', value: '55 m² / 157 m²'},
      {label: 'Net Profit / Tahun', value: 'Rp 167,4 Juta'},
      {label: 'Total ROI + Capital Gain', value: '17,17% / thn'},
    ],
    caseStudy: {
      challenge:
        'Memaksimalkan kapasitas 9 kamar privat di lahan 55 m² tanpa mengorbankan pencahayaan alami dan sirkulasi udara tropis.',
      solution:
        'Tata ruang vertikal 3 lantai berukuran 5 × 11 meter dengan roster bata terakota dan jendela sudut di setiap kamar.',
      outcome:
        'Menghasilkan proyeksi pendapatan kotor Rp 16,2 juta/bulan dengan efisiensi biaya operasional Ijaroh Rp 2,25 juta/bulan.',
    },
  },
  {
    id: 'cluster-apartkost',
    category: 'Hunian Kost',
    title: 'Cluster Apartkost Kencana & Gede',
    subtitle: 'Blok C1–C8 & D1–D10 · 4 Kamar Tidur',
    shortDescription:
      'Konsep dua unit dalam satu bangunan dengan tangga tengah bersama dan kepemilikan SHM terpisah.',
    image: '/assets/harmonia/webp/unit-apartkost.webp',
    unitReference: 'Type Gede - Apartkost 4 Kamar',
    metrics: [
      {label: 'Luas Tanah / Bangunan', value: '32,5 m² / 65 m²'},
      {label: 'Total Unit Kawasan', value: '18 Unit'},
      {label: 'Total ROI + Capital Gain', value: '12,33% – 13,79%'},
    ],
    caseStudy: {
      challenge:
        'Memberikan titik masuk investasi kost SHM yang terjangkau bagi investor ritel di kawasan Ring 1 Kampus IPB.',
      solution:
        'Berbagi struktur tangga utama untuk 2 unit berdampingan sehingga rasio ruang produktif kamar meningkat signifikan.',
      outcome:
        'Investor memperoleh 4 kamar siap sewa full furnish dengan modal awal mulai Rp 687 jutaan dan SHM atas tanah serta bangunan.',
    },
  },
  {
    id: 'cluster-pangrango',
    category: 'Hunian Kost',
    title: 'Rukost Pangrango 5 Kamar',
    subtitle: 'Blok A1–A5 · Privasi Tangga Mandiri',
    shortDescription:
      'Rumah kost 2 lantai dengan akses masuk dan tangga pribadi untuk fleksibilitas pengelolaan mandiri maupun kerja sama.',
    image: '/assets/harmonia/webp/unit-rukost5.webp',
    unitReference: 'Type Pangrango - Rumah Kost 5 Kamar',
    metrics: [
      {label: 'Luas Tanah / Bangunan', value: '54 m² / 101 m²'},
      {label: 'Net Profit / Tahun', value: 'Rp 93 Juta'},
      {label: 'Total ROI + Capital Gain', value: '15,47% / thn'},
    ],
    caseStudy: {
      challenge:
        'Menjawab permintaan investor yang menginginkan bangunan terpisah penuh dengan area dapur bersama di lantai dasar.',
      solution:
        'Denah 6 × 9 meter memisahkan area komunal di lantai 1 dan 5 kamar tidur bermandikan cahaya alami dengan kamar mandi dalam.',
      outcome:
        'Proyeksi sewa Rp 1,8 juta/kamar menghasilkan net profit Rp 7,75 juta/bulan di bawah pengelolaan tim manajemen kost.',
    },
  },
  {
    id: 'zona-ruko',
    category: 'Komersial',
    title: 'Zona Komersial Ruko Halimun',
    subtitle: 'Blok R1–R4 · Tepi Jalan Umum 6 Meter',
    shortDescription:
      'Ruko 2 lantai dengan 2 area display dan parkir mobil langsung di gerbang utama kawasan mahasiswa.',
    image: '/assets/harmonia/webp/unit-ruko-street.webp',
    unitReference: 'Ruko Halimun - Unit Ruko Harmonia',
    metrics: [
      {label: 'Luas Tanah / Bangunan', value: '36 m² / 62 m²'},
      {label: 'Area Display', value: '2 Lantai Komersial'},
      {label: 'Total ROI + Capital Gain', value: '9,69% / thn'},
    ],
    caseStudy: {
      challenge:
        'Menghadirkan fasilitas ritel harian (kopi, kuliner, minimarket) yang melayani penghuni Harmonia sekaligus warga sekitar IPB.',
      solution:
        'Fasad lengkung kaca tinggi dengan area parkir depan langsung terhubung ke Jalan Umum 6 meter dan akses gerbang kawasan.',
      outcome:
        'Membuka peluang bisnis sekaligus aset properti syariah dengan nilai investasi awal paling ringan Rp 575 jutaan.',
    },
  },
  {
    id: 'arsitektur-tropical',
    category: 'Interior & Fasad',
    title: 'Arsitektur Tropical Contemporary',
    subtitle: 'Identitas Visual Kawasan Harmonia',
    shortDescription:
      'Perpaduan atap pelana miring modern, kisi kayu vertikal, dan roster bata ekspos yang tahan iklim hujan Bogor.',
    image: '/assets/harmonia/webp/hero-cover.webp',
    unitReference: 'Type Salak - Rumah Kost 9 Kamar',
    metrics: [
      {label: 'Keamanan Kawasan', value: 'One Gate + CCTV 24 Jam'},
      {label: 'Parkir Bersama', value: 'Mobil & Motor Luas'},
      {label: 'Jarak ke IPB', value: '± 4 Menit (1,4 km)'},
    ],
    caseStudy: {
      challenge:
        'Iklim Bogor yang lembap menuntut material eksterior awet sekaligus tampil memikat bagi mahasiswa generasi masa kini.',
      solution:
        'Penggunaan kanopi atap metal berinsulasi, dinding semen ekspos tahan cuaca, serta ventilasi silang melalui roster.',
      outcome:
        'Biaya perawatan jangka panjang terjaga rendah dan meningkatkan daya tarik sewa kamar di platform seperti Mamikos.',
    },
  },
  {
    id: 'interior-full-furnish',
    category: 'Interior & Fasad',
    title: 'Standar Kamar Full Furnish',
    subtitle: 'Siap Huni Sejak Hari Pertama Serah Terima',
    shortDescription:
      'Paket interior lengkap meliputi ranjang, lemari pakaian, meja belajar ergonomis, Wi-Fi, dan kamar mandi dalam.',
    image: '/assets/harmonia/webp/interior-bedroom-tall.webp',
    unitReference: 'Type Gede - Apartkost 4 Kamar',
    metrics: [
      {label: 'Kelengkapan Kamar', value: '100% Full Furnish'},
      {label: 'Manajemen Kost', value: 'Aktif Sejak 2021'},
      {label: 'Target Hunian', value: 'Hingga 100% Okupansi'},
    ],
    caseStudy: {
      challenge:
        'Investor luar kota sering kesulitan menyiapkan pengisian furnitur, internet, hingga pengelolaan harian penghuni.',
      solution:
        'Harmonia menyerahkan unit dalam kondisi siap huni penuh beserta opsi kerja sama pengelolaan Ijaroh yang transparan.',
      outcome:
        'Unit dapat langsung dipasarkan ke 38.000+ mahasiswa aktif IPB Bogor tanpa repot pengadaan interior terpisah.',
    },
  },
];

export interface ClientTestimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  unitOwned: string;
  quote: string;
  outcome: string;
  initials: string;
}

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 't1',
    name: 'Ir. Hendrawan Pratama',
    role: 'Direktur Operasional',
    organization: 'PT Nusantara Agro Mandiri, Jakarta',
    unitOwned: 'Pemilik Unit Type Salak (9 Kamar)',
    quote:
      'Sebelum memilih Harmonia, saya membandingkan beberapa proyek di sekitar Dramaga. Kejelasan akad syariah tanpa KPR bank dan rincian biaya Ijaroh yang sudah mencakup Wi-Fi, IPL, hingga housekeeping membuat arus kas bulanan saya jauh lebih terukur.',
    outcome: 'Seluruh 9 kamar langsung tersewa mahasiswa IPB pada semester awal operasional.',
    initials: 'HP',
  },
  {
    id: 't2',
    name: 'drh. Siti Rahmawati, M.Si.',
    role: 'Praktisi & Konsultan Veteriner',
    organization: 'Klinik Satwa Sehat Bogor',
    unitOwned: 'Pemilik 2 Unit Apartkost Type Gede',
    quote:
      'Sebagai alumni IPB, saya tahu persis betapa padatnya kebutuhan kost berkualitas di jalur Lingkar Kampus. Lokasi yang hanya 4 menit ke pintu belakang IPB plus fasilitas shuttle kampus menjadi nilai jual yang sulit ditandingi.',
    outcome: 'Okupansi stabil dengan laporan pengelolaan rutin tanpa harus mengurus operasional harian.',
    initials: 'SR',
  },
  {
    id: 't3',
    name: 'Fajar Nugroho, S.T.',
    role: 'Founder & Principal Engineer',
    organization: 'Karya Konstruksi Syariah, Depok',
    unitOwned: 'Pemilik Unit Type Pangrango (5 Kamar)',
    quote:
      'Kualitas fasad Tropical Contemporary dan tata letak kamar mandi dalam di setiap kamar benar-benar sesuai selera mahasiswa sekarang. Proses verifikasi legalitas SHM dan peninjauan siteplan pun terbuka sejak awal survei.',
    outcome: 'Mendapatkan aset produktif SHM dengan potensi imbal hasil sewa dan kenaikan nilai tanah.',
    initials: 'FN',
  },
  {
    id: 't4',
    name: 'Nadia Kusumawardhani',
    role: 'Pengusaha Kuliner & Ritel',
    organization: 'Kopi Sawah & Bakery Group',
    unitOwned: 'Pemilik Unit Ruko Halimun',
    quote:
      'Ruko Halimun berada tepat di muka kawasan dengan akses jalan 6 meter dan parkir mobil yang lega. Traffic penghuni kost di belakangnya langsung menjadi pasar alami untuk usaha kafe dan kebutuhan harian mahasiswa.',
    outcome: 'Menyatukan ekspansi cabang usaha dengan kepemilikan aset ruko syariah di Ring 1 IPB.',
    initials: 'NK',
  },
];

