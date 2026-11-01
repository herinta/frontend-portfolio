export interface TechStackItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps & Cloud' | 'AI & Tools';
  role: string;
  reason: string;
  iconName?: string;
}

export interface DatabaseField {
  name: string;
  type: string;
  isPk?: boolean;
  isFk?: boolean;
  desc?: string;
}

export interface DatabaseTable {
  name: string;
  description: string;
  fields: DatabaseField[];
}

export interface ArchitectureNode {
  id: string;
  title: string;
  subtitle: string;
  type: 'client' | 'gateway' | 'service' | 'database' | 'external';
  description: string;
  technologies: string[];
}

export interface ProjectDetail {
  id: string;
  title: string;
  tagline: string;
  category: string;
  status: 'Live Production' | 'MVP Beta' | 'Open Source' | 'In Development';
  year: string;
  role: string;
  timeline: string;
  image: string;
  description: string;
  problemStatement: string;
  solution: string;
  features: { title: string; description: string; icon: string }[];
  githubUrl?: string;
  liveUrl?: string;
  techStacks: TechStackItem[];
  systemDesign: {
    overview: string;
    diagramImage?: string;
    nodes: ArchitectureNode[];
    dataFlow: { step: number; title: string; description: string }[];
  };
  databaseDesign: {
    overview: string;
    erdImage?: string;
    tables: DatabaseTable[];
    relationships: string[];
  };
}

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  'jobhunt': {
    id: 'jobhunt',
    title: 'JobHunt',
    tagline: 'Dual-App Full-Stack Job Portal & Employer Recruitment CMS Ecosystem',
    category: 'Job Portal & HR Tech',
    status: 'Live Production',
    year: '2025 - 2026',
    role: 'Full Stack Developer',
    timeline: '3 Months',
    image: '/images/p1.svg',
    description:
      'JobHunt adalah ekosistem platform pencarian kerja (Job Portal) dan manajemen rekrutmen perusahaan (Applicant Tracking System / CMS) yang dibangun dengan arsitektur dua aplikasi Next.js App Router independen: Job Hunt CMS (Dashboard Perusahaan/HR) dan Job Hunt Website (Portal Publik Pencari Kerja). Kedua aplikasi terhubung secara real-time melalui satu basis data PostgreSQL terpusat yang dikelola menggunakan Prisma ORM serta penyimpanan objek Supabase Storage untuk aset logo perusahaan dan dokumen CV/Resume pelamar.',
    problemStatement:
      'Perusahaan membutuhkan dashboard rekrutmen internal yang terstruktur untuk mengelola branding korporat, mempublikasikan spesifikasi lowongan kerja yang kaya, dan menyeleksi berkas CV pelamar, sementara pencari kerja membutuhkan portal eksplorasi karier yang cepat dengan filter kategori/industri dinamis dan proses pengiriman lamaran satu pintu.',
    solution:
      'Merancang arsitektur Dual-App yang memisahkan beban kerja Employer CMS (Port 3000) dan Job Seeker Portal (Port 3001) di atas satu sumber kebenaran data PostgreSQL (9 model Prisma) dan 2 bucket publik Supabase Storage ("company" & "applicant"), dilengkapi autentikasi NextAuth.js terisolasi, editor CKEditor 5, dan client data-fetching SWR.',
    features: [
      {
        title: 'Employer CMS & 3-Tab Brand Settings',
        description: 'Dashboard khusus HR/Perusahaan untuk mengelola Overview (logo, industri, techStack[]), Social Media Links, dan daftar anggota tim (CompanyTeam) secara mandiri.',
        icon: 'folder'
      },
      {
        title: 'Rich Job Publisher & Quota Tracking',
        description: 'Publikasi lowongan kerja dengan CKEditor 5 HTML, input skill dinamis (requiredSkills[]), benefit JSON, serta pemantauan rasio kuota pelamar (applicants / needs) dan status Live/Expired.',
        icon: 'check'
      },
      {
        title: 'Dynamic SWR Job & Company Discovery',
        description: 'Portal publik pencari kerja dengan filter multi-kategori pekerjaan (CategoryJob beserta agregasi _count.Job) dan filter sektor industri (Industry) secara reaktif tanpa reload.',
        icon: 'zap'
      },
      {
        title: '1-Click Apply & Cloud PDF Resume ATS',
        description: 'Formulir lamaran tervalidasi React Hook Form + Zod yang mengunggah CV PDF langsung ke bucket Supabase "applicant" dan otomatis menginkremen counter pelamar di database.',
        icon: 'file'
      }
    ],
    githubUrl: 'https://github.com/herinta/job-hunt',
    liveUrl: 'https://jobhunt-portal.vercel.app',
    techStacks: [
      {
        name: 'Next.js (App Router — Dual Apps)',
        category: 'Frontend',
        role: 'Employer CMS & Public Job Portal Framework',
        reason: 'Memisahkan aplikasi internal HR (bwa-dashboard-job-hunt) dan portal pelamar (bwa-job-hunt) dengan Server Components dan Route Handlers.'
      },
      {
        name: 'TypeScript 5',
        category: 'Frontend',
        role: 'End-to-End Static Type Safety',
        reason: 'Menjaga konsistensi tipe data antara 9 model Prisma, validasi form Zod, dan respons SWR hooks di kedua aplikasi.'
      },
      {
        name: 'Prisma ORM (v5.2) & PostgreSQL',
        category: 'Database',
        role: 'Shared Relational DB & Schema Modeling',
        reason: 'Mengorkestrasi 9 tabel berelasi dengan primary key CUID, tipe data array PostgreSQL (String[]), dan kolom JSON untuk benefit lowongan.'
      },
      {
        name: 'Supabase Storage (@supabase/supabase-js)',
        category: 'DevOps & Cloud',
        role: 'Cloud Object Storage (2 Public Buckets)',
        reason: 'Menyimpan file logo korporat pada bucket "company" dan dokumen PDF CV pelamar pada bucket "applicant" dengan akses URL publik cepat.'
      },
      {
        name: 'NextAuth.js & Bcrypt.js',
        category: 'Backend',
        role: 'Dual-Role JWT Session Authentication',
        reason: 'Mengamankan autentikasi terpisah untuk entitas Company pada CMS dan entitas User pada Website menggunakan CredentialsProvider dan hashing bcrypt.'
      },
      {
        name: 'Tailwind CSS, Shadcn UI & Radix UI',
        category: 'Frontend',
        role: 'Accessible Design System & UI Primitives',
        reason: 'Membangun komponen tabel ATS, modal dialog lamaran, progress bar kuota, dan tabs pengaturan perusahaan yang konsisten dan responsif.'
      },
      {
        name: 'React Hook Form, Zod & CKEditor 5',
        category: 'Frontend',
        role: 'Schema Form Validation & Rich Text Editor',
        reason: 'Memvalidasi seluruh input lowongan maupun form lamaran kerja secara ketat serta mendukung penulisan deskripsi pekerjaan berformat HTML kaya.'
      },
      {
        name: 'SWR (Stale-While-Revalidate)',
        category: 'Frontend',
        role: 'Client-Side Caching & Dynamic Filtering',
        reason: 'Menyajikan filter lowongan kerja dan perusahaan secara instan dengan caching pintar di sisi klien.'
      }
    ],
    systemDesign: {
      overview:
        'Arsitektur Dual-App Terintegrasi: Aplikasi Job Hunt CMS (Employer Dashboard) dan Job Hunt Website (Job Seeker Portal) berjalan secara independen namun berbagi satu database PostgreSQL melalui Prisma ORM serta dua bucket penyimpanan objek di Supabase Storage ("company" & "applicant").',
      diagramImage: '/images/project/jobhunt-flowchart.svg',
      nodes: [
        {
          id: 'cms-app',
          title: 'Job Hunt CMS (Employer Dashboard)',
          subtitle: 'bwa-dashboard-job-hunt (:3000)',
          type: 'client',
          description: 'Dashboard internal perusahaan untuk mengelola Overview, Social Links, Teams, memposting lowongan dengan CKEditor 5, dan menginspeksi berkas pelamar.',
          technologies: ['Next.js App Router', 'Shadcn UI', 'CKEditor 5', 'Zod']
        },
        {
          id: 'web-app',
          title: 'Job Hunt Website (Public Portal)',
          subtitle: 'bwa-job-hunt (:3001)',
          type: 'client',
          description: 'Portal publik pencari kerja dengan eksplorasi kategori (_count.Job), filter dinamis SWR, profil perusahaan lengkap, dan modal pengiriman lamaran.',
          technologies: ['Next.js App Router', 'SWR Hooks', 'React Hook Form', 'Radix UI']
        },
        {
          id: 'nextauth-api',
          title: 'Route Handlers & Dual NextAuth',
          subtitle: 'REST API & JWT Session Guard',
          type: 'service',
          description: 'Menangani autentikasi JWT terpisah (Company vs User), upsert profil perusahaan, agregasi filter lowongan, dan transaksi pengiriman lamaran kerja.',
          technologies: ['NextAuth.js v4', 'bcryptjs', 'Next.js Route Handlers']
        },
        {
          id: 'prisma-postgres',
          title: 'Shared PostgreSQL & Prisma ORM',
          subtitle: '9 Synchronized Relational Models',
          type: 'database',
          description: 'Basis data relasional tunggal yang menyinkronkan lowongan yang diposting di CMS agar langsung tampil di Website beserta penghitung kuota pelamar otomatis.',
          technologies: ['PostgreSQL', 'Prisma Client v5.2', 'CUID Keys']
        },
        {
          id: 'supabase-buckets',
          title: 'Supabase Cloud Object Storage',
          subtitle: 'Buckets: "company" & "applicant"',
          type: 'external',
          description: 'Penyimpanan aset biner terpisah untuk gambar logo perusahaan (public/<filename>.jpg) dan dokumen PDF resume kandidat (public/<resume>.pdf).',
          technologies: ['@supabase/supabase-js', 'Supabase Storage RLS']
        }
      ],
      dataFlow: [
        {
          step: 1,
          title: 'Company Onboarding & Brand Asset Upload',
          description: 'Perusahaan mendaftar di Job Hunt CMS, mengunggah logo ke Supabase bucket "company", dan menyimpan Overview, Social Links, serta Team ke PostgreSQL.'
        },
        {
          step: 2,
          title: 'Rich Vacancy Publishing via Prisma',
          description: 'HR memposting lowongan kerja baru dengan CKEditor 5, skill array, dan kuota needs melalui POST /api/job yang langsung tersimpan di tabel Job.'
        },
        {
          step: 3,
          title: 'Real-Time Job Discovery & SWR Filtering',
          description: 'Pencari kerja menjelajahi lowongan di Job Hunt Website dengan filter kategori/industri dinamis menggunakan SWR hooks dan agregasi Prisma.'
        },
        {
          step: 4,
          title: 'Resume PDF Upload & Atomic Quota Increment',
          description: 'Kandidat mengunggah CV PDF ke bucket "applicant" dan mengeksekusi POST /api/jobs/apply yang menyimpan data Applicant sekaligus menambah Job.applicants (+1).'
        }
      ]
    },
    databaseDesign: {
      overview:
        'Skema database relasional PostgreSQL yang dikelola melalui Prisma ORM (schema.prisma) terdiri dari 9 tabel/model terhubung dengan primary key berbasis CUID (@default(cuid())), tipe data String[] untuk techStack & requiredSkills, serta kolom JSON untuk benefits.',
      erdImage: '/images/project/jobhunt-erd.svg',
      tables: [
        {
          name: 'Company',
          description: 'Tabel akun autentikasi perusahaan (Employer) yang digunakan untuk masuk ke dashboard Job Hunt CMS.',
          fields: [
            { name: 'id', type: 'String (CUID)', isPk: true, desc: 'Primary key perusahaan (@default(cuid()))' },
            { name: 'name', type: 'String', desc: 'Nama resmi akun perusahaan' },
            { name: 'email', type: 'String', desc: 'Email unik login perusahaan (@unique)' },
            { name: 'password', type: 'String', desc: 'Hash password terenkripsi bcryptjs' }
          ]
        },
        {
          name: 'Companyoverview',
          description: 'Profil detail perusahaan mencakup logo di Supabase Storage, lokasi, ukuran karyawan, sektor industri, dan array tech stack.',
          fields: [
            { name: 'id', type: 'String (CUID)', isPk: true, desc: 'Primary key overview perusahaan' },
            { name: 'companyId', type: 'String?', isFk: true, desc: 'Foreign key merujuk ke Company.id' },
            { name: 'image', type: 'String', desc: 'Nama file logo di Supabase bucket "company"' },
            { name: 'name', type: 'String', desc: 'Nama brand publik perusahaan' },
            { name: 'website', type: 'String', desc: 'URL situs web resmi perusahaan' },
            { name: 'location', type: 'String', desc: 'Lokasi kantor pusat perusahaan' },
            { name: 'employee', type: 'String', desc: 'Rentang jumlah karyawan (cth: 51-200)' },
            { name: 'industry', type: 'String', desc: 'Sektor industri perusahaan (digunakan untuk filter)' },
            { name: 'dateFounded', type: 'DateTime', desc: 'Tanggal berdirinya perusahaan' },
            { name: 'techStack', type: 'String[]', desc: 'Array teknologi yang digunakan perusahaan' },
            { name: 'description', type: 'String (HTML)', desc: 'Deskripsi profil perusahaan dari CKEditor 5' }
          ]
        },
        {
          name: 'CompanySocialMedia',
          description: 'Menyimpan daftar tautan akun media sosial resmi milik perusahaan.',
          fields: [
            { name: 'id', type: 'String (CUID)', isPk: true, desc: 'Primary key record sosial media' },
            { name: 'companyId', type: 'String?', isFk: true, desc: 'Foreign key merujuk ke Company.id' },
            { name: 'instagram', type: 'String', desc: 'URL profil Instagram perusahaan' },
            { name: 'twitter', type: 'String', desc: 'URL profil Twitter/X perusahaan' },
            { name: 'facebook', type: 'String', desc: 'URL halaman Facebook perusahaan' },
            { name: 'linkedin', type: 'String', desc: 'URL halaman LinkedIn perusahaan' },
            { name: 'youtube', type: 'String', desc: 'URL kanal YouTube perusahaan' }
          ]
        },
        {
          name: 'CompanyTeam',
          description: 'Menyimpan daftar anggota tim inti atau pimpinan perusahaan yang ditampilkan di halaman profil publik.',
          fields: [
            { name: 'id', type: 'String (CUID)', isPk: true, desc: 'Primary key anggota tim' },
            { name: 'companyId', type: 'String?', isFk: true, desc: 'Foreign key merujuk ke Company.id' },
            { name: 'name', type: 'String', desc: 'Nama lengkap anggota tim' },
            { name: 'position', type: 'String', desc: 'Jabatan di perusahaan (cth: CEO, CTO)' },
            { name: 'instagram', type: 'String', desc: 'Tautan Instagram anggota tim' },
            { name: 'linkedin', type: 'String', desc: 'Tautan LinkedIn anggota tim' }
          ]
        },
        {
          name: 'Job',
          description: 'Tabel inti lowongan pekerjaan yang menyimpan spesifikasi posisi, rentang gaji, kuota kebutuhan, skill array, dan benefit JSON.',
          fields: [
            { name: 'id', type: 'String (CUID)', isPk: true, desc: 'Primary key lowongan kerja' },
            { name: 'companyId', type: 'String?', isFk: true, desc: 'Foreign key perusahaan pemosting (Company.id)' },
            { name: 'categoryId', type: 'String?', isFk: true, desc: 'Foreign key kategori pekerjaan (CategoryJob.id)' },
            { name: 'roles', type: 'String', desc: 'Judul posisi lowongan kerja' },
            { name: 'datePosted', type: 'DateTime', desc: 'Tanggal tayang lowongan (@default(now()))' },
            { name: 'dueDate', type: 'DateTime', desc: 'Batas akhir penutupan lamaran kerja' },
            { name: 'jobType', type: 'String', desc: 'Tipe kerja: Full-Time, Part-Time, Remote, Internship' },
            { name: 'applicants', type: 'Int', desc: 'Jumlah pelamar yang sudah masuk saat ini' },
            { name: 'needs', type: 'Int', desc: 'Target kuota kandidat yang dibutuhkan' },
            { name: 'salaryFrom', type: 'String', desc: 'Batas bawah estimasi gaji' },
            { name: 'salaryTo', type: 'String', desc: 'Batas atas estimasi gaji' },
            { name: 'requiredSkills', type: 'String[]', desc: 'Array kompetensi teknis yang dibutuhkan' },
            { name: 'description', type: 'String (HTML)', desc: 'Deskripsi pekerjaan (CKEditor HTML)' },
            { name: 'responsibility', type: 'String (HTML)', desc: 'Tanggung jawab utama pekerjaan' },
            { name: 'whoYouAre', type: 'String (HTML)', desc: 'Kualifikasi kandidat ideal' },
            { name: 'niceToHaves', type: 'String (HTML)', desc: 'Nilai tambah opsional kandidat' },
            { name: 'benefits', type: 'Json', desc: 'Array objek JSON berisi [{benefit, description}]' }
          ]
        },
        {
          name: 'CategoryJob',
          description: 'Tabel master kategori pekerjaan (seperti Engineering, Design, Marketing) untuk pengelompokan dan filter lowongan.',
          fields: [
            { name: 'id', type: 'String (CUID)', isPk: true, desc: 'Primary key kategori lowongan' },
            { name: 'name', type: 'String', desc: 'Nama kategori pekerjaan' }
          ]
        },
        {
          name: 'Industry',
          description: 'Tabel master sektor industri perusahaan (seperti Technology, Finance, Healthcare) untuk dropdown CMS dan filter Website.',
          fields: [
            { name: 'id', type: 'String (CUID)', isPk: true, desc: 'Primary key sektor industri' },
            { name: 'name', type: 'String', desc: 'Nama sektor industri' }
          ]
        },
        {
          name: 'User',
          description: 'Tabel akun autentikasi pencari kerja (Job Seeker) pada aplikasi Job Hunt Website.',
          fields: [
            { name: 'id', type: 'String (CUID)', isPk: true, desc: 'Primary key pencari kerja (@default(cuid()))' },
            { name: 'name', type: 'String', desc: 'Nama lengkap kandidat' },
            { name: 'email', type: 'String', desc: 'Alamat email unik kandidat (@unique)' },
            { name: 'password', type: 'String', desc: 'Hash password terenkripsi bcryptjs' }
          ]
        },
        {
          name: 'Applicant',
          description: 'Mencatat berkas lamaran kerja kandidat pada suatu lowongan beserta referensi file PDF Resume di Supabase Storage.',
          fields: [
            { name: 'id', type: 'String (CUID)', isPk: true, desc: 'Primary key data lamaran kerja' },
            { name: 'userId', type: 'String?', isFk: true, desc: 'Foreign key pelamar merujuk ke User.id' },
            { name: 'jobId', type: 'String?', isFk: true, desc: 'Foreign key lowongan merujuk ke Job.id' },
            { name: 'previousJobTitle', type: 'String', desc: 'Jabatan pekerjaan terakhir kandidat' },
            { name: 'phone', type: 'String', desc: 'Nomor telepon aktif kandidat' },
            { name: 'linkedIn', type: 'String', desc: 'URL profil LinkedIn kandidat' },
            { name: 'portfolio', type: 'String', desc: 'URL web portofolio kandidat' },
            { name: 'coverLetter', type: 'String', desc: 'Surat pengantar singkat (Cover Letter)' },
            { name: 'resume', type: 'String', desc: 'Nama file PDF CV/Resume di Supabase bucket "applicant"' }
          ]
        }
      ],
      relationships: [
        'Company.id (1) ───< (N) Companyoverview.companyId [Profil & Tech Stack Perusahaan]',
        'Company.id (1) ───< (N) CompanySocialMedia.companyId [Tautan Sosial Media]',
        'Company.id (1) ───< (N) CompanyTeam.companyId [Daftar Anggota Tim]',
        'Company.id (1) ───< (N) Job.companyId [Lowongan yang Diposting Perusahaan]',
        'CategoryJob.id (1) ───< (N) Job.categoryId [Klasifikasi Kategori Lowongan]',
        'Job.id (1) ───< (N) Applicant.jobId [Daftar Pelamar pada Lowongan]',
        'User.id (1) ───< (N) Applicant.userId [Riwayat Lamaran Kandidat]'
      ]
    }
  },

  'digisell': {
    id: 'digisell',
    title: 'Digisell',
    tagline: 'Private Link-in-Bio Digital Storefront with High-Concurrency Spring Boot & Midtrans',
    category: 'E-Commerce & Creator Economy',
    status: 'Live Production',
    year: '2025',
    role: 'Full Stack Engineer & System Architect',
    timeline: '2.5 Months',
    image: '/images/p2.svg',
    description:
      'DigiSell adalah platform Link-in-Bio Digital Product Storefront mandiri berbasis Java 17, Spring Boot 3.3, React 19, dan MySQL 8.0. Didesain khusus untuk kreator konten dan developer digital (mirip Gumroad / Lynk.id / Mayar) dengan pendekatan Isolated Storefront (zero-distraction & no competitor ads), di mana seluruh trafik tautan bio 100% terkonversi untuk kreator. Sistem dilengkapi dengan integrasi pembayaran Midtrans Snap, perlindungan stok berkonkurensi tinggi via Pessimistic Locking (PESSIMISTIC_WRITE), token akses unduhan berbatas waktu 24 jam dengan enkripsi URL aset (@JsonIgnore masking), serta subsistem rekonsiliasi dompet seller dan penarikan dana (withdrawal) otomatis.',
    problemStatement:
      'Pada marketplace umum, pembeli yang diarahkan dari media sosial (Instagram, TikTok, Twitter/X) sering kali teralihkan oleh rekomendasi toko lain, iklan bersaing, dan perang harga kompetitor. Selain itu, platform penjualan produk digital rawan terjadi race-condition overselling saat flash sale stok terbatas serta pembajakan link unduhan aset berharga secara publik.',
    solution:
      'Membangun etalase privat link-in-bio (/:username) tanpa distraksi produk kompetitor, didukung arsitektur backend Spring Boot 3.3 berkemampuan Pessimistic Locking untuk integritas stok nol-oversell, verifikasi webhook Midtrans SHA-512 dengan idempotency guard anti double-credit, serta portal unduhan /access dengan expiring download token (valid 24 jam) yang menyembunyikan URL aset asli dari DTO publik.',
    features: [
      {
        title: 'Link-in-Bio Isolated Storefront (/:username)',
        description: 'Halaman etalase profil kreator eksklusif tanpa katalog kompetitor, dioptimalkan untuk performa in-app browser media sosial.',
        icon: 'globe'
      },
      {
        title: 'Fast Checkout & Midtrans Snap Modal',
        description: 'Alur checkout instan tanpa login wajib, langsung membuka popup Midtrans Snap (QRIS, VA, e-Wallet) dengan fallback sandbox mock.',
        icon: 'credit-card'
      },
      {
        title: 'Pessimistic Locking Stock Concurrency',
        description: 'Penerapan PESSIMISTIC_WRITE (SELECT ... FOR UPDATE) pada database MySQL untuk mencegah race condition overselling saat stok terbatas.',
        icon: 'lock'
      },
      {
        title: '24-Hour Expiring Download Portal',
        description: 'Akses aset digital diberikan via UUID token yang kadaluarsa dalam 24 jam dengan penyembunyian URL file asli (@JsonIgnore).',
        icon: 'download'
      },
      {
        title: 'Automated Email Notification Service',
        description: 'Pengiriman email otomatis kepada pembeli berisi tautan klaim lisensi dan file digital segera setelah webhook status PAID diverifikasi.',
        icon: 'mail'
      },
      {
        title: 'Seller Wallet & Bank Withdrawal CMS',
        description: 'Dompet saldo real-time, rekonsiliasi omzet per transaksi, dan pengajuan penarikan dana ke rekening bank dengan validasi saldo minimum.',
        icon: 'chart'
      }
    ],
    githubUrl: 'https://github.com/herinta/digisell-backend-api',
    liveUrl: 'https://digisell-store.vercel.app',
    techStacks: [
      {
        name: 'Java 17 & Spring Boot 3.3.5',
        category: 'Backend',
        role: 'Enterprise REST API & Business Logic',
        reason: 'Performa tinggi, virtual thread ready, ekosistem enterprise stabil dengan Spring Security dan Jakarta Bean Validation.'
      },
      {
        name: 'React 19 & Vite',
        category: 'Frontend',
        role: 'Modern Link-in-Bio SPA Storefront',
        reason: 'Render instan dan bundle footprint sangat ringan untuk loading secepat kilat pada in-app browser media sosial.'
      },
      {
        name: 'React Router v7 & Oxlint',
        category: 'Frontend',
        role: 'Declarative Routing & Fast Tooling',
        reason: 'Routing dinamis multi-level untuk etalase creator (/:username), checkout, portal /access, dan dashboard seller.'
      },
      {
        name: 'Spring Data JPA & Hibernate',
        category: 'Backend',
        role: 'ORM & Transaction Management',
        reason: 'Abstraksi repository yang kuat serta mendukung LockModeType.PESSIMISTIC_WRITE untuk transaksi data berintegritas tinggi.'
      },
      {
        name: 'MySQL 8.0 (InnoDB Engine)',
        category: 'Database',
        role: 'ACID Relational Storage',
        reason: 'Menyimpan 5 entitas relasional terindeks dengan row-level locking InnoDB dan integritas transaksi finansial mutlak.'
      },
      {
        name: 'Midtrans Snap API v1',
        category: 'Backend',
        role: 'Multi-Channel Payment Processing',
        reason: 'Menerima pembayaran QRIS, Virtual Account bank, GoPay, dan kartu kredit dengan verifikasi tanda tangan SHA-512.'
      },
      {
        name: 'Spring Security & BCrypt',
        category: 'Backend',
        role: 'Stateless Bearer Token Auth',
        reason: 'Filter SellerTokenFilter dengan token dgs_<uuid><timestamp> (30 hari) serta hashing password BCrypt untuk keamanan akun seller.'
      },
      {
        name: 'Jakarta Mail / JavaMailSender',
        category: 'Backend',
        role: 'Automated Digital Delivery Service',
        reason: 'Mengirimkan konfirmasi pembayaran instan beserta magic link unduhan ke email pembeli secara asynchronous.'
      }
    ],
    systemDesign: {
      overview:
        'Arsitektur E-Commerce Kreator Mandiri: Frontend React 19 mengonsumsi REST API Spring Boot 3.3. Transaksi checkout diamankan dengan Pessimistic Write Lock pada MySQL InnoDB, Midtrans Snap API menangani pembayaran multi-metode, dan webhook divalidasi dengan signature SHA-512 untuk memicu penerbitan expiring access token 24 jam.',
      diagramImage: '/images/project/digisell-flowchart.svg',
      nodes: [
        {
          id: 'storefront-client',
          title: 'React 19 Storefront & Bio',
          subtitle: 'Link-in-Bio SPA (:5173)',
          type: 'client',
          description: 'Etalase profil privat kreator (/:username), fast checkout modal, portal akses unduh (/access), dan dashboard seller.',
          technologies: ['React 19', 'Vite', 'React Router v7', 'Lucide React']
        },
        {
          id: 'spring-rest',
          title: 'Spring Boot 3.3 REST API',
          subtitle: 'Port 8080 (Stateless)',
          type: 'service',
          description: 'AuthController, ProductController, OrderController, SellerController dengan SellerTokenFilter (dgs_...).',
          technologies: ['Java 17', 'Spring Boot 3.3.5', 'Spring Security', 'Bean Validation']
        },
        {
          id: 'pessimistic-lock',
          title: 'Pessimistic Lock & Stock Service',
          subtitle: 'PESSIMISTIC_WRITE Lock',
          type: 'service',
          description: 'Eksekusi SELECT ... FOR UPDATE pada MySQL saat pemesanan produk berstok terbatas untuk mencegah double selling.',
          technologies: ['Hibernate JPA', 'Row-Level Lock', 'InnoDB Engine']
        },
        {
          id: 'midtrans-gateway',
          title: 'Midtrans Snap & Webhook',
          subtitle: 'Payment Processing & SHA-512',
          type: 'gateway',
          description: 'Mengenerate Snap Token pembayaran dan memverifikasi notifikasi webhook dengan signature hash SHA-512 serta proteksi idempotency.',
          technologies: ['Midtrans Snap API', 'SHA-512 Crypto', 'Idempotent Handler']
        },
        {
          id: 'delivery-service',
          title: '24h Delivery & Email Service',
          subtitle: 'Secure Token & File Concealment',
          type: 'service',
          description: 'Menyembunyikan URL file asli (@JsonIgnore), menerbitkan token akses unduh berbatas 24 jam, dan mengirimkan email konfirmasi ke pembeli.',
          technologies: ['UUID Access Token', 'JavaMailSender', 'DTO File Concealment']
        },
        {
          id: 'mysql-db',
          title: 'MySQL 8.0 Database',
          subtitle: 'digisell_db (5 Relational Tables)',
          type: 'database',
          description: 'Penyimpanan relasional sellers, products, order_transactions, seller_wallets, dan withdrawals dengan transaksi ACID.',
          technologies: ['MySQL 8.0', 'InnoDB', 'Connection Pooling']
        }
      ],
      dataFlow: [
        {
          step: 1,
          title: 'Pembeli Membuka Storefront & Checkout',
          description: 'Pembeli mengunjungi /:username, memilih produk digital, dan mengisi nama/email pada Fast Checkout Modal.'
        },
        {
          step: 2,
          title: 'Order Creation & Pessimistic Stock Lock',
          description: 'Backend mengunci baris produk dengan PESSIMISTIC_WRITE, memvalidasi stok, membuat order DIGI-..., dan meminta Snap Token dari Midtrans.'
        },
        {
          step: 3,
          title: 'Pembayaran Via Midtrans Snap',
          description: 'Modal Snap terbuka di frontend; pembeli membayar melalui QRIS, Transfer VA Bank, atau e-Wallet.'
        },
        {
          step: 4,
          title: 'Midtrans Webhook & Signature Verification',
          description: 'Midtrans mengirim notifikasi HTTP; backend memverifikasi signature SHA-512 dan idempotency status sebelum mendepositkan saldo ke wallet seller.'
        },
        {
          step: 5,
          title: '24-Hour Token Generation & Delivery',
          description: 'Backend membuat download_token (valid 24 jam) dan mengirimkan email notifikasi ke pembeli berisi link ke portal /access.'
        }
      ]
    },
    databaseDesign: {
      overview:
        'Skema basis data MySQL 8.0 (digisell_db) yang dinormalisasi dengan InnoDB engine, row-level locking untuk stok konkurensi, relasi 1:1 wallet saldo, audit riwayat penarikan, dan integritas transaksi finansial.',
      erdImage: '/images/project/digisell-erd.svg',
      tables: [
        {
          name: 'sellers',
          description: 'Entitas akun kreator/penjual dengan slug username toko publik dan kredensial terenkripsi BCrypt.',
          fields: [
            { name: 'id', type: 'BIGINT', isPk: true, desc: 'Primary key seller (Auto Increment)' },
            { name: 'username', type: 'VARCHAR(100)', desc: 'Slug URL storefront seller (UNIQUE, e.g. /:username)' },
            { name: 'email', type: 'VARCHAR(150)', desc: 'Email seller terverifikasi (UNIQUE)' },
            { name: 'password', type: 'VARCHAR(255)', desc: 'Password ter-hash dengan algoritma BCrypt' },
            { name: 'full_name', type: 'VARCHAR(150)', desc: 'Nama lengkap pemilik etalase' },
            { name: 'bio', type: 'VARCHAR(500)', desc: 'Deskripsi profil toko kreator' },
            { name: 'avatar_url', type: 'VARCHAR(500)', desc: 'URL foto profil kreator' },
            { name: 'auth_token', type: 'VARCHAR(255)', desc: 'Stateless Bearer token (dgs_<uuid><timestamp>)' },
            { name: 'token_expiry', type: 'DATETIME', desc: 'Masa aktif token sesi (30 hari)' },
            { name: 'created_at', type: 'DATETIME', desc: 'Waktu pendaftaran akun seller' }
          ]
        },
        {
          name: 'seller_wallets',
          description: 'Rekapitulasi saldo dompet seller yang berelasi 1:1 dengan tabel sellers untuk menampung pendapatan lunas.',
          fields: [
            { name: 'id', type: 'BIGINT', isPk: true, isFk: true, desc: 'Primary key berelasi 1:1 ke sellers.id' },
            { name: 'available_balance', type: 'DECIMAL(15,2)', desc: 'Saldo aktif yang dapat dicairkan' },
            { name: 'total_revenue', type: 'DECIMAL(15,2)', desc: 'Akumulasi total omzet kotor penjualan' },
            { name: 'total_withdrawn', type: 'DECIMAL(15,2)', desc: 'Total dana yang telah berhasil ditarik ke bank' },
            { name: 'updated_at', type: 'DATETIME', desc: 'Waktu pembaruan saldo terakhir' }
          ]
        },
        {
          name: 'products',
          description: 'Katalog produk digital (eBook, template, source code) dengan proteksi penyembunyian URL file aset (@JsonIgnore).',
          fields: [
            { name: 'id', type: 'BIGINT', isPk: true, desc: 'Primary key produk digital (Auto Increment)' },
            { name: 'seller_username', type: 'VARCHAR(100)', isFk: true, desc: 'Pemilik produk, foreign key ke sellers.username' },
            { name: 'title', type: 'VARCHAR(255)', desc: 'Judul produk digital' },
            { name: 'description', type: 'VARCHAR(2000)', desc: 'Rincian deskripsi, silabus, atau manfaat produk' },
            { name: 'price', type: 'DECIMAL(15,2)', desc: 'Harga jual aktif (IDR)' },
            { name: 'original_price', type: 'DECIMAL(15,2)', desc: 'Harga coret sebelum diskon' },
            { name: 'image_url', type: 'VARCHAR(500)', desc: 'Thumbnail cover produk' },
            { name: 'file_url', type: 'VARCHAR(500)', desc: 'URL berkas digital asli (Hidden via @JsonIgnore)' },
            { name: 'category', type: 'VARCHAR(50)', desc: 'Kategori produk (Template, Ebook, Source Code)' },
            { name: 'badge', type: 'VARCHAR(50)', desc: 'Label penarik perhatian (e.g. Best Seller, New)' },
            { name: 'stock', type: 'INT', desc: 'Sisa stok produk (Dilindungi PESSIMISTIC_WRITE lock)' },
            { name: 'unlimited_stock', type: 'BOOLEAN', desc: 'Flag jika produk tidak memiliki batas kuantitas' },
            { name: 'sold_count', type: 'INT', desc: 'Jumlah unit yang telah sukses terjual' },
            { name: 'created_at', type: 'DATETIME', desc: 'Waktu pembuatan produk' }
          ]
        },
        {
          name: 'order_transactions',
          description: 'Pencatatan invoice transaksi pesanan, status pembayaran Midtrans, dan penerbitan 24-hour access token.',
          fields: [
            { name: 'id', type: 'BIGINT', isPk: true, desc: 'Primary key transaksi (Auto Increment)' },
            { name: 'order_id', type: 'VARCHAR(100)', desc: 'Kode invoice unik (Format: DIGI-<timestamp>-<rand>)' },
            { name: 'product_id', type: 'BIGINT', isFk: true, desc: 'Foreign key merujuk ke products.id' },
            { name: 'product_title', type: 'VARCHAR(255)', desc: 'Snapshot judul produk saat dibeli' },
            { name: 'seller_username', type: 'VARCHAR(100)', isFk: true, desc: 'Foreign key merujuk ke sellers.username' },
            { name: 'customer_name', type: 'VARCHAR(150)', desc: 'Nama pembeli' },
            { name: 'customer_email', type: 'VARCHAR(150)', desc: 'Email tujuan pengiriman lisensi/file' },
            { name: 'customer_phone', type: 'VARCHAR(50)', desc: 'Nomor kontak WhatsApp/telepon pembeli' },
            { name: 'amount', type: 'DECIMAL(15,2)', desc: 'Nominal pembayaran total' },
            { name: 'status', type: 'VARCHAR(50)', desc: 'PENDING, PAID, EXPIRED, CANCELLED, FAILED' },
            { name: 'snap_token', type: 'VARCHAR(255)', desc: 'Token transaksi Midtrans Snap' },
            { name: 'snap_redirect_url', type: 'VARCHAR(500)', desc: 'URL pembayaran Midtrans alternatif' },
            { name: 'payment_type', type: 'VARCHAR(50)', desc: 'Metode pembayaran terpilih (qris, bank_transfer, dll.)' },
            { name: 'download_token', type: 'VARCHAR(255)', desc: 'Token akses file digital unik (UUID)' },
            { name: 'download_expiry', type: 'DATETIME', desc: 'Batas kadaluarsa unduhan (= paid_at + 24 Jam)' },
            { name: 'created_at', type: 'DATETIME', desc: 'Waktu pembuatan pesanan' },
            { name: 'paid_at', type: 'DATETIME', desc: 'Waktu pelunasan pembayaran terverifikasi' }
          ]
        },
        {
          name: 'withdrawals',
          description: 'Riwayat pencairan saldo seller ke rekening bank dengan verifikasi status penarikan.',
          fields: [
            { name: 'id', type: 'BIGINT', isPk: true, desc: 'Primary key penarikan dana (Auto Increment)' },
            { name: 'withdrawal_code', type: 'VARCHAR(100)', desc: 'Kode unik penarikan (Format: WD-<timestamp>)' },
            { name: 'amount', type: 'DECIMAL(15,2)', desc: 'Nominal dana yang ditarik' },
            { name: 'bank_name', type: 'VARCHAR(100)', desc: 'Nama bank tujuan pencairan (BCA, Mandiri, dll.)' },
            { name: 'account_number', type: 'VARCHAR(100)', desc: 'Nomor rekening bank tujuan' },
            { name: 'account_holder', type: 'VARCHAR(150)', desc: 'Nama pemilik rekening bank' },
            { name: 'status', type: 'VARCHAR(50)', desc: 'Status pencairan (PENDING, PROCESSED, REJECTED)' },
            { name: 'requested_at', type: 'DATETIME', desc: 'Waktu permohonan penarikan diajukan' },
            { name: 'processed_at', type: 'DATETIME', desc: 'Waktu dana berhasil ditransfer' }
          ]
        }
      ],
      relationships: [
        'sellers.id (1) ─── (1) seller_wallets.id [1:1 Dompet Saldo Penjual]',
        'sellers.username (1) ───< (N) products.seller_username [Katalog Produk Kreator]',
        'products.id (1) ───< (N) order_transactions.product_id [Transaksi Pesanan Produk]',
        'seller_wallets.id (1) ───< (N) withdrawals.id [Pengajuan Penarikan Dana Seller]',
        'sellers.username (1) ───< (N) order_transactions.seller_username [Riwayat Penjualan per Kreator]'
      ]
    }
  },

  // Backward compatibility alias for focus-app
  'focus-app': {
    id: 'digisell',
    title: 'Digisell',
    tagline: 'Private Link-in-Bio Digital Storefront with High-Concurrency Spring Boot & Midtrans',
    category: 'E-Commerce & Creator Economy',
    status: 'Live Production',
    year: '2025',
    role: 'Full Stack Engineer & System Architect',
    timeline: '2.5 Months',
    image: '/images/p2.svg',
    description:
      'DigiSell adalah platform Link-in-Bio Digital Product Storefront mandiri berbasis Java 17, Spring Boot 3.3, React 19, dan MySQL 8.0. Didesain khusus untuk kreator konten dan developer digital (mirip Gumroad / Lynk.id / Mayar) dengan pendekatan Isolated Storefront (zero-distraction & no competitor ads), di mana seluruh trafik tautan bio 100% terkonversi untuk kreator. Sistem dilengkapi dengan integrasi pembayaran Midtrans Snap, perlindungan stok berkonkurensi tinggi via Pessimistic Locking (PESSIMISTIC_WRITE), token akses unduhan berbatas waktu 24 jam dengan enkripsi URL aset (@JsonIgnore masking), serta subsistem rekonsiliasi dompet seller dan penarikan dana (withdrawal) otomatis.',
    problemStatement:
      'Pada marketplace umum, pembeli yang diarahkan dari media sosial (Instagram, TikTok, Twitter/X) sering kali teralihkan oleh rekomendasi toko lain, iklan bersaing, dan perang harga kompetitor. Selain itu, platform penjualan produk digital rawan terjadi race-condition overselling saat flash sale stok terbatas serta pembajakan link unduhan aset berharga secara publik.',
    solution:
      'Membangun etalase privat link-in-bio (/:username) tanpa distraksi produk kompetitor, didukung arsitektur backend Spring Boot 3.3 berkemampuan Pessimistic Locking untuk integritas stok nol-oversell, verifikasi webhook Midtrans SHA-512 dengan idempotency guard anti double-credit, serta portal unduhan /access dengan expiring download token (valid 24 jam) yang menyembunyikan URL aset asli dari DTO publik.',
    features: [
      {
        title: 'Link-in-Bio Isolated Storefront (/:username)',
        description: 'Halaman etalase profil kreator eksklusif tanpa katalog kompetitor, dioptimalkan untuk performa in-app browser media sosial.',
        icon: 'globe'
      },
      {
        title: 'Fast Checkout & Midtrans Snap Modal',
        description: 'Alur checkout instan tanpa login wajib, langsung membuka popup Midtrans Snap (QRIS, VA, e-Wallet) dengan fallback sandbox mock.',
        icon: 'credit-card'
      },
      {
        title: 'Pessimistic Locking Stock Concurrency',
        description: 'Penerapan PESSIMISTIC_WRITE (SELECT ... FOR UPDATE) pada database MySQL untuk mencegah race condition overselling saat stok terbatas.',
        icon: 'lock'
      },
      {
        title: '24-Hour Expiring Download Portal',
        description: 'Akses aset digital diberikan via UUID token yang kadaluarsa dalam 24 jam dengan penyembunyian URL file asli (@JsonIgnore).',
        icon: 'download'
      },
      {
        title: 'Automated Email Notification Service',
        description: 'Pengiriman email otomatis kepada pembeli berisi tautan klaim lisensi dan file digital segera setelah webhook status PAID diverifikasi.',
        icon: 'mail'
      },
      {
        title: 'Seller Wallet & Bank Withdrawal CMS',
        description: 'Dompet saldo real-time, rekonsiliasi omzet per transaksi, dan pengajuan penarikan dana ke rekening bank dengan validasi saldo minimum.',
        icon: 'chart'
      }
    ],
    githubUrl: 'https://github.com/herinta/digisell-backend-api',
    liveUrl: 'https://digisell-store.vercel.app',
    techStacks: [
      {
        name: 'Java 17 & Spring Boot 3.3.5',
        category: 'Backend',
        role: 'Enterprise REST API & Business Logic',
        reason: 'Performa tinggi, virtual thread ready, ekosistem enterprise stabil dengan Spring Security dan Jakarta Bean Validation.'
      },
      {
        name: 'React 19 & Vite',
        category: 'Frontend',
        role: 'Modern Link-in-Bio SPA Storefront',
        reason: 'Render instan dan bundle footprint sangat ringan untuk loading secepat kilat pada in-app browser media sosial.'
      },
      {
        name: 'React Router v7 & Oxlint',
        category: 'Frontend',
        role: 'Declarative Routing & Fast Tooling',
        reason: 'Routing dinamis multi-level untuk etalase creator (/:username), checkout, portal /access, dan dashboard seller.'
      },
      {
        name: 'Spring Data JPA & Hibernate',
        category: 'Backend',
        role: 'ORM & Transaction Management',
        reason: 'Abstraksi repository yang kuat serta mendukung LockModeType.PESSIMISTIC_WRITE untuk transaksi data berintegritas tinggi.'
      },
      {
        name: 'MySQL 8.0 (InnoDB Engine)',
        category: 'Database',
        role: 'ACID Relational Storage',
        reason: 'Menyimpan 5 entitas relasional terindeks dengan row-level locking InnoDB dan integritas transaksi finansial mutlak.'
      },
      {
        name: 'Midtrans Snap API v1',
        category: 'Backend',
        role: 'Multi-Channel Payment Processing',
        reason: 'Menerima pembayaran QRIS, Virtual Account bank, GoPay, dan kartu kredit dengan verifikasi tanda tangan SHA-512.'
      },
      {
        name: 'Spring Security & BCrypt',
        category: 'Backend',
        role: 'Stateless Bearer Token Auth',
        reason: 'Filter SellerTokenFilter dengan token dgs_<uuid><timestamp> (30 hari) serta hashing password BCrypt untuk keamanan akun seller.'
      },
      {
        name: 'Jakarta Mail / JavaMailSender',
        category: 'Backend',
        role: 'Automated Digital Delivery Service',
        reason: 'Mengirimkan konfirmasi pembayaran instan beserta magic link unduhan ke email pembeli secara asynchronous.'
      }
    ],
    systemDesign: {
      overview:
        'Arsitektur E-Commerce Kreator Mandiri: Frontend React 19 mengonsumsi REST API Spring Boot 3.3. Transaksi checkout diamankan dengan Pessimistic Write Lock pada MySQL InnoDB, Midtrans Snap API menangani pembayaran multi-metode, dan webhook divalidasi dengan signature SHA-512 untuk memicu penerbitan expiring access token 24 jam.',
      diagramImage: '/images/project/digisell-flowchart.svg',
      nodes: [
        {
          id: 'storefront-client',
          title: 'React 19 Storefront & Bio',
          subtitle: 'Link-in-Bio SPA (:5173)',
          type: 'client',
          description: 'Etalase profil privat kreator (/:username), fast checkout modal, portal akses unduh (/access), dan dashboard seller.',
          technologies: ['React 19', 'Vite', 'React Router v7', 'Lucide React']
        },
        {
          id: 'spring-rest',
          title: 'Spring Boot 3.3 REST API',
          subtitle: 'Port 8080 (Stateless)',
          type: 'service',
          description: 'AuthController, ProductController, OrderController, SellerController dengan SellerTokenFilter (dgs_...).',
          technologies: ['Java 17', 'Spring Boot 3.3.5', 'Spring Security', 'Bean Validation']
        },
        {
          id: 'pessimistic-lock',
          title: 'Pessimistic Lock & Stock Service',
          subtitle: 'PESSIMISTIC_WRITE Lock',
          type: 'service',
          description: 'Eksekusi SELECT ... FOR UPDATE pada MySQL saat pemesanan produk berstok terbatas untuk mencegah double selling.',
          technologies: ['Hibernate JPA', 'Row-Level Lock', 'InnoDB Engine']
        },
        {
          id: 'midtrans-gateway',
          title: 'Midtrans Snap & Webhook',
          subtitle: 'Payment Processing & SHA-512',
          type: 'gateway',
          description: 'Mengenerate Snap Token pembayaran dan memverifikasi notifikasi webhook dengan signature hash SHA-512 serta proteksi idempotency.',
          technologies: ['Midtrans Snap API', 'SHA-512 Crypto', 'Idempotent Handler']
        },
        {
          id: 'delivery-service',
          title: '24h Delivery & Email Service',
          subtitle: 'Secure Token & File Concealment',
          type: 'service',
          description: 'Menyembunyikan URL file asli (@JsonIgnore), menerbitkan token akses unduh berbatas 24 jam, dan mengirimkan email konfirmasi ke pembeli.',
          technologies: ['UUID Access Token', 'JavaMailSender', 'DTO File Concealment']
        },
        {
          id: 'mysql-db',
          title: 'MySQL 8.0 Database',
          subtitle: 'digisell_db (5 Relational Tables)',
          type: 'database',
          description: 'Penyimpanan relasional sellers, products, order_transactions, seller_wallets, dan withdrawals dengan transaksi ACID.',
          technologies: ['MySQL 8.0', 'InnoDB', 'Connection Pooling']
        }
      ],
      dataFlow: [
        {
          step: 1,
          title: 'Pembeli Membuka Storefront & Checkout',
          description: 'Pembeli mengunjungi /:username, memilih produk digital, dan mengisi nama/email pada Fast Checkout Modal.'
        },
        {
          step: 2,
          title: 'Order Creation & Pessimistic Stock Lock',
          description: 'Backend mengunci baris produk dengan PESSIMISTIC_WRITE, memvalidasi stok, membuat order DIGI-..., dan meminta Snap Token dari Midtrans.'
        },
        {
          step: 3,
          title: 'Pembayaran Via Midtrans Snap',
          description: 'Modal Snap terbuka di frontend; pembeli membayar melalui QRIS, Transfer VA Bank, atau e-Wallet.'
        },
        {
          step: 4,
          title: 'Midtrans Webhook & Signature Verification',
          description: 'Midtrans mengirim notifikasi HTTP; backend memverifikasi signature SHA-512 dan idempotency status sebelum mendepositkan saldo ke wallet seller.'
        },
        {
          step: 5,
          title: '24-Hour Token Generation & Delivery',
          description: 'Backend membuat download_token (valid 24 jam) dan mengirimkan email notifikasi ke pembeli berisi link ke portal /access.'
        }
      ]
    },
    databaseDesign: {
      overview:
        'Skema basis data MySQL 8.0 (digisell_db) yang dinormalisasi dengan InnoDB engine, row-level locking untuk stok konkurensi, relasi 1:1 wallet saldo, audit riwayat penarikan, dan integritas transaksi finansial.',
      erdImage: '/images/project/digisell-erd.svg',
      tables: [
        {
          name: 'sellers',
          description: 'Entitas akun kreator/penjual dengan slug username toko publik dan kredensial terenkripsi BCrypt.',
          fields: [
            { name: 'id', type: 'BIGINT', isPk: true, desc: 'Primary key seller (Auto Increment)' },
            { name: 'username', type: 'VARCHAR(100)', desc: 'Slug URL storefront seller (UNIQUE, e.g. /:username)' },
            { name: 'email', type: 'VARCHAR(150)', desc: 'Email seller terverifikasi (UNIQUE)' },
            { name: 'password', type: 'VARCHAR(255)', desc: 'Password ter-hash dengan algoritma BCrypt' },
            { name: 'full_name', type: 'VARCHAR(150)', desc: 'Nama lengkap pemilik etalase' },
            { name: 'bio', type: 'VARCHAR(500)', desc: 'Deskripsi profil toko kreator' },
            { name: 'avatar_url', type: 'VARCHAR(500)', desc: 'URL foto profil kreator' },
            { name: 'auth_token', type: 'VARCHAR(255)', desc: 'Stateless Bearer token (dgs_<uuid><timestamp>)' },
            { name: 'token_expiry', type: 'DATETIME', desc: 'Masa aktif token sesi (30 hari)' },
            { name: 'created_at', type: 'DATETIME', desc: 'Waktu pendaftaran akun seller' }
          ]
        },
        {
          name: 'seller_wallets',
          description: 'Rekapitulasi saldo dompet seller yang berelasi 1:1 dengan tabel sellers untuk menampung pendapatan lunas.',
          fields: [
            { name: 'id', type: 'BIGINT', isPk: true, isFk: true, desc: 'Primary key berelasi 1:1 ke sellers.id' },
            { name: 'available_balance', type: 'DECIMAL(15,2)', desc: 'Saldo aktif yang dapat dicairkan' },
            { name: 'total_revenue', type: 'DECIMAL(15,2)', desc: 'Akumulasi total omzet kotor penjualan' },
            { name: 'total_withdrawn', type: 'DECIMAL(15,2)', desc: 'Total dana yang telah berhasil ditarik ke bank' },
            { name: 'updated_at', type: 'DATETIME', desc: 'Waktu pembaruan saldo terakhir' }
          ]
        },
        {
          name: 'products',
          description: 'Katalog produk digital (eBook, template, source code) dengan proteksi penyembunyian URL file aset (@JsonIgnore).',
          fields: [
            { name: 'id', type: 'BIGINT', isPk: true, desc: 'Primary key produk digital (Auto Increment)' },
            { name: 'seller_username', type: 'VARCHAR(100)', isFk: true, desc: 'Pemilik produk, foreign key ke sellers.username' },
            { name: 'title', type: 'VARCHAR(255)', desc: 'Judul produk digital' },
            { name: 'description', type: 'VARCHAR(2000)', desc: 'Rincian deskripsi, silabus, atau manfaat produk' },
            { name: 'price', type: 'DECIMAL(15,2)', desc: 'Harga jual aktif (IDR)' },
            { name: 'original_price', type: 'DECIMAL(15,2)', desc: 'Harga coret sebelum diskon' },
            { name: 'image_url', type: 'VARCHAR(500)', desc: 'Thumbnail cover produk' },
            { name: 'file_url', type: 'VARCHAR(500)', desc: 'URL berkas digital asli (Hidden via @JsonIgnore)' },
            { name: 'category', type: 'VARCHAR(50)', desc: 'Kategori produk (Template, Ebook, Source Code)' },
            { name: 'badge', type: 'VARCHAR(50)', desc: 'Label penarik perhatian (e.g. Best Seller, New)' },
            { name: 'stock', type: 'INT', desc: 'Sisa stok produk (Dilindungi PESSIMISTIC_WRITE lock)' },
            { name: 'unlimited_stock', type: 'BOOLEAN', desc: 'Flag jika produk tidak memiliki batas kuantitas' },
            { name: 'sold_count', type: 'INT', desc: 'Jumlah unit yang telah sukses terjual' },
            { name: 'created_at', type: 'DATETIME', desc: 'Waktu pembuatan produk' }
          ]
        },
        {
          name: 'order_transactions',
          description: 'Pencatatan invoice transaksi pesanan, status pembayaran Midtrans, dan penerbitan 24-hour access token.',
          fields: [
            { name: 'id', type: 'BIGINT', isPk: true, desc: 'Primary key transaksi (Auto Increment)' },
            { name: 'order_id', type: 'VARCHAR(100)', desc: 'Kode invoice unik (Format: DIGI-<timestamp>-<rand>)' },
            { name: 'product_id', type: 'BIGINT', isFk: true, desc: 'Foreign key merujuk ke products.id' },
            { name: 'product_title', type: 'VARCHAR(255)', desc: 'Snapshot judul produk saat dibeli' },
            { name: 'seller_username', type: 'VARCHAR(100)', isFk: true, desc: 'Foreign key merujuk ke sellers.username' },
            { name: 'customer_name', type: 'VARCHAR(150)', desc: 'Nama pembeli' },
            { name: 'customer_email', type: 'VARCHAR(150)', desc: 'Email tujuan pengiriman lisensi/file' },
            { name: 'customer_phone', type: 'VARCHAR(50)', desc: 'Nomor kontak WhatsApp/telepon pembeli' },
            { name: 'amount', type: 'DECIMAL(15,2)', desc: 'Nominal pembayaran total' },
            { name: 'status', type: 'VARCHAR(50)', desc: 'PENDING, PAID, EXPIRED, CANCELLED, FAILED' },
            { name: 'snap_token', type: 'VARCHAR(255)', desc: 'Token transaksi Midtrans Snap' },
            { name: 'snap_redirect_url', type: 'VARCHAR(500)', desc: 'URL pembayaran Midtrans alternatif' },
            { name: 'payment_type', type: 'VARCHAR(50)', desc: 'Metode pembayaran terpilih (qris, bank_transfer, dll.)' },
            { name: 'download_token', type: 'VARCHAR(255)', desc: 'Token akses file digital unik (UUID)' },
            { name: 'download_expiry', type: 'DATETIME', desc: 'Batas kadaluarsa unduhan (= paid_at + 24 Jam)' },
            { name: 'created_at', type: 'DATETIME', desc: 'Waktu pembuatan pesanan' },
            { name: 'paid_at', type: 'DATETIME', desc: 'Waktu pelunasan pembayaran terverifikasi' }
          ]
        },
        {
          name: 'withdrawals',
          description: 'Riwayat pencairan saldo seller ke rekening bank dengan verifikasi status penarikan.',
          fields: [
            { name: 'id', type: 'BIGINT', isPk: true, desc: 'Primary key penarikan dana (Auto Increment)' },
            { name: 'withdrawal_code', type: 'VARCHAR(100)', desc: 'Kode unik penarikan (Format: WD-<timestamp>)' },
            { name: 'amount', type: 'DECIMAL(15,2)', desc: 'Nominal dana yang ditarik' },
            { name: 'bank_name', type: 'VARCHAR(100)', desc: 'Nama bank tujuan pencairan (BCA, Mandiri, dll.)' },
            { name: 'account_number', type: 'VARCHAR(100)', desc: 'Nomor rekening bank tujuan' },
            { name: 'account_holder', type: 'VARCHAR(150)', desc: 'Nama pemilik rekening bank' },
            { name: 'status', type: 'VARCHAR(50)', desc: 'Status pencairan (PENDING, PROCESSED, REJECTED)' },
            { name: 'requested_at', type: 'DATETIME', desc: 'Waktu permohonan penarikan diajukan' },
            { name: 'processed_at', type: 'DATETIME', desc: 'Waktu dana berhasil ditransfer' }
          ]
        }
      ],
      relationships: [
        'sellers.id (1) ─── (1) seller_wallets.id [1:1 Dompet Saldo Penjual]',
        'sellers.username (1) ───< (N) products.seller_username [Katalog Produk Kreator]',
        'products.id (1) ───< (N) order_transactions.product_id [Transaksi Pesanan Produk]',
        'seller_wallets.id (1) ───< (N) withdrawals.id [Pengajuan Penarikan Dana Seller]',
        'sellers.username (1) ───< (N) order_transactions.seller_username [Riwayat Penjualan per Kreator]'
      ]
    }
  },

  'multichat-ai': {
    id: 'multichat-ai',
    title: 'Multichat AI',
    tagline: 'Multi-Agent Conversational AI Workspace with Group Voice Call, Cross-Room Memory & Proactive Messaging',
    category: 'Conversational AI & Multi-Agent System',
    status: 'Live Production',
    year: '2026',
    role: 'Full Stack Engineer & AI Architect',
    timeline: '3 Months',
    image: '/images/p3.svg',
    description:
      'Multichat AI (Multi-AI) adalah aplikasi web interaktif berbasis Next.js 16 App Router, Supabase Realtime, dan Google Gemini 3.5 Flash Lite yang memungkinkan pengguna mengobrol maupun menelepon banyak karakter AI sekaligus dalam ruang privat (1-on-1) maupun grup (Multi-Agent Group Chat). Setiap karakter memiliki memori jangka panjang (>3 hari), memori lintas room (Cross-Room Memory), inisiatif memulai percakapan duluan ("AI Chat Duluan"), panggilan suara grup bergaya Discord/FaceTime, serta pertahanan Dual-Layer Anti-Prompt Injection yang merespons serangan jailbreak layaknya manusia bingung sesuai kepribadian karakter.',
    problemStatement:
      'Aplikasi chatbot AI konvensional umumnya bersifat pasif (hanya menjawab saat ditanya), terisolasi dalam sesi 1-on-1 yang melupakan konteks percakapan di ruang lain, rentan terhadap prompt injection yang membocorkan instruksi sistem, serta belum mendukung percakapan suara multi-karakter secara interaktif.',
    solution:
      'Membangun ekosistem Multi-Agent ber-EQ tinggi dengan Dynamic Routing (@Mention & Inter-AI Ping-Pong), konsolidasi memori otomatis ke kolom rooms.memory, fitur Proactive Reach-Out dengan Multi-Tab Mutex Lock, Group Voice Call berbasis Web Speech API dengan Anti-Echo Cutoff, serta perisai keamanan Dual-Layer Anti-Prompt Injection ("Respon Manusia Bingung").',
    features: [
      {
        title: 'Multi-Agent Group Chat & Inter-AI Banter',
        description: 'Routing pesan dinamis via @NamaAgent dan fitur Inter-AI Ping-Pong di mana para agen dapat saling menyahut secara otomatis (dibatasi 4 putaran) dengan memori lintas room.',
        icon: 'users'
      },
      {
        title: '1-on-1 & Group Voice Call (Discord Style)',
        description: 'Panggilan suara real-time dengan Speech Recognition (id-ID), modulasi pitch TTS unik per karakter, Anti-Echo mic cutoff, live subtitle, dan rangkuman memori pasca-telepon otomatis.',
        icon: 'play'
      },
      {
        title: 'Proactive "AI Chat Duluan" Engine',
        description: 'Karakter AI berinisiatif menanyakan kabar agenda masa lalu (ujian, interview) atau menyapa kasual tanpa halusinasi, dilengkapi Anti-Ghosting Guard dan Multi-Tab Mutex Lock.',
        icon: 'chat'
      },
      {
        title: 'Dual-Layer Anti-Prompt Injection Shield',
        description: 'Menangkal upaya jailbreak/DAN mode dengan sanitasi delimiter dan Server Interceptor yang menghasilkan "Respon Manusia Bingung" dinamis sesuai logat masing-masing karakter.',
        icon: 'lock'
      }
    ],
    githubUrl: 'https://github.com/herinta/multichat-ai',
    liveUrl: 'https://multichat-ai.vercel.app',
    techStacks: [
      {
        name: 'Next.js 16.3 (App Router & Turbopack)',
        category: 'Frontend',
        role: 'Full-Stack Framework & API Orchestrator',
        reason: 'Menjalankan Async Server Components untuk proteksi rute instan dan Route Handlers untuk orkestrasi multi-agen, voice call, serta konsolidasi memori.'
      },
      {
        name: 'React 19 & TypeScript 5',
        category: 'Frontend',
        role: 'Optimistic Chat UI & Custom Hooks Engine',
        reason: 'Mengelola state real-time melalui custom hooks (useChat, useVoiceCall, useProactiveChat) dengan Optimistic UI 3-detik debounce dan deduplikasi ID.'
      },
      {
        name: 'Google Gemini API (gemini-3.5-flash-lite)',
        category: 'AI & Tools',
        role: 'High-EQ Multi-Agent LLM & Memory Summarizer',
        reason: 'Inferensi berlatensi rendah untuk dialog multi-karakter, ekstraksi memori jangka panjang, turn-taking telepon, dan simulasi suara di Landing Page.'
      },
      {
        name: 'Supabase (PostgreSQL, Auth & Realtime)',
        category: 'Database',
        role: 'Relational DB, SSR Auth & WebSocket Sync',
        reason: 'Menyimpan 8 tabel relasional dan menyinkronkan pesan serta badge unread lintas perangkat secara instan melalui channel postgres_changes.'
      },
      {
        name: 'Web Speech API & Standalone PWA',
        category: 'Frontend',
        role: 'Voice Recognition, TTS & Push Notifications',
        reason: 'Mendukung input/output suara bahasa Indonesia (id-ID) dengan warmup audio mobile serta Service Worker (/sw.js) untuk notifikasi latar belakang.'
      },
      {
        name: 'Tailwind CSS v4, Motion & Pollinations.ai',
        category: 'AI & Tools',
        role: 'Blue Glassmorphism UI & AI Image Generator',
        reason: 'Menghadirkan antarmuka modern dengan syntax highlighting (One Dark), kustomisasi tema room, serta pembuatan avatar dan gambar /imagine tanpa API key.'
      }
    ],
    systemDesign: {
      overview:
        'Arsitektur Multi-Agent Real-Time: Client React 19 mengirim pesan secara optimis (debounce 3 detik) ke Next.js API Orchestrator yang memvalidasi keamanan input (Dual-Layer Anti-Injection), menarik Cross-Room Memory dari Supabase PostgreSQL, mengeksekusi inferensi multi-putaran di Gemini 3.5 Flash Lite, dan mem-broadcast balasan via Supabase Realtime WebSocket.',
      diagramImage: '/images/project/multichat-ai-flowchart.svg',
      nodes: [
        {
          id: 'client-pwa',
          title: 'React 19 Workspace & Standalone PWA',
          subtitle: 'Optimistic Chat, Voice Call & Service Worker',
          type: 'client',
          description: 'Antarmuka chat multi-room dengan Optimistic UI (opt- ID), Group Voice Call (Web Speech API + Anti-Echo), Per-Bubble TTS, dan Multi-Tab Mutex Lock.',
          technologies: ['React 19', 'Tailwind CSS v4', 'Web Speech API', 'PWA /sw.js']
        },
        {
          id: 'chat-orchestrator',
          title: 'Multi-Agent & Proactive Orchestrator',
          subtitle: 'Next.js 16 Route Handlers',
          type: 'service',
          description: 'Menangani routing @Mention, Inter-AI Ping-Pong (maks 4 putaran), Proactive Reach-Out (/api/chat/proactive), dan koordinasi giliran bicara telepon (/api/call/turn).',
          technologies: ['Next.js 16 App Router', '/api/chat', '/api/call/turn', '/api/memory/consolidate']
        },
        {
          id: 'security-shield',
          title: 'Dual-Layer Anti-Prompt Injection',
          subtitle: 'Sanitizer & Persona Confusion Interceptor',
          type: 'gateway',
          description: 'Menyaring delimiter terlarang (|||, [SYSTEM], muted_words) dan mengintersepsi indikasi kebocoran prompt dengan "Respon Manusia Bingung" sesuai gaya bahasa agen.',
          technologies: ['Prompt Framing', 'Server Output Interceptor', 'Regex Guard']
        },
        {
          id: 'gemini-media',
          title: 'Gemini 3.5 Flash Lite & Pollinations.ai',
          subtitle: 'LLM Inference & Generative Media',
          type: 'external',
          description: 'Menghasilkan respons ber-EQ adaptif, merangkum transkrip telepon & chat >3 hari menjadi memori permanen, serta men-generate avatar/ilustrasi /imagine.',
          technologies: ['@google/generative-ai', 'gemini-3.5-flash-lite', 'Pollinations.ai']
        },
        {
          id: 'supabase-cloud',
          title: 'Supabase PostgreSQL, Auth & Realtime',
          subtitle: '8 Relational Tables & WebSocket Broadcast',
          type: 'database',
          description: 'Mengelola sesi SSR Auth, menyimpan relasi grup (room_party) dan memori jangka panjang (rooms.memory), serta memancarkan event pesan baru secara global.',
          technologies: ['Supabase PostgreSQL', '@supabase/ssr', 'Supabase Realtime']
        }
      ],
      dataFlow: [
        {
          step: 1,
          title: 'Optimistic Input & Security Sanitization',
          description: 'Pesan pengguna langsung tampil di UI dengan ID opt-*, di-debounce 3 detik, lalu dibersihkan dari injeksi delimiter dan kata terlarang (muted_words) di server.'
        },
        {
          step: 2,
          title: 'Cross-Room Context & Multi-Agent Routing',
          description: 'Server mendeteksi @Mention atau memilih agen relevan, mengambil rooms.memory serta 15 pesan lintas room terakhir, lalu mengirim konteks ke Gemini 3.5 Flash Lite.'
        },
        {
          step: 3,
          title: 'Anti-Injection Check & Inter-AI Ping-Pong',
          description: 'Output AI diperiksa oleh Server Interceptor (diubah menjadi Respon Manusia Bingung jika terindikasi jailbreak), disimpan ke tabel messages, dan memicu sahutan agen lain di grup.'
        },
        {
          step: 4,
          title: 'Realtime Broadcast & Memory Consolidation',
          description: 'Supabase Realtime menyinkronkan UUID pesan ke seluruh tab/perangkat, sementara pesan >3 hari dan transkrip Voice Call otomatis dirangkum ke kolom rooms.memory.'
        }
      ]
    },
    databaseDesign: {
      overview:
        'Skema database relasional Supabase PostgreSQL yang terdiri dari 8 tabel utama untuk mendukung percakapan multi-agen (1-on-1 & grup), memori jangka panjang per room, kustomisasi persona pengguna, marketplace karakter publik, serta sinkronisasi realtime.',
      erdImage: '/images/project/multichat-ai-erd.svg',
      tables: [
        {
          name: 'auth.users',
          description: 'Tabel autentikasi inti yang dikelola oleh Supabase Auth untuk manajemen sesi dan identitas pemilik akun.',
          fields: [
            { name: 'id', type: 'UUID', isPk: true, desc: 'Primary key pengguna (auth.uid())' },
            { name: 'email', type: 'VARCHAR(255)', desc: 'Alamat email unik pengguna (UNIQUE)' },
            { name: 'encrypted_password', type: 'VARCHAR(255)', desc: 'Hash kredensial terenkripsi Supabase Auth' },
            { name: 'raw_user_meta_data', type: 'JSONB', desc: 'Metadata profil tambahan pengguna' },
            { name: 'created_at', type: 'TIMESTAMPTZ', desc: 'Waktu registrasi akun' }
          ]
        },
        {
          name: 'rooms',
          description: 'Menyimpan ruang obrolan privat (1-on-1) maupun grup beserta tema visual, persona aktif, dan hasil konsolidasi memori jangka panjang.',
          fields: [
            { name: 'id', type: 'UUID', isPk: true, desc: 'Primary key ruang obrolan' },
            { name: 'user_id', type: 'UUID', isFk: true, desc: 'Foreign key pemilik room ke auth.users.id' },
            { name: 'user_persona_id', type: 'UUID', isFk: true, desc: 'Foreign key opsional ke user_personas.id' },
            { name: 'title', type: 'TEXT', desc: 'Nama ruang obrolan atau grup' },
            { name: 'theme', type: 'TEXT', desc: 'Tema warna kustom ruang obrolan' },
            { name: 'memory', type: 'TEXT', desc: 'Ringkasan memori jangka panjang (>3 hari & pasca-Voice Call)' },
            { name: 'created_at', type: 'TIMESTAMPTZ', desc: 'Waktu pembuatan ruang obrolan' }
          ]
        },
        {
          name: 'agents',
          description: 'Definisi karakter AI mencakup kepribadian utama (system_prompt), peran, avatar, dan status publikasi di Explore Marketplace.',
          fields: [
            { name: 'id', type: 'UUID', isPk: true, desc: 'Primary key karakter AI' },
            { name: 'creator_id', type: 'UUID', isFk: true, desc: 'Foreign key pembuat karakter ke auth.users.id' },
            { name: 'name', type: 'TEXT', desc: 'Nama karakter AI (digunakan untuk @Mention)' },
            { name: 'role', type: 'TEXT', desc: 'Peran atau hubungan karakter dengan pengguna' },
            { name: 'system_prompt', type: 'TEXT', desc: 'Instruksi kepribadian, gaya bicara, dan latar belakang agen' },
            { name: 'avatar_url', type: 'TEXT', desc: 'URL foto profil (Pollinations.ai / kustom)' },
            { name: 'description', type: 'TEXT', desc: 'Deskripsi singkat untuk kartu di Explore Marketplace' },
            { name: 'is_public', type: 'BOOLEAN', desc: 'Status apakah karakter dipublikasikan ke komunitas' },
            { name: 'created_at', type: 'TIMESTAMPTZ', desc: 'Waktu pembuatan karakter' }
          ]
        },
        {
          name: 'room_party',
          description: 'Tabel jembatan (Many-to-Many) yang memetakan karakter AI mana saja yang tergabung di dalam suatu room (tanpa kolom user_id).',
          fields: [
            { name: 'room_id', type: 'UUID', isFk: true, desc: 'Foreign key ke rooms.id (ON DELETE CASCADE)' },
            { name: 'agent_id', type: 'UUID', isFk: true, desc: 'Foreign key ke agents.id (ON DELETE CASCADE)' }
          ]
        },
        {
          name: 'messages',
          description: 'Menyimpan seluruh riwayat pesan obrolan (USER, AI, serta kartu rangkuman telepon SYSTEM) yang disinkronkan via Supabase Realtime.',
          fields: [
            { name: 'id', type: 'UUID', isPk: true, desc: 'Primary key pesan (menggantikan ID optimis opt-*)' },
            { name: 'room_id', type: 'UUID', isFk: true, desc: 'Foreign key ke rooms.id (ON DELETE CASCADE)' },
            { name: 'sender_type', type: 'TEXT', desc: 'Tipe pengirim: USER, AI, atau SYSTEM (kartu sesi telepon)' },
            { name: 'sender_id', type: 'UUID', isFk: true, desc: 'Foreign key ke agents.id (bernilai NULL jika USER/SYSTEM)' },
            { name: 'content', type: 'TEXT', desc: 'Isi pesan teks/markdown atau payload ringkasan panggilan suara' },
            { name: 'created_at', type: 'TIMESTAMPTZ', desc: 'Timestamp pesan untuk pengurutan dan konsolidasi >3 hari' }
          ]
        },
        {
          name: 'user_personas',
          description: 'Menyimpan berbagai identitas/peran pengguna yang dapat dipasang secara fleksibel di masing-masing ruang obrolan.',
          fields: [
            { name: 'id', type: 'UUID', isPk: true, desc: 'Primary key persona pengguna' },
            { name: 'user_id', type: 'UUID', isFk: true, desc: 'Foreign key ke auth.users.id' },
            { name: 'name', type: 'TEXT', desc: 'Nama panggilan pengguna dalam persona tersebut' },
            { name: 'background', type: 'TEXT', desc: 'Latar belakang atau profesi pengguna' },
            { name: 'personality', type: 'TEXT', desc: 'Sifat dan preferensi komunikasi pengguna' },
            { name: 'is_default', type: 'BOOLEAN', desc: 'Penanda persona utama default untuk room baru' },
            { name: 'created_at', type: 'TIMESTAMPTZ', desc: 'Waktu pembuatan persona' }
          ]
        },
        {
          name: 'user_settings',
          description: 'Pengaturan global pengguna mencakup daftar kata terlarang (muted_words) yang difilter di server dan tema antarmuka.',
          fields: [
            { name: 'user_id', type: 'UUID', isPk: true, isFk: true, desc: 'Primary key sekaligus FK 1:1 ke auth.users.id' },
            { name: 'muted_words', type: 'TEXT[]', desc: 'Array kata terlarang yang diblokir dengan regex di backend' },
            { name: 'global_theme', type: 'TEXT', desc: 'Preferensi tema warna global aplikasi' }
          ]
        },
        {
          name: 'agent_likes',
          description: 'Mencatat interaksi tombol Like (❤️) pengguna terhadap karakter AI publik di halaman Explore Marketplace.',
          fields: [
            { name: 'id', type: 'UUID', isPk: true, desc: 'Primary key record like' },
            { name: 'user_id', type: 'UUID', isFk: true, desc: 'Foreign key penyuka ke auth.users.id' },
            { name: 'agent_id', type: 'UUID', isFk: true, desc: 'Foreign key karakter yang disukai ke agents.id' },
            { name: 'created_at', type: 'TIMESTAMPTZ', desc: 'Waktu like diberikan (UNIQUE(user_id, agent_id))' }
          ]
        }
      ],
      relationships: [
        'auth.users.id (1) ───< (N) rooms.user_id [ON DELETE CASCADE]',
        'auth.users.id (1) ───< (N) user_personas.user_id [ON DELETE CASCADE]',
        'auth.users.id (1) ─── (1) user_settings.user_id [ON DELETE CASCADE]',
        'user_personas.id (1) ───< (N) rooms.user_persona_id [SET NULL ON DELETE]',
        'rooms.id (1) ───< (N) room_party.room_id [M:N Bridge to agents]',
        'agents.id (1) ───< (N) room_party.agent_id [M:N Bridge to rooms]',
        'rooms.id (1) ───< (N) messages.room_id [ON DELETE CASCADE]',
        'agents.id (1) ───< (N) messages.sender_id [Nullable when sender_type = USER | SYSTEM]',
        'agents.id (1) ───< (N) agent_likes.agent_id [UNIQUE(user_id, agent_id)]'
      ]
    }
  },

  'codevas-learning': {
    id: 'codevas-learning',
    title: 'Codevas Learning',
    tagline: 'Interactive Frontend Learning Platform & 60FPS Real-Time UI Evaluation Engine',
    category: 'EdTech & Interactive Coding Platform',
    status: 'Live Production',
    year: '2026',
    role: 'Full Stack Engineer & DevOps Architect',
    timeline: '3 Months',
    image: '/images/p1.svg',
    description:
      'Codevas Learning adalah platform pembelajaran interaktif (Real-Time UI Learning Engine) berestetika Candy Neo-Brutalist yang dirancang untuk mengajarkan fondasi arsitektur HTML, CSS, Tailwind CSS, dan JavaScript Logic. Dilengkapi workspace split-screen (55% Live Visual Arena & 45% Monaco Editor), sistem ini mengevaluasi struktur DOM dan deklarasi style pada kecepatan 60 FPS secara instan di setiap ketikan tanpa tombol "Submit" manual, lengkap dengan fitur Smart Syntax Helper Bubbles, Gamifikasi EXP/Streak, serta Admin Control Panel & Live Monitoring.',
    problemStatement:
      'Platform belajar koding konvensional yang mengandalkan video satu arah atau siklus "ketik kode -> klik tombol submit -> tunggu kompilasi" sering membuat pemula terjebak dalam tutorial hell dan kehilangan intuisi visual tentang bagaimana perubahan satu baris HTML/CSS langsung memengaruhi tata letak (Box Model, Flexbox, Grid).',
    solution:
      'Membangun engine parser DOM & CSS real-time (style-parser.ts & evaluator.ts) yang dipadukan dengan Monaco Editor di sisi klien untuk memberikan feedback visual dan validasi misi secara instan (60 FPS), didukung verifikasi server-side idempotent di PostgreSQL 16 serta infrastruktur self-hosted Synology NAS Docker dengan Cloudflare Zero-Trust Tunnel dan CI/CD Watchtower.',
    features: [
      {
        title: '60FPS Live Evaluation (Zero Submit Button)',
        description: 'Mengevaluasi struktur DOM, hierarki parent-child, atribut HTML, dan properti CSS/Tailwind secara instan di setiap ketikan dan langsung memicu kelulusan level.',
        icon: 'zap'
      },
      {
        title: 'Smart Toggleable Syntax Helper Bubbles',
        description: 'Gelembung bantuan sintaks kontekstual di atas Monaco Editor yang menyisipkan potongan kode tepat di posisi kursor dengan proteksi anti-duplikasi baris.',
        icon: 'code'
      },
      {
        title: 'Gamified Curriculum (64+ Levels & 3 Modes)',
        description: 'Mendukung mode Live Code, Drag & Drop Logic Blocks, dan Quiz dengan sistem EXP Ledger, Leveling, Streak Harian, dan Target Belajar 10 Menit (+50 EXP).',
        icon: 'map'
      },
      {
        title: 'Admin CMS & Real-Time User Telemetry',
        description: 'Panel kontrol admin dengan indikator Online/Offline real-time (< 2 menit), CRUD kurikulum & JSONB validation rules, serta pelacak pengunjung anonim.',
        icon: 'chart'
      }
    ],
    githubUrl: 'https://github.com/herinta/codevas-learning',
    liveUrl: 'https://codevas.my.id/demo',
    techStacks: [
      {
        name: 'Next.js 16.4 (App Router & React 19)',
        category: 'Frontend',
        role: 'Full-Stack Framework & REST API Routes',
        reason: 'Mengintegrasikan Server Components, Client Arena interaktif, dan endpoint REST API evaluasi dalam satu arsitektur monorepo modern.'
      },
      {
        name: 'TypeScript 5 (Strict Mode)',
        category: 'Frontend',
        role: 'Type-Safe Engine & AST/Style Parser',
        reason: 'Menjamin keamanan tipe data pada parser CSS/DOM, skema JSONB validation_rules, dan kontrak API antara client dan server.'
      },
      {
        name: 'Monaco Editor (@monaco-editor/react)',
        category: 'Frontend',
        role: 'In-Browser Code Editor & Cursor API',
        reason: 'Menghadirkan pengalaman pengeditan kode setara VS Code dengan manipulasi posisi kursor presisi untuk fitur Smart Syntax Helper.'
      },
      {
        name: 'Tailwind CSS v4 & Neo-Brutalist UI',
        category: 'Frontend',
        role: 'Design System & Split-Screen Workspace',
        reason: 'Membangun antarmuka Candy Neo-Brutalist yang responsif, kontras tinggi, dan mendukung simulasi visual komponen secara real-time.'
      },
      {
        name: 'Node.js, HMAC-SHA256 & Bcrypt',
        category: 'Backend',
        role: 'Custom Session Auth & Server Judge API',
        reason: 'Mengamankan autentikasi berbasis HTTP-only signed cookie, RBAC (USER/ADMIN), serta validasi ulang solusi siswa di sisi server.'
      },
      {
        name: 'PostgreSQL 16 (pg Connection Pool)',
        category: 'Database',
        role: 'Relational DB & JSONB Curriculum Store',
        reason: 'Menyimpan 8 tabel relasional dengan transaksi ACID untuk buku besar EXP (xp_transactions) dan fleksibilitas JSONB untuk aturan evaluasi soal.'
      },
      {
        name: 'Docker, Synology NAS & Cloudflare Tunnel',
        category: 'DevOps & Cloud',
        role: 'Self-Hosted Production & Multi-Arch CI/CD',
        reason: 'Deployment kontainer terisolasi dengan Cloudflare Zero-Trust Tunnel (HTTPS tanpa buka port router) dan auto-update via GitHub Actions + Watchtower.'
      }
    ],
    systemDesign: {
      overview:
        'Arsitektur Hibrida: Evaluasi Visual 60 FPS berjalan secara instan di Browser (Monaco Editor + Custom Style/DOM Parser), sedangkan persistensi progres, verifikasi anti-cheat, dan buku besar EXP diproses secara transaksional melalui Next.js 16 API Routes dan PostgreSQL 16 di atas Synology NAS Docker & Cloudflare Tunnel.',
      diagramImage: '/images/project/codevas-flowchart.svg',
      nodes: [
        {
          id: 'monaco-arena',
          title: 'Split-Screen Arena & Monaco IDE',
          subtitle: 'Client Workspace (45% Editor / 55% Canvas)',
          type: 'client',
          description: 'Workspace interaktif dengan Monaco Editor, Smart Syntax Helper Bubbles, Locked Template Skeleton, dan Timer Belajar Harian 10 Menit.',
          technologies: ['React 19', 'Monaco Editor', 'Tailwind CSS v4']
        },
        {
          id: 'realtime-parser',
          title: '60FPS Style & DOM Parser Engine',
          subtitle: 'Zero-Submit Client Evaluator',
          type: 'service',
          description: 'Membedah kode HTML/CSS dan utility class Tailwind di setiap ketikan, memvalidasi hierarki DOM dan properti visual terhadap validation_rules.',
          technologies: ['style-parser.ts', 'evaluator.ts', 'DOMParser API']
        },
        {
          id: 'cloudflare-nas',
          title: 'Cloudflare Tunnel & Synology NAS',
          subtitle: 'Zero-Trust Edge & Docker Host',
          type: 'gateway',
          description: 'Meneruskan trafik HTTPS dari codevas.my.id menuju container codevas-web:3000 di jaringan privat Docker dengan auto-deploy Watchtower dari GHCR.',
          technologies: ['Cloudflare Tunnel', 'Docker Compose', 'GitHub Actions', 'Watchtower']
        },
        {
          id: 'nextjs-api',
          title: 'Next.js 16 Server & Judge API',
          subtitle: 'Auth, Evaluator & Admin CMS',
          type: 'service',
          description: 'Menangani sesi HMAC-SHA256, memvalidasi ulang solusi di server (/api/challenges/[id]/evaluate), menghitung EXP/Level/Streak, dan melayani Admin CMS.',
          technologies: ['Next.js 16 App Router', 'HMAC-SHA256', 'Bcrypt']
        },
        {
          id: 'postgres-db',
          title: 'PostgreSQL 16 Relational & JSONB DB',
          subtitle: 'codevas_db (8 Tables)',
          type: 'database',
          description: 'Menyimpan identitas user, ledger transaksi EXP, kurikulum JSONB, progres kode per level, target aktivitas harian, dan analitik kunjungan.',
          technologies: ['PostgreSQL 16 Alpine', 'node-postgres (pg)', 'JSONB']
        }
      ],
      dataFlow: [
        {
          step: 1,
          title: 'Interactive Code Input & Syntax Helper',
          description: 'Siswa mengetik kode HTML/CSS di Monaco Editor atau menekan gelembung bantuan sintaks yang menyisipkan properti secara cerdas tanpa duplikasi.'
        },
        {
          step: 2,
          title: '60FPS Real-Time AST/DOM & Style Parsing',
          description: 'Engine style-parser.ts dan evaluator.ts langsung membedah pohon DOM serta properti CSS di setiap ketikan dan merender pratinjau di Live Arena Canvas.'
        },
        {
          step: 3,
          title: 'Server-Side Verification & ACID XP Ledger',
          description: 'Saat seluruh kriteria validation_rules terpenuhi, klien memicu POST /api/challenges/[id]/evaluate untuk verifikasi server, mencatat xp_transactions, dan membuka level berikutnya.'
        },
        {
          step: 4,
          title: 'Heartbeat Telemetry & Zero-Touch CI/CD',
          description: 'Aktivitas siswa memperbarui last_seen_at dan timer harian 10 menit, sementara setiap git push ke main otomatis mem-build image multi-arch ke GHCR dan di-pull oleh Watchtower.'
        }
      ]
    },
    databaseDesign: {
      overview:
        'Skema database relasional PostgreSQL 16 (codevas_db) yang terdiri dari 8 tabel terintegrasi dengan kombinasi tipe data terstruktur dan kolom JSONB untuk aturan evaluasi kurikulum, buku besar audit EXP, serta constraint keunikan komposit.',
      erdImage: '/images/project/codevas-erd.svg',
      tables: [
        {
          name: 'users',
          description: 'Menyimpan identitas pengguna, kredensial Bcrypt, akumulasi poin EXP, level, streak harian, role akses, dan waktu aktif terakhir.',
          fields: [
            { name: 'id', type: 'UUID', isPk: true, desc: 'Primary key (gen_random_uuid)' },
            { name: 'username', type: 'VARCHAR(50)', desc: 'Username unik pengguna (UNIQUE)' },
            { name: 'email', type: 'VARCHAR(100)', desc: 'Email unik pengguna (UNIQUE)' },
            { name: 'password_hash', type: 'VARCHAR(255)', desc: 'Hash password Bcrypt (10 salt rounds)' },
            { name: 'full_name', type: 'VARCHAR(100)', desc: 'Nama tampilan lengkap' },
            { name: 'avatar_url', type: 'TEXT', desc: 'URL atau preset avatar profil' },
            { name: 'xp_points', type: 'INT', desc: 'Total akumulasi EXP (DEFAULT 50, >= 0)' },
            { name: 'level', type: 'INT', desc: 'Level pengguna (floor(xp/250) + 1)' },
            { name: 'streak_days', type: 'INT', desc: 'Jumlah hari belajar berturut-turut' },
            { name: 'role', type: 'VARCHAR(20)', desc: 'Hak akses: USER atau ADMIN' },
            { name: 'last_seen_at', type: 'TIMESTAMPTZ', desc: 'Heartbeat untuk deteksi status Online (< 2 menit)' }
          ]
        },
        {
          name: 'classes',
          description: 'Katalog kelas pembelajaran interaktif (HTML Architecture, CSS Basics, Flexbox, Grid, Component Styling, Tailwind CSS, JS Logic, Quiz).',
          fields: [
            { name: 'id', type: 'VARCHAR(50)', isPk: true, desc: 'Slug ID kelas (cth: css-flexbox)' },
            { name: 'category', type: 'VARCHAR(30)', desc: 'Mode belajar: LIVE_CODE, DRAG_DROP, atau QUIZ' },
            { name: 'title', type: 'VARCHAR(100)', desc: 'Judul kelas pembelajaran' },
            { name: 'tagline', type: 'TEXT', desc: 'Ringkasan singkat materi kelas' },
            { name: 'difficulty_level', type: 'VARCHAR(30)', desc: 'Tingkat kesulitan (Pemula / Menengah)' },
            { name: 'xp_reward', type: 'INT', desc: 'Total potensi hadiah EXP di kelas tersebut' },
            { name: 'estimated_time', type: 'VARCHAR(50)', desc: 'Estimasi waktu penyelesaian (cth: 2.5 Jam)' },
            { name: 'is_published', type: 'BOOLEAN', desc: 'Status publikasi kelas di katalog' },
            { name: 'order_index', type: 'INT', desc: 'Urutan tampil kelas pada kurikulum' }
          ]
        },
        {
          name: 'challenges',
          description: 'Menyimpan 64+ level tantangan koding beserta teori, starter code, gelembung bantuan sintaks, dan aturan validasi JSONB.',
          fields: [
            { name: 'id', type: 'VARCHAR(60)', isPk: true, desc: 'ID unik tantangan (cth: flex-1, html-arch-3)' },
            { name: 'class_id', type: 'VARCHAR(50)', isFk: true, desc: 'Foreign key ke classes.id (CASCADE)' },
            { name: 'order_index', type: 'INT', desc: 'Urutan level di dalam kelas (UNIQUE bersama class_id)' },
            { name: 'title', type: 'VARCHAR(100)', desc: 'Judul misi level' },
            { name: 'difficulty', type: 'VARCHAR(20)', desc: 'EASY, MEDIUM, HARD, ADVANCED, EXPERT, BOSS_FIGHT' },
            { name: 'xp_reward', type: 'INT', desc: 'Hadiah EXP saat menyelesaikan tantangan' },
            { name: 'instruction', type: 'TEXT', desc: 'Instruksi misi yang harus diselesaikan siswa' },
            { name: 'theory', type: 'TEXT', desc: 'Penjelasan konsep materi pada tab Teori' },
            { name: 'syntax_helpers', type: 'JSONB', desc: 'Daftar gelembung bantuan sintaks cepat (Quick-Insert)' },
            { name: 'locked_template', type: 'JSONB', desc: 'Kerangka HTML/CSS read-only pembungkus kode siswa' },
            { name: 'target_visual', type: 'JSONB', desc: 'Konfigurasi target visual acuan di Live Arena' },
            { name: 'initial_state', type: 'TEXT', desc: 'Boilerplate kode awal di Monaco Editor' },
            { name: 'validation_rules', type: 'JSONB', desc: 'Aturan AST/DOM & properti CSS untuk penilaian otomatis' }
          ]
        },
        {
          name: 'user_enrollments',
          description: 'Tabel penghubung pendaftaran siswa pada kelas tertentu dengan proteksi keunikan (user_id, class_id).',
          fields: [
            { name: 'id', type: 'UUID', isPk: true, desc: 'Primary key enrollment' },
            { name: 'user_id', type: 'UUID', isFk: true, desc: 'Foreign key ke users.id (CASCADE)' },
            { name: 'class_id', type: 'VARCHAR(50)', isFk: true, desc: 'Foreign key ke classes.id (CASCADE)' },
            { name: 'status', type: 'VARCHAR(20)', desc: 'ACTIVE, COMPLETED, atau DROPPED' },
            { name: 'enrolled_at', type: 'TIMESTAMPTZ', desc: 'Waktu pendaftaran kelas' }
          ]
        },
        {
          name: 'user_progress',
          description: 'Melacak status penyelesaian setiap level tantangan per siswa beserta snapshot kode terakhir yang diketik.',
          fields: [
            { name: 'id', type: 'UUID', isPk: true, desc: 'Primary key progress record' },
            { name: 'user_id', type: 'UUID', isFk: true, desc: 'Foreign key ke users.id (CASCADE)' },
            { name: 'challenge_id', type: 'VARCHAR(60)', isFk: true, desc: 'Foreign key ke challenges.id (CASCADE)' },
            { name: 'status', type: 'VARCHAR(20)', desc: 'LOCKED, IN_PROGRESS, atau COMPLETED' },
            { name: 'code_snapshot', type: 'TEXT', desc: 'Snapshot kode terakhir siswa di Monaco Editor' },
            { name: 'completed_at', type: 'TIMESTAMPTZ', desc: 'Timestamp saat tantangan berhasil diselesaikan' }
          ]
        },
        {
          name: 'xp_transactions',
          description: 'Buku besar (audit trail ledger) untuk setiap penambahan poin EXP pengguna dari berbagai sumber aktivitas.',
          fields: [
            { name: 'id', type: 'UUID', isPk: true, desc: 'ID unik transaksi EXP' },
            { name: 'user_id', type: 'UUID', isFk: true, desc: 'Foreign key ke users.id (CASCADE)' },
            { name: 'amount', type: 'INT', desc: 'Jumlah poin EXP yang diberikan' },
            { name: 'source', type: 'VARCHAR(50)', desc: 'REGISTER_BONUS, CHALLENGE_COMPLETE, DAILY_TARGET, dll.' },
            { name: 'reference_id', type: 'VARCHAR(100)', desc: 'ID referensi tantangan atau aktivitas terkait' },
            { name: 'description', type: 'TEXT', desc: 'Catatan deskripsi riwayat perolehan EXP' },
            { name: 'created_at', type: 'TIMESTAMPTZ', desc: 'Waktu transaksi tercatat' }
          ]
        },
        {
          name: 'user_daily_activity',
          description: 'Melacak durasi belajar aktif harian pengguna untuk pencapaian target 10 menit (600 detik) per hari.',
          fields: [
            { name: 'id', type: 'UUID', isPk: true, desc: 'Primary key aktivitas harian' },
            { name: 'user_id', type: 'UUID', isFk: true, desc: 'Foreign key ke users.id (CASCADE)' },
            { name: 'activity_date', type: 'DATE', desc: 'Tanggal aktivitas belajar (UNIQUE bersama user_id)' },
            { name: 'active_seconds', type: 'INT', desc: 'Akumulasi detik belajar aktif hari tersebut' },
            { name: 'target_seconds', type: 'INT', desc: 'Target durasi harian (DEFAULT 600 detik / 10 menit)' },
            { name: 'is_completed', type: 'BOOLEAN', desc: 'True jika active_seconds mencapai target_seconds' },
            { name: 'xp_claimed', type: 'BOOLEAN', desc: 'Penanda apakah bonus +50 EXP harian sudah diklaim' }
          ]
        },
        {
          name: 'site_visits',
          description: 'Tabel analitik ringan untuk mencatat trafik pengunjung unik maupun anonim dengan throttling otomatis 5 menit.',
          fields: [
            { name: 'id', type: 'UUID', isPk: true, desc: 'Primary key log kunjungan' },
            { name: 'visitor_id', type: 'VARCHAR(100)', desc: 'ID anonim pengunjung (localStorage UUID)' },
            { name: 'path', type: 'VARCHAR(255)', desc: 'Halaman rute yang dikunjungi' },
            { name: 'ip_hash', type: 'VARCHAR(64)', desc: 'Hash identifikasi jaringan untuk metrik unique visitor' },
            { name: 'user_agent', type: 'TEXT', desc: 'Informasi browser dan perangkat pengunjung' },
            { name: 'visited_at', type: 'TIMESTAMPTZ', desc: 'Waktu kunjungan tercatat' }
          ]
        }
      ],
      relationships: [
        'users.id (1) ───< (N) xp_transactions.user_id [ON DELETE CASCADE]',
        'users.id (1) ───< (N) user_enrollments.user_id [ON DELETE CASCADE, UNIQUE(user_id, class_id)]',
        'users.id (1) ───< (N) user_progress.user_id [ON DELETE CASCADE, UNIQUE(user_id, challenge_id)]',
        'users.id (1) ───< (N) user_daily_activity.user_id [ON DELETE CASCADE, UNIQUE(user_id, activity_date)]',
        'classes.id (1) ───< (N) challenges.class_id [ON DELETE CASCADE, UNIQUE(class_id, order_index)]',
        'classes.id (1) ───< (N) user_enrollments.class_id [ON DELETE CASCADE]',
        'challenges.id (1) ───< (N) user_progress.challenge_id [ON DELETE CASCADE]'
      ]
    }
  }
};

