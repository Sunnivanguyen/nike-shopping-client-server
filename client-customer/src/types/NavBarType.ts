export type TFeature = {
  name: string;
  description: string;
  href: string;
};

export interface IFeature {
  name: string;
  features: {
    name: string;
    description: string;
    href: string;
  }[];
}
