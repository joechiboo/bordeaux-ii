import { createClient } from '@supabase/supabase-js';

// 支援 Vite 和 Vue CLI 兩種環境
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || process.env.VUE_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || process.env.VUE_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!');
  console.error('Please set VUE_APP_SUPABASE_URL and VUE_APP_SUPABASE_ANON_KEY');
  throw new Error('Supabase configuration is missing');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const votingApi = {
  async getVotingTopics(status = null) {
    let query = supabase
      .from('voting_topics')
      .select(`
        *,
        voting_options (
          id,
          option_text,
          option_value,
          description,
          order_index
        ),
        voting_results (
          option_id,
          vote_count,
          percentage
        )
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching voting topics:', error);
      throw error;
    }
    
    return data;
  },

  async getVotingTopic(topicId) {
    const { data, error } = await supabase
      .from('voting_topics')
      .select(`
        *,
        voting_options (
          id,
          option_text,
          option_value,
          description,
          order_index
        ),
        voting_results (
          option_id,
          vote_count,
          percentage
        )
      `)
      .eq('id', topicId)
      .single();

    if (error) {
      console.error('Error fetching voting topic:', error);
      throw error;
    }

    return data;
  },

  async checkUserVoted(topicId, userId) {
    const { data, error } = await supabase
      .from('voting_records')
      .select('id, option_id, voted_at')
      .eq('topic_id', topicId)
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking user vote:', error);
      throw error;
    }

    return data;
  },

  async submitVote(topicId, optionId, userId, additionalData = {}) {
    const voteData = {
      topic_id: topicId,
      option_id: optionId,
      user_id: userId,
      floor_number: additionalData.floor_number || null,
      unit_number: additionalData.unit_number || null,
      ip_address: additionalData.ip_address || null,
      user_agent: navigator.userAgent
    };

    const { data, error } = await supabase
      .from('voting_records')
      .insert([voteData])
      .select()
      .single();

    if (error) {
      console.error('Error submitting vote:', error);
      throw error;
    }

    await supabase.rpc('calculate_voting_results', { p_topic_id: topicId });

    return data;
  },

  async getVotingResults(topicId) {
    const { data, error } = await supabase
      .from('voting_results')
      .select(`
        *,
        voting_options (
          option_text,
          option_value,
          description
        )
      `)
      .eq('topic_id', topicId)
      .order('vote_count', { ascending: false });

    if (error) {
      console.error('Error fetching voting results:', error);
      throw error;
    }

    return data;
  },

  async getVotingStatistics(topicId) {
    const { data: totalVotes, error: totalError } = await supabase
      .from('voting_records')
      .select('id', { count: 'exact' })
      .eq('topic_id', topicId);

    if (totalError) {
      console.error('Error fetching total votes:', totalError);
      throw totalError;
    }

    const { data: floorDistribution, error: floorError } = await supabase
      .from('voting_records')
      .select('floor_number')
      .eq('topic_id', topicId);

    if (floorError) {
      console.error('Error fetching floor distribution:', floorError);
      throw floorError;
    }

    const floorStats = {};
    floorDistribution.forEach(record => {
      const floor = record.floor_number || 'Unknown';
      floorStats[floor] = (floorStats[floor] || 0) + 1;
    });

    return {
      totalVotes: totalVotes?.length || 0,
      totalHouseholds: 100,
      participationRate: ((totalVotes?.length || 0) / 100 * 100).toFixed(2),
      floorDistribution: floorStats
    };
  },

  async updateVotingStatus() {
    const now = new Date().toISOString();
    
    await supabase
      .from('voting_topics')
      .update({ status: 'ongoing' })
      .lte('start_date', now)
      .gte('end_date', now)
      .eq('status', 'upcoming');

    await supabase
      .from('voting_topics')
      .update({ status: 'ended' })
      .lt('end_date', now)
      .eq('status', 'ongoing');
  },

  subscribeToVotingUpdates(topicId, callback) {
    const subscription = supabase
      .channel(`voting:${topicId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'voting_records',
          filter: `topic_id=eq.${topicId}`
        },
        payload => {
          callback(payload);
        }
      )
      .subscribe();

    return subscription;
  },

  unsubscribeFromVotingUpdates(subscription) {
    if (subscription) {
      supabase.removeChannel(subscription);
    }
  },

  async createNotification(topicId, userId, type, channel) {
    const { data, error } = await supabase
      .from('voting_notifications')
      .insert([{
        topic_id: topicId,
        user_id: userId,
        notification_type: type,
        channel: channel
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating notification:', error);
      throw error;
    }

    return data;
  }
};

export const auth = {
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Error signing in:', error);
      throw error;
    }

    return data;
  },

  async signUp(email, password, metadata = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });

    if (error) {
      console.error('Error signing up:', error);
      throw error;
    }

    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Error getting user:', error);
      throw error;
    }

    return user;
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  }
};