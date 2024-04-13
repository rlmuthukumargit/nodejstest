const getPagingData = (list, page, limit, totalcount) => {
  const total = totalcount;
  const currentPage = page ? +page+1 : 1;
  const totalPages = Math.ceil(total / limit);
  const pageMeta = {};
  pageMeta.size = limit;
  pageMeta.page = currentPage;
  pageMeta.total = total;
  pageMeta.totalPages = totalPages;
  return {
    list,
    pageMeta
  };
};

// const getPageMeta = async (total, page, chunk) => { 
//   return { 
//        total, 
//        totalPages: Math.ceil(total / chunk),
//        page, 
//        chunk 
//   };  
// }

module.exports = getPagingData