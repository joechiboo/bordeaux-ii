/**
 * 出席記錄維護標準流程
 * 使用說明和範例
 */

import { attendanceUtils } from './index.js';
import { findMemberKeyByName, batchFindMemberKeys } from '../data/memberNameMapping.js';

/**
 * 出席記錄維護標準流程說明
 * 
 * 1. 新增會議流程：
 *    - 在 committeeData.js 的 meetingList 中新增會議名稱
 *    - 增加 totalMeetings 數量
 *    - 使用 attendanceUtils.addMeetingToAllMembers() 為所有委員新增出席記錄
 * 
 * 2. 更新出席記錄流程：
 *    - 單個委員：使用 attendanceUtils.updateMemberAttendance()
 *    - 批次更新：使用 attendanceUtils.batchUpdateMeetingAttendance()
 * 
 * 3. 查詢出席統計：
 *    - 使用 attendanceUtils.getMeetingAttendanceSummary() 取得會議統計
 */

// 範例使用方式
export const attendanceMaintenanceExamples = {
    
    /**
     * 範例1: 新增第11次會議
     */
    addNewMeetingExample() {
        // 1. 手動更新 committeeData.js：
        // - totalMeetings: 10 -> 11
        // - meetingList 新增 '第11次例行會議'
        
        // 2. 使用工具函數為所有委員新增出席記錄
        const updatedDetails = attendanceUtils.addMeetingToAllMembers(
            committeeDetails, // 來自 committeeData
            false // 預設為未出席，待確認
        );
        
        console.log('已為所有委員新增第11次會議出席記錄');
        return updatedDetails;
    },

    /**
     * 範例2: 更新單個委員出席狀態
     */
    updateSingleMemberExample() {
        // 更新 簡O燕 在第2次會議(索引1)的出席狀態為出席
        const updatedDetails = attendanceUtils.updateMemberAttendance(
            committeeDetails,
            'A 棟(A3-15F)', // 簡O燕的key
            1, // 第2次會議 (索引從0開始)
            true // 出席
        );
        
        console.log('已更新簡O燕第2次會議出席狀態');
        return updatedDetails;
    },

    /**
     * 範例3: 批次更新某次會議的出席記錄
     */
    batchUpdateMeetingExample() {
        // 批次更新第10次會議(索引9)的出席記錄
        const attendanceMap = {
            'A 棟(A3-15F)': true,  // 簡O燕 出席
            'A 棟(A5-12F)': true,  // 許O書 出席
            'B 棟(B3-09F)': false, // 宋O翊 缺席
            // ... 其他委員
        };
        
        const updatedDetails = attendanceUtils.batchUpdateMeetingAttendance(
            committeeDetails,
            9, // 第10次會議
            attendanceMap
        );
        
        console.log('已批次更新第10次會議出席記錄');
        return updatedDetails;
    },

    /**
     * 範例4: 查詢某次會議出席統計
     */
    getMeetingStatsExample() {
        const stats = attendanceUtils.getMeetingAttendanceSummary(
            committeeDetails,
            1 // 第2次會議
        );
        
        console.log('第2次會議出席統計:', {
            總委員數: stats.totalMembers,
            出席人數: stats.presentMembers,
            缺席人數: stats.absentMembers,
            出席率: `${stats.attendanceRate}%`,
            出席名單: stats.presentMembersList,
            缺席名單: stats.absentMembersList
        });
        
        return stats;
    }
};

/**
 * 出席記錄維護檢查清單
 */
export const maintenanceChecklist = {
    beforeAddingNewMeeting: [
        '確認會議日期和類型（例行/臨時）',
        '決定會議編號（第X次會議）',
        '準備出席名單或簽到表'
    ],
    
    whenAddingNewMeeting: [
        '1. 更新 committeeData.js 中的 totalMeetings',
        '2. 在 meetingList 陣列中新增會議名稱',
        '3. 使用 addMeetingToAllMembers() 為所有委員新增記錄',
        '4. 驗證所有委員的 attendance 陣列長度正確'
    ],
    
    whenUpdatingAttendance: [
        '1. 確認會議索引正確（從0開始）',
        '2. 確認委員key值正確',
        '3. 使用適當的工具函數更新',
        '4. 檢查更新結果'
    ],
    
    afterUpdate: [
        '測試頁面顯示是否正常',
        '檢查出席率計算是否正確',
        '備份更新前的資料（建議）'
    ]
};

/**
 * 使用人名映射表的進階維護函數
 */
