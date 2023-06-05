export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}
export interface Data_Type {
  product_ID: string;
  title: string;
  description: string;
  features: string[];
  created_at: string;
  status: string;
}
export interface features {
  feature_id: string;
  product_name: string;
  feature_name: string;
  description: string;
  feature_type: string;
  created_at: string;
  status: string;
}
export interface Product {
  productId: string;
  imageUrl: string,
  createdOn: string;
  modifiedOn: string;
  name: string;
  description: string;
  status: string;

}
export interface GetProduct {
  productId: string;
  imageUrl: string,
  modifiedOn: string;
  name: string;
  description: string;
  status: string;

}
export interface plansFields {
  plan_ID: string;
  external_name: string;
  internal_name: string;
  description: string;
  created_at: string;
  status: string;
}
export interface Feature {
  featureId: string;
  productId: string;
  createdOn: string;
  modifiedOn: string;
  name: string;
  description: string;
  type: string;
  status: string;
  unit: string;
  levels: []
}
export interface FeatureList {
  featureId: number;
  name: string;
  productName: string;
  levels: [];
  description: string;
  createdOn: string;
  modifiedOn: string;
  type: string;
  status: string;
}

export interface GetFeature {
  featureId: string;
  productID: string;
  modifiedOn: string;
  name: string;
  description: string;
  type: string;
  status: string;
}
export const MENUITEMS = [
  {
    state: 'dashboard',
    type: 'link',
    name: 'Overview',
    icon: 'space_dashboard',
    category: 'Dashboard',
  },
  {
    state: 'button',
    type: 'link',
    name: 'Customer',
    icon: 'account_box',
    category: 'Dashboard',
  },
  {
    state: 'grid',
    type: 'link',
    name: 'Subscription',
    icon: 'card_membership',
    category: 'Dashboard',
  },
  {
    state: 'products',
    type: 'link',
    name: 'Products',
    icon: 'local_mall',
    category: 'Product_Catalog',
  },
  {
    state: 'features',
    type: 'link',
    name: 'Features',
    icon: 'featured_play_list',
    category: 'Product_Catalog',
  },
  {
    state: 'plans',
    type: 'link',
    name: 'Plans',
    icon: 'quick_reference_all',
    category: 'Product_Catalog',
  },
  {
    state: 'stepper',
    type: 'link',
    name: 'Add Ons',
    icon: 'add_notes',
    category: 'Product_Catalog',
  },
  {
    state: 'stepper',
    type: 'link',
    name: 'Coupons',
    icon: 'confirmation_number',
    category: 'Product_Catalog',
  },
  {
    state: 'stepper',
    type: 'link',
    name: 'Transactions',
    icon: 'compare_arrows',
    category: 'Payment History',
  },
  {
    state: 'stepper',
    type: 'link',
    name: 'Invoices',
    icon: 'receipt_long',
    category: 'Payment History',
  },
  {
    state: 'stepper',
    type: 'link',
    name: 'Logs',
    icon: 'list_alt',
    category: 'Payment History',
  },
];
export const Menu_Headings = [
  {
    state: 'stepper',
    type: 'link',
    name: 'Dashboard',
    icon: 'settings',
    category: 'Dashboard',
  },
  {
    state: 'stepper',
    type: 'link',
    name: 'Product Catalog ',
    icon: 'logout',
    category: 'Product_Catalog',
  },
  {
    state: 'stepper',
    type: 'link',
    name: 'Payment History ',
    icon: 'logout',
    category: 'Payment History',
  },
];
export const Config_Menu = [
  {
    state: 'stepper',
    type: 'link',
    name: 'Settings',
    icon: 'settings',
    category: 'Config',
  },
  {
    state: 'stepper',
    type: 'link',
    name: 'LogOut ',
    icon: 'logout',
    category: 'Confog',
  },
];
export const User_Options = [
  {
    path: '/user:id',
    icon: 'account_circle',
    name: 'My Account',
    toggle: false,
  },
  { path: '/inbox', icon: 'inbox_outline', name: 'My Inbox', toggle: false },
  { path: '', icon: 'clear_day', name: 'Dark Mode', toggle: true },
  { path: '/help', icon: 'live_help', name: 'Help', toggle: false },
];
// Product listing
export const User_Data = [
  {
    id: 'random_id_1234',
    product_ID: '#O365ProPlusRetail',
    title: 'Microsoft Teams',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    features: ['Host Online Calls', 'Unlimited Internet', 'Conference Calls'],
    created_at: 'June 10th, 2020',
    status: 'Active',
  },
  {
    id: 'random_id_555',
    product_ID: '#Or65SuperSupreme',
    title: 'Azure Devops',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    features: [
      'Unlimited Repos',
      'Upto 50 Team Members',
      'Host Online Calls',
      'Unlimited Internet',
      'Conference Calls',
    ],
    created_at: 'June 11th, 2020',
    status: 'Active',
  },
  {
    id: 'random_id_6969',
    product_ID: '#Ow65Basic',
    title: 'Azure Devops',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    features: ['Conference Calls'],
    created_at: 'June 18th, 2020',
    status: 'Active',
  },
];
export const Features_Data = [
  {
    id: 'feature_id_459',
    feature_id: '#98569',
    product_name: 'Microsoft Teams',
    feature_name: 'Whiteboard',
    feature_type: 'Switch',
    description:
      'lorem ipsumDividers can be added to lists as a means of separating content into distinct sections. Inset dividers can also be added to provide the appearance of distinct elements in a list without cluttering content like avatar images or icons. Make sure to avoid adding an inset divider to the last element in a list, because it will overlap with the section divider.',
    created_at: 'Jun 10th, 2023',
    status: 'Active',
  },
];
export const Plans_Data = [
  {
    plan_ID: 'As-012P',
    external_name: 'Premium',
    internal_name: 'Premium v.3',
    description:
      'lorem ipsumDividers can be added to lists as a means of separating content into distinct sections. Inset dividers can also be added to provide the appearance of distinct elements in a list without cluttering content like avatar images or icons. Make sure to avoid adding an inset divider to the last element in a list, because it will overlap with the section divider.',
    created_at: 'June 10th, 2020',
    status: 'Active',
  },
  {
    plan_ID: 'As-099G',
    external_name: 'Premium',
    internal_name: 'Premium v.2',
    description:
      'lorem ipsumDividers can be added to lists as a means of separating content into distinct sections. Inset dividers can also be added to provide the appearance of distinct elements in a list without cluttering content like avatar images or icons. Make sure to avoid adding an inset divider to the last element in a list, because it will overlap with the section divider.',
    created_at: 'June 10th, 2020',
    status: 'Active',
  },
];
export const Notifications_Data = [
  // {
  //   user: 'John Smith' ,
  //   message: 'subscriptione_created',
  //   created_at: 'Aug 7th, 2023'
  // }
];
export const feature_types = [
  { value: 1, title: 'switch' },
  { value: 2, title: 'range' },
  { value: 3, title: 'quantity' },
  { value: 4, title: 'custom' },
];
export const StaticRoutes = {
  features: ['features'],
  products: ['products'],
};

