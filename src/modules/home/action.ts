import {GET_API_CALL} from '../../services';
import ENDPOINTS from '../../utils/endPoints';

const getListProducts = (payload: any, callback: any) => {
  GET_API_CALL(
    `${ENDPOINTS.HOME.PRODUCT_LIST}?limit=${payload.limit}&skip=${payload.skip}`,
    res => {
      callback(res);
    },
  );
};

const getSearchedProducts = (payload: any, callback: any) => {
  GET_API_CALL(
    `${ENDPOINTS.HOME.SEARCH}?q=${payload.searchText}&limit=${payload.limit}&skip=${payload.skip}`,
    res => {
      callback(res);
    },
  );
};

export {getListProducts, getSearchedProducts};
