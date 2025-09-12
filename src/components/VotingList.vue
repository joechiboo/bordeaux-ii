<template>
  <div class="voting-list-container">
    <div class="page-header">
      <h1 class="page-title">🗳 社區電子投票</h1>
      <p class="page-subtitle">參與社區事務，共同決定美好未來</p>
    </div>

    <div class="voting-stats">
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.total }}</div>
          <div class="stat-label">總投票數</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🔥</div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.ongoing }}</div>
          <div class="stat-label">進行中</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">✅</div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.participated }}</div>
          <div class="stat-label">已參與</div>
        </div>
      </div>
    </div>

    <div class="voting-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.value"
        :class="['tab-btn', { active: activeTab === tab.value }]"
        @click="activeTab = tab.value"
      >
        {{ tab.label }}
        <span v-if="getTabCount(tab.value) > 0" class="tab-badge">
          {{ getTabCount(tab.value) }}
        </span>
      </button>
    </div>

    <div class="voting-content">
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>載入投票資料中...</p>
      </div>

      <div v-else-if="filteredVotings.length === 0" class="empty-state">
        <div class="empty-icon">📭</div>
        <p class="empty-message">目前沒有{{ activeTabLabel }}的投票</p>
      </div>

      <div v-else class="voting-grid">
        <div 
          v-for="voting in filteredVotings" 
          :key="voting.id"
          class="voting-card"
          @click="goToVoting(voting.id)"
        >
          <div class="voting-header">
            <span :class="['voting-status', voting.status]">
              {{ getStatusLabel(voting.status) }}
            </span>
            <span v-if="voting.hasVoted" class="voted-badge">已投票</span>
          </div>

          <h3 class="voting-title">{{ voting.title }}</h3>
          <p class="voting-description">{{ voting.description }}</p>

          <div class="voting-info">
            <div class="info-item">
              <span class="info-icon">📅</span>
              <span class="info-text">
                {{ formatDate(voting.start_date) }} - {{ formatDate(voting.end_date) }}
              </span>
            </div>
            <div class="info-item">
              <span class="info-icon">👥</span>
              <span class="info-text">{{ voting.vote_count || 0 }} 人已投票</span>
            </div>
            <div class="info-item">
              <span class="info-icon">🎯</span>
              <span class="info-text">{{ voting.voting_type === 'single' ? '單選' : '多選' }}</span>
            </div>
          </div>

          <div class="voting-progress">
            <div class="progress-bar">
              <div 
                class="progress-fill"
                :style="{ width: getProgressWidth(voting) + '%' }"
              ></div>
            </div>
            <span class="progress-text">
              參與率: {{ getProgressWidth(voting) }}%
            </span>
          </div>

          <button 
            :class="['action-btn', { 
              'btn-primary': !voting.hasVoted && voting.status === 'ongoing',
              'btn-secondary': voting.hasVoted || voting.status !== 'ongoing'
            }]"
            @click.stop="goToVoting(voting.id)"
          >
            {{ getActionButtonText(voting) }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="showNotification" class="notification-bar">
      <span class="notification-icon">🔔</span>
      <span class="notification-text">{{ notificationMessage }}</span>
      <button class="notification-close" @click="showNotification = false">×</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../utils/supabase';
import { useStore } from 'vuex';

export default {
  name: 'VotingList',
  setup() {
    const router = useRouter();
    const store = useStore();
    const loading = ref(true);
    const votings = ref([]);
    const activeTab = ref('ongoing');
    const showNotification = ref(false);
    const notificationMessage = ref('');

    const stats = ref({
      total: 0,
      ongoing: 0,
      participated: 0
    });

    const tabs = [
      { label: '進行中', value: 'ongoing' },
      { label: '即將開始', value: 'upcoming' },
      { label: '已結束', value: 'ended' },
      { label: '全部', value: 'all' }
    ];

    const activeTabLabel = computed(() => {
      const tab = tabs.find(t => t.value === activeTab.value);
      return tab ? tab.label : '';
    });

    const filteredVotings = computed(() => {
      if (activeTab.value === 'all') {
        return votings.value;
      }
      return votings.value.filter(v => v.status === activeTab.value);
    });

    const getTabCount = (tabValue) => {
      if (tabValue === 'all') {
        return votings.value.length;
      }
      return votings.value.filter(v => v.status === tabValue).length;
    };

    const getStatusLabel = (status) => {
      const statusMap = {
        'upcoming': '即將開始',
        'ongoing': '進行中',
        'ended': '已結束'
      };
      return statusMap[status] || status;
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    };

    const getProgressWidth = (voting) => {
      const totalHouseholds = 100;
      return Math.min(Math.round((voting.vote_count / totalHouseholds) * 100), 100);
    };

    const getActionButtonText = (voting) => {
      if (voting.hasVoted) {
        return '查看結果';
      }
      switch (voting.status) {
        case 'upcoming':
          return '查看詳情';
        case 'ongoing':
          return '立即投票';
        case 'ended':
          return '查看結果';
        default:
          return '查看詳情';
      }
    };

    const goToVoting = (id) => {
      router.push(`/voting/${id}`);
    };

    const fetchVotings = async () => {
      try {
        loading.value = true;
        
        const now = new Date().toISOString();
        
        const { data: topics, error } = await supabase
          .from('voting_topics')
          .select(`
            *,
            voting_records (
              user_id
            ),
            voting_results (
              vote_count
            )
          `)
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const processedTopics = topics.map(topic => {
          const voteCount = topic.voting_results?.reduce((sum, r) => sum + r.vote_count, 0) || 0;
          
          let status = 'upcoming';
          if (new Date(topic.start_date) > new Date(now)) {
            status = 'upcoming';
          } else if (new Date(topic.end_date) < new Date(now)) {
            status = 'ended';
          } else {
            status = 'ongoing';
          }

          return {
            ...topic,
            status,
            vote_count: voteCount,
            hasVoted: topic.voting_records?.some(r => r.user_id === store.state.user?.id) || false
          };
        });

        votings.value = processedTopics;
        
        stats.value = {
          total: processedTopics.length,
          ongoing: processedTopics.filter(v => v.status === 'ongoing').length,
          participated: processedTopics.filter(v => v.hasVoted).length
        };

        // 只對未參與的進行中投票顯示通知
        const unvotedOngoing = processedTopics.filter(v => v.status === 'ongoing' && !v.hasVoted).length;
        if (unvotedOngoing > 0 && !showNotification.value) {
          notificationMessage.value = `您有 ${unvotedOngoing} 個進行中的投票，請記得參與！`;
          showNotification.value = true;
        }
      } catch (error) {
        console.error('Error fetching votings:', error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchVotings();
    });

    return {
      loading,
      votings,
      activeTab,
      activeTabLabel,
      filteredVotings,
      stats,
      tabs,
      showNotification,
      notificationMessage,
      getTabCount,
      getStatusLabel,
      formatDate,
      getProgressWidth,
      getActionButtonText,
      goToVoting
    };
  }
};
</script>

<style scoped>
.voting-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #666;
}

.voting-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.stat-icon {
  font-size: 2rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.voting-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 0;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  font-size: 1rem;
  color: #666;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.tab-btn.active {
  color: #667eea;
  font-weight: bold;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #667eea;
}

.tab-badge {
  background: #667eea;
  color: white;
  border-radius: 1rem;
  padding: 0.1rem 0.5rem;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.voting-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.voting-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: all 0.3s ease;
}

.voting-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

.voting-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.voting-status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.85rem;
  font-weight: 500;
}

.voting-status.ongoing {
  background: #10b981;
  color: white;
}

.voting-status.upcoming {
  background: #f59e0b;
  color: white;
}

.voting-status.ended {
  background: #6b7280;
  color: white;
}

.voted-badge {
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.85rem;
}

.voting-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.voting-description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.voting-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.voting-progress {
  margin-bottom: 1rem;
}

.progress-bar {
  height: 8px;
  background: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.85rem;
  color: #666;
}

.action-btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-secondary {
  background: #f3f4f6;
  color: #666;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-message {
  color: #666;
  font-size: 1.1rem;
}

.notification-bar {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.notification-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  margin-left: 1rem;
}

@media (max-width: 768px) {
  .voting-list-container {
    padding: 1rem;
  }

  .voting-grid {
    grid-template-columns: 1fr;
  }

  .voting-tabs {
    overflow-x: auto;
    flex-wrap: nowrap;
  }

  .notification-bar {
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
  }
}
</style>