export const advancedAttendanceUtils = {
    
    /**
     * 使用實際姓名更新委員出席狀態
     * @param {Array} committeeDetails - 委員詳細資料陣列
     * @param {string} realName - 委員實際姓名（如 '張才俊'）
     * @param {number} meetingIndex - 會議索引
     * @param {boolean} isPresent - 是否出席
     * @param {string} version - 委員會版本
     * @returns {Array} 更新後的委員詳細資料
     */
    updateAttendanceByRealName(committeeDetails, realName, meetingIndex, isPresent, version = '第二屆管理委員會') {
        const memberKey = findMemberKeyByName(realName, version);
        if (!memberKey) {
            console.error(`找不到姓名 "${realName}" 對應的委員key`);
            return committeeDetails;
        }
        
        return attendanceUtils.updateMemberAttendance(committeeDetails, memberKey, meetingIndex, isPresent);
    },
    
    /**
     * 批次更新：使用實際姓名和出席狀態
     * @param {Array} committeeDetails - 委員詳細資料陣列
     * @param {number} meetingIndex - 會議索引
     * @param {Object} realNameAttendanceMap - 實際姓名出席對應表 { '張才俊': false, '宋廣翊': false, ... }
     * @param {string} version - 委員會版本
     * @returns {Array} 更新後的委員詳細資料
     */
    batchUpdateByRealNames(committeeDetails, meetingIndex, realNameAttendanceMap, version = '第二屆管理委員會') {
        // 將實際姓名轉換為委員keys
        const memberKeys = batchFindMemberKeys(Object.keys(realNameAttendanceMap), version);
        
        // 建立key-based的出席對應表
        const keyBasedAttendanceMap = {};
        Object.entries(realNameAttendanceMap).forEach(([realName, isPresent]) => {
            const memberKey = memberKeys[realName];
            if (memberKey) {
                keyBasedAttendanceMap[memberKey] = isPresent;
            } else {
                console.warn(`無法找到姓名 "${realName}" 對應的委員key`);
            }
        });
        
        return attendanceUtils.batchUpdateMeetingAttendance(committeeDetails, meetingIndex, keyBasedAttendanceMap);
    },
    
    /**
     * 快速建立缺席名單的出席記錄
     * @param {Array} committeeDetails - 委員詳細資料陣列  
     * @param {number} meetingIndex - 會議索引
     * @param {string[]} absentRealNames - 缺席委員的實際姓名陣列
     * @param {string} version - 委員會版本
     * @returns {Array} 更新後的委員詳細資料
     */
    updateByAbsentList(committeeDetails, meetingIndex, absentRealNames, version = '第二屆管理委員會') {
        const attendanceMap = {};
        
        // 將缺席名單轉換為出席記錄
        absentRealNames.forEach(name => {
            attendanceMap[name] = false;
        });
        
        return this.batchUpdateByRealNames(committeeDetails, meetingIndex, attendanceMap, version);
    }
};

/**
 * 便捷的出席記錄維護範例
 */
export const quickMaintenanceExamples = {
    
    /**
     * 範例：7/22會議出席記錄更新
     */
    update7_22Meeting() {
        // 使用實際姓名快速更新缺席記錄
        const absentMembers = ['宋廣翊', '彭穎思', '張才俊'];
        
        const updatedDetails = advancedAttendanceUtils.updateByAbsentList(
            committeeDetails, // 來自 committeeData
            10, // 7/22會議索引
            absentMembers
        );
        
        console.log('已更新7/22會議出席記錄：');
        console.log(`缺席委員: ${absentMembers.join(', ')}`);
        
        return updatedDetails;
    },
    
    /**
     * 範例：使用實際姓名更新單個委員
     */
    updateSingleMemberByRealName() {
        const updatedDetails = advancedAttendanceUtils.updateAttendanceByRealName(
            committeeDetails,
            '張才俊', // 使用實際姓名
            10, // 會議索引
            false // 缺席
        );
        
        console.log('已更新張才俊的出席記錄');
        return updatedDetails;
    },
    
    /**
     * 範例：混合使用實際姓名和資料庫名稱
     */
    mixedNameUpdate() {
        const attendanceMap = {
            '宋廣翊': false,    // 實際姓名
            '張才俊': false,    // 實際姓名  
            '彭穎思': false,    // 實際姓名
        };
        
        const updatedDetails = advancedAttendanceUtils.batchUpdateByRealNames(
            committeeDetails,
            10,
            attendanceMap
        );
        
        console.log('已批次更新出席記錄');
        return updatedDetails;
    }
};