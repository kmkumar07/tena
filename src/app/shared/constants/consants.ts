export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

export const MENUITEMS = [
  { state: 'dashboard', type: 'link', name: 'Overview', icon: 'dashboard', category: 'Dashboard' },
  { state: 'button', type: 'link', name: 'Customer', icon: 'account_box', category: 'Dashboard' },
  { state: 'grid', type: 'link', name: 'Subscription', icon: 'card_membership', category: 'Dashboard' },
  { state: 'products', type: 'link', name: 'Products', icon: 'local_mall', category: 'Product_Catalog' },
  { state: 'features', type: 'link', name: 'Features', icon: 'featured_play_list', category: 'Product_Catalog'},
  { state: 'tabs', type: 'link', name: 'Plans', icon: 'quick_reference_all', category: 'Product_Catalog' },
  { state: 'stepper', type: 'link', name: 'Add Ons', icon: 'add_notes', category: 'Product_Catalog' },
  { state: 'stepper', type: 'link', name: 'Coupons', icon: 'confirmation_number', category: 'Product_Catalog' },
  { state: 'stepper', type: 'link', name: 'Transactions', icon: 'compare_arrows', category: 'Payment History' },
  { state: 'stepper', type: 'link', name: 'Invoices', icon: 'receipt_long', category: 'Payment History' },
  { state: 'stepper', type: 'link', name: 'Logs', icon: 'list_alt', category: 'Payment History' },
];
export const Config_Menu = [
  { state: 'stepper', type: 'link', name: 'Settings', icon: 'settings', category: 'Config' },
  { state: 'stepper', type: 'link', name: 'LogOut ', icon: 'logout', category: 'Confog' },
]
export const User_Options = [
    {path: '/user:id', icon: 'account_circle', name: 'My Account', toggle: false},
    {path: '/inbox', icon: 'inbox_outline', name: 'My Inbox', toggle: false},
    {path: '', icon: 'clear_day', name: 'Dark Mode', toggle: true},
    {path: '/help', icon: 'live_help', name: 'Help',  toggle: false}
]