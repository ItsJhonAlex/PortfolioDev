interface StructuredDataProps {
  locale: string
  heroDescription: string
  heroRole: string
  metadataDescription: string
}

export default function StructuredData({
  locale,
  heroDescription,
  heroRole,
  metadataDescription
}: StructuredDataProps) {
  
  const baseUrl = 'https://itsjhonalex.is-a.dev'
  
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    "name": "Jonathan Rodríguez López",
    "alternateName": "Jonathan Alejandro",
    "description": heroDescription,
    "url": baseUrl,
    "image": `${baseUrl}/profile-image.jpg`,
    "sameAs": [
      "https://github.com/ItsJhonAlex",
      "https://linkedin.com/in/itsjhonalex",
      "mailto:itsjhonalex@gmail.com"
    ],
    "jobTitle": heroRole,
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "La Habana",
      "addressCountry": "Cuba"
    },
    "telephone": "+5350328131",
    "email": "itsjhonalex@gmail.com",
    "knowsAbout": [
      "Full Stack Development",
      "React",
      "Next.js",
      "Node.js",
      "JavaScript",
      "TypeScript",
      "Python",
      "MongoDB",
      "Web3",
      "Blockchain",
      "Solidity",
      "Ethereum",
      "DeFi",
      "Artificial Intelligence",
      "Process Automation",
      "API Development",
      "Frontend Development",
      "Backend Development"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Universidad de La Habana",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "La Habana",
        "addressCountry": "Cuba"
      }
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": "Jonathan Rodríguez López - Portfolio",
    "description": metadataDescription,
    "inLanguage": [locale === 'es' ? 'es-ES' : 'en-US'],
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`
    },
    "about": {
      "@id": `${baseUrl}/#person`
    },
    "author": {
      "@id": `${baseUrl}/#person`
    }
  }

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${baseUrl}/#portfolio`,
    "name": "Portfolio - Jonathan Rodríguez López",
    "description": metadataDescription,
    "url": `${baseUrl}/${locale}`,
    "author": {
      "@id": `${baseUrl}/#person`
    },
    "creator": {
      "@id": `${baseUrl}/#person`
    },
    "dateCreated": "2020-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": locale === 'es' ? 'es-ES' : 'en-US',
    "genre": "Professional Portfolio",
    "about": [
      "Web Development",
      "Full Stack Development",
      "Software Engineering",
      "Blockchain Development",
      "Artificial Intelligence"
    ]
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${baseUrl}/${locale}`
      }
    ]
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Jonathan Rodríguez López - Full Stack Development Services",
    "description": "Professional full stack web development services, blockchain development, and AI automation solutions",
    "url": baseUrl,
    "telephone": "+5350328131",
    "email": "itsjhonalex@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "La Habana",
      "addressCountry": "Cuba"
    },
    "serviceType": [
      "Full Stack Web Development",
      "Frontend Development",
      "Backend Development", 
      "API Development",
      "Blockchain Development",
      "Smart Contract Development",
      "Web3 Development",
      "AI and Automation",
      "Responsive Design",
      "Database Design"
    ],
    "provider": {
      "@id": `${baseUrl}/#person`
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
    </>
  )
} 