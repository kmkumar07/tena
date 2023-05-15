export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}
export interface Data_Type {
  product_ID: string,
  title: string,
  description:string,
  features: string[],
  created_at: string,
  status: string
} 
export const MENUITEMS = [
  {
    state: 'dashboard',
    type: 'link',
    name: 'Overview',
    icon: 'dashboard',
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
    state: 'tabs',
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
export const User_Data = [
  {
    id: 'random_id_1234',
    product_ID: '#O365ProPlusRetail',
    title: "Microsoft Teams",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    features: [
      'Host Online Calls',
      'Unlimited Internet',
      'Conference Calls'
    ],
    created_at: 'June 10th, 2020',
    status: 'Active'
  },
  {
    id: 'random_id_555',
    product_ID: '#Or65SuperSupreme',
    title: "Azure Devops",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    features: [
      'Unlimited Repos',
      'Upto 50 Team Members',
      'Host Online Calls',
      'Unlimited Internet',
      'Conference Calls'
    ],
    created_at: 'June 11th, 2020',
    status: 'Active'
  },
  {
    id: 'random_id_6969',
    product_ID: '#Ow65Basic',
    title: "Azure Devops",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    features: [
      'Conference Calls'
    ],
    created_at: 'June 18th, 2020',
    status: 'Active'
  },    
]
export const Notifications_Data = [
  // {
  //   user: 'John Smith' ,
  //   message: 'subscriptione_created',
  //   created_at: 'Aug 7th, 2023'
  // }
]