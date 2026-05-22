"use client";

import { Github, Twitter, Mail } from "lucide-react";

type Props = {
  github: string;
  x: string;
  email: string;
};

export default function SocialIcons({ github, x, email }: Props) {
  const items = [
    { href: github, label: "Visit GitHub profile", Icon: Github },
    { href: x, label: "Visit X (Twitter) profile", Icon: Twitter },
    { href: `mailto:${email}`, label: "Send email", Icon: Mail },
  ];

  return (
    <ul className="flex gap-2.5">
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            aria-label={label}
            className="focus-cafe inline-flex h-9 w-9 items-center justify-center rounded-full border border-cafe-border bg-cafe-elev text-cafe-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-cafe-accent hover:bg-cafe-sticky hover:text-cafe-accent"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
