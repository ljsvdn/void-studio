/**
 * The Work index. To add a project, append an object to this array — the row
 * markup, hover interaction, and scroll reveal all derive from it. Scales
 * cleanly to 6+ entries with no layout changes. `index` is the display number.
 */

export interface Project {
  index: string;
  title: string;
  type: string;
  year: string;
  /** Optional link to a case study. Rows render as <a> when present, else <div>. */
  href?: string;
}

export const projects: Project[] = [
  { index: '01', title: 'Æther', type: 'Brand & Interactive', year: '2025' },
  { index: '02', title: 'Null State', type: 'Web Design & Development', year: '2025' },
  { index: '03', title: 'Monolith', type: 'Motion & Creative Direction', year: '2024' },
  // Add more here — e.g.
  // { index: '04', title: 'Project Name', type: 'Discipline', year: '2026' },
];
