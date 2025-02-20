type VIPActionType = 'add' | 'remove' | 'extend' | 'expire';

export interface VIPLog {
  id: number;
  action_type: VIPActionType;
  timestamp: string;
  target_name: string;
  target_steamid: string;
  admin_name: string;
  admin_steamid: string;
  duration: any;
  payment_id: any;
  payment_amount: any;
  payment_currency: any;
  items_details: any;
  transaction_status: any;
}
