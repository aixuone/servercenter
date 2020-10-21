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
        console.log("参数",params);
        return axios.post('/data/object/list', params)
        .then(res => {
            console.log("参数中返回的res",res)
            console.log("参数中返回的data",res.data)
            return res.data;
        });
    },
    /**
     * @api addDataObject
     * @description 新增数据对象
     */
    addDataObject: params => {
        return axios.post('/data/object/add', params).then(res => {return res.data});
    },
    /**
     * @api deleteDataObject
     * @description 删除数据对象
     */
    deleteDataObject: params => {
        return axios.post('/data/object/delete', params).then(res => {return res.data});
    },
    /**
     * @api editDataObject
     * @description 修改数据对象
     */
    editDataObject: params => {
        return axios.post('/data/object', params).then(res => {return res.data});
    },
    /**
     * @api getDataObjectAttrsList
     * @description 查询数据对象属性列表
     */
    getDataObjectAttrsList: params => {
        return axios.post('/data/object/attribute/list', params).then(res => {return res.data;});
    },
    /**
     * @api getDataObjectAttrDicList
     * @description 查询数据对象属性关联的字典数据列表
     */
    getDataObjectAttrDicList: params => {
        return axios.post('/data/retrievedic', params).then(res => {return res.data;});
    },
    /**
     * @api addDataObjectAttr
     * @description 新增数据对象属性
     */
    addDataObjectAttr: params => {
        return axios.post('/data/object/attributes', params).then(res => {return res.data});
    },
    /**
     * @api deleteDataObjectAttr
     * @description 删除数据对象属性
     */
    deleteDataObjectAttr: params => {
        return axios.post('/data/object/attribute/delete', params).then(res => {return res.data});
    },
    /**
     * @api editDataObjectAttr
     * @description 修改数据对象属性
     */
    editDataObjectAttr: params => {
        
        return axios.post('/data/object/attribute/update', params).then(res => {return res.data});
    },
     /**
     * @api viewData
     * @description 查看数据
     */
    viewData: params =>{
        return axios.post('/data/retrieve',params).then(res =>{ return res.data});
    },
     /**
     * @api dictBind
     * @description 绑定字典属性
     */
    dictBind: params =>{
        return axios.post('/data/object/binding',params).then(res =>{return res.data});
    },
    /**
     * @api editData
     * @description 修改数据
     */
    editData: params => {
        return axios.post('/data/update', params).then(res => {return res.data});
    },
    /**
     * @api deleteData
     * @description 删除数据
     */
    deleteData: params => {
        return axios.post('/data/delete', params).then(res => {return res.data});
    },
    /**
     * @api addData
     * @description 新增数据
     */
    addData: params => {
        return axios.post('/data/add', params).then(res => {return res.data});
    },
    /**
     * @api getTypeDataTree
     * @description 查询数据对象分类树
     */
    getTypeDataTree: params => {
        return axios.post('/datatype/list', params).then(res => {return res.data;});
    },
    /**
     * @api getDataSetColumnList
     * @description 查询数据集结果字段列表
     */
    getDataSetColumnList: params => {
        return axios.post('/datacomment/listcolumns', params).then(res => {return res.data;});
    },
    /**
     * @api getDataSetColumns
     * @description 查询数据集结果字段列表
     */
    getDataSetColumns: params => {
        return axios.post('/datacomment/list', params).then(res => {return res.data;});
    },
    /**
     * @api editData
     * @description 修改数据
     */
    editDataSetColumns: params => {
        return axios.post('/datacomment/updatebatch', params).then(res => {return res.data});
    },
    /**
     * @api addSourceType
     * @description 新增节点
     */
    addSourceType: params => {
        return axios.post('/datatype/add', params).then(res => {return res.data});
    },
    /**
     * @api delSourceType
     * @description 删除节点
     */
    delSourceType: params => {
        return axios.post('/datatype/delete', params).then(res => {return res.data});
    },
    /**
     * @api editSourceType
     * @description 新增节点
     */
    editSourceType: params => {
        return axios.post('/datatype/update', params).then(res => {return res.data});
    }
    
};