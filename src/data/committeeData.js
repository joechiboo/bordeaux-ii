// 會議索引說明：
// 第二屆管理委員會 (10次會議)
// 索引 0-9 分別對應：第1次例行會議、第2次例行會議、第3次例行會議、第4次例行會議、第5次例行會議、
//                 第6次例行會議、第7次例行會議、第8次臨時會議、第9次臨時會議、第10次例行會議
//
// 第一屆管理委員會 (21次會議)
// 索引 0-20 分別對應各次會議，可依需要補充具體會議資訊

export const committeeData = [
	{
		version: '第三屆管理委員會',
		totalMeetings: 0,
		meetingList: [],
		contents: [
			{
				title: '當選委員名單',
				details: [
					{ key: 'A 棟(A3-15F)', value: '王O新' },
					{ key: 'A 棟(A5-12F)', value: '龔O祥' },
					{ key: 'B 棟(B1-05F)', value: '宋O翊' },
					{ key: 'B 棟(B3-09F)', value: '黃O欽' },
					{ key: 'C 棟(C2-08F)', value: '張O榮' },
					{ key: 'C 棟(C3-06F)', value: '袁O燕' },
					{ key: 'D 棟(D3-13F)', value: '張O晶' },
					{ key: 'D 棟(D5-10F)', value: '陳O惠' },
					{ key: 'E 棟(E6-09F)', value: '王O蓁' },
					{ key: 'E 棟(E7-15F)', value: '周O霖' },
					{ key: 'F 棟(F5-11F)', value: '龍O怡' },
					{ key: 'F 棟(F6-04F)', value: '林O君' },
					{ key: 'G 棟(G5-10F)', value: '潘O雄' },
					{ key: 'G 棟(G6-04F)', value: '李O民' },
					{ key: 'H 棟(H3-07F)', value: '陳O珊' },
					{ key: 'H 棟(H6-05F)', value: '張O俊' },
					{ key: '店面(S1-01F)', value: '彭O思' },
				],
			},
			{
				title: '備註',
				details: [
					{ key: '選舉日期', value: '115-3-21 區權會重開會議' },
					{ key: '遞補說明', value: '原當選戶號 D3-9F、F3-12F、H5-7F 已簽署資格放棄聲明書，依規約由該棟候補委員依序遞補' },
				],
			},
		],
	},
	{
		version: '第二屆管理委員會',
		totalMeetings: 24,
		// 會議列表 - 對應attendance陣列索引
		meetingList: [
			'第1次例行會議',
			'第2次例行會議',
			'第3次例行會議',
			'第4次例行會議',
			'第5次例行會議',
			'第6次例行會議',
			'第7次例行會議',
			'第8次臨時會議',
			'第9次臨時會議',
			'第10次例行會議',
			'7/22會議',
			'7/24會議',
			'8/6例會',
			'8/7例會',
			'8/14例會',
			//'8/19',
			'10/2例會',
			'10/23臨時會議',
			'11/5例會',
			'11/19臨時會議',
			'12/3例會',
			'1/7例會',
			'1/28臨時會議',
			'2/4例會',
			'3/4例會',
		],
		contents: [
			{
				title: '委員選舉結果',
				details: [
					{ key: '主委', value: '張O榮' },
					{ key: '副委', value: '陳O宏(辭)、高O宇' },
					{ key: '財委', value: '游O順(辭)、吳O華' },
					{ key: '監委', value: '褚O聲(辭)、宋O翊' },
				],
			},
			{
				title: '當選委員名單',
				details: [
					{ key: 'A 棟(A3-15F)', attendance: '1011111111111111111111010', value: '簡O燕' },
					{ key: 'A 棟(A5-12F)', attendance: '1111111111111111000------', value: '許O書' },
					{ key: 'B 棟(B1-04F)', attendance: '1111111111111111000------', value: '郭O銘' },
					{ key: 'B 棟(B3-09F)', attendance: '0111110000111001111001110', value: '宋O翊' },
					{ key: 'C 棟(C2-08F)', attendance: '1101111111111101111111111', value: '張O榮' },
					{ key: 'C 棟(C5-05F)', attendance: '1111111111111111000------', value: '鄧O芳' },
					{ key: 'D 棟(D3-09F)', attendance: '1111111111011100110111110', value: '楊O華' },
					{ key: 'D 棟(D5-05F)', attendance: '1111110111111110111011110', value: '褚O聲' },
					{ key: 'E 棟(E6-12F)', attendance: '11111010010001001--------', value: '游O順(辭)' },
					{ key: 'E 棟(E7-15F)', attendance: '------------------1111111', value: '周佑霖' },
					{ key: 'E 棟(E6-09F)', attendance: '1111111111111111000------', value: '楊O峰' },
					{ key: 'F 棟(F6-04F)', attendance: '1111111111111111110111111', value: '林O君' },
					{ key: 'F 棟(F5-04F)', attendance: '11111100010001001--------', value: '陳O宏(辭)' },
					{ key: 'G 棟(G6-04F)', attendance: '1011001000001101111011111', value: '李O傑' },
					{ key: 'G 棟(G2-07F)', attendance: '1111111111111111110111111', value: '李O鳳' },
					{ key: 'H 棟(H5-07F)', attendance: '1111111111111110111111111', value: '呂O真' },
					{ key: 'H 棟(H6-05F)', attendance: '1111111111000000111111111', value: '張O麗' },
					{ key: '店面(S1-01F)', attendance: '1000000000000000001011010', value: '彭O思' },
				],
			},
		],
	},
	{
		version: '第一屆管理委員會',
		totalMeetings: 21,
		contents: [
			{
				title: '委員選舉結果',
				details: [
					{ key: '主委', value: '黃O欽 (辭)' },
					{ key: '副委', value: '李O民 (代主委)' },
					{ key: '財委', value: '袁O燕' },
					{ key: '監委', value: '劉O誼 (辭)' },
				],
			},
			{
				title: '當選委員名單',
				details: [
					{
						key: 'A 棟(A3-15F)',
						value: '王O新 (辭)',
						attendance: '101111111111110100011',
					},
					{
						key: 'A 棟(A3-12F)',
						value: '陳O中 (未出席)',
						attendance: '000000000000000000000',
					},
					{
						key: 'B 棟(B3-09F)',
						value: '黃O欽 (辭)',
						attendance: '111111111111111100011',
					},
					{
						key: 'B 棟(B1-05F)',
						value: '宋O翊 (辭)',
						attendance: '111111111111111100110',
					},
					{
						key: 'C 棟(C3-06F)',
						value: '袁O燕',
						attendance: '111111111111111111111',
					},
					{
						key: 'C 棟(C6-02F)',
						value: '蔡O安',
						attendance: '000000001011101011011',
					},
					{
						key: 'D 棟(D2-08F)',
						value: '劉O誼 (辭)',
						attendance: '111111010101111100011',
					},
					{
						key: 'D 棟(D1-03F)',
						value: '范O興 (辭)',
						attendance: '011111111111111110111',
					},
					{
						key: 'E 棟(E1-02F)',
						value: '石O薇 (辭)',
						attendance: '111111111111111100011',
					},
					{
						key: 'E 棟(E8-08F)',
						value: '章O湘 (辭)',
						attendance: '011100110111101000010',
					},
					{
						key: 'F 棟(F3-10F)',
						value: '丁O蘭',
						attendance: '110100000000000011000',
					},
					{
						key: 'F 棟(F6-06F)',
						value: '周O妘 (辭)',
						attendance: '101101101111111100011',
					},
					{
						key: 'G 棟(G6-04F)',
						value: '李O民',
						attendance: '111111111111110111111',
					},
					{
						key: 'G 棟(G5-11F)',
						value: '陳O棟 (辭)',
						attendance: '111110000001101000011',
					},
					{
						key: 'H 棟(H1-04F)',
						value: '夏O斌',
						attendance: '001010000000000011110',
					},
					{
						key: 'H 棟(H8-06F)',
						value: '詹O傑 (辭)',
						attendance: '111111111011100000000',
					},
					{
						key: '店面(S12-01F)',
						value: '陳O妤',
						attendance: '101000000000000000000',
					},
				],
			},
		],
	},
];
