/**
 * 委員人名映射表
 * 用於將實際姓名映射到資料庫中的key值，方便維護出席記錄
 */

export const memberNameMapping = {
  // 第二屆管理委員會人名映射
  '第二屆管理委員會': {
    // A棟
    '簡O燕': 'A 棟(A3-15F)',
    '簡宜燕': 'A 棟(A3-15F)', // 可能的全名
    
    '許O書': 'A 棟(A5-12F)',
    '許家書': 'A 棟(A5-12F)', // 可能的全名
    
    // B棟
    '郭O銘': 'B 棟(B1-04F)',
    '郭志銘': 'B 棟(B1-04F)', // 可能的全名
    
    '宋O翊': 'B 棟(B3-09F)',
    '宋廣翊': 'B 棟(B3-09F)', // 實際姓名
    
    // C棟
    '張O榮': 'C 棟(C2-08F)',
    '張志榮': 'C 棟(C2-08F)', // 可能的全名
    
    '鄧O芳': 'C 棟(C5-05F)',
    '鄧淑芳': 'C 棟(C5-05F)', // 可能的全名
    
    // D棟
    '楊O華': 'D 棟(D3-09F)',
    '楊志華': 'D 棟(D3-09F)', // 可能的全名
    '楊雲華': 'D 棟(D3-09F)', // 實際姓名
    
    '褚O聲': 'D 棟(D5-05F)',
    '褚維聲': 'D 棟(D5-05F)', // 可能的全名
    
    // E棟
    '游O順': 'E 棟(E6-12F)', // 資料庫名稱
    '游鵬順': 'E 棟(E6-12F)', // 實際姓名（完整名稱）
    
    '楊O峰': 'E 棟(E6-09F)',
    '楊志峰': 'E 棟(E6-09F)', // 可能的全名

    '周佑霖': 'E 棟(E7-15F)', // 補選為E棟管理委員（2025/09/27）

    // F棟
    '林O君': 'F 棟(F6-04F)',
    '林淑君': 'F 棟(F6-04F)', // 可能的全名
    '林俞君': 'F 棟(F6-04F)', // 實際姓名
    '林欣蘭': 'F 棟(F6-04F)', // 實際姓名（與林俞君可能是同一人或記錄差異）
    
    '陳O宏': 'F 棟(F5-04F)',
    '陳志宏': 'F 棟(F5-04F)', // 可能的全名
    '陳書宏': 'F 棟(F5-04F)', // 實際姓名
    
    // G棟
    '李O傑': 'G 棟(G6-04F)',
    '李志傑': 'G 棟(G6-04F)', // 可能的全名
    '李張民': 'G 棟(G6-04F)', // 實際姓名
    
    '李O鳳': 'G 棟(G2-07F)',
    '李淑鳳': 'G 棟(G2-07F)', // 可能的全名
    '吳O華': 'G 棟(G2-07F)', // 新任財務委員
    '吳智華': 'G 棟(G2-07F)', // 新任財務委員實際姓名

    // 新任副主任委員
    '高O宇': 'C 棟(C5-5F)',
    '高宏宇': 'C 棟(C5-5F)', // 新任副主任委員實際姓名
    
    // H棟
    '呂O真': 'H 棟(H5-07F)',
    '呂淑真': 'H 棟(H5-07F)', // 可能的全名
    '呂郡明真': 'H 棟(H5-07F)', // 實際姓名
    '呂郭明真': 'H 棟(H5-07F)', // 實際姓名（可能的正確寫法）
    
    '張O麗': 'H 棟(H6-05F)',
    '張淑麗': 'H 棟(H6-05F)', // 可能的全名
    '張才俊': 'H 棟(H6-05F)', // 實際姓名映射
    
    // 店面
    '彭O思': '店面(S1-01F)',
    '彭穎思': '店面(S1-01F)', // 實際姓名
  },
  
  // 第一屆管理委員會人名映射（可依需要擴充）
  '第一屆管理委員會': {
    // 可依需要新增第一屆委員的人名映射
  }
};

/**
 * 根據姓名查找對應的委員key
 * @param {string} name - 委員姓名
 * @param {string} version - 委員會版本（預設為第二屆）
 * @returns {string|null} 對應的委員key，找不到時返回null
 */
export function findMemberKeyByName(name, version = '第二屆管理委員會') {
  const mapping = memberNameMapping[version];
  if (!mapping) {
    console.warn(`找不到版本 "${version}" 的人名映射表`);
    return null;
  }
  
  const key = mapping[name];
  if (!key) {
    console.warn(`在 "${version}" 中找不到姓名 "${name}" 的映射`);
    return null;
  }
  
  return key;
}

/**
 * 取得某個委員key對應的所有可能姓名
 * @param {string} memberKey - 委員key（如 'H 棟(H6-05F)'）
 * @param {string} version - 委員會版本
 * @returns {string[]} 該委員的所有可能姓名
 */
export function getNamesForMemberKey(memberKey, version = '第二屆管理委員會') {
  const mapping = memberNameMapping[version];
  if (!mapping) {
    return [];
  }
  
  return Object.keys(mapping).filter(name => mapping[name] === memberKey);
}

/**
 * 批次查找多個姓名對應的委員keys
 * @param {string[]} names - 姓名陣列
 * @param {string} version - 委員會版本
 * @returns {Object} { name: memberKey } 的對應表，找不到的姓名不會包含在結果中
 */
export function batchFindMemberKeys(names, version = '第二屆管理委員會') {
  const result = {};
  names.forEach(name => {
    const key = findMemberKeyByName(name, version);
    if (key) {
      result[name] = key;
    }
  });
  return result;
}