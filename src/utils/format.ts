

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

export function convertHankakuKatakanaToZenkaku(input: string): string {
  return input.replace(/[\uFF61-\uFF9F]+/g, (match) => {
    return match
      .split("")
      .map((ch) => {
        const code = ch.charCodeAt(0);
        // 半角カタカナ → 全角カタカナへの変換
        if (code >= 0xff61 && code <= 0xff9f) {
          return String.fromCharCode(code - 0xfee0);
        }
        return ch;
      })
      .join("");
  });
}

export const noDataPlaceholder: string = "-";

// 日付の開始と終了をフォーマットする関数
export const formatTimeRange = (
  from: string | null | undefined,
  to: string | null | undefined
): string => {
  if (!from && !to) return "N/A";
  if (!from) return `${to}まで`;
  if (!to) return `${from}から`;
  return `${from}〜${to}`;
};

export const formatBooleanCircle = (value: boolean | null | undefined): string => {
  if (value === true) return "◯";
  if (value === false) return "×";
  return noDataPlaceholder;
};

export const formatNecessary = (protection: boolean | null | undefined): string => {
  if (protection === true) return "必要";
  if (protection === false) return "不必要";
  return noDataPlaceholder;
};

export const formatAvailable = (lighting: boolean | null | undefined): string => {
  if (lighting === true) return "可能";
  if (lighting === false) return "不可能";
  return noDataPlaceholder;
}
