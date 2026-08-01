export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
}

export function getSEOMetadata({ title, description, canonical, image, type = 'website' }: SEOProps) {
  const siteUrl = 'https://www.weddingplanningchecklists.org';
  const fullTitle = title.includes('Wedding Planning Checklists') 
    ? title 
    : `${title} | Wedding Planning Checklists`;
  
  const canonicalUrl = canonical || siteUrl;
  const ogImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/og-image.jpg`;

  return {
    title: fullTitle,
    description,
    canonicalUrl,
    ogImage,
    type
  };
}
