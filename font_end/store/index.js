import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      isAdmin: false
    },
    mutations: {
      setUser(state, user) {
        state.user = user;
        state.isAdmin = user.role === 'admin';
      },
      setToken(state, token) {
        state.token = token;
      }
    },

    actions: {
      async login({ commit }, { user_id, user_password }) {
        try {
          // ทำการล็อกอินและรับข้อมูลผู้ใช้จาก API
          const response = await axios.post('/api/login', { user_id, user_password });
          commit('setUser', response.data.user);
          commit('setToken', response.data.token); // เพิ่มบรรทัดนี้
          return true;
        } catch (error) {
          console.error('Login failed:', error);
          return false;
        }
      }
    }

  });
};

export default createStore;
