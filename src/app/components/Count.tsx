// Count関数を定義します。引数としてcountを受け取ります。
function Count({ count }) {
    // countを表示するdiv要素を返します。スタイルはmt-4, mb-4, text-center, text-xl, w-fullを適用します。
    return <div className="mt-4 mb-4 text-center text-xl w-full">{count}</div>;
  }
  
// Count関数をエクスポートします。
export default Count;