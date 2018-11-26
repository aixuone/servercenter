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
     * @api getDataObjectAttrsList
     * @description 查询数据对象属性列表
     */
    getDataObjectAttrsList: params => {
        return axios.get('/data/object/attribute/list', params).then(res => {return res.data;});
    },
    /**
     * @api addDataObject
     * @description 新增数据
     */
    addDataObject: params => {
        return axios.get('/data/add', params).then(res => {return res});
    },
};