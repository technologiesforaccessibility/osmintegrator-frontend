const noTokenHeaders = () => ({
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Accept-Language': 'pl-pl',
});

const basicHeaders = () => ({
  'Authorization': 'Bearer ' + localStorage.token,
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Accept-Language': 'pl-pl',
});

const noContentTypeHeaders = () => ({
  'Authorization': 'Bearer ' + localStorage.token,
  'Cache-Control': 'no-cache',
  'Access-Control-Allow-Origin': '*',
  'Accept-Language': 'pl-pl',
});

export { noTokenHeaders, basicHeaders, noContentTypeHeaders };
