import { siteConfig } from "@/config/site";
import { HomePage } from "@/components/home-page";
import { dictionaries } from "@/i18n/dictionaries";

export default function Home() {
  const faqs = dictionaries.es.faq.items;
  const sameAs = [siteConfig.linkedin, siteConfig.instagram].filter(Boolean);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.name,
        slogan: siteConfig.slogan,
        url: siteConfig.url,
        logo: `${siteConfig.url}/brand/logo.png`,
        image: `${siteConfig.url}/brand/logo.png`,
        email: siteConfig.email,
        description: siteConfig.description,
        areaServed: { "@type": "Country", name: "Chile" },
        address: { "@type": "PostalAddress", addressCountry: "CL" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: siteConfig.email,
          availableLanguage: ["Spanish", "English", "es", "en"],
        },
        knowsAbout: [
          "Inteligencia artificial",
          "Automatización de procesos",
          "Agentes de IA",
          "Desarrollo de software a medida",
          "Integración de sistemas",
        ],
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomePage />
    </>
  );
}