// Fallback generator for repositories / other projects
export function getProjectDetail(query: string | { title?: string; id?: string; name?: string }): ProjectDetail {
  const rawId = typeof query === 'string' ? query : (query.id || query.name || query.title || 'jobhunt');
  const normalizedId = rawId.toLowerCase().trim().replace(/\s+/g, '-');

  // Check direct key match
  if (PROJECT_DETAILS[normalizedId]) {
    return PROJECT_DETAILS[normalizedId];
  }

  // Check by title match
  for (const key of Object.keys(PROJECT_DETAILS)) {
    if (PROJECT_DETAILS[key].title.toLowerCase() === rawId.toLowerCase()) {
      return PROJECT_DETAILS[key];
    }
  }

  // Generate customized realistic fallback for any repository
  const cleanTitle = rawId
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    id: normalizedId,
    title: cleanTitle,
    tagline: `Modern Scalable Architecture & Implementation for ${cleanTitle}`,
    category: 'Full Stack Engineering',
    status: 'Open Source',
    year: '2024 - 2025',
    role: 'Lead Architect & Developer',
    timeline: '3 Months Development',
    image: '/images/p1.svg',
    description: `${cleanTitle} adalah aplikasi mutakhir yang dirancang untuk memberikan kinerja tinggi, keandalan arsitektur, dan pengalaman pengguna yang luar biasa. Mengintegrasikan teknologi cloud terkini dengan pola desain perangkat lunak yang scalable dan mudah dirawat.`,
    problemStatement: `Kebutuhan akan sistem ${cleanTitle} yang tangguh, modular, dan memiliki throughput tinggi dengan latency serendah mungkin tanpa mengorbankan keterbacaan kode dan keamanan data.`,
    solution: `Membangun arsitektur berlapis (Clean/Hexagonal Architecture) yang memisahkan dependensi eksternal dari logika bisnis inti, dilengkapi dengan testing otomatis dan containerized deployment.`,
    features: [
      {
        title: 'High-Performance REST & GraphQL API',
        description: 'Endpoint teroptimasi dengan waktu respons sub-50ms dan validasi payload ketat.',
        icon: 'zap'
      },
      {
        title: 'Role-Based Access Control (RBAC)',
        description: 'Keamanan otorisasi bertingkat dengan JWT token dan refresh token rotation.',
        icon: 'lock'
      },
      {
        title: 'Automated CI/CD Pipeline',
        description: 'Pengujian unit terotomasi dan deployment zero-downtime saat git push.',
        icon: 'git'
      },
      {
        title: 'Comprehensive Telemetry & Logging',
        description: 'Monitoring metrik aplikasi, error tracking, dan audit trail log secara terpusat.',
        icon: 'chart'
      }
    ],
    githubUrl: `https://github.com/herinta/${normalizedId}`,
    liveUrl: `https://${normalizedId}.vercel.app`,
    techStacks: [
      {
        name: 'TypeScript / Java / Node.js',
        category: 'Backend',
        role: 'Core Backend Language & Runtime',
        reason: 'Menawarkan skalabilitas tinggi, ekosistem library matang, dan performa konkurensi handal.'
      },
      {
        name: 'React / Next.js',
        category: 'Frontend',
        role: 'Client Interface & Component Architecture',
        reason: 'Render cepat dengan virtual DOM dan ekosistem UI yang sangat kaya.'
      },
      {
        name: 'PostgreSQL / MySQL',
        category: 'Database',
        role: 'Primary Persistent Relational Storage',
        reason: 'Kepatuhan penuh pada ACID transaction, performa query indexing cepat, dan kehandalan data.'
      },
      {
        name: 'Docker & GitHub Actions',
        category: 'DevOps & Cloud',
        role: 'Containerization & CI/CD Pipeline',
        reason: 'Memastikan konsistensi environment antara mesin development lokal dan server produksi.'
      }
    ],
    systemDesign: {
      overview:
        'Arsitektur modular berbasis Clean Architecture yang memisahkan Controller/Handler, Service Use Cases, dan Repository Data Layer.',
      nodes: [
        {
          id: 'client-layer',
          title: 'Client Web & Mobile',
          subtitle: 'Frontend Consumers',
          type: 'client',
          description: 'Konsumen API dengan caching HTTP dan penanganan error responsif.',
          technologies: ['React', 'Next.js', 'Axios']
        },
        {
          id: 'api-gateway',
          title: 'Reverse Proxy & Security',
          subtitle: 'Nginx / Cloudflare',
          type: 'gateway',
          description: 'Load balancing, SSL encryption, rate limiting, dan CORS handler.',
          technologies: ['Nginx', 'Cloudflare']
        },
        {
          id: 'app-service',
          title: 'Core Application Service',
          subtitle: 'Business Logic Layer',
          type: 'service',
          description: 'Validasi skema request, domain logic execution, dan audit logging.',
          technologies: ['REST API', 'JWT Auth', 'Domain Services']
        },
        {
          id: 'database-layer',
          title: 'Relational Database',
          subtitle: 'PostgreSQL Storage',
          type: 'database',
          description: 'Penyimpanan terenkripsi dengan connection pooling dan migrasi skema terversi.',
          technologies: ['PostgreSQL', 'Connection Pool']
        }
      ],
      dataFlow: [
        {
          step: 1,
          title: 'Client Dispatches Request',
          description: 'Client mengirim request dengan bearer token autentikasi ke API endpoint.'
        },
        {
          step: 2,
          title: 'Authentication & Validation',
          description: 'Gateway memvalidasi token dan meneruskan payload bersih ke use case handler.'
        },
        {
          step: 3,
          title: 'Domain Execution & DB Commit',
          description: 'Service memproses logika bisnis dan melakukan transaksi commit ke database.'
        }
      ]
    },
    databaseDesign: {
      overview:
        'Skema terstandarisasi dengan normalisasi 3NF, audit timestamp (created_at, updated_at), dan foreign key cascade.',
      tables: [
        {
          name: 'users',
          description: 'Informasi akun pengguna dan status otentikasi.',
          fields: [
            { name: 'id', type: 'UUID', isPk: true, desc: 'Primary key user' },
            { name: 'username', type: 'VARCHAR(50)', desc: 'Username unik' },
            { name: 'email', type: 'VARCHAR(255)', desc: 'Email address' },
            { name: 'role', type: 'VARCHAR(30)', desc: 'Hak akses (admin/user)' },
            { name: 'created_at', type: 'TIMESTAMP', desc: 'Tanggal registrasi' }
          ]
        },
        {
          name: 'audit_logs',
          description: 'Rekam jejak setiap aksi krusial pengguna di dalam aplikasi.',
          fields: [
            { name: 'id', type: 'UUID', isPk: true, desc: 'ID unik log' },
            { name: 'user_id', type: 'UUID', isFk: true, desc: 'Pelaku aksi' },
            { name: 'action', type: 'VARCHAR(100)', desc: 'Nama tindakan yang dieksekusi' },
            { name: 'ip_address', type: 'VARCHAR(45)', desc: 'Alamat IP pengguna' },
            { name: 'timestamp', type: 'TIMESTAMP', desc: 'Waktu terjadinya aksi' }
          ]
        }
      ],
      relationships: [
        'users.id (1) ───< (N) audit_logs.user_id [CASCADE]'
      ]
    }
  };
}
