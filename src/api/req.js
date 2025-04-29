import service from "./index";

export function multipleSaleData(params) {
  return service({
    method: "get",
    url: "/multipleSaleData",
    params,
  });
}

export function getFlowPool(params) {
  return service({
    method: "get",
    url: "/getFlowPool",
    params,
  });
}

export function getSchoolMatchResult(params) {
  return service({
    method: "get",
    url: "/getSchoolMatchResult",
    params,
  });
}

export function getEntrepreneurStar(params) {
  return service({
    method: "get",
    url: "/getEntrepreneurStar",
    params,
  });
}

export function regionProvinceTree(params) {
  return service({
    method: "get",
    url: "/regionProvinceTree",
    params,
  });
}

export function getOfflineSale(params) {
  return service({
    method: "get",
    url: "/getOfflineSale",
    params,
  });
}
export function getOnlineData(params) {
  return service({
    method: "get",
    url: "/getOnlineSale",
    params,
  });
}

export function getProvideJobTopCompany(params) {
  return service({
    method: "get",
    url: "/getProvideJobTopCompany",
    params,
  });
}
export function getTopSchoolSale(params) {
  return service({
    method: "get",
    url: "/getTopSchoolSale",
    params,
  });
}

export function getOnJobNum(params) {
  return service({
    method: "get",
    url: "/getOnJobNum",
    params,
  });
}

export function getIndexData(params) {
  return service({
    method: "get",
    url: "/getIndexData",
    params,
  });
}
export function getProvinceProcessing(params) {
  return service({
    method: "get",
    url: "/getProvinceProcessing",
    params,
  });
}
