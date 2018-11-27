import axios from "@/libs/axios";
export default {
    /**
     * @description 公共返回信息
     * @returns {boolean} success	  成功标志
     * @returns {String}  code	      返回代码
     * @returns {String}  message	  返回信息
     * 
     * /

    /**
     * @api getDataObjectsList
     * @description 查询数据对象列表
     */
    getDataObjectsList: params => {
        return axios.get('/data/object/list', params).then(res => {return res.data;});
    },
    /**
     * @api addDataObject
     * @description 新增数据对象
     */
    addDataObject: params => {
        return axios.get('/data/object/add', params).then(res => {return res.data});
    },
    /**
     * @api deleteDataObject
     * @description 删除数据对象
     */
    deleteDataObject: params => {
        return axios.get('/data/object/delete', params).then(res => {return res.data});
    },
    /**
     * @api editDataObject
     * @description 修改数据对象
     */
    editDataObject: params => {
        return axios.get('/data/object/edit', params).then(res => {return res.data});
    },
    /**
     * @api getDataObjectAttrsList
     * @description 查询数据对象属性列表
     */
    getDataObjectAttrsList: params => {
        return axios.get('/data/object/attribute/list', params).then(res => {return res.data;});
    },
    /**
     * @api addDataObjectAttr
     * @description 新增数据对象属性
     */
    addDataObjectAttr: params => {
        return axios.get('/data/object/attributes', params).then(res => {return res.data});
    },
    /**
     * @api deleteDataObjectAttr
     * @description 删除数据对象属性
     */
    deleteDataObjectAttr: params => {
        return axios.get('/data/object/attribute/delete', params).then(res => {return res.data});
    },
    /**
     * @api editDataObjectAttr
     * @description 修改数据对象属性
     */
    editDataObject: params => {
        return axios.get('/data/object/attribute/edit', params).then(res => {return res.data});
    },

};