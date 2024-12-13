export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EthioTranscripts',
    description: 'Academic document procurement service for Ethiopian universities',
    url: 'https://ethiotranscripts.com',
    logo: 'https://ethiotranscripts.com/logo.png',
    sameAs: [
      'https://twitter.com/ethiotranscripts',
      'https://facebook.com/ethiotranscripts',
      'https://linkedin.com/company/ethiotranscripts'
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'Ethiopia',
      addressLocality: 'Addis Ababa'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'support@ethiotranscripts.com',
      availableLanguage: ['English', 'Amharic']
    },
    offers: {
      '@type': 'Offer',
      description: 'Academic document procurement services',
      serviceType: [
        'Document Procurement',
        'Translation Services',
        'Apostille Services'
      ]
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
} 