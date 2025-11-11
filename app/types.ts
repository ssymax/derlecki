declare global {
  type AppRoute = {
    name: string;
    path: string;
  };

  type ContactLink = {
    icon: string;
    href: string;
    text: string;
    ariaLabel: string;
    newTab?: boolean;
  };
}
