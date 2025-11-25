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

  type MenuItem = {
    _uid: string;
    name: string;
    path: string;
    component: 'menu_item';
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
    google_maps_url: string;
    owner_name: string;
    owner_profession: string;
    images_header: string;
    images: StoryblokAsset[];
    _editable?: string;
  };

  type ListItem = {
    _uid: string;
    item: string;
    component: 'list_item';
  };

  type AboutContent = {
    _uid: string;
    component: 'about';
    header: string;
    intro: string;
    bio_header: string;
    bio_image: StoryblokAsset;
    bio_items: ListItem[];
    edu_header: string;
    edu_image: StoryblokAsset;
    edu_first_subheader: string;
    edu_first_items: ListItem[];
    edu_second_subheader: string;
    edu_second_items: ListItem[];
    _editable?: string;
  };

  type ServiceItem = {
    _uid: string;
    component: 'service_item';
    title: string;
    content: ListItem[];
    list: ListItem[];
    image: StoryblokAsset;
  };

  type ServicesContent = {
    _uid: string;
    component: 'services';
    header: string;
    intro: string;
    list: ServiceItem[];
    _editable?: string;
  };

  type MethodItem = {
    _uid: string;
    component: 'method_item';
    name: string;
    short_description: string;
    description: string;
    list: ListItem[];
    image: StoryblokAsset;
  };

  type MethodsContent = {
    _uid: string;
    component: 'methods';
    header: string;
    intro: string;
    methods_items: MethodItem[];
    _editable?: string;
  };

  type PricingItem = {
    _uid: string;
    component: 'pricing_item';
    visit_type: string;
    price: string;
    description: string;
  };

  type PricingContent = {
    _uid: string;
    component: 'pricing';
    header: string;
    intro: string;
    pricing_list: PricingItem[];
    images: StoryblokAsset[];
    _editable?: string;
  };
}
