<template>
  <div class="voting-chart-container">
    <div class="chart-tabs">
      <button 
        v-for="tab in chartTabs" 
        :key="tab.value"
        :class="['chart-tab', { active: activeChart === tab.value }]"
        @click="activeChart = tab.value"
      >
        {{ tab.icon }} {{ tab.label }}
      </button>
    </div>

    <div class="chart-content">
      <!-- 長條圖 -->
      <div v-if="activeChart === 'bar'" class="chart-section">
        <h3 class="chart-title">📊 投票結果長條圖</h3>
        <div class="bar-chart">
          <div 
            v-for="(result, index) in sortedResults" 
            :key="result.option_id"
            class="bar-item"
            :style="{ animationDelay: index * 0.1 + 's' }"
          >
            <div class="bar-label">
              <span class="option-text">{{ result.voting_options?.option_text }}</span>
              <span class="bar-value">{{ result.vote_count }} 票 ({{ result.percentage }}%)</span>
            </div>
            <div class="bar-container">
              <div 
                class="bar-fill"
                :style="{ 
                  width: getBarWidth(result.percentage) + '%',
                  background: getBarGradient(index)
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 圓餅圖 -->
      <div v-if="activeChart === 'pie'" class="chart-section">
        <h3 class="chart-title">🥧 投票結果圓餅圖</h3>
        <div class="pie-chart-container">
          <div class="pie-chart-wrapper">
            <svg class="pie-chart-svg" viewBox="0 0 200 200">
              <g class="pie-chart-group">
                <circle 
                  v-for="(result, index) in sortedResults"
                  :key="result.option_id"
                  class="pie-slice"
                  :cx="100"
                  :cy="100"
                  :r="80"
                  fill="transparent"
                  :stroke="getSliceColor(index)"
                  :stroke-width="60"
                  :stroke-dasharray="`${getSliceDashArray(result.percentage)} ${circumference}`"
                  :stroke-dashoffset="getSliceOffset(index)"
                  :style="{ animationDelay: index * 0.2 + 's' }"
                />
              </g>
              <text 
                x="100" 
                y="100" 
                text-anchor="middle" 
                dominant-baseline="middle" 
                class="pie-center-text"
              >
                總投票數
              </text>
              <text 
                x="100" 
                y="115" 
                text-anchor="middle" 
                dominant-baseline="middle" 
                class="pie-center-number"
              >
                {{ totalVotes }}
              </text>
            </svg>
          </div>
          <div class="pie-legend">
            <div 
              v-for="(result, index) in sortedResults" 
              :key="result.option_id"
              class="legend-item"
            >
              <span 
                class="legend-color"
                :style="{ background: getSliceColor(index) }"
              ></span>
              <span class="legend-text">
                {{ result.voting_options?.option_text }} 
                ({{ result.percentage }}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 樓層分布熱力圖 -->
      <div v-if="activeChart === 'heatmap'" class="chart-section">
        <h3 class="chart-title">🏢 樓層投票分布熱力圖</h3>
        <div v-if="floorData && Object.keys(floorData).length > 0" class="heatmap-container">
          <div class="floor-grid">
            <div 
              v-for="(count, floor) in floorData" 
              :key="floor"
              class="floor-cell"
              :class="getFloorHeatClass(count)"
              :style="{ animationDelay: Math.random() * 0.5 + 's' }"
            >
              <div class="floor-label">{{ floor }}F</div>
              <div class="floor-count">{{ count }}</div>
            </div>
          </div>
          <div class="heatmap-legend">
            <span class="legend-title">投票人數：</span>
            <div class="heat-scale">
              <div class="heat-level heat-low">少</div>
              <div class="heat-level heat-medium">中</div>
              <div class="heat-level heat-high">多</div>
            </div>
          </div>
        </div>
        <div v-else class="no-floor-data">
          <p>暫無樓層分布數據</p>
        </div>
      </div>

      <!-- 參與率統計 -->
      <div v-if="activeChart === 'stats'" class="chart-section">
        <h3 class="chart-title">📈 參與率統計</h3>
        <div class="stats-dashboard">
          <div class="stat-cards">
            <div class="stat-card primary">
              <div class="stat-icon">🗳</div>
              <div class="stat-content">
                <div class="stat-value">{{ totalVotes }}</div>
                <div class="stat-label">總投票數</div>
              </div>
            </div>
            <div class="stat-card success">
              <div class="stat-icon">📊</div>
              <div class="stat-content">
                <div class="stat-value">{{ participationRate }}%</div>
                <div class="stat-label">參與率</div>
              </div>
            </div>
            <div class="stat-card warning">
              <div class="stat-icon">🏠</div>
              <div class="stat-content">
                <div class="stat-value">{{ totalHouseholds }}</div>
                <div class="stat-label">總戶數</div>
              </div>
            </div>
          </div>

          <div class="participation-progress">
            <div class="progress-header">
              <span class="progress-title">總體參與進度</span>
              <span class="progress-percentage">{{ participationRate }}%</span>
            </div>
            <div class="progress-bar">
              <div 
                class="progress-fill"
                :style="{ width: participationRate + '%' }"
              ></div>
            </div>
            <div class="progress-labels">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          <div v-if="timeSeriesData && timeSeriesData.length > 0" class="time-series">
            <h4>投票時間分布</h4>
            <div class="time-chart">
              <div 
                v-for="(data, index) in timeSeriesData" 
                :key="index"
                class="time-bar"
                :style="{ 
                  height: (data.count / maxTimeCount * 100) + '%',
                  animationDelay: index * 0.1 + 's'
                }"
                :title="`${data.hour}:00 - ${data.count} 票`"
              >
                <div class="time-label">{{ data.hour }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';

export default {
  name: 'VotingChart',
  props: {
    results: {
      type: Array,
      default: () => []
    },
    statistics: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const activeChart = ref('bar');
    
    const chartTabs = [
      { value: 'bar', label: '長條圖', icon: '📊' },
      { value: 'pie', label: '圓餅圖', icon: '🥧' },
      { value: 'heatmap', label: '樓層分布', icon: '🏢' },
      { value: 'stats', label: '統計數據', icon: '📈' }
    ];

    const sortedResults = computed(() => {
      return [...props.results].sort((a, b) => b.vote_count - a.vote_count);
    });

    const totalVotes = computed(() => {
      return props.results.reduce((sum, result) => sum + result.vote_count, 0);
    });

    const participationRate = computed(() => {
      return props.statistics.participationRate || '0';
    });

    const totalHouseholds = computed(() => {
      return props.statistics.totalHouseholds || 100;
    });

    const floorData = computed(() => {
      return props.statistics.floorDistribution || {};
    });

    const timeSeriesData = computed(() => {
      // 模擬時間序列數據，實際應該從 API 獲取
      const hours = Array.from({ length: 24 }, (_, i) => i);
      return hours.map(hour => ({
        hour: hour.toString().padStart(2, '0'),
        count: Math.floor(Math.random() * 10) + 1
      }));
    });

    const maxTimeCount = computed(() => {
      return Math.max(...timeSeriesData.value.map(d => d.count));
    });

    const circumference = 502.4; // 2 * PI * 80

    const getBarWidth = (percentage) => {
      return Math.min(percentage, 100);
    };

    const getBarGradient = (index) => {
      const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
      ];
      return gradients[index % gradients.length];
    };

    const getSliceColor = (index) => {
      const colors = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
      return colors[index % colors.length];
    };

    const getSliceDashArray = (percentage) => {
      return (percentage / 100) * circumference;
    };

    const getSliceOffset = (index) => {
      let offset = 0;
      for (let i = 0; i < index; i++) {
        offset += getSliceDashArray(sortedResults.value[i].percentage);
      }
      return -offset;
    };

    const getFloorHeatClass = (count) => {
      const maxCount = Math.max(...Object.values(floorData.value));
      const ratio = count / maxCount;
      
      if (ratio > 0.7) return 'heat-high';
      if (ratio > 0.4) return 'heat-medium';
      return 'heat-low';
    };

    return {
      activeChart,
      chartTabs,
      sortedResults,
      totalVotes,
      participationRate,
      totalHouseholds,
      floorData,
      timeSeriesData,
      maxTimeCount,
      circumference,
      getBarWidth,
      getBarGradient,
      getSliceColor,
      getSliceDashArray,
      getSliceOffset,
      getFloorHeatClass
    };
  }
};
</script>

