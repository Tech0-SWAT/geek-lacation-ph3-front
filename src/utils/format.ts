export const formatPhoneNumber = (phone: string | null | undefined): string => {
  if (!phone) return "N/A";
  if (phone.includes("-")) return phone;

  // ハイフンがない10桁・11桁の数字に対して自動フォーマット
  const digits = phone.replace(/\D/g, ""); // 数字のみ
  if (digits.length === 10) {
    return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6)}`;
  } else if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  }
  return phone; // 長さが合わなければそのまま返す
};
