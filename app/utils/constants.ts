export const routes = [
  { name: 'Home', path: '/' },
  { name: 'O mnie', path: '/o-mnie' },
  { name: 'W czym mogę pomóc', path: '/w-czym-moge-pomoc' },
  { name: 'Metody pracy', path: '/metody-pracy' },
  { name: 'Kontakt', path: '/kontakt' },
];

export const phoneNumber = '+48 661 250 595';
export const emailAddress = 'fizjoterapia.olsztyn@gmail.com';
export const facebookUrl = 'https://www.facebook.com/fizjoterapiaolsztyn';
export const directionsUrl = 'https://maps.app.goo.gl/DQx1k7o7rsJc38kK9';
export const address = {
  street: 'ul. Kasprzaka 3/4',
  city: 'Olsztyn',
};

const normalizedPhoneNumber = phoneNumber.replace(/\s+/g, '');

export const contactLinks = [
  {
    icon: 'mdi:phone',
    href: `tel:${normalizedPhoneNumber}`,
    text: phoneNumber,
    ariaLabel: `Zadzwoń ${phoneNumber}`,
  },
  {
    icon: 'mdi:email-outline',
    href: `mailto:${emailAddress}`,
    text: 'Email',
    ariaLabel: `Napisz na ${emailAddress}`,
  },
  {
    icon: 'mdi:facebook',
    href: facebookUrl,
    text: 'Facebook',
    ariaLabel: 'Facebook',
    newTab: true,
  },
  {
    icon: 'mdi:map-marker',
    href: directionsUrl,
    text: 'Lokalizacja',
    ariaLabel: 'Zobacz lokalizację',
    newTab: true,
  },
];
