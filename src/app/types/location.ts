export type LocationTabType =
  | 'price'
  | 'equipment'
  | 'option'
  | 'access'
  | 'review';

export const locationTabLabels: Record<LocationTabType, string> = {
  price: '料金・時間・広さ',
  equipment: '設備',
  option: 'オプション',
  access: 'アクセス',
  review: 'レビュー',
};