// A wrapper around fetch()
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

export const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

export async function api(endpoint, method, { body, ...customConfig } = {}) {
  const headers = {
    "Content-Type": "application/json",
  };

  const config = {
    method: method,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let data;
  try {
    const response = await window.fetch(API_URL + endpoint, config);
    data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

api.get = function (endpoint, customConfig = {}) {
  return api(endpoint, "GET", { ...customConfig });
};

api.post = function (endpoint, body, customConfig = {}) {
  return api(endpoint, "POST", { body, ...customConfig });
};

api.put = function (endpoint, body, customConfig = {}) {
  return api(endpoint, "PUT", { body, ...customConfig });
};

api.delete = function (endpoint, customConfig = {}) {
  return api(endpoint, "DELETE", { ...customConfig });
};
