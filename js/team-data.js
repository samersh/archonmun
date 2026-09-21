/* ══════════════════════════════════════════════════════════════════════
   archonMUN board and team, 21 members.

   Shared by the home page (which shows the first TEAM_FEATURED) and
   team.html (which shows everyone). Order is seniority, so the eight the
   home page surfaces are the eight at the top of this list. Reorder here
   and both pages follow.

   Portraits were cropped to a common framing: the face a quarter of the
   card wide and a third of the way down. If you replace a photo and the
   framing lands wrong, add `focus: '50% 20%'` to that entry to shift the
   crop (left/right, then up/down) rather than re-editing the file.
   ══════════════════════════════════════════════════════════════════ */

const TEAM_FEATURED = 8;        // how many appear on the home page

const TEAM = [
  /* ── Secretariat ────────────────────────────────────────────────── */
  { name: 'Omar Shawar',       role: 'Secretary General',
    photo: 'assets/team/omar-shawar.jpg' },
  { name: 'Sadi Faqih',        role: 'Deputy Secretary General',
    photo: 'assets/team/sadi-faqih.jpg' },
  { name: 'Seif Abu Kishk',    role: 'Deputy Secretary General',
    photo: 'assets/team/seif-abu-kishk.jpg' },

  /* ── Conference ─────────────────────────────────────────────────── */
  { name: 'Khalid Mamlouk',    role: 'Head of Conference',
    photo: 'assets/team/khalid-mamlouk.jpg' },
  { name: 'Muhammad Zahaika',  role: 'Head of Conference',
    photo: 'assets/team/muhammad-zahaika.jpg' },
  { name: 'Zaid Reshiq',       role: 'Head of Conference',
    photo: 'assets/team/zaid-reshiq.jpg' },
  { name: 'Zain Richards',     role: 'Head of Conference',
    photo: 'assets/team/zain-richards.jpg' },
  { name: 'Amira Nusseibeh',   role: 'Deputy Head of Conference',
    photo: 'assets/team/amira-nusseibeh.jpg' },
  /* ↑ the eight above are the ones the home page shows ↑ */
  { name: 'Mariam Abu Sneineh', role: 'Deputy Head of Conference',
    photo: 'assets/team/mariam-abu-sneineh.jpg' },
  { name: 'Rasheed Khatib',    role: 'Deputy Head of Conference',
    photo: 'assets/team/rasheed-khatib.jpg' },

  /* ── Debate ─────────────────────────────────────────────────────── */
  { name: 'Adam Arar',         role: 'Head of Debate',
    photo: 'assets/team/adam-arar.jpg' },
  { name: 'Lara Frettekh',     role: 'Head of Debate',
    photo: 'assets/team/lara-frettekh.jpg' },
  { name: 'Zaid Mimi',         role: 'Head of Debate',
    photo: 'assets/team/zaid-mimi.jpg' },

  /* ── Departments ────────────────────────────────────────────────── */
  { name: 'Abeer Ahramat',     role: 'Head of Press & Media',
    photo: 'assets/team/abeer-ahramat.jpg' },
  { name: 'Mohammad Beidoosi', role: 'Head of Finance',
    photo: 'assets/team/mohammad-beidoosi.jpg' },
  { name: 'Sameer Siam',       role: 'Head of Logistics',
    photo: 'assets/team/sameer-siam.jpg' },
  { name: 'Sarah Abu Assab',   role: 'Head of Design',
    photo: 'assets/team/sarah-abu-assab.jpg' },
  { name: 'George Rabadi',     role: 'Head of Security and Staff',
    photo: 'assets/team/george-rabadi.jpg' },
  { name: 'Tala Hadad',        role: 'Head of Security and Staff',
    photo: 'assets/team/tala-hadad.jpg' },
  { name: 'Omar Sayyad',       role: 'Head of Entertainment',
    photo: 'assets/team/omar-sayyad.jpg' },
  { name: 'Rani Meo',          role: 'Head of Entertainment',
    photo: 'assets/team/rani-meo.jpg' }
];
