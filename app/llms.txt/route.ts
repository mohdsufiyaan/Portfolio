import {
  achievements,
  experience,
  faqs,
  origin,
  profile,
  projects,
  skillGroups,
} from "../data";

export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [
    `# ${profile.name} — ${profile.role}`,
    "",
    `> ${profile.summary}`,
    "",
    "## Professional Identity",
    `- Name: ${profile.name}`,
    `- Role: ${profile.role}`,
    `- Experience: ${profile.experienceYears} years`,
    `- Location: ${profile.location} (${profile.timezone})`,
    `- Education: ${profile.education.degree}, ${profile.education.institution} (${profile.education.period})`,
    `- Portfolio URL: ${origin}`,
    `- Resume PDF: ${origin}${profile.resumePath}`,
    `- Email: ${profile.email}`,
    `- Phone: ${profile.phone}`,
    `- LinkedIn: ${profile.linkedin}`,
    `- GitHub: ${profile.github}`,
    "",
    "## Core Technical Expertise",
    ...skillGroups.map(
      (g) =>
        `- **${g.title}**: ${g.items.map((i) => `${i.name} (${i.context})`).join(", ")}`,
    ),
    "",
    "## Career Experience",
    ...experience.flatMap((job) => [
      `### ${job.role} — ${job.company} (${job.period}, ${job.location})`,
      job.summary,
      ...job.highlights.map((h) => `- ${h.title}: ${h.detail}`),
      "",
    ]),
    "## Production Systems & Case Studies",
    ...projects.map(
      (p) =>
        `- [${p.name}](${origin}/projects/${p.slug}) (${p.category}, ${p.company}): ${p.summary} | Stack: ${p.tech.join(", ")}`,
    ),
    "",
    "## Honors, Awards & Verified Outcomes",
    ...achievements.map(
      (a) => `- ${a.title} (${a.organization}, ${a.year}): ${a.description}`,
    ),
    "",
    "## Frequently Asked Engineering Questions (AEO)",
    ...faqs.flatMap((f) => [`Q: ${f.question}`, `A: ${f.answer}`, ""]),
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