<style scoped>
.voting-chart-container {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
}

.chart-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 0;
}

.chart-tab {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  font-size: 1rem;
  color: #666;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  border-radius: 0.5rem 0.5rem 0 0;
}

.chart-tab.active {
  color: #667eea;
  font-weight: bold;
  background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1));
}

.chart-tab.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.chart-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
}

/* 長條圖樣式 */
.bar-chart {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bar-item {
  animation: slideInLeft 0.5s ease-out forwards;
  opacity: 0;
  transform: translateX(-20px);
}

@keyframes slideInLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.bar-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.option-text {
  font-weight: 600;
  color: #333;
}

.bar-value {
  color: #666;
  font-size: 0.9rem;
}

.bar-container {
  height: 40px;
  background: #f3f4f6;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
}

.bar-fill {
  height: 100%;
  border-radius: 20px;
  transition: width 1s ease-out;
  position: relative;
}

.bar-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* 圓餅圖樣式 */
.pie-chart-container {
  display: flex;
  align-items: center;
  gap: 3rem;
  justify-content: center;
}

.pie-chart-wrapper {
  flex-shrink: 0;
}

.pie-chart-svg {
  width: 300px;
  height: 300px;
}

.pie-slice {
  transform-origin: 100px 100px;
  transform: rotate(-90deg);
  transition: stroke-width 0.3s ease;
  animation: drawSlice 1s ease-out forwards;
}

.pie-slice:hover {
  stroke-width: 70;
}

@keyframes drawSlice {
  from {
    stroke-dasharray: 0 502.4;
  }
}

.pie-center-text {
  font-size: 12px;
  fill: #666;
}

.pie-center-number {
  font-size: 18px;
  font-weight: bold;
  fill: #333;
}

.pie-legend {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-text {
  color: #333;
  font-size: 0.95rem;
}

/* 熱力圖樣式 */
.heatmap-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.floor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 600px;
}

.floor-cell {
  background: #f3f4f6;
  border-radius: 0.75rem;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  animation: fadeInScale 0.5s ease-out forwards;
  opacity: 0;
  transform: scale(0.8);
}

@keyframes fadeInScale {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.floor-cell.heat-low {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  color: #1e40af;
}

.floor-cell.heat-medium {
  background: linear-gradient(135deg, #fef3c7, #fed7aa);
  color: #92400e;
}

.floor-cell.heat-high {
  background: linear-gradient(135deg, #fecaca, #fca5a5);
  color: #991b1b;
}

.floor-label {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.floor-count {
  font-size: 1.5rem;
  font-weight: bold;
}

.heatmap-legend {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.legend-title {
  color: #666;
  font-weight: 500;
}

.heat-scale {
  display: flex;
  gap: 0.5rem;
}

.heat-level {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.85rem;
  font-weight: 500;
}

.heat-level.heat-low {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  color: #1e40af;
}

.heat-level.heat-medium {
  background: linear-gradient(135deg, #fef3c7, #fed7aa);
  color: #92400e;
}

.heat-level.heat-high {
  background: linear-gradient(135deg, #fecaca, #fca5a5);
  color: #991b1b;
}

.no-floor-data {
  text-align: center;
  padding: 2rem;
  color: #666;
}

/* 統計數據樣式 */
.stats-dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stat-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  padding: 1.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: bounceIn 0.6s ease-out forwards;
}

@keyframes bounceIn {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}

.stat-card.primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.stat-card.success {
  background: linear-gradient(135deg, #48bb78, #38a169);
  color: white;
}

.stat-card.warning {
  background: linear-gradient(135deg, #ed8936, #dd6b20);
  color: white;
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.participation-progress {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 1rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.progress-title {
  font-weight: 600;
  color: #333;
}

.progress-percentage {
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
}

.progress-bar {
  height: 20px;
  background: #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 10px;
  transition: width 1.5s ease-out;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #666;
}

.time-series {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 1rem;
}

.time-series h4 {
  margin-bottom: 1rem;
  color: #333;
}

.time-chart {
  display: flex;
  align-items: end;
  gap: 0.25rem;
  height: 100px;
  padding: 1rem 0;
}

.time-bar {
  flex: 1;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 2px 2px 0 0;
  position: relative;
  min-height: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: growUp 0.8s ease-out forwards;
}

@keyframes growUp {
  from { height: 0; }
}

.time-bar:hover {
  opacity: 0.8;
}

.time-label {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  color: #666;
}

@media (max-width: 768px) {
  .chart-tabs {
    flex-wrap: wrap;
  }

  .pie-chart-container {
    flex-direction: column;
    gap: 1.5rem;
  }

  .pie-chart-svg {
    width: 250px;
    height: 250px;
  }

  .floor-grid {
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  }

  .stat-cards {
    grid-template-columns: 1fr;
  }

  .time-chart {
    height: 80px;
  }
}
</style>