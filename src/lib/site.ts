export const site = {
  name: "Jonathan Southern",
  initials: "JS",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jonathansouthern.com",
  description:
    "Essays, notes, and the occasional field report — on cars, code, and life in between.",
  github: "https://github.com/JonathanSouthern",
  linkedin: "https://www.linkedin.com/in/jonathan-southern/",
} as const;

export const tagLabels = {
  cars: "Cars",
  personal: "Personal",
  engineering: "Engineering",
} as const;

export type Tag = keyof typeof tagLabels;

export const typeLabels = {
  essay: "Essay",
  note: "Notes",
  "field-note": "Field note",
} as const;
