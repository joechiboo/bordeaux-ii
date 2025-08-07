<template>
  <div class="facilities-container">
    <div class="content-header">
      <h1>社區公共設施</h1>
      <p class="description">探索我們豐富多樣的公共設施，為您的生活增添便利與樂趣</p>
    </div>
    
    <div class="facilities-grid">
      <div 
        class="facility-card" 
        v-for="facility in facilities" 
        :key="facility.id"
        @click="selectFacility(facility)"
        :class="{ 'selected': selectedFacility && selectedFacility.id === facility.id }"
      >
        <div class="facility-icon">
          <i :class="getFacilityIcon(facility.name)"></i>
        </div>
        <div class="facility-info">
          <h3>{{ facility.name }}</h3>
          <div class="facility-details">
            <div class="time-info">
              <i class="fas fa-clock"></i>
              <span>{{ facility.openTime }}</span>
            </div>
            <div class="closed-info">
              <i class="fas fa-calendar-times"></i>
              <span>{{ facility.closedDay }}</span>
            </div>
            <div class="deposit-info" v-if="facility.deposit">
              <i class="fas fa-money-bill-wave"></i>
              <span class="deposit-badge">押金 NT$ {{ facility.deposit.toLocaleString() }}</span>
            </div>
            <div class="notes-info" v-if="facility.notes">
              <i class="fas fa-info-circle"></i>
              <span class="notes-text">{{ facility.notes }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="usage-guidelines">
      <div class="guidelines-card">
        <div class="guidelines-header">
          <i class="fas fa-info-circle"></i>
          <h2>使用須知</h2>
        </div>
        <div class="guidelines-content">
          <div class="guideline-item">
            <i class="fas fa-tools"></i>
            <span>所有設施每週一休館進行清潔維護</span>
          </div>
          <div class="guideline-item">
            <i class="fas fa-shield-alt"></i>
            <span>需繳納押金的設施，使用完畢後經檢查無損壞即退還押金</span>
          </div>
          <div class="guideline-item">
            <i class="fas fa-hands-helping"></i>
            <span>請遵守各設施使用規定，維護公共環境整潔</span>
          </div>
          <div class="guideline-item">
            <i class="fas fa-bell"></i>
            <span>如有時間異動或臨時休館，將另行公告通知</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { facilitiesData } from '@/data/facilitiesData.js'

export default {
  name: 'CommunityFacilities',
  data() {
    return {
      facilities: facilitiesData,
      selectedFacility: null
    }
  },
  methods: {
    selectFacility(facility) {
      this.selectedFacility = this.selectedFacility === facility ? null : facility;
    },
    getFacilityIcon(facilityName) {
      const iconMap = {
        '親子遊戲室': 'fas fa-child',
        '家教室': 'fas fa-chalkboard-teacher',
        '瑜珈教室': 'fas fa-spa',
        '廚藝教室': 'fas fa-utensils',
        '琴房': 'fas fa-music',
        '健身房': 'fas fa-dumbbell',
        '飛輪教室': 'fas fa-bicycle',
        '閱覽室': 'fas fa-book-open'
      };
      return iconMap[facilityName] || 'fas fa-home';
    }
  }
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

.facilities-container {
  margin-top: 50px;
  text-align: left;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
}

.content-header {
  text-align: center;
  margin-bottom: 40px;
}

.content-header h1 {
  font-size: 36px;
  font-weight: bold;
  color: #333;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
}

.description {
  font-size: 18px;
  color: #666;
  font-weight: 400;
  line-height: 1.6;
}

.facilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.facility-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.facility-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s;
}

.facility-card:hover::before {
  left: 100%;
}

.facility-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #007bff;
}

.facility-card.selected {
  border-color: #007bff;
  box-shadow: 0 0 20px rgba(0, 123, 255, 0.3);
}

.facility-icon {
  text-align: center;
  margin-bottom: 15px;
}

.facility-icon i {
  font-size: 32px;
  color: #007bff;
  padding: 15px;
  background: rgba(0, 123, 255, 0.1);
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.facility-info h3 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
}

.facility-details {
  space-y: 10px;
}

.time-info, .closed-info, .deposit-info, .notes-info {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
}

.time-info i, .closed-info i, .deposit-info i, .notes-info i {
  width: 18px;
  margin-right: 8px;
  color: #666;
}

.time-info span {
  color: #28a745;
  font-weight: 500;
}

.closed-info span {
  color: #ffc107;
  font-weight: 500;
}

.deposit-badge {
  background: linear-gradient(135deg, #17a2b8, #20c997);
  color: white;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.notes-text {
  color: #17a2b8;
  font-style: italic;
}

.usage-guidelines {
  margin-top: 40px;
}

.guidelines-card {
  background: linear-gradient(135deg, #f1f3f4 0%, #ffffff 100%);
  border: 1px solid #dee2e6;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.guidelines-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e9ecef;
}

.guidelines-header i {
  font-size: 24px;
  color: #007bff;
  margin-right: 12px;
}

.guidelines-header h2 {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.guidelines-content {
  display: grid;
  gap: 15px;
}

.guideline-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background: rgba(0, 123, 255, 0.05);
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.guideline-item:hover {
  background: rgba(0, 123, 255, 0.1);
}

.guideline-item i {
  font-size: 16px;
  color: #007bff;
  margin-right: 12px;
  width: 20px;
  text-align: center;
}

.guideline-item span {
  color: #555;
  font-weight: 500;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .facilities-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .facility-card {
    padding: 15px;
  }
  
  .content-header h1 {
    font-size: 28px;
  }
  
  .guidelines-card {
    padding: 20px;
  }
}
</style>