export const plan_add_empty_data = [
  {
    titleIcon:
      '../../../../../../assets/images/icons/basil_invoice-outline.svg',
    iconAlt: 'invoice-outline-icon',
    title: 'Product Details',
    subtitle:
      'Please click the “Add” button below to add a new product. Once you clicked the button, you will be prompted to enter the name of product, description and additional details.',
    btnTitle: 'Add product',
    btnPath: '/#',
  },
  {
    titleIcon:
      '../../../../../../assets/images/icons/basil_invoice-outline.svg',
    iconAlt: 'invoice-outline-icon',
    title: 'Pricing Plans',
    subtitle:
      'Please click the “Add” button below to add a new pricing plans. Once you clicked the button, you will be prompted to enter pricing and additional details.',
    btnTitle: 'Add Pricing',
    btnPath: '/#',
  },
  {
    titleIcon:
      '../../../../../../assets/images/icons/basil_invoice-outline.svg',
    iconAlt: 'invoice-outline-icon',
    title: 'Add-ons Details',
    subtitle:
      'Please click the “Add” button below to add a new add-on. Once you have click button, you will be prompted to select add-on.',
    btnTitle: 'Add Add-on',
    btnPath: '/#',
  },
];
export const noProducts = [
  {
    heading: 'Products',
    imgPath: '../../../../assets/images/empty-illustrations.png',
    alt: 'no proudcts available',
    subtext: 'Looking for Product',
    text: "Seems like you haven't added any Product. Start adding products by click on “Create Product” button",
    buttonTxt: 'Create Product',
    path: '/products/create',
  },
];
export const noFeatures = [
  {
    heading: 'Features',
    imgPath: '../../../../assets/images/empty-illustrations-2.png',
    alt: 'no features available',
    subtext: 'Looking for Features',
    text: "Seems like you haven't added any feature. Start adding feature by click on “Create Feature” button ",
    buttonTxt: 'Create Feature',
    path: '/features/create',
  },
];
export const noPlans = [
  {
    heading: 'Plans',
    imgPath: '../../../../assets/images/empty-illustrations-4.png',
    alt: 'no Plans available',
    subtext: 'Looking for Plans',
    text: "Seems like you haven't added any Plan. Start adding plan by click on “Create Plan” button",
    buttonTxt: 'Create Plan',
    path: '/plans/view',
  },
];
