declare global {
  type AppRoute = {
    name: string;
    path: string;
  };

  type ContactLink = {
    icon: string;
    href: string;
    text?: string;
    label?: string;
    ariaLabel?: string;
    newTab?: boolean;
  };

  type StoryblokAsset = {
    id: number;
    alt: string;
    name: string;
    focus: string;
    title: string;
    source: string;
    filename: string;
    copyright: string;
    fieldtype: string;
    meta_data: {
      alt: string;
      title: string;
      source: string;
      copyright: string;
    };
  };

  type ContactContent = {
    _uid: string;
    component: 'contact_content';
    header: string;
    intro: string;
    phone: string;
    phone_display: string;
    email: string;
    address_street: string;
    address_city: string;
    facebook_url: string;
    directions_url: string;
    images: StoryblokAsset[];
    _editable?: string;
  };
}
