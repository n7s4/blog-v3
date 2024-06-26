import service from "./httpRequest";
import { Method, ResponseType } from 'axios'
export default class Http {
  /**
   * get 请求
   * @param url 
   * @param params 
   * @param config 
   * @returns 
   */
  public static get(url: string, params?: Object, config?: Object) {
    const method: Method = 'GET';
    const options = {
      url,
      method,
      params,
      ...config,
    }
    if (!params) {
      delete options.params;
    }
    return service(options)
  }
   
  /**
   * post 请求
   * @param url 
   * @param params 
   * @param config 
   * @returns 
   */
  public static post(url: string, params?: Object, config?: Object) {
    const method: Method = 'POST';
    const options = {
      url,
      method,
      params,
      ...config,
    }
    return service(options)
  }

  /**
   * 下载文件 post
   * @param url 
   * @param params 
   * @param config 
   * @returns 
   */
  public static dowmloadPost(url: string, params?: Object, config = {}) {
    const responseType: ResponseType = 'blob'
    const options = {
      responseType: responseType,
      ...config,
    }
    return this.post(url, params, options)
  }
}