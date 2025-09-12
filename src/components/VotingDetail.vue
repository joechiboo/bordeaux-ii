<template>
  <div class="voting-detail-container">
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>載入投票資料中...</p>
    </div>

    <div v-else-if="!voting" class="error-state">
      <div class="error-icon">❌</div>
      <p>找不到投票資料</p>
      <button class="btn-back" @click="goBack">返回投票列表</button>
    </div>

    <template v-else>
      <div class="voting-header">
        <button class="btn-back" @click="goBack">
          ← 返回列表
        </button>
        <div class="header-content">
          <h1 class="voting-title">{{ voting.title }}</h1>
          <div class="voting-meta">
            <span :class="['status-badge', voting.status]">
              {{ getStatusLabel(voting.status) }}
            </span>
            <span v-if="hasVoted" class="voted-badge">✓ 已投票</span>
          </div>
        </div>
      </div>

      <div class="voting-info-card">
        <div class="info-section">
          <h3>📌 投票說明</h3>
          <p>{{ voting.description }}</p>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">📅 投票期間</span>
            <span class="info-value">
              {{ formatFullDate(voting.start_date) }} ~ {{ formatFullDate(voting.end_date) }}
            </span>
          </div>
          <div class="info-item">
            <span class="info-label">👥 投票對象</span>
            <span class="info-value">{{ voting.target_audience || '本社區住戶' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">🔐 投票方式</span>
            <span class="info-value">
              {{ voting.voting_type === 'single' ? '單選制' : '多選制' }}
            </span>
          </div>
          <div class="info-item">
            <span class="info-label">📈 投票目的</span>
            <span class="info-value">{{ voting.purpose || '依多數意見決定' }}</span>
          </div>
        </div>

        <div v-if="voting.attachments && voting.attachments.length > 0" class="attachments">
          <h3>📎 附件資料</h3>
          <ul class="attachment-list">
            <li v-for="(attachment, index) in voting.attachments" :key="index">
              <a :href="attachment.url" target="_blank" class="attachment-link">
                {{ attachment.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="!hasVoted && voting.status === 'ongoing'" class="voting-options">
        <h2 class="section-title">🔘 請選擇您的投票選項</h2>
        <div class="options-list">
          <label 
            v-for="option in voting.voting_options" 
            :key="option.id"
            class="option-card"
            :class="{ selected: selectedOption === option.id }"
          >
            <input 
              type="radio" 
              :name="`voting-${voting.id}`"
              :value="option.id"
              v-model="selectedOption"
              class="option-radio"
            />
            <div class="option-content">
              <h4 class="option-title">{{ option.option_text }}</h4>
              <p v-if="option.description" class="option-description">
                {{ option.description }}
              </p>
            </div>
          </label>
        </div>

        <div class="voting-actions">
          <button 
            class="btn-submit"
            :disabled="!selectedOption || submitting"
            @click="submitVote"
          >
            {{ submitting ? '提交中...' : '確認投票' }}
          </button>
        </div>
      </div>

      <div v-if="hasVoted || voting.status === 'ended'" class="voting-results">
        <h2 class="section-title">📊 投票結果</h2>
        
        <div class="results-summary">
          <div class="summary-item">
            <span class="summary-label">總投票數</span>
            <span class="summary-value">{{ statistics.totalVotes }}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">參與率</span>
            <span class="summary-value">{{ statistics.participationRate }}%</span>
          </div>
        </div>

        <div class="results-chart">
          <div 
            v-for="result in sortedResults" 
            :key="result.option_id"
            class="result-item"
          >
            <div class="result-header">
              <span class="result-option">{{ result.voting_options?.option_text }}</span>
              <span class="result-stats">
                {{ result.vote_count }} 票 ({{ result.percentage }}%)
              </span>
            </div>
            <div class="result-bar">
              <div 
                class="result-fill"
                :style="{ 
                  width: result.percentage + '%',
                  background: getBarColor(result.percentage)
                }"
              ></div>
            </div>
            <div v-if="userVote?.option_id === result.option_id" class="your-choice">
              ✓ 您的選擇
            </div>
          </div>
        </div>

        <div v-if="statistics.floorDistribution" class="floor-distribution">
          <h3>🏢 樓層投票分布</h3>
          <div class="floor-grid">
            <div 
              v-for="(count, floor) in statistics.floorDistribution" 
              :key="floor"
              class="floor-item"
            >
              <span class="floor-label">{{ floor }}F</span>
              <span class="floor-count">{{ count }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="voting-notice">
        <h3>📣 備註</h3>
        <ul>
          <li v-if="voting.status === 'ongoing'">
            投票結果將於 {{ formatFullDate(voting.end_date) }} 後公告
          </li>
          <li>若無法線上投票，可至管理室填寫紙本選票</li>
          <li>投票採匿名制，您的個人資訊將被保密</li>
        </ul>
      </div>
    </template>

    <div v-if="showConfirmModal" class="modal-overlay" @click="showConfirmModal = false">
      <div class="modal-content" @click.stop>
        <h3 class="modal-title">確認投票</h3>
        <p class="modal-message">
          您選擇的是：<strong>{{ getSelectedOptionText() }}</strong>
        </p>
        <p class="modal-warning">投票後無法更改，請確認您的選擇</p>
        <div class="modal-actions">
          <button class="btn-cancel" @click="showConfirmModal = false">取消</button>
          <button class="btn-confirm" @click="confirmVote">確認投票</button>
        </div>
      </div>
    </div>

    <div v-if="showSuccessMessage" class="success-message">
      <span class="success-icon">✅</span>
      <span>投票成功！感謝您的參與</span>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { votingApi, supabase } from '../utils/supabase';
import { useStore } from 'vuex';

export default {
  name: 'VotingDetail',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    
    const loading = ref(true);
    const voting = ref(null);
    const selectedOption = ref(null);
    const hasVoted = ref(false);
    const userVote = ref(null);
    const submitting = ref(false);
    const showConfirmModal = ref(false);
    const showSuccessMessage = ref(false);
    const results = ref([]);
    const statistics = ref({
      totalVotes: 0,
      participationRate: '0',
      floorDistribution: null
    });
    
    let votingSubscription = null;

    const sortedResults = computed(() => {
      return [...results.value].sort((a, b) => b.vote_count - a.vote_count);
    });

    const getStatusLabel = (status) => {
      const statusMap = {
        'upcoming': '即將開始',
        'ongoing': '進行中',
        'ended': '已結束'
      };
      return statusMap[status] || status;
    };

    const formatFullDate = (dateString) => {
      const date = new Date(dateString);
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    };

    const getBarColor = (percentage) => {
      if (percentage >= 50) return 'linear-gradient(135deg, #10b981, #059669)';
      if (percentage >= 30) return 'linear-gradient(135deg, #667eea, #764ba2)';
      return 'linear-gradient(135deg, #f59e0b, #d97706)';
    };

    const getSelectedOptionText = () => {
      const option = voting.value?.voting_options?.find(o => o.id === selectedOption.value);
      return option?.option_text || '';
    };

    const goBack = () => {
      router.push('/voting');
    };

    const fetchVotingDetail = async () => {
      try {
        loading.value = true;
        const topicId = route.params.id;
        
        const topic = await votingApi.getVotingTopic(topicId);
        
        const now = new Date();
        if (new Date(topic.start_date) > now) {
          topic.status = 'upcoming';
        } else if (new Date(topic.end_date) < now) {
          topic.status = 'ended';
        } else {
          topic.status = 'ongoing';
        }
        
        voting.value = topic;
        
        const userId = store.state.user?.id;
        if (userId) {
          const vote = await votingApi.checkUserVoted(topicId, userId);
          if (vote) {
            hasVoted.value = true;
            userVote.value = vote;
          }
        }
        
        if (hasVoted.value || topic.status === 'ended') {
          await fetchResults();
        }
        
        if (topic.status === 'ongoing') {
          subscribeToUpdates(topicId);
        }
      } catch (error) {
        console.error('Error fetching voting detail:', error);
      } finally {
        loading.value = false;
      }
    };

    const fetchResults = async () => {
      try {
        const topicId = route.params.id;
        const [resultsData, statsData] = await Promise.all([
          votingApi.getVotingResults(topicId),
          votingApi.getVotingStatistics(topicId)
        ]);
        
        results.value = resultsData;
        statistics.value = statsData;
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    const submitVote = () => {
      if (!selectedOption.value) return;
      showConfirmModal.value = true;
    };

    const confirmVote = async () => {
      try {
        submitting.value = true;
        showConfirmModal.value = false;
        
        const topicId = route.params.id;
        const userId = store.state.user?.id;
        console.log('投票檢查 - 用戶ID:', userId);
        console.log('投票檢查 - 認證狀態:', store.state.isAuthenticated);
        
        if (!userId || !store.state.isAuthenticated) {
          alert('請先登入後再投票');
          const returnUrl = route.fullPath;
          console.log('跳轉到登入頁面，返回URL:', returnUrl);
          console.log('完整路由資訊:', route);
          
          router.push({ 
            path: '/login', 
            query: { 
              returnTo: returnUrl,
              from: 'voting'
            } 
          });
          return;
        }
        
        const additionalData = {
          floor_number: store.state.user?.floor_number,
          unit_number: store.state.user?.unit_number
        };
        
        console.log('準備提交投票:', { topicId, selectedOption: selectedOption.value, userId, additionalData });
        
        // 直接插入投票記錄，簡化 API 調用
        const { data, error } = await supabase
          .from('voting_records')
          .insert([{
            topic_id: topicId,
            user_id: userId,
            option_id: selectedOption.value,
            floor_number: additionalData.floor_number,
            unit_number: additionalData.unit_number,
            user_agent: navigator.userAgent
          }])
          .select()
          .single();

        if (error) {
          console.error('Supabase insert error:', error);
          throw error;
        }

        console.log('投票成功:', data);
        
        hasVoted.value = true;
        userVote.value = data;
        showSuccessMessage.value = true;
        
        // 嘗試更新結果
        try {
          await fetchResults();
        } catch (resultError) {
          console.warn('更新結果失敗，但投票成功:', resultError);
        }
        
        setTimeout(() => {
          showSuccessMessage.value = false;
        }, 3000);
      } catch (error) {
        console.error('Error submitting vote:', error);
        console.error('Error details:', error);
        
        let errorMessage = '投票失敗，請稍後再試';
        if (error.code === '23505') {
          errorMessage = '您已經投過票了！';
        } else if (error.message) {
          errorMessage = `投票失敗：${error.message}`;
        }
        
        alert(errorMessage);
      } finally {
        submitting.value = false;
      }
    };

    const subscribeToUpdates = (topicId) => {
      votingSubscription = votingApi.subscribeToVotingUpdates(topicId, async (payload) => {
        console.log('Voting update:', payload);
        await fetchResults();
      });
    };

    onMounted(() => {
      fetchVotingDetail();
    });

    onUnmounted(() => {
      if (votingSubscription) {
        votingApi.unsubscribeFromVotingUpdates(votingSubscription);
      }
    });

    return {
      loading,
      voting,
      selectedOption,
      hasVoted,
      userVote,
      submitting,
      showConfirmModal,
      showSuccessMessage,
      results,
      sortedResults,
      statistics,
      getStatusLabel,
      formatFullDate,
      getBarColor,
      getSelectedOptionText,
      goBack,
      submitVote,
      confirmVote
    };
  }
};
</script>

<style scoped>
.voting-detail-container {
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 0.5rem;
  box-sizing: border-box;
  overflow-x: hidden;
  min-height: calc(100vh - 60px);
}

.loading-state, .error-state {
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

.error-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.btn-back {
  background: #f3f4f6;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.btn-back:hover {
  background: #e5e7eb;
}

.voting-header {
  margin-bottom: 2rem;
}

.header-content {
  margin-top: 1rem;
}

.voting-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
}

.voting-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.status-badge.ongoing {
  background: #10b981;
  color: white;
}

.status-badge.upcoming {
  background: #f59e0b;
  color: white;
}

.status-badge.ended {
  background: #6b7280;
  color: white;
}

.voted-badge {
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.9rem;
}

.voting-info-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  margin-bottom: 2rem;
}

.info-section {
  margin-bottom: 1.5rem;
}

.info-section h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  font-size: 0.9rem;
  color: #666;
}

.info-value {
  font-size: 1rem;
  color: #333;
  font-weight: 500;
}

.attachments {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.attachment-list {
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;
}

.attachment-link {
  color: #667eea;
  text-decoration: none;
}

.attachment-link:hover {
  text-decoration: underline;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.voting-options {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  margin-bottom: 2rem;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.option-card {
  display: flex;
  align-items: flex-start;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.option-card:hover {
  border-color: #667eea;
  background: #f9fafb;
}

.option-card.selected {
  border-color: #667eea;
  background: linear-gradient(135deg, rgba(102,126,234,0.05), rgba(118,75,162,0.05));
}

.option-radio {
  margin-right: 1rem;
  margin-top: 0.25rem;
}

.option-content {
  flex: 1;
}

.option-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #333;
}

.option-description {
  color: #666;
  line-height: 1.5;
}

.voting-actions {
  text-align: center;
}

.btn-submit {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 1rem 3rem;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-submit:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-2px);
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.voting-results {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  margin-bottom: 2rem;
}

.results-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(102,126,234,0.05), rgba(118,75,162,0.05));
  border-radius: 0.75rem;
}

.summary-item {
  text-align: center;
}

.summary-label {
  display: block;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.summary-value {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
}

.results-chart {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.result-item {
  position: relative;
}

.result-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.result-option {
  font-weight: 600;
  color: #333;
}

.result-stats {
  color: #666;
}

.result-bar {
  height: 32px;
  background: #f3f4f6;
  border-radius: 1rem;
  overflow: hidden;
}

.result-fill {
  height: 100%;
  transition: width 0.5s ease;
  border-radius: 1rem;
}

.your-choice {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.85rem;
}

.floor-distribution {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.floor-distribution h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
}

.floor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.75rem;
}

.floor-item {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
  text-align: center;
}

.floor-label {
  display: block;
  font-size: 0.9rem;
  opacity: 0.9;
}

.floor-count {
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
}

.voting-notice {
  background: #f9fafb;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.voting-notice h3 {
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: #333;
}

.voting-notice ul {
  list-style: none;
  padding: 0;
}

.voting-notice li {
  padding: 0.5rem 0;
  color: #666;
  position: relative;
  padding-left: 1.5rem;
}

.voting-notice li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #667eea;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
}

.modal-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.modal-message {
  margin-bottom: 0.5rem;
  color: #666;
}

.modal-warning {
  color: #ef4444;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-cancel {
  background: #f3f4f6;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
}

.btn-confirm {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
}

.success-message {
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: #10b981;
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

@media (max-width: 768px) {
  .voting-detail-container {
    padding: 1rem;
  }

  .voting-info-card {
    padding: 1.5rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    width: 95%;
  }

  .success-message {
    left: 1rem;
    right: 1rem;
    top: 1rem;
  }
}
</style>