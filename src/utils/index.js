export const attendanceUtils = {
	calculateAttendanceRate(attendance, totalMeetings) {
		if (!attendance || totalMeetings === 0) {
			return 0;
		}
		// 支援字串和陣列兩種格式
		let attended;
		if (typeof attendance === 'string') {
			attended = (attendance.match(/1/g) || []).length;
		} else if (Array.isArray(attendance)) {
			attended = attendance.filter(a => a === true || a === 1).length;
		} else {
			return 0;
		}
		return Math.round((attended / totalMeetings) * 100);
	},

	getAttendanceStats(attendance) {
		if (!attendance) {
			return { attended: 0, total: 0, rate: 0 };
		}
		// 支援字串和陣列兩種格式
		let attended, total;
		if (typeof attendance === 'string') {
			attended = (attendance.match(/1/g) || []).length;
			total = attendance.length;
		} else if (Array.isArray(attendance)) {
			attended = attendance.filter(a => a === true || a === 1).length;
			total = attendance.length;
		} else {
			return { attended: 0, total: 0, rate: 0 };
		}
		const rate = total > 0 ? Math.round((attended / total) * 100) : 0;
		return { attended, total, rate };
	},

	// 維護工具函數
	/**
	 * 新增會議後更新所有委員的出席記錄
	 * @param {Array} committeeDetails - 委員詳細資料陣列
	 * @param {boolean} defaultAttendance - 預設出席狀態 (預設為false，待確認)
	 * @returns {Array} 更新後的委員詳細資料
	 */
	addMeetingToAllMembers(committeeDetails, defaultAttendance = false) {
		return committeeDetails.map(member => {
			if (member.attendance && Array.isArray(member.attendance)) {
				return {
					...member,
					attendance: [...member.attendance, defaultAttendance]
				};
			}
			return member;
		});
	},

	/**
	 * 更新特定委員在特定會議的出席狀態
	 * @param {Array} committeeDetails - 委員詳細資料陣列
	 * @param {string} memberKey - 委員的key (如 'A 棟(A3-15F)')
	 * @param {number} meetingIndex - 會議索引 (從0開始)
	 * @param {boolean} isPresent - 是否出席
	 * @returns {Array} 更新後的委員詳細資料
	 */
	updateMemberAttendance(committeeDetails, memberKey, meetingIndex, isPresent) {
		return committeeDetails.map(member => {
			if (member.key === memberKey && member.attendance && Array.isArray(member.attendance)) {
				const newAttendance = [...member.attendance];
				if (meetingIndex >= 0 && meetingIndex < newAttendance.length) {
					newAttendance[meetingIndex] = isPresent;
					return {
						...member,
						attendance: newAttendance
					};
				}
			}
			return member;
		});
	},

	/**
	 * 批次更新多位委員在特定會議的出席狀態
	 * @param {Array} committeeDetails - 委員詳細資料陣列
	 * @param {number} meetingIndex - 會議索引
	 * @param {Object} attendanceMap - 出席狀態對應表 { memberKey: boolean, ... }
	 * @returns {Array} 更新後的委員詳細資料
	 */
	batchUpdateMeetingAttendance(committeeDetails, meetingIndex, attendanceMap) {
		return committeeDetails.map(member => {
			if (member.key in attendanceMap && member.attendance && Array.isArray(member.attendance)) {
				const newAttendance = [...member.attendance];
				if (meetingIndex >= 0 && meetingIndex < newAttendance.length) {
					newAttendance[meetingIndex] = attendanceMap[member.key];
					return {
						...member,
						attendance: newAttendance
					};
				}
			}
			return member;
		});
	},

	/**
	 * 取得某次會議的整體出席狀況
	 * @param {Array} committeeDetails - 委員詳細資料陣列
	 * @param {number} meetingIndex - 會議索引
	 * @returns {Object} 會議出席統計
	 */
	getMeetingAttendanceSummary(committeeDetails, meetingIndex) {
		const membersWithAttendance = committeeDetails.filter(member => 
			member.attendance && Array.isArray(member.attendance) && meetingIndex < member.attendance.length
		);
		
		const totalMembers = membersWithAttendance.length;
		const presentMembers = membersWithAttendance.filter(member => 
			member.attendance[meetingIndex] === true
		).length;
		
		return {
			totalMembers,
			presentMembers,
			absentMembers: totalMembers - presentMembers,
			attendanceRate: totalMembers > 0 ? Math.round((presentMembers / totalMembers) * 100) : 0,
			presentMembersList: membersWithAttendance
				.filter(member => member.attendance[meetingIndex] === true)
				.map(member => ({ key: member.key, value: member.value })),
			absentMembersList: membersWithAttendance
				.filter(member => member.attendance[meetingIndex] === false)
				.map(member => ({ key: member.key, value: member.value }))
		};
	}
};

export const dateUtils = {
	formatDate(dateString) {
		if (!dateString) return '';
		try {
			return new Date(dateString).toLocaleDateString('zh-TW');
		} catch (error) {
			return dateString;
		}
	},

	formatDateTime(dateTimeString) {
		if (!dateTimeString) return '';
		return dateTimeString;
	}
};

export const dataUtils = {
	findItemById(items, id) {
		return items.find(item => item.id === id);
	},

	sortByDate(items, dateField = 'date', ascending = false) {
		return [...items].sort((a, b) => {
			const dateA = new Date(a[dateField]);
			const dateB = new Date(b[dateField]);
			return ascending ? dateA - dateB : dateB - dateA;
		});
	}
};