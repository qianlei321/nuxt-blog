export const state = () => ({
    articesIds: [],
    menuData: [],
    tagsData:[]
})

export const mutations = {
    updateArticesIds(state, data) {
        state.articesIds = data;
    },
    updateMenuData(state, data) {
        state.menuData = data;
    },
    updateTags(state, data) {
        state.tagsData = data;
    },
}
export const actions = {
    async nuxtServerInit({ commit}, { req }) {
        //获取所有文章id 验证路由  
        await this.$axios.get(`/front/allArtices`).then(res => {
                var data = []
                res.data.forEach(element => {
                    data.push(element._id)
                });
                commit('updateArticesIds', data);
            })
        //获取所有标签名称 验证路由  
        await this.$axios.get(`/front/allTags`).then(res => {
            var data = []
            res.data.date.forEach(element => {
                data.push(element.name)
            });
            commit('updateTags', data);
        })
        //获取所有分类 头部菜单
        await this.$axios.get('/front/searchAllMenu').then(res => {
            commit('updateMenuData', res.data);
        })
    }
